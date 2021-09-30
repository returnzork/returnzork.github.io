---
layout: post
title: "Setting up SSH public private keys to login"
date: 2020-09-03 14:55:00
lastmod: 2021-09-30 00:20:00 -0700
tags: ["linux"]
---

In my environment, I have a few different Ubuntu Server's running, and I connect to each of them through SSH to them on Windows Subsystem for Linux.

Now, each time I log into these servers, I have to provide my credentials to connect. This is all fine, but what if we were able to use a certificate to authenticate instead?

Enter the SSH public/private key pair.

To start, we need to generate these on our host machine that we are connecting from.

There's a couple different ways to generate the keys, [over on the Ubuntu website we can see those methods.](https://ubuntu.com/tutorials/ssh-keygen-on-windows)

I will using "Key generation with Ubuntu on WSL".

<br />
In our WSL window, we will need to run the ```ssh-keygen``` command. There are a quite a few different ways you can customize the resulting key pair, but for this post we will be using the default parameters.

So after we run the ```ssh-keygen``` command, it will prompt us for a location to save the pair. In most cases, the default ~/.ssh/id_rsa will be sufficient.<br />
It will also ask us for a passphrase to use for this pair. The passphrase will allow us to secure our ssh key pair, but will also require us to type it in when we use it. You are able to specify no passphrase.

Now that we have the public and private keypair, we need to upload the public key to our servers.

Theres a few ways to do this, the easiest will be using either ```scp``` to upload it, or ```ssh-copy-id``` which will as well.

We will use the ```ssh-copy-id``` command.

It requires just one parameter for this command, which is the remote host that we are uploading it to, in our case user@192.168.x.x, so run ```ssh-copy-id username@192.168.x.x```

After we log into the remote system, the public key will be automatically transfered over. Now when we log into that system with ssh, we will no longer have to provide our login credentials, as they are being authenticated using the public/private key pair we generated.