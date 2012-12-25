desc "Generate new blog post, pass options title='Your Title' author='dave'"
task :new do
  title = ENV["title"] || "New Title"
  author = ENV["author"] || "Dave"
  slug = title.gsub(' ','-').downcase

  filename = "#{Time.now.strftime('%Y-%m-%d')}-#{slug}.markdown"

  path = File.join('_posts', filename)
  post = <<-HEAD
---
layout: post
title: '#{title}'
author: #{author}
published: false
image_hint_url: http://full/path/to/image/for/hinting/social/media/scrapers.png
description: 'Description for social media'
categories:
- Technical
- Coffee
tags:
- ROWE
- Ruby
- Ruby On Rails
- Open Source
- Iterative Development
- Keeping It Simple
- Community
- Code
- Awesome
- Howto
- Speaking
- Presentations
---

Put an image, float it right. (CSS defaults it). Ensure there is an
image_hint_url above, too.  Try to find a Creative Commons licensed image from
<http://www.flickr.com/creativecommons>.  Avoid any licensed as NonCommercial.

Please attribute images correctly; for instance, with a link at the
end of the blog post: `Image credit: [powi](http://www.flickr.com/photos/powi/634556562/)`

Pick one or two categories (or add your own!) above.

Put your "preview" content here.

<!-- -**-END-**- -->

Add More "extended" content here.

The meat of the post goes here.

To embed a gist in the post, rather than using the "embed all files" provided
script tag simply use the liquid gist tag via `{% gist <gist number> [optional filename] %}`

HEAD

  File.open(path, 'w') do |file|
    file.puts post
  end

  puts "new post generated in #{path}"
end

