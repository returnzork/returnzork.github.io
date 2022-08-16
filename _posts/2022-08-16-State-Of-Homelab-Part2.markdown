---
layout: post
title: "State of Homelab - Part 2 (Networking)"
date: 2022-08-16 16:25:00 -0700
tags: ["homelab", "networking"]
---

[Previous Post, Computer Hardware]({% post_url 2022-06-22-State-Of-Homelab-Part1 %})


Quick Links:

- [Current Hardware](#current)
- [Upgrades](#upgrades)
- [Final thoughts](#final)


<a name="current" />
# **1. Current Hardware**

My current networking hardware is not very complex. It consists of:

* Netgear router that handles DHCP
* 5 port TP-Link gigabit switch
* 5 port Unfi-Flex-Mini gigabit switch
* 2x Unifi AP-AC Lite wifi access points

[Impressions of Ubiquiti Hardware]({% post_url 2021-04-08-UbiqutiFirstImpressions %})

<a name="upgrades" />
# **2. Future Upgrades**

My network currently consists of only gigabit connections. This is fine for the most part, as that has ample enough speeds for what I currently need.

There are some things that would benefit from having a faster connection, such as my storage space resyncing, or the iSCSI drives that I have directed to my workstation.

In addition, I am currently at the limit of what each switch has port wise, so having the 10 ports (minus 1 port on the Ubiquiti switch for uplink, and 2 on the TP-Link - 1 uplink and 1 downlink = 7 ports remaining) is a very limiting factor of what can be plugged in.

I belive upgrading to a higher port count switch, plus one that has a minimum of 4 > 1gbit ports will be a great improvement.

A greater port count will allow more connections to computer devices (currently, my laptop which is directly next to a switch has to connect via wifi), and having either 2.5gbit or 10gbit ports will help with future upgrades.

Having 4 faster ports will allow for storage nodes to be connected faster which allow for faster resyncing of storage spaces, as well as faster virtual machine disk performance via the faster network connection.

<a name="final" />
# **3. Conclusions**

TLDR
---

👍 More Ports<br>
👍 Ability to connect at greater than 1gbit

Full
---

Upgrading of the network equipment will probably be one of the easier things that will be upgraded. <br><br>

Having more ports, and connectivity options will allow me to expand on vlan usage, and will definitely improve some aspects of my daily usage. (I moved a couple games from my iSCSI drive to a local disk, as it was having poor performance on one of the games that I have been playing)

Pairing the increased speed with a dedicated and faster storage array, I think that the homelab as a whole will be heading in a direction that will allow for easier growth in the future.