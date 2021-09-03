---
layout: post
title: "Check Your Backups!"
date: 2021-09-02 20:50:00 -0700
tags: ["windows server", "storage"]
---

Just a reminder to check your backups!

I recently went through and did data recovery on a failed drive, which took approximately 2 months to complete.

And it appears that Windows Server 2016 may have some issues when combining BitLocker with the "new encryption mode" (as of Windows version 1511) encryption mode, where the drive loses its configuration and says that the version is not compatible with this version of Windows.
<br />
So I had to redo my backup drive, setting it up with the "Compatible mode", and having it do an entire backup once again to the drive.

<br />

So check your backups! Because you don't actually have any backups, until you can confirm that you are able to restore from them.