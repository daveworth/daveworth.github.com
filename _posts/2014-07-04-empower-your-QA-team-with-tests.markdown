---
layout: post
title: 'Empower your QA Team with Tests!'
author: Dave
published: true
image_hint_url: http://i.imgur.com/KW5CoKd.jpg
description: 'On creating a culture of DevQA to ensure our QA team is as awesome as possible'
tags:
- Code
- Testing
- Process
---

<a href="http://i.imgur.com/c08VstC.jpg" title="Dear Developer... Fix. The. Bug!!">
  <img src="http://i.imgur.com/c08VstC.jpg" width="200" height="200" alt="Dear Developer... Fix. The. Bug!!" class="header">
</a>

I have worked with a number of QA teams, usually internal teams in product
organizations.  I have also been lucky to work with some of the most talented
and detail oriented people I have ever met on those teams.  Of note one QA
person made great short screencasts of bugs showing all of the recreation steps,
which even included a voice over of the steps as they occur and included
annotations.  These were attached to bugs in our project tracker which were
assigned to me.  From those awesome and comprehensive screencasts I was able to
make a failing acceptance test followed by some failing unit-tests (once the bug
had been triaged), and I made them all pass in order to fix the bug.  The
question remains, we had an awesome and technical person finding bugs in my
code, yet I was writing the tests.  How awesome would it have been if the
discoverer could have written the failing acceptance test?

<!-- -**-END-**- -->

Why are QA teams, who are so focussed on getting finding and eliminating bugs,
not contributing back to our test-suite directly?

Are our testing-languages too opaque?  Behavior Driven Development testing
frameworks such as [RSpec](https://relishapp.com/rspec), [Jasmine](http://jasmine.github.io/),
[Gikgo](http://pivotallabs.com/announcing-ginkgo-and-gomega-bdd-style-testing-for-golang/)
strive to make human-readable tests.  Going even further are tools such as
[Cucumber](http://cukes.info/), [Spinach](https://github.com/codegram/spinach),
and [Turnip](https://github.com/jnicklas/turnip) in the Ruby world which produce
nice looking examples that a QA team could certainly write.  Without knowing too
much about development in the large our QA folks could certainly move from
writing 'examples' to writing 'steps' as well.  The tools may be somewhat opaque
but they are certainly tractable.

Are we hiring non-developers who are not interesting in programming?  Why do
think only "developers" can program?  There is a greater and greater interest in
"softer"-skilled developers as evidenced by the rapid growth of Digital
Humanities as a discipline.  Our QA folks already show the interest in
understanding the business domain.  There is already a focus on automating those
test suites in systems like Selenium.  Let's empower them to learn enough code
to write tests that fail which developers can make pass. Just as "DevOps"
combines programming and operations skills to reduce the distance between the
two disciplines maybe we need "DevQA" in order to maximally empower our QA
teams.  I think what we really want to make sure our QA teams get to click less
in the future in order to make sure that regression stays gone.

What else can we do to help our QA teams help us and reduce the overhead of
fixing bugs and making sure they stay squashed?
