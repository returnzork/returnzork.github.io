---
layout: post
title: "Migrating TFS 2017 to DevOps 2019"
tags: ["windows server", "team foundation server"]
---

So I have an existing Team Foundation Server (2017) running in my network (which I use quite a bit more than github..) that I will be migrating to a new machine.

At the same time, it would probably be beneficial to migrate to the latest version, which was renamed to Azure DevOps Server. So we will do that as well.

[Microsoft has documentation of how to upgrade which we will be referencing.](https://docs.microsoft.com/en-us/azure/devops/server/upgrade/get-started)

<br />
Prerequisites
<br />
-----------------

Existing TFS (2017) setup,

Backups (you have backups right?)


<br /><br />
Getting Started
<br />
--------------------

Start by downloading, and then installing Devops Server (I am using version 2019, which is the currently the latest version).

After install (and rebooting the server), the configuration wizard will open. If it didn't launch automatically, check your start menu.

![DevOps Server configuration wizard](/assets/images/2020-07-14-UpgradingTFS/1.png)

Here we will click start wizard and start going through the prompts.

<br /><br />
![DevOps Server configuration wizard page 1](/assets/images/2020-07-14-UpgradingTFS/2.png)

First page will give basic information, and ask if you want to participate in the improvement program.

![DevOps Server configuration wizard page 2](/assets/images/2020-07-14-UpgradingTFS/3.png)

The next page is where our configuration starts. We need to select that we have an existing database we will be using.

![DevOps Server configuration wizard page 3 choose old sql database](/assets/images/2020-07-14-UpgradingTFS/4.png)

From here we will need to point to our old TFS server, and then select List Available Databases.

![DevOps Server configuration wizard page 3 choose old sql database more info](/assets/images/2020-07-14-UpgradingTFS/5.png)

Now we after our old database is listed, we can continue. Make sure you have backups! This page now has a link to create a backup of the database in case something goes wrong.

<br /><br />
After our backup is finished, click to go to then next page.

![DevOps Server configuration wizard page 4 Choose deployment type](/assets/images/2020-07-14-UpgradingTFS/6.png)

Choose the deployment type, either Production or pre-production upgrade testing.

![DevOps Server configuration wizard page 5 Create service account](/assets/images/2020-07-14-UpgradingTFS/7.png)

Next, choose the account that the DevOps server will use.

![DevOps Server configuration wizard page 6 Choose web site settings](/assets/images/2020-07-14-UpgradingTFS/8.png)

On the next page, choose if you want to enable search or not

![DevOps Server configuration wizard page 7 enable search](/assets/images/2020-07-14-UpgradingTFS/9.png)

And finally, configure if you want to enable reporting.

![DevOps Server configuration Enable reporting](/assets/images/2020-07-14-UpgradingTFS/10.png)

Now that we have finished choosing all of our configuration options, we move on to the review page. Go through all the config options, and make sure they match what your environment needs.

Once you have verified the configuration is correct, click on Verify to have the DevOps server verify it's configuration.

![DevOps Server verification success](/assets/images/2020-07-14-UpgradingTFS/11.png)

If there are any issues, go back and fix them, until there are no issues remaining.

<br />
Click Configure. After a bit of time, the configuration will finish.

![DevOps Server upgrade success](/assets/images/2020-07-14-UpgradingTFS/12.png)

![DevOps Server project upgrade progress](/assets/images/2020-07-14-UpgradingTFS/13.png)

On the last page, you will see an over information page about the upgrade, including the new DevOps server address you will point to. Depending on how you have your dns set, you could update the CNAME that pointed to the old server, to instead point to the new server.
![DevOps Server upgrade finished](/assets/images/2020-07-14-UpgradingTFS/14.png)


<br /><br /><br />
Note, the old and new server still must co-exist because the SQL server is still stored on the old server.
<br /><br />
[You can find the next post detailing how to migrate that SQL database to a new server here]({% post_url 2020-07-14-MigrateTFSDatabase %})