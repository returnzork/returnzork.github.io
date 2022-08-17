---
layout: post
title: "Windows Server backup and ReFS"
date: 2021-09-05 15:05:00 -0700
tags: ["windows server", "storage", "backups"]
---

[As mentioned in my previous post,]({% post_url 2021-09-02-CheckYourBackups %}) I am in the process of working on, and getting my backup solution setup.

I am using Windows Storage Spaces, combined with Windows Server Backup for my storage and backup solution.

I have a few different drive letters setup, for main storage, user documents, etc. Several of the volumes are NTFS formatted, but a few are ReFS.

<br />

In the Windows Server Backup, I have it configured to do incremental backups - as much of the data is static and has very little (if any change at all) over very long time periods.

Of all the volumes that are being backuped up, all of the NTFS ones work and do the incremental backup. The ReFS will only do full backups though.

<br /><br />

So after some research, I came across a forum post detailing that ReFS cannot do incremental backups. [You can find that thread here.](https://social.technet.microsoft.com/Forums/windows/en-US/78dcb5ba-5b68-4d35-be0d-bd64d768be8a/windows-server-backup-incremental-backup-not-working)

<br />

So it looks like everything will need to be copied over to an NTFS formatted volume to be able to use the incremental backups.