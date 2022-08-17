---
layout: post
title: "NextCloud LDAP behind IIS Reverse Proxy"
date: 2020-08-08 16:06:00
tags: ["windows server", "iis", "nextcloud", "linux"]
---

EDIT 08-27-2020<br />
The way that this is fixed may be better solved [as seen here]({% post_url 2020-08-25-AdjustIISAuth %})
<br /><br /><br />


[After setting up NextCloud,]({% post_url 2020-08-07-CreatingNextcloudServer %}) I setup the LDAP app, and put a reverse proxy rule in IIS to forward to it.

<br />
Everything worked fine for the webbrowser. But when I tried to connect the iPhone app, I kept getting a 401 error.

<br />
I ended up launching Fiddler, to try to debug it. This first image is the request from the app with it not working, notice the 401 errors? I clicked on the headers view because that is where the error is shown.

![401 errors in fiddler](/assets/images/2020-08-08-NextCloud401iis/1.png)

<br />

And heres a (still non-fixed) working web browser instance. Notice anything different between them?

![Working non fixed in fiddler](/assets/images/2020-08-08-NextCloud401iis/2.png)

<br />

And what actually tipped me off to the issue:

![401 error in fiddler](/assets/images/2020-08-08-NextCloud401iis/3.png)

<br />
Now what tipped me off to the problem: I couldn't get the 401 error in my webbrowser, even by navigating (not logged-in to next cloud either) to that url, /nextcloud/status.php.

Now, if NextCloud was giving me the 401 I would understand, because the proxy is going to be relaying the information to and from that machine. But why was IIS returning a 401 error? And only when using the iPhone app and not a webbrowser?

<br /><br /><br /><br />

The answer in this case had to do with the IIS authentication methods that were enabled. The first picture shows that the browser is receiving a 401 error, is sending a NTLM authentication header, which is NOT what NextCloud is expecting, and IIS is intercepting.

No NTLM authentication is being used, the second picture shows that the webbrowser is sending the authentication parameters in a WebForm. So we need to change IIS authentication to allow for that.

<br />

Head over to the IIS manager that is hosting the reverse proxy for NextCloud.

![Open IIS and go to authentication methods](/assets/images/2020-08-08-NextCloud401iis/4.png)

![Enabled authentication](/assets/images/2020-08-08-NextCloud401iis/5.png)

From here we can see that Basic Authentication and Windows Authentication are enabled, and set to sent a 401 (!!) challenge.

Now, IIS won't let you enable both the Forms 302 authentication with the 401 challenge. I am not using either Basic or Windows in any of my projects, so I disabled those, enabling Forms Authentication in it's place.

<br />

<br />
Depending on your environment, you may need to look into creating a new Application that will host the authentication and reverse proxy.

EDIT 08-27-2020<br />
[Take a look here to see how to do that.]({% post_url 2020-08-25-AdjustIISAuth %})