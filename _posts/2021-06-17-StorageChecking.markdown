---
layout: post
title: "Checking a potential storage failure"
date: 2021-06-17 16:58:00 -0700
tags: ["windows server", "storage pool", "storage"]

published: false
---

I was set to change over one of my virtual disks in my storage pool to use Storage Tiers, instead of a simple volume, so that I can get some increase in performance on highly access files.

The drive in question stores 2 large vhdx files, one sizing at 1.44TB, the other at 300GB.

<br /><br />

As these files are used for iSCSI, it would be easy for me to create the new volume with storage tiering, copy the vhdx files over, and then adjust the drive letter. The smaller of the files copied without any issue. 

The other one, unfortunately, would get to roughly 30% before failing - each time it was tried.

<br /><br />

![Can't read from the source file or disk](/assets/images/2021-06-17-StorageChecking/cannotread.jpg)

<br /><br />

Checking the event viewer, gave multiple Event ID 7, the device has a bad block.

![Event viewer shows bad block](/assets/images/2021-06-17-StorageChecking/BadBlock.png)

<br /><br />

Which leads me to believe one of the disks in my storage pool is potentially failing. 

I switched up the way I went about moving the virtual disk - I instead cloned the contents to a new vhdx, and removed that broken one before continuing this diagnosis.

<br /><br /><br />

So with a potential hard drive issue, I needed to go about testing it. A program that I have installed to monitor overall health is called [Hard Disk Sentinel.](https://www.hdsentinel.com/) One of the features of this software, is to run both a Short Self test, and an Extended self test. I ran the short self test, and it had the issue: "Test Failed By Read Element."

<br /><br />

So now I have confirmation that something is up with the disk. And that means the contents need to be moved off of the disk, and onto a new drive.

<br />

As this is setup with a Windows Storage Pool, what we can do is:

1. Set this disk to "retired"
2. Repair all of the existing virtual disks that are using it
3. Add a replacement disk
4. Rebalance the storage pool

-- Steps 2, 3, and 4 may be able to be combined - I don't have enough sata bays to do this so I had to do the extra step of replacing the disk after --



<br />

In a powershell window, we need to set the correct disk to retired.


`$disk = Get-PhysicalDisk -FriendlyName {Your Disk's Friendly Name}`

`Set-PhysicalDisk $disk -Usage retired`

<br />

Now that the disk is set to retired, we can continue to step 2, which is repairing the virtual disks.

`Get-VirtualDisk`

`Repair-VirtualDisk -FriendlyName {Friendly Name of a virtual disk to repair}`

Do this for each virtual disk in the storage pool. At any time, you can use `Get-StorageJob` to view the current status of the repair. In my case, each Job State "Suspended" corresponded with one virtual disk that needed to be repaired.

![Command window after running Get-StorageJob showing the currently running job and the ones that are suspended](/assets/images/2021-06-17-StorageChecking/DuringRepair.png)
<br /><br />

If you check the "Health" in Server manager to view which disks are being used by the virtual disk, you can see the retired disk be removed after the Repair-VirtualDisk finishes.

![Disks used before repair](/assets/images/2021-06-17-StorageChecking/BeforeRepair.png)

![Disks used after repair](/assets/images/2021-06-17-StorageChecking/AfterRepair.png)

<br /><br />

After all of the disks have been repaired, we can now remove the physical disk from the pool. From server manager, navigate to the storage pool, and then right click the retired disk, and select Remove Disk. A warning will show, asking if we really want to remove the disk.

![Remove the disk from the pool](/assets/images/2021-06-17-StorageChecking/RemoveDisk.png)

It may pop up telling you that it cannot remove the disk because there are still volumes using it. Verify in each virtual disk's health page that this hard drive is no longer listed. If there are any remaining disks that show this hard drive, run the Repair-VirtualDisk cmdlet again on that volume.

![Message stating that windows is repairing any affected disk](/assets/images/2021-06-17-StorageChecking/PostRepairStatus.png)

You should now see that the retired hard drive has been moved into the Primordial/available disks section.

<br /><br />

Now we can add our replacement hard drive, and rebalance the storage pool.

`Optimize-StoragePool -FriendlyName {Your Storage Pool Name}`

After that finishes running, we will be able to see that the newly added disk has taken some of the data that was stored on the other disks in the pool, and moved it onto itself.