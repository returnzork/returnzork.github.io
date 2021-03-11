---
layout: post
title: "Setting up WDS for pxe install"
tags: ["homelab", "pxe", "wds", "windows server"]
---

Setting up and using Windows Deployment Services

You're going to need to have a Windows Server installed, I will be using 2016.


First you will need to install the WDS role in the server manager, making sure to also install the Deployment and Transport server.
![Install WDS](/assets/images/2020-07-02-WindowsDeploymentServer/1.png)
![Select Deployment and Transport server](/assets/images/2020-07-02-WindowsDeploymentServer/2.png)

After WDS is installed, you will need to launch the snap-in to configure it. Launch that from the Windows Administrative Tools.

Next we will need to configure WDS. Start by right clicking your server name in the left column, and then selecting Configure Server.
![Configure Server](/assets/images/2020-07-02-WindowsDeploymentServer/4.png)
From here, there will be several prompts asking how you want to configure the server.
The first being if you want to integrate with your Active Directory. I will be, so I select that toggle.
![How to integrate with environment](/assets/images/2020-07-02-WindowsDeploymentServer/5.png)

Now it will ask where you want all of the WDS information to be stored
![WDS store location](/assets/images/2020-07-02-WindowsDeploymentServer/6.png)

And finally it will ask what clients you want the WDS server to respond to: No clients, Only known Clients, or All Clients.

![Access](/assets/images/2020-07-02-WindowsDeploymentServer/7.png)

Now we can configure WDS to have images to send to the client.
Start by right clicking Boot Images in the left column, and selecting Add Boot Image

![Add boot image](/assets/images/2020-07-02-WindowsDeploymentServer/9.png)

It will ask you for a boot.wim, these are located inside of your boot material (iso or install disc), inside of the Sources directory.

![Select boot.wim](/assets/images/2020-07-02-WindowsDeploymentServer/10.png)

Click Next, and give it an image name and description.
![Give boot.wim a name](/assets/images/2020-07-02-WindowsDeploymentServer/11.png)

Now we can add our installation media.
Right click Install Images, and click Add Install Image. Because we do not have an image group created yet, we will need to create that first.
![Create image group](/assets/images/2020-07-02-WindowsDeploymentServer/14.png)

After the image group is created, we can add our install.wim file that is also located in the Sources directory.

![Add install.wim](/assets/images/2020-07-02-WindowsDeploymentServer/13.png)

Now choose which versions of Windows we want to include from that WIM file (such as the 32 bit and 64 bit versions)

![Choose which Windows versions](/assets/images/2020-07-02-WindowsDeploymentServer/15.png)

Now we can test if the PXE boot works.
Launch a Hyper-V VM, and let it boot from the network. If successfull, you should come to a WDS boot manager screen.
![WDS boot manager](/assets/images/2020-07-02-WindowsDeploymentServer/17.png)

Booting from there will launch you into the Windows Setup Preinstall Environment where you can install Windows.
![Windows PE](/assets/images/2020-07-02-WindowsDeploymentServer/18.png)