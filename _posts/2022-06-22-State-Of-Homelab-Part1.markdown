---
layout: post
title: "State of Homelab - Part 1 (Physical Computer Hardware)"
date: 2022-06-22 19:10:00 -0700
tags: ["homelab", "storage", "windows", "server"]
---

Quick Links:

- [Current Hardware](#current)
- [Previous Hardware](#previous)
- [Upgrades](#upgrades)
- [Final thoughts](#final)


Over the past several years, my homelab has gone through a few changes. Some of these have been temporary, and others have become a more permanent item that gets used.

<a name="current" />
# **1. Current Hardware**

Currently, the homelab consists of 3 primary servers, with one additional for compute.

This includes:<br><br>
i5-3450s with 20gb ram
<br>-- This serves as the primary storage server, as well as virtualization host

HP Compaq Elite 8200 USDT - i3-2120 with 8gb ram
<br>-- This serves as the secondary vm host, used for live migration while primary host needs downtime

Intel nuc6cayh - Celeron J3455 with 8gb ram
<br>-- This is a low powered virtualization host, used for low performance required vm's

HP ProDesk 600 G4 - i7-8700 with 8gb ram
<br>-- This serves as the performant virtualization host, as well as docker host.

<br>
The ProDesk 600G4 has been the most recent addition, and it's been a much needed improvement in performance, especially for some of the docker images that run that work well with more performant cores.

<a name="previous" />
# **2. Previous Hardware**

Before upgrading the i5-3450s to primary server duty:

HP Pavilion P6330F - i3-530 12gb/16gb ram
<br>-- This served as the primary (and only) server for quite a while. It was storage server, as well as virtual machine host.
<br>-- Ram has gone between 12gb and 16gb of ram depending on how my primary computer was configured (both used ddr3)

Core2Duo E8300 8gb ram
<br>-- This was inconsistently used as a virtual machine host - its primary use was to run Windows Server Update Services. The performance of using a Core 2 Duo in 2019 compared to a first generation i3, was not great, so it got little use.

Microsoft Surface Pro 3 - i7 4650u with 8gb ram
<br>-- This was purchased with a damaged screen, and at the time seemed like it would complement the above 3 primary servers.
<br>-- The performance turned out to be less than what I had hoped for in cpu compute performance, so this gets intermitten use for lower performance docker containers.

<a name="upgrades" />
# **3. Future Upgrades**

In the future, the hardware I would like to upgrade/add is:
1. Two Dedicated storage nodes for high-availability of storage - Maybe an Alder Lake i3 - maybe a 12100?
2. Two Compute nodes for virtual machines and docker containers - Probably an Alder Lake i7 - a 12700?

Having 2 systems that are dedicated to providing high-availability of storage would be a nice thing to have, especially with having 2 compute nodes - as this would allow running a failover cluster to provide an easier way to update any of the nodes, while not having to migrate the storage for each virtual machine to the opposite compute host, or having all of the virtual machines be shut-off when the storage node gets updated.

It is likely that the HP g4 will get used as one of the compute nodes, at that time the ram will likely get upgraded to either 32gb or 64gb.
<br>

I'll need to look into potentially using AMD hardware in the future as well.

<a name="final" />
# **4. Conclusions**

TLDR
---

👍 High Availability<br>
👍 Low Power<br>
👍 Battery Backup<br><br>
👎 Mobile Performance<br>
👎 Core 2 Duo<br>
👎 Damaged Screens<br>


Full
---

The Surface Pro 3 coming with a damaged screen could have turned out worse than it did - it appears that you are unable to use the mini-DisplayPort adapter before the operating system boots. Meaning if most of the screen was not visible, Windows would not have been able to be installed.
<br>Luckily, the screen damage still allowed small, but contiguous areas to be visible, so with a bit of moving the installation window around, allowed for the operating system to get installed.
<br>I don't think it's worth getting a device with a mobile chipset, the performance per purchase dollar is low. It is nice to have a battery backup built into the device though.

<br>
The performance of the nuc6 with the celeron is also low. It *feels* overal faster than the Surface Pro 3, but still less than that of a Sandy Bridge. <br>It makes up for the lack of performance with its lower power draw.
<br>If I didn't already have the nuc6 setup before getting the Surface Pro 3, I likely would use the SP3 for what the nuc6 currently hosts.

<br>

For future hardware upgrades, I have decided that any system older than about the Skylake era (6th gen Intel Core) will be pushing too old for me, as that time period is where there was a decent performance per watt improvement, as well as the 8th generation (Coffee Lake) increasing core count across the board since Intel started with the Core-i series.
<br>Going from an Ivy Bridge i5 to a Coffee Lake i7 has been a pretty significant upgrade. The usage of DDR4 is nice to have as well, as we are now entering the DDR5 era, so I am only one generation behind.

<br><br>
Another thing to question is why most of the systems I use are Intel - I have had the most usage with Intel.<br>
I setup the Ivy Bridge system back when AMD Bulldozer was around. Since Bulldozer, AMD has made a lot of improvements in performance. My current workstation runs a Zen+ chip.<br>
Microsoft's Hyper-V system does not allow for live-migrations between cpu's of different vendors. As my primary server was Intel at the time, it made more sense to continue going that route, as it would allow some form of cohesion for some of the software that I run.
<br>Still, there are some limitations that are now being lifted on AMD chips for Hyper-V - Nested Virtualization on AMD hardware was just added in Server 2022.
<br><br>It will be a good idea to check in at a later date to see if it might be better to instead use AMD chips for the storage server, maybe there will be lower powered ones compared to Intel, or a higher number of pcie lanes will be beneficial. I don't currently think I'll switch the VM hosts to AMD though, just for the interoperability to live migrate and work with the current systems that are already in place.