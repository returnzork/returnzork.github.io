---
layout: post
title: "Analyzing BSOD"
date: 2021-01-25 15:10:00 -0700
---

So I recently purchased a Lenovo ThinkPad W530 laptop from a thrift store. It has an Intel Core i7-3610QM, 8GB ram, a 300GB hdd, and a discrete NVidia Quadro k1000m.

<br />

After wiping the harddrive, and installing Windows 10 20h2 fresh onto it, I keep getting the dreaded Blue Screen of Death on it, this one being 0x3B SYSTEM_SERVICE_EXCEPTION.

Being a brand new install of Windows, there could be a few different issues with it - but this is most likely caused by a driver not being fully compatible. Seeing as it crashes right after login (barely able to even open task manager), we will have to look at the minidump to see if we can find the root cause.

<br />

As I won't be able to look at the minidump on the system itself, I took out the harddrive, and moved it to another system for analysis. The minidump is stored at: driveletter:\windows\minidump. After granting permissions to access that folder, I copied them to a working folder on the analysis computer.

There are a few ways that you can analyze these minidumps, what I always do is start by looking them over in 3rd party software by [NirSoft](https://www.nirsoft.net/) called [Blue Screen View,](https://www.nirsoft.net/utils/blue_screen_view.html) and if I cannot determine a probable cause from there, in [Microsoft WinDBG.](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/debugger-download-tools)

<br /><br />

After opening Blue Screen View, we (hopefully) don't have any minidumps listed (as it is currently displaying minidumps from the analysis computer). So we need to adjust the location to load the minidumps from to our working folder. We do that under Options > Advanced Options.

![Main Blue Screen View Window](/assets/images/2021-01-25-BlueScreen/1.png)
![Advanced Options to adjust minidump folder](/assets/images/2021-01-25-BlueScreen/2.png)

After we close that window, we will the correct minidumps loaded.

![Minidump view](/assets/images/2021-01-25-BlueScreen/3.png)

There are several columns to see, the ones that we care about are: Dump File, Crash Time, Bug Check String/Bug Check Code, and Caused By Driver.

We need to find the most recent one to analyze, so I choose the one at 1/25/2021 3:01:07 PM. Going down that row, we take a look at the Caused By Driver column, which we see is "ntoskrnl.exe". Unfortunately for us, that does not give us very much information, seeing as it was a crash that happened inside of Windows itself, instead of an externally loaded module.

![Loaded area](/assets/images/2021-01-25-BlueScreen/4.png)

We can look at the bottom set of information to see the call stack of the crash. But we will move on to WinDBG to see if we can get some better information.

<br /><br />

Note: I am no expert at using WinDBG, there are a whole bunch of features that I have never used. This software is able to be used to debug applications, just like you would with IDE software such as Visual Studio. I have only ever used it to analyze minidumps though.
<br /><br />

![Empty Win Debug screen](/assets/images/2021-01-25-BlueScreen/5.png)

After we launch WinDBG, we will have a very blank screen. We need to open up our minidump. We do that with File > Open Crash Dump.

Now that the minidump is loaded, we get more stuff on the screen.

![Loaded crash dump screen](/assets/images/2021-01-25-BlueScreen/6.png)

The window shows some basic information about the machine that crashed. We can see it is Windows 10 version 19041, with 8 processor cores, running the 64 bit version of Windows.

Going down the window to the bottom, we can see a command line to use, starting with kd>

We're going to type: "!analyze -v" (or we can click the highlighted !analyze -v from the information screen). After we let that run, we will have more information to look at.

![Crash dump analyze page 1](/assets/images/2021-01-25-BlueScreen/7.png)
![Crash dump analyze page 2](/assets/images/2021-01-25-BlueScreen/8.png)

So let's take a look at the information. 
<br />

We can see once again that we have a SYSTEM_SERVICE EXCEPTION which is blue screen 0x3b.<br />
And there is more information about the various information about the crash, such as what kind of error actually occured which caused it. We aren't looking so much for why it happened (like if we were trying to fix our own driver that it happened in), but more how can we resolve the issue.

If we scroll down to the end, it will give us the information we need (as shown in picture #2).

We can see that the crash was caused inside of Taskmgr.exe (as shown where PROCESS_NAME is), and a little bit further down we see the root cause we need to fix.

MODULE_NAME: dxgkrnl and IMAGE_NAME: dxgkrnl.sys
<br />

So there is some issue with with the dxgkrnl.sys, which happens to be the Direct X graphics kernel module.

<br />
This makes sense, as it is a brand new install of Windows 10, it is using the generic drivers that are included. As this laptop has a feature known as "Nvidia Optimus" which allows using both the Intel HD Graphics 4000 chip as well as the Nvidia Quadro k1000m.
<br />
So now that we know that there is an issue with the graphics driver the question is, how do we fix it? (How to fix it soon!)