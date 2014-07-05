---
layout: post
title: 'Test Suites as an Upstart Tool'
author: Dave
published: true
image_hint_url: https://farm4.staticflickr.com/3918/14523520052_dfd7f3618a_b.jpg
description: 'Another view on test-suites and their value in a team'
tags:
- Code
- Testing
- Process
---
<a href="https://www.flickr.com/photos/twenty4at/14523520052/in/set-72157645114467681" title="">
  <img src="https://farm4.staticflickr.com/3918/14523520052_dfd7f3618a_b.jpg" width="320" height="213" alt="" class="header">
</a>

Congrats on your launch.  Your product is awesome.  Everyone wants to use it but
they want features and you launched a really _really_ "M" MVP.  Awesome.  You
stayed focussed, wrote great code, and got it out there but you need horsepower
behind the keyboard to deliver customer value, keep your investors happy, and
grow to be the next awesome four letters on NASDAQ.  So you go to your local
user's group and find a few great talented and diverse developers who are
excited by your product and your team's culture of rapid delivery of
high-quality code.  What can you do to ensure that on day zero they can be
delivering code that works and is (relatively) free of regressions?  The world
may never know...

<!-- -**-END-**- -->

There is currently a great deal of debate about the various merits of testing,
Test-Driven Development and/or Design, isolated unit vs. integration tests, and
any number of other related subjects.  There is no doubt in my mind that testing
is one of the most important things you can do for your development process, for
your customers, and for your team.  There is an additional benefit of having a
clear, fast, and easy to run test-suite that exercises your entire system from
top-to-bottom.  It makes adding new team members easier by allowing them to
immediately add value to the system and know that they haven't broken something.

I have worked with a team who wrote extremely impressive software.  The scale of
the project was impressive in every regard.  The technical feat they
accomplished was staggering and as a side effect they did not expect new
developers to understand it well enough to produce anything of value for a long
time.  By a "long time" I don't mean a couple of days, or a week, but maybe
weeks or a month.

Part of the problem was that testing the system as a whole was actually
difficult.  Some core components had tests, others did not.  Many languages were
in play for very pragmatic (and appropriate) reasons.  The team was under a
great deal of pressure to deliver quickly and as often happens in that
situation, particularly when developers do not come from a culture of testing,
tests were simply never written.

I was able to add value quickly by picking off tiny pieces of functionality,
entirely skipping tests, and getting some code into production at our next
release.  But this was not the win the team thought it was.  Future "small"
features introduced regressions and outright bugs.  Other bugs that came up were
easy to blame on changes made by the new guy because they were in the same
module when in fact they were long-extant bugs that had never been revealed
until a user wanted to try the new feature.

What can we learn from this song of gloom and software doom?  What would have
allowed a new developer, or a person who has mostly worked on one or two
components, to contribute freely anywhere in the project?  A comprehensive
unit-test suite for each component is a great start, and is often overlooked in
a team's process.

Consider the situation where a core back-end component requires a modification.
This is radically different than bolting entirely new functionality to an
application.  In the latter case there are few interactions within the system to
consider, but rather how to expose the new feature to users.  In the case of
core components there is very often a complicated interaction between that
component and other components both on the front and back-end.  Those
interactions are likely well understood by the original author, and maybe even
other team members, but are tribal knowledge.

Tribal knowledge itself is not a bad thing but codifying it in a way which can
be easily assimilated by new members of the tribe is key.  GitHub pages, wikis,
and other documentation have their value but it is extremely easy to not read,
let them get out of date, and simply be ignored.  Test suites serve the tribe in
a number of ways:

* They codify the team's understanding of the functionality of the system.
* They allow new team-members to understand the existing functionality of the
  system and serve as documentation in their native tongue - code.
* They prevent new and old members of the team from violating the contract
  components of the system have with other components even before they fully
  understand the entire system.
* They allow autonomous systems such as CI to verify that no new code violates
  those contracts (and may be able to do it at a much higher level than
  developers are willing to deal with locally such as targeting various versions
  of the underlying language).
* They allow Quality Assurance teams to codify their findings and contribute
  back to the understanding of the system under test

Taking the time to flesh out your tribe's knowledge about the system up front,
or as early as is possible, will pay dividends as you hire.  Your new
team-members will feel confident in their contributions and empowered to work
where they can provide the most value without fear.  This is particularly
valuable when one of your original core members is out for their first vacation
in years, or have their first-born, or are just exhausted and need a day off.
The newer members of the team will happily step up without wanting to call their
cells when things break horribly.

How does your team prepare to bring on new team-members and make them productive
on day zero?
