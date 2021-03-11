---
layout: post
title: "Fixing GPU Driver BSOD"
date: 2021-01-26 16:10:00 -0700
tags: ["Windows", "BSOD"]
---
**(this is part #2 of analyzing a Windows BSOD, see [part #1](/2021/01/25/BlueScreen.html))**

I started by... putting the hard drive back into the laptop first! And then launching the system setup utility with the F1 key.

**Note**<br />
There are many things that you can do in the setup utility. If you don't know what something does here DON'T MESS WITH IT. If you break your system, I will not be able to help you.
<br />

From there, I went configuration area for the graphics adapters to disable the NVidia Optimus device. (On my version, its located at Config > Display) I changed the Graphics Device from NVidia Optimus to Integrated Graphics, and also disabled the OS Detection for NVidia Optimus. Note: this will be temporary while we get the drivers installed.

<br />

Now, we save and quit, and boot into Windows. I next reopened task manager like WinDBG showed triggered the crash, and.. it worked! There was no Blue Screen of Death that happened.

<br />
So now we have to go get the graphics drivers. I went over to nvidia's website, all of the nvidia drivers, and chose the one I have. (it was towards the bottom, seeing as at the time of writing that chip is quite old)

I chose the "Production Branch/Studio" driver, as it was the newest with driver version 426.78. If we try to install the driver now, we'll get a message saying that there is no compatible graphics hardware, which is expected as we disabled it. So let's re-enable it. I switched from the integrated graphics option to discrete graphics mode. This will cause the system to disable the integrated graphics this time (instead of the nvidia chip)

After rebooting back into windows, install the driver. And.. it popped up saying that it couldn't install the driver. I guess the time between logging in and starting the driver install caused Windows to install one. Checking device manager confirms that. Let's try again so we get the Nvidia driver instead of what Microsoft provided us.

So another reboot just in case, and the driver install again. And it now says that the current dch windows driver type cannot be installed. Well, after some searching on the Internet, I came to an [Nvidia forum post](https://www.nvidia.com/en-us/geforce/forums/game-ready-drivers/13/295247/dch-drivers-cant-be-installed/) saying that because the system if Optimus enabled, you are not able to install the graphics driver from nvidia. OK, so let's try the one that Lenovo provides.

The one on Lenovo's website did install, asked for a reboot.. but it didn't do anything. Let's try the main Windows Updates to see if that helps then!
<br />(**note:** this driver did end up working later, there may have been another issue with all the driver attempts before it, as I ended up getting a black screen on bootup which I reinstalled Windows to fix)

<br />

Well, that did not help either. So I tried a reinstall of Windows. Task manager did open properly, and did have the NVidia Quadro listed! But.. the driver must have updated which caused it blue screen again.

So let's see if there is a hardware issue with the discrete graphics. I installed [Furmark,](https://www.geeks3d.com/furmark/) and ran it. Both the Intel HD Graphics 4000 and the Quadro K1000M are listed, and running the benchmark worked fine. It correctly chose the NVidia chip and did not crash. So the likelyhood of it being a hardware issue go down, so it's still a driver issue of some kind.

I was able to look at [GPU-Z](https://www.techpowerup.com/gpuz/) and it gave readings for both adapters properly, so there is someway that task manager interacts with the gpu driver to get it's status that causes a crash.

<br />

I checked Lenovo's website again for a driver. I found 25.21.14.2591 (where 24.21.13.9836 is currently installed). Newer version, let's install that. A reboot later, and.. it is working as expected!

Seeing as the Driver on Lenovo's website worked, we're done. But if that did not work, there are a few things we could do.

<br />

**Conclusions**

We have narrowed it down to being a graphics driver issue. Testing several driver versions had no change, but using the Lenovo driver did.

At this point, if the Lenovo driver did not these would have been our options.

1. Disable the discrete and only use the igpu
2. Never use task manager to view the performance tab
3. Disable task manager from showing the gpu in the performance tab
4. Use an old driver that does not have the gpu performance feature (eg WDDM < 2.0)

For me:
1. An acceptable choice because the software I will be using won't need the performance of the discrete
2. Not great. Seeing as you can get information that is sometimes needed, such as memory consumption.
3. Good choice, but I could not find a way to do so
4. Not ideal: you should avoid using old drivers whenever possible, because of the potential performance/security issues.

<br /><br />

My experience with drivers from the manufacturer in the past, is that they are almost always very out of date. So I went the route of trying the official drivers from the vendor. It looks like Lenovo is good at keeping their drivers up to date though, so thats a big plus in my book.