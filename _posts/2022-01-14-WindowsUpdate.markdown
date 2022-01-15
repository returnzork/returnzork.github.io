---
layout: post
title: "Windows Cumulative Updates"
date: 2022-01-14 16:30:00 -0700
tags: ["windows server", "windows update"]
---

With the release a few days ago of the January 2022 Cumulative update, and the issues that some of the recent updates have had, I just thought to put my 2¢ out.

<br>

For the most part, doing a staggered update of patches from WSUS to my servers has allowed there to be few major breaking issues. Unfortunately, that is not always the case though.

<br>

The update issues I have had, started back with the November 2021 Cumulative update (for *Windows 10*).

After doing that update, my laptop with an Nvidia Quadro 2000M would experience somewhat frequent blue screens occurring when the graphics card was used. Switching off the discrete to use the igpu fixed the issue.
<br>
That seemed to fix itself after a few days of running, and I chalked it up to just having to reinstall the drivers, which I have had to do after most updates on a previous device I had.
<br><br>
But when I installed the same update on my desktop, I started receiving the same issue with the nvidia driver crashing. Most of the time it would not bluescreen though, but the event viewer would log that the display driver crashed and was recovered.
<br>(Event ID 4101 - "Display driver nvlddmkm stopped responding and has successfully recovered.")
<br><br>
Unfortunately, this crash was very intermittent, so I tested multiple ways to get it to crash consitently. I never found a way to do get it to, so I reinstalled the drivers like the laptop.
<br>(this is a GTX 970 - it's definitely an older card, but is still supported by Nvidia)
<br>
The drivers did not fix it, and thats trying several versions, including using Display Driver Uninstaller between versions.
<br><br>
So I used WSUS to have each computer to remove that update, and that did not resolve it either.<br>
Luckily / unfortunately, the issue was resolved _a month later_ with the December 2021 Cumulative update. I still do get some display driver stopped responding events in the event viewer, but they no longer affect anything that is running.
<br><br>
The same November update caused kerberos permission issues relating to delegation, that Microsoft has released an out of band update to fix, [KB5008601](https://support.microsoft.com/en-us/topic/november-14-2021-kb5008601-os-build-14393-4771-out-of-band-c8cd33ce-3d40-4853-bee4-a7cc943582b9).
<br><br>
Which leads to the January 2022 Cumulative update - more specifically [KB5009557](https://support.microsoft.com/en-us/topic/january-11-2022-kb5009557-os-build-17763-2452-c3ee4073-1e7f-488b-86c9-d050672437ae)
<br>
I installed this update doing a staggered roll out, by choosing computer group 1 in WSUS.
<br>
I have WSUS setup for 3 groups for servers:
- Server 1 and less critical virtual machines (eg Ubiquti Unifi)
- Server 2 and virtual machines with non-critical services (eg Docker, [LanCacheNet](https://github.com/lancachenet/monolithic) )
- Server 3 and critical services (eg Team Foundation Server)
<br><br>

And 2 groups for workstations:
- Group 1 for my Surface and laptop
- Group 2 for the remaining Windows 10 devices.
<br><br>

This has worked well so far, as I haven't noticed an issue with the Windows 10 devices yet - but for server 1, running Hyper-V 2019, is where the issue with this update starts.
<br>
This update caused my ReFS formatted external disk to show up as RAW. It's never a good sign to see that. So I plugged the disk into server 2, and it shows right up as expected. Which leads to researching and finding a post from [veeam](https://community.veeam.com/discussion-boards-66/refs-issues-with-latest-windows-server-updates-kb5009624-kb5009557-kb5009555-2005) which says that Microsoft actually pulled 3 updates over this specific issue - KB5009624, KB5009557, and KB5009555.

Fortunately, removing KB5009557 brought back the ReFS volume.

<br>

Some have long complained about issues with Windows Update, but I have been fortunate enough where there hasn't been too many big issues. But having cumulative updates in a row (November 2021, and January 2022 - skipping December 2021) does lead one to wonder if update issues will become more common place in the future.