---
layout: post
title: "Performance of iSCSI (Part 1)"
date: 2020-12-14 17:00:00 -0700
tags: ["Windows", "Windows Server", "iSCSI"]
---

[Link to part #2](/2020/12/19/iScsiPerformance2.html)

So I've been using an iSCSI drive on my PC from my Windows Server for about a month now, specifically for my Steam library.

The server being Windows Server 2016, with a storage pool setup, and the client being Windows 10 Pro. This is the performance I get from it.

This virtual disk is setup as a 2 column device with a 10GB write-cache. Drives are 2x4tb sata-2, 1x3tb sata-2, 1x2tb usb3.0, and 1x240gb sata-3. (The drives are all sata-3 based, but my motherboard only has 1 sata-3 port and 5 sata-2 ports)

Each of the 4 drives is capable of roughly 130MB/s sequential (the ssd write cache work seperately) (I'll have to run Crystal Disk Mark on each individually..), but my bottleneck will be my network infrastructure - as the computers are connected with only a gigabit network interface card. So it should be pretty close to the full saturation of the nic, while leaving headroom on the server side for the disks.

Server 1GB test:![Performance on server side 1GB test size](/assets/images/2020-12-14-iScsiPerformance1/server1.png)

Client 1GB test:![Performance on computer 1GB test size](/assets/images/2020-12-14-iScsiPerformance1/client1.png)

Server 4GB test:![Performance on server side 4GB test size](/assets/images/2020-12-14-iScsiPerformance1/server2.png)

Client 4GB test:![Performance on computer 4GB test size](/assets/images/2020-12-14-iScsiPerformance1/client2.png)



Because of the gigabit nic, we will be limited to a maximum of 125MB/s when on the client<br />(1000mb/s [gigabit] / 8 [conversion to megabytes]).

<br />

Let's take a look at the tests.
<br />
We can tell in both sets, the sequential 1MB queue depth 8 gives the performance of the nic (after the overhead).<br />
The sequential 1MB queue depth 1 gives half that. <br />
Checking both the server and client shows: 100% disk usage of client (with about 50% network utilization), and about 50% disk activity on each of the four disks.

The random io works as I would expect it to. There is a write-cache installed on the server, so most of that performance comes from the SSD. It is less than the server's performance though: if I had to guess it is from the overhead in the encapsulation of iSCSI. Storage devices usually have much lower performance of random io compared to sequential. So for that reason, the randomness of the operation coupled with the overhead that iSCSI adds (in addition to tcp/ip etc), would explain that lower performance.

<br /><br />

<u>Some conclusions:</u>

The performance has a hard maximum of 125MB/s before you lower it from overhead that exists. The random io write gets a boost on the server side from the ssd write cache.

This is by no means a scientific test, the drives have been in use (so file fragmentation), there's additional network activity on both the server and the client, etc. The test was done on the server against the virtual drive that holds the iSCSI vhd, NOT in the vhd itself, whereas the client performed the test against the vhd directly.

But for my uses, it works well. For the games that I play, I don't have any additional perceived loading times, or other performance degredation.
<br /><br />
Of course there will be ways to improve this performance:
- Installing faster disks into a faster interface
- All SSD disks
- Faster network interface card or multiple for multipath io (waiting on my second gigabit nic to arrive to test this)
- A dedicated iSCSI network with no internet traffic
- Environment tuning of both network adapters and related infrastructure (such as jumbo frames)

For my environment, an immediate performance difference would be seen by having a higher speed network interface card. Going from a 1gbe nic to a 10gbe, would increase the maximum speed from 125MB/s to 1.25GB/s, which is way above what my storage disks can provide. Even upgrading to a 2.5gbe would increase that to 312.5MB/s, which is starting to approach the max speed of the disks I am using.

<br />

<u>A few additional notes on my setup:</u>

Network adapters:

Server has "RTL8168FB" <br />
Client has "RTL8118AS"

CPU:

Server has Intel i5 3450S <br />
Client has AMD Ryzen 5 2600x

Both are connected with 2 network hops to gigabit switches

Server has vdisk with 2 columns with a 10GB ssd write cache (4 HDD's are used though), each hdd with a max speed of pretty close to 130MB/s.