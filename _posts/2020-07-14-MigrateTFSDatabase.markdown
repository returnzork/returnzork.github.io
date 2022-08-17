---
layout: post
title: "Migrate existing TFS (DevOps) database to new server"
tags: ["windows server", "team foundation server"]
---

[As mentioned at the end of the previous entry,]({% post_url 2020-07-14-UpgradingTFS %}) the new DevOps server requires the old one to be online because that is where the SQL database is stored.

Now, if we will be keeping SQL on that server, we do not have to change anything, and we can continue with our environment as is. But, if we want it to be self contained (SQL database stored on the DevOps server), we will need to migrate that over as well.
<br /><br /><br />

We need to start by installing an SQL server to host the database. I will be installing SQL Express 2019. We will also need SQL Server Management Studio 18.

After installing those, we can get started migrating the database over.

<br /><br />
We'll start by exporting the database from TFS, so launch the Azure Devops Server Administration Console.

First we need to stop the existing collection so we can create a good backup. Give a reason in the window that pops up.

![Stop the Project collections](/assets/images/2020-07-14-MigrateTFSDatabase/1.png)

Next head over to Scheduled Backups area, and choose Create Scheduled Backups.

![Scheduled Backups](/assets/images/2020-07-14-MigrateTFSDatabase/2.png)

Go through the prompts, choosing a location to save the backups, selecting that we will only be doing manual backups (or setup an automated schedule!)

![Schedule backups options](/assets/images/2020-07-14-MigrateTFSDatabase/3.png)
![Schedule backups options](/assets/images/2020-07-14-MigrateTFSDatabase/4.png)

Verify that the configuration is correct

![Verify options](/assets/images/2020-07-14-MigrateTFSDatabase/5.png)

Next actually create the backup

![Create backup](/assets/images/2020-07-14-MigrateTFSDatabase/6.png)

<br /><br />
<<NOTE>>
<br />
I initially tried using an admin share (C$\sharename) but kept getting tf400983 Access to path denied. Even after adjusting permissions on that directory. Switching that to a standard share worked fine
<br /><br /><br />

Once the backup finishes, we move onto importing the database on the new server.

![Backup success](/assets/images/2020-07-14-MigrateTFSDatabase/7.png)

Now we will click on Restore Backups

Change the backup to match the latest one we created (you may need to click List Backups first)

![Restore backups](/assets/images/2020-07-14-MigrateTFSDatabase/8.png)

Next we will change the SQL Server Instance to be our new server

![Change server instance to new server](/assets/images/2020-07-14-MigrateTFSDatabase/9.png)

Verify everything is correct, and then continue.

![Verify all options](/assets/images/2020-07-14-MigrateTFSDatabase/10.png)

Everything should have succeeded, if not go back and fix it until it does

![Everything succeeded](/assets/images/2020-07-14-MigrateTFSDatabase/11.png)

Now for the slightly more difficult part. I couldn't find any easy way to change the application tier to point to the new database, but [there was a post on Stack Overflow that shows how we can do it from the command line.](https://stackoverflow.com/questions/20510381/change-tfs-2013-database-tier-name)

Navigate to the installation directory of Azure DevOps, and run the tfsconfig.exe command.

![tfsconfig.exe command](/assets/images/2020-07-14-MigrateTFSDatabase/12.png)

Look through the documentation that is provided until you feel comfortable with these commands.

We need to use the [RegisterDB](https://docs.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2013/ms252443(v=vs.120)) command

![Registerdb command](/assets/images/2020-07-14-MigrateTFSDatabase/13.png)

After running that command, if we return to the DevOps management console, we can see that the SQL server has been updated. Now we start the instance again, and we are good to go.

![success in changing SQL source](/assets/images/2020-07-14-MigrateTFSDatabase/14.png)

<br /><br /><br /><br />

<<Notes>>
<br />
1. I had issues getting the database to backup from the management console because of the network share, try using a new (non admin) share if you have issues
<br />
2. For SQL Express, remember you may need to put SQLEXPRESS in the connection name instead of just the machine name
<br />
3. Did you catch that each of the images the backup creation have different paths? Going back to note 1, the one I ended up using successfully was \\MachineName\Backups - I created a Directory on my C: drive and shared it as backups
<br />
	The backup wizard did not like trying to use a local only address (127.0.0.1) and required the use of a machine name