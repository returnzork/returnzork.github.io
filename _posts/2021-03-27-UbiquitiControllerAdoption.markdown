---
layout: post
title: "Adding a Ubiquiti device to a controller manually"
date: 2021-03-27 22:11:00 -0700
tags: ["ubiquiti", "network"]
---

I purchased the my first Ubiquiti equipment - 2x [uap-ac-lite's](https://store.ui.com/collections/unifi-network-access-points/products/unifi-ac-lite), and 1x [usw-flex-mini](https://store.ui.com/collections/unifi-network-routing-switching/products/usw-flex-mini) to replace some of my network equipment. As this is the only equipment I have, and that the controller software is running inside of a Windows VM, the process for adopting the equipment to the controller is slightly different than if you were to have a gateway or cloud key.

<br />

This article starts assuming you already have already setup the controller software, and are just attempting to adopt the devices to said controller.

<br />

Start by getting the device you want to adopt to the controller: in my case the uap-ac-lite. Apply power to it, as well as an ethernet connection back to your main router.

Next you will need to get the ip address that the device pulled from the dhcp server. You can do that from either your router's login page, or alternatively from the phone app: Ubiquiti WiFiman.

<br />

After you have the ip address, you will need to open up an ssh remote shell to the device. If you have the Windows Subsystem for Linux installed, you can use that, alternatively, the software PuTTY will work just as well.

<br />
After logging in using the default username and password of ubnt, we need to tell it where to look for the controller. The command for that is:
>set-inform http://x.x.x.x:8080/inform

where x.x.x.x is the ip address running your controller software.

Then head to your controller interface, to the devices tab and you should see the device ready for adoption.

<br /><br />

Unfortunately, for the USW-flex-mini the steps are slightly more complicated, as you are unable to ssh into the device to set the inform address. For this device I instead used dhcp option 43 to specify the controller address. I temporarily used a dd-wrt router I have setup with dnsmasq to set dhcp option 43 in order to complete the adoption in the controller software.

For dd-wrt, under Setup > basic setup, I set DHCP Server to Enabled, and clicked on DHCP-Authoritative, clicked apply settings. I switched to the services tab, where I enabled Dnsmasq, and for Additional Dnsmasq Options used: 
>dhcp-option=vendor:ubnt,1,my-controller-ip-address 

which was found at: [https://tcpip.wtf/en/unifi-l3-adoption-with-dhcp-option-43-on-pfsense-mikrotik-and-others.htm](https://tcpip.wtf/en/unifi-l3-adoption-with-dhcp-option-43-on-pfsense-mikrotik-and-others.htm)

If you have a different dhcp server, that web page also shows what parameters you would need to run for several other dhcp software.