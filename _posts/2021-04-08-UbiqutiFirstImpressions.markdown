---
layout: post
title: "Ubiquiti Hardware First Impressions"
date: 2021-04-08 21:20:00 -0700
tags: ["ubiquiti", "network"]
---

I recently purchased and integrated some Ubiquiti hardware into my network (my first dive with Ubiquiti), and this is a small first impressions review.

<br /><br /><br />

My network had previously consisted of a Netgear R6250 router (running DHCP and Wifi network #1), running to a Buffalo AirStation WZR-300HP (running Wifi network #2 - this device flashed to a much newer dd-wrt build), and then another cable running to a TP-Link switch (TL-SG105).

This worked decently for the most part - but there were definitely some 2.4ghz wifi problems (note: this is due to the mounting location - rather lack of way to mount - the Netgear router). And for the most part the 5ghz band worked well enough. Which brings the dd-wrt wifi. That one was in a better location for the 2.4 band, but due to age and antenna size, it didn't have much throw to the distance it worked. So I would have to switch wifi networks dependant on which one I was closer to. And then the switch was used to connect to my server equipment.

<br /><br />

Enter Ubiquiti:

The hardware that I ended up getting is 2x [UAP-AC-Lite](https://store.ui.com/collections/unifi-network-access-points/products/unifi-ac-lite) and 1x [USW-Flex-Mini](https://store.ui.com/collections/unifi-network-routing-switching/products/usw-flex-mini)

<br />

And after having used them for about 2 weeks now, I can say that I am impressed. <br />

I initially did 2 access points just to have a sort of mirror to what I already had. After setting up just the first access point, I already seen a big difference. The second one actually isn't needed all that much. I was able to get upwards of 400mbit/s speed where before my device wouldn't even connect (access point located at same location the router was). That was obviously in 802.11ac (wifi 5) mode, connected with the 5ghz band on an iPhone 8, but even using a 2.4ghz only device - an iPhone 4S - connected with wireless N (wifi 4) I was able to achieve close to 40mbit/s, which is higher than I have seen it get before.

<br />

As for the switch, I don't have much to say about it (which is good!), as it functions like I would expect a network switch to. As it is a managed switch, you get the ability to do more advanced things including vlan's, port mirroring, as well as seeing port statistics such as uplink and downlink packets.

<br />

As for the setup and configuration, I did have a bit of trouble getting the access points and switch to get adopted with the controller software. For the switch you are unable to ssh into the device to tell it where to connect to the controller, so I used the dd-wrt router to set a dhcp option for it to connect. The access points were easier, I ssh'd into the first one and told it where the controller was, and it became adopted. The second AP was setup after the switch, and it got picked up in the controller interface with no issue. That could be due to the dhcp option lingering, or that the switch was able to inform that AP where the controller was (I also set in the controller settings the "Controller Hostname/IP" which may have helped out).

[The post I did detailing a bit more in depth about the setup process can be seen here.](http://127.0.0.1:4000/2021/03/27/UbiquitiControllerAdoption.html)

<br /><br />

There are a few things that I am missing as I don't have a dream machine / security gateway. That includes using the unifi interface for things like deep packet inspection, port forwarding, or gateway statistics. But for my environment, those things were not as important as having wifi that works properly everywhere I needed it.
<br />The nice thing with these Ubiquti access points, is that I am able to set the same SSID and my device will auto roam between the access points as needed. My previous attempts to set that up with dissimilar devices (dd-wrt and netgear) was very spotty at best. <br /><br />Just like this Ubiquiti hardware, DD-WRT also supports 802.11r - fast roaming, which the netgear does not support (or at least has no visible option in any of the configuration pages). So I had some issues with the handoff between the two wifi networks. My attempts at using two raspberry pi's with usb wifi dongles and open-wrt were more headache inducing as well. So having hardware that I was able to just setup and forget has been great.

<br />

The Ubiquiti hardware lineup does fall slightly towards the more prosumer / techinal market with how you can buy different pieces of equipment (the access points, switches, gateways..) compared to what many people buy - a single device that does several pieces of the heavy lifting, dhcp, routing, wifi. But their dream machine hardware helps with that, and can always be augmented with some of their other devices if needed.

In the future, I can definitely see myself getting - and also recommending - Ubiquiti hardware. If I wasn't using a controller running on a computer, the setup process through the app wasn't super difficult or in depth. <br />
<br />