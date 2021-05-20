---
layout: post
title: "Planning a storage upgrade"
date: 2021-05-20 12:45:00 -0700
tags: ["windows server", "storage pool", "storage"]
---

Quick Links:

- [Software](#software)
- [Storage](#storage)
- [Hardware](#hardware)
- [Final Purchasing](#purchase)
- [Final Thoughts](#thoughts)

<br />
So, I'm looking to expand my existing storage for my server's in the near future [chip shortage, along with the storage shortage caused by the chia blockchain - doesn't allow for this currently], and this is what I have planned out for it.

My existing storage consists of 1 server with Windows storage pool setup, serving primary storage for vm's, user data, archive data, game disk.. followed with a second device that exists as a low powered vm host (that also hosts an s2d exclusively for a couple vm's).

My goal is to uncouple my storage from my virtualization host(s), while also increasing resiliancy against both disk failure, as well as downtime due to updating a node.
<br />

<a name="software" />
# Software

As there will be virtual machines that run on this storage, it will have to be some kind of shared storage option, either a SAN that supports it, or a virtual san. The software that will I will likely end up using for that is [Starwind VSAN Free.](https://www.starwindsoftware.com/starwind-virtual-san-free)

My initial testing of this software in a 2 node configuration (under virtual machines so limited iops) has been working well enough so far. The only downside I have so far is that the free version lacks the management gui, and the powershell cmdlets are a bit hard to work through from their wiki. (I'll update this post to link to my setup of the software when that gets setup)

<br />

<a name="storage" />
# Storage
So the storage mirroring side is set. Now to calculate how much total space is needed.
<br />
After tallying up all of my existing data set, I end up with approximately 7TB of existing storage. So I will need to, at a minimum, have that amount on the storage server.

That number can be lowered a significant portion though, if the data that does not need the high availability that the vsan will provide, is excluded from being on this server. That would be my roughly 2TB drive I have connected for my Steam library.
<br />
Following that, the total data that will be mirrored between the 2 nodes will be 5TB. 

So at a minimum, getting probably a set of 2x4TB drives per node will be the way to go, as that will give me about 7.2TB usable storage space, which will allow for growth for the forseeable future, as I would estimate that my storage expansion will likely only grow by about 200GB per year.
Adding to that, an option to add an ssd will allow the setup of storage tiering.

- 2x 4TB hdd
- 1x m.2 nvme

<br />
<a name="hardware" />
# Hardware 

So now that the storage specification has been laid out, we can get to what hardware will actually host this data.

After looking for a device to use, I have chosen to go with the [ODroid-H2+.](https://www.hardkernel.com/shop/odroid-h2plus/) This device runs an [Intel Celeron J4115](https://ark.intel.com/content/www/us/en/ark/products/192635/intel-celeron-j4115-processor-4m-cache-up-to-2-50-ghz.html) processor.
<br />
The board has 2xddr4 sodimm, 1x m.2 slot, 2x sata, 1x emmc, and 2x 2.5gbe nic
<br />
I will pair this board with 8GB of ram. The operating system will then be installed to a 128gb emmc which will leave both the single m.2 slot and both (2) sata ports available for storage.
<br /><br /><br />
I chose this device, as it is using a very low power chip (10w), and has upgrades I have been looking for. That includes a dual 2.5gbe nic, which will allow faster replication speeds between the storage nodes. It also has a single m.2 port which will allow me to use an nvme for now, and upgrade that slot to a m.2 to pcie adapter with an HBA to increase number of drives later if necessary.
<br />

- Odroid H2+
- 8gb ddr4 sodimm
- 128gb emmc
- case

<br />
<a name="purchase" />
# Final purchasing

So now that everything that is needed has been touched on, this is my current (pending everything becoming in stock again!) build:

- 1x ODroid H2+ w/ 8gb ram + 128gb emmc
- 2x 4TB hdd
- 1x m.2 nvme SSD

I am choosing to go with only a single ODroid H2+ for now, as I can continue to use my current primary storage host in conjunction with the new one, which will decrease the initial cost of purchase. A second one can be easily added in the future by just chaning how the Starwind VSAN software is setup.


<br />
<a name="thoughts" />
# Final Thoughts

This new setup will allow for more storage, more resiliancy, as well as increased throughput. From my current setup: 
- overall storage capacity won't change much
- increased resiliancy comes from all of the data being mirrored between 2 devices
- increase throughput is achieved from the active/active nature that the storage cluster will have, which allows for reads to come from either node containing the data.

<br />

My initial plan was to get a couple 1u servers with a disk shelf that supports split mode, such as a Dell PowerVault MD1000/MD12000, but the power consumption and noise of old enterprise equipment (Ivy Bridge-E) compared to new equipment is a bit too much for me to pass on changing. Yes, there are some benefits to using server equipment - increase ram capacity + ecc support, more pcie lanes, more redundancy for the power supply - but in my home environment, this is not as needed. Especially for a storage server. The storage will be sitting idle more often than not, so having lower power consumption and noise levels is very beneficial to me.

<br />
I do plan on getting a storage shelf to increase total number of disks that I am able to connect to the server, but that is a future potential upgrade path, and is not needed for the forseeable future.