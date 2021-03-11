---
layout: post
title: "Creating secondary domain controller with Windows Server 2016 Server Core"
tags: ["homelab", "domain", "Windows Server"]
---

Today, while changing a harddrive in my domain controller, I came across an issue my network has: as theres only one domain controller, while at my workstation, I was no longer able to RDP into the other server!

So we'll change that, by adding a second domain controller to my network. This one will be setup as a virtual machine with a 2016 Server Core instance.

The primary - currently the only - domain controller is running on Windows Server 2012R2, on a physical machine.

Make sure that your domain controller is running!


Start by installing the server as normal (I installed it with [WDS and PXE boot](/2020/07/02/WindowsDeploymentServer.html)) and then join the domain.

Next, add our new server to server manager so we can configure it, and then install the Active Directory Domain Services role. Once that is installed, you will need to run the "Promote This Server To A Domain Controller" wizard.

![Promote to Domain Controller](/assets/images/2020-07-06-SecondDomain/1.png)

You will want to choose "Add a domain controller to an existing Domain" and provide the credentials to do so.


On the next page, you will be given options on how you want to configure the domain controller. Configure those options, and then type in a Directory Service Restore Mode password.

As I already have 2 DNS servers setup, I will not be configuring this domain controller with DNS, so I unchecked it.

![Choose domain options](/assets/images/2020-07-06-SecondDomain/2.png)

Next page will have you specify where to replicate, I will be choosing my existing domain controller.

![Choose where to replicate from](/assets/images/2020-07-06-SecondDomain/3.png)


The next page will have you set where the active directory shares will be set, I left those as default. After all of that configuration, we can continue and finally click install at the end of the next couple of pages.


And following the reboot of the VM, you have configured a secondary domain controller on your network!





<br /><br /><br /><br />Note:<br /><br />
I tested to make sure it was working properly by disconnecting the primary domain from the network, and checking that my RDP connection was still secured using kerberos. It did not work initially, but after updating the group policy and flushing the dns on my workstation, I was able to connect without the primary domain controller being online.