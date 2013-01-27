---
layout: post
title: 'Using mDNS for hybrid web and native iOS app development'
author: Dave
published: false
image_hint_url: http://full/path/to/image/for/hinting/social/media/scrapers.png
description: 'Description for social media'
tags:
- Ruby On Rails
- Keeping It Simple
- Code
- Howto
---
<a href="http://www.flickr.com/photos/rothwerx/2641452698/" title="Network problems by Jeremiah Ro, on Flickr">
  <img src="http://farm4.staticflickr.com/3182/2641452698_d7d6eee15e_m.jpg" width="240" height="160" alt="Network problems" class="header">
</a>

Recently I had to build a teeny tiny iOS native application which was basically
a thin wrapper to a NSWebView which hit a Ruby on Rails application where most
of the heavy lifting was done.  To do this it was convenient to have different
target rails apps in development and production environments.  Moreover, it was
particularly convenient to make my local development environment the target for
the application in the development phase.  In order to avoid hard-coding my own
IP address or hostname into the application, which would mean each developer on
the project would have to override it, I decided to turn to a more flexible
solution leveraging mDNS on OSX.  Read more after the break to find out how!

<!-- -**-END-**- -->

By default, in new iOS projects, XCode provides a `DEBUG` definition which can
be leveraged to setup different configurations in your debug and relase
environments.  For example, if you were running a local rails application that
you would like to hit from the simulator, but on release you'd like to hit the
actual production website you could do something like the following.

```Objective-C
#ifdef DEBUG
#  define kURL @"http://localhost:10001"
#else
#  define kURL @"http://somecoolrailsapp.com"
#endif
```

The above works great if you are only testing using the simulator, but what if
you have to test your native app with some officially licensed iPhone, iPod
Touch, or iPad accessory?  Clearly the app isn't running on `localhost` and
hardcoding your IP or hostname is not flexible for the future... enter mDNS.

mDNS (aka ZeroConf networking aka Bonjour) is super cool and allows things like
all of Apple's cool photo/music/video sharing in your house, for projects like
[Pow](http://pow.cx/) to make your life much easier as a developer, and in
theory should mean we never ever _EVER_ have to run an internal DNS on our home
networks again.  It is even supported under Linux via
[Avahi](http://avahi.org/).  All that said, even with a past life as a network
engineer, getting it working took much longer than I am willing to admit.
Luckily, the win in the end made it worth while!

After reading the
[manpage](https://developer.apple.com/library/mac/#documentation/Darwin/Reference/Manpages/man1/dns-sd.1.html)
and _way_ too much manual/shotgun debugging of various parameters I was able to
convince `dns-sd` to proxy access requests to a given `.local` hostname to my
running Ruby on Rails application.

By executing

    dev$ dns-sd -P myapp _http._tcp . 10001 myapp.local `hostname`

we can then hit our running application from anywhere on our local network by
visiting `http://myapp.local:10001`, including from our native application on an
external iDevice.  To observe this in real-time open another terminal and run
`$dns-sd -B` to watch for all mDNS registrations as the occur.

On most of many projects [Foreman](https://github.com/ddollar/foreman) is to
manage the services we need to launch so naturally I wanted it to do this heavy
lifting for me too.  Foreman provides the `$PORT` variable which you set by
passing the `-p <PORT>` Surprisingly repeated uses of the variable actually
increment the provided port number so given a `Procfile` containing

    service1: service1 start -p $PORT
    service2: service2 start -p $PORT

and starting services with it via `foreman start -p 1000` produces running services like

    Timestamp service1.1     | start -p 1000
    Timestamp service2.1     | start -p 1001

This was a bit surprising for me! So, instead of using the default `$PORT`
"variable" we can fall back to using Foreman's `.env` file and specify a port to
launch on that is used consistently across many services in our project.  I
realize this is a rare use case as generally `$PORT` specifies which port a
service should bind to, and rarely would two attempt to bind the same port.

Foreman allows for automatically creating environment variables by updating a
`.env` file. You probably should _not_ commit this file to your git repo but
instead should add to your `.gitignore` and provide a `dotenv.sample` file with
your code for the ease of other developers.  By adding two variables to your
`.env` like the following

    HOSTNAME=<output of `hostname` on the commandline>
    MYAPP_PORT=10001

and updating your Procfile to look (something) like

    web: bundle exec rails server thin -p $MYAPP_PORT
    mdns: dns-sd -P myapp _http._tcp . $MYAPP_PORT myapp.local $HOSTNAME
    worker: some_background_worker
    etc:  # etc...

you can let Foreman help you out in automatically creating this mapping.  You
should definitely practice some good [README Driven Development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html)
and describe to your future self that the `-p <PORT>` flag to Foreman no longer
does what is expected, and note the existence of, and importance of the
`dotenv.sample` file.

```Objective-C
#ifdef DEBUG
#  define kURL @"http://myapp.local:10001"
#else
#  define kURL @"http://somecoolrailsapp.com"
#endif
```

https://developer.apple.com/library/mac/#documentation/Darwin/Reference/Manpages/man1/dns-sd.1.html

This has actually been unexpectedly handy in that our designer is now able to do
responsive design testing on her actual physical devices by hitting the mDNS URL
from them!

Is there an even better way?  Can I make `dns-sd` do the even more correct thing
and somehow, magically, make it such that I don't need to provided the port
number in the URL (I kinda suspect not)?Does this work for Android devices (e.g.
do they listen to multicast advertisements and can you hit `.local` addresses
from their browser)?  Hit me up in
[Issues](https://github.com/daveworth/daveworth.github.com/issues) to let me know!

Image credit: [rothwerx](http://www.flickr.com/photos/rothwerx/2641452698/)
