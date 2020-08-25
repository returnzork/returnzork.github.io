---
layout: post
title: "Adjusting IIS to allow both Windows Authentication and Form Authentication"
date: 2020-08-25 14:40:00
---

[As per the previous article on NextCloud behind an IIS reverse proxy,](/2020/08/08/NextCloud401iis.html) we found that we were getting a 401 error when using the iOS application.

The way we fixed it was to disable both the Windows and Basic authentication in IIS. Now while that does work, what if are actively using those authentication methods? Form authentication is incompatible when either of those are enabled.

<br />

There is a way to use Form auth for NextCloud, while still allowing Windows and Basic authentication for other services.

In order to accomplish this, we need to create an Application in IIS.

Start by opening up the IIS manager, and navigating to the site with the reverse proxy setup. We will right click and Add Application.

![Add new application to the reverse proxy](/assets/images/2020-08-25-AdjustIISAuth/1.png)

I have the reverse proxy set to use mydomain/Nextcloud, so I will match the Alias with that url. For physical path, you will need to put a location to be used. I created an empty directory on the root of the harddrive named NextCloudProxy. No data will need to be stored there.

![Set the application properties](/assets/images/2020-08-25-AdjustIISAuth/2.png)

Next select the newly created application, and go to the Authentication properties

![Open the Authentication properties on the new Application](/assets/images/2020-08-25-AdjustIISAuth/3.png)

From here, make sure to Disable both Basic Authentication and Windows Authentication, and also Enable the Forms Authenticaiton

![Enable Forms auth, and disable windows and basic authentication](/assets/images/2020-08-25-AdjustIISAuth/4.png)

After this, go to the main authentication panel for the website, and disable Forms authentication, and enable the other authentication that your environment requires.

<br />

Test your changes by launching the iOS app, and it should function as expected.