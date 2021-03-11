---
layout: post
title: "Setting up a NextCloud server"
date: 2020-08-07 16:20:00 PM -0700
tags: ["linux", "nextcloud"]
---

**Notes**

This guide does not enable any ssl encryption. You must do this to secure your environment.

<br /><br />

Environment: Ubuntu Server 20.04 running on Hyper-V, docker has already been installed.

<br />

Head over to the [NextCloud website](https://nextcloud.com/install), then click on Downlad Server. Because we will be using docker for the install, on the right sidebar, click on where it says " We recommend using a virtual machine or docker image on Windows Server."

From the new page, click on Get Docker Image. Now we have the docker command that we need to pull the NextCloud image.

<br />

After docker finishes pulling the NextCloud image, we need to start the docker image. On the docker page we had open, if we scroll down we can see the command to do so.

docker run -d -p 8080:80 nextcloud

The -d flag tells docker to run the container in the background, and the -p flag says to expose a given port (in our case 8080) which is then mapped to port 80 on the container.

Now we can [configure it.](https://docs.nextcloud.com/server/19/admin_manual/installation/installation_wizard.html)

<br />

Head over to your webbrowser. We will be using the ip address of our nextcloud container to get to the configuration page. In my case, docker is running on 192.168.1.209, so I will use that as the address, adding port :8080 to the end.

![Configuration page](/assets/images/2020-08-07-CreatingNextcloudServer/1.png)

Give yourself an administration username and password, and then hit Finish Setup.

After it finishes its installation, we will arrive at the web interface and can start using it for our storage.

<br />

It would be recommended to not use the administration account for daily usage, and instead create a new account for use. Click on the gear in the top right, and then click Users.

From here, we can add new users, and groups and configure them how we need to. Click the New User in the top left, and give the new user a username to login with, a display name, and password.