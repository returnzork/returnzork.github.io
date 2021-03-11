---
layout: post
title: "Creating 2016 Nano VM"
tags: ["windows server"]
---

Today we will be installing a Windows Server 2016 Nano Virtual Machine.

Start by looking inside of your installation media, and you should see a folder named NanoServer. We'll start by extracting that to a working directory (I used F:\NanoServer\). Inside you'll find a readme which links to a Microsoft page describing what nano server is about.


<br /><br />

After we have read through the documentation, we'll open up powershell, and import the cmdlets.

Import-Module .\NanoServerImageGenerator

Now we will create a working directory for the temp files to be used, this I made F:\NanoServer\Temp\. Now we can run New-NanoServerImage and choose the parameters required for our deployment.


The command I ended up using is:

New-NanoServerImage -DeploymentType guest -Edition Datacenter -MediaPath F:\ -BasePath .\Temp\ -TargetPath .\NanoServer.vhdx -ComputerName NanoServer

Note that you will need to change -DeploymentType to match if you are going to be using this Nano image on a physical or guest machine, as well as changing the -Edition to be either Standard or Datacenter as required in your environment.

After that command is run, we are nearly finished. Launch Hyper-V Manager, and create a new VM, pointing the boot disk to the newly created NanoServer.vhdx file.

Once we launch the virtual machine, we will come to the nano server management console.

<br /><br /><br />

Further reading on the microsoft docs page provided in the readme file will be of assistance for you, as the management console has very few configuration features you will need, such as installing the various server roles, or domain joining.

<br />

Note that there are quite a few less roles that are supported on nano server vs a full installation of Windows Server, either full gui, or core. The tradeoff being a lower memory and disk footprint.