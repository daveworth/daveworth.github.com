import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => data.published);
  const sortedPosts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: "Dave Worth's STDOUT",
    description: 'the landing place of my various presentations, papers, and occasional blog posts',
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.id}/`,
    })),
  });
}
