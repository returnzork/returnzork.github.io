---
layout: post
title: "Performance of iSCSI (Part 2)"
date: 2020-12-19 15:40:00 -0700
---

[Link to part #1](/2020/12/15/iScsiPerformance1.html) <br /><br />

As stated in part #1 of this post, I discussed some ways to improve performance. The way being tested today is using multiple network adapters for multichannel.

<br />

In my initial testing, it seems that Windows 10 does not support multichannel, so I will be testing it under a virtual machine with Server 2016. The Multipath IO feature was installed and configured on both the server and client devices.

The iSCSI server has a usb "RTL8153X", and the client has a usb "RTL8153" as well. (note the X at the end of one of them. That one I have tested for >100mbit speeds, but the non X I am only able to get ~100mbit/s. They both have negotiated at a 1GB/s link speed as well, so it probably is a chipset limitation) The other network adapters remain the same in both the server and client.

<br />

After opening the iscsicpl control panel item, and connecting with both network adapters, and setting the mpio policy, I did the benchmarks.

Round Robin: ![Round robin mpio benchmark](/assets/images/2020-12-19-iScsiPerformance2/round-robin-client1.png)

Well, that performance is very much lower than using just one network adapter... Let's change the mpio policy to be different than the default round robin.

<br />

Least Queue Depth: <br />![Least Queue Depth benchmark](/assets/images/2020-12-19-iScsiPerformance2/lqd-client2.png)

Weighted Paths: <br />![Weighted Path benchmark](/assets/images/2020-12-19-iScsiPerformance2/weight-client3.png)

Least Blocks: <br />![Least Blocks benchmark](/assets/images/2020-12-19-iScsiPerformance2/least-client4.png)

<br /><br />

<u>Conclusion</u>

As we can tell from these different benchmarks, we were able to get higher performance compared to using just a single network adapter in some cases.

The default policy of round robin gave us the worse sequential performance of all of them, which is most likely due to one of the usb ethernet adapters that I am using not being a very good one. (Which I would believe is the RTL8153 one, as I was unable to get close to the speeds that I have from my Internet provider).

After changing the different multipath io policies, we can see that we were able to achieve the highest sequential speeds of 148MB/s using the Least Queue Depth option. What that option does is to prioritize new packets for the network adapter that has the lowest queue. The primary nic (the motherboard integrated one) would usually have the lowest queue depth (as it can go through its queue faster than the secondary nic), thus prioritizing new packets to use it instead of the usb nic.

The drawback for Lowest Queue Depth was that it had lower random io performance compared to weighted paths. (1.48 vs 8.22) The interesting thing for the random io though, is how we were able to receive higher read performance compared to running the benchmark on the server itself. (0.4 on server vs highest of 8.2 on client) This may be due to how the fully allocated (not setup as a dynamically expanding disk) vhd's are allocated compared with the benchmark on the server's vdisk itself.

After looking at these benchmarks, for my use case I would most likely choose to use the Least Queue Depth policy, as it produced the highest sequential speeds, while still having acceptable random io performance.

<br />

It is unfortunate that I was unable to get Windows 10 to work with the multipath io, and that Microsoft seems to limit that as a feature only available on server. In this case, the only way to increase performance on a non-server sku would be to use a higher speed network card. Overall, it was good to see that multipath io does function, as we were able to get at most 148MB/s which is definitely higher than the maximum a single gigabit link would allow which is 125MB/s.

<br /><br />

<u>Final thoughts</u>

In my particular circumstances, having to run a second cable to have a permanent installation is not ideal. In particular, I originally purchased the first usb nic for my Surface Pro 3, as I have some wifi issues with it, and it would allow me to bypass that. And the second usb nic was purchased to replace that first one, as it is also a 3 port usb 3.0 hub, so I am now able to have both a network connection as well as have my DJ controller hooked up at the same time. For me, having a usb hub and a network connection on my Surface is much more beneficial than having the higher performance for iSCSI.

I may end up sometimes using this second nic on my Hyper-V server to allow for use with smb direct to help speed up live migrations, but for now, multipath io will be put on the shelf for a future time.