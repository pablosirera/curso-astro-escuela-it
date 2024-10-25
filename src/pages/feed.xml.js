import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context) {
  const blog = await getCollection('blog')

  return rss({
    title: 'Blog de Techbazar',
    description: 'Descripción de la tienda de Techbazar',
    site: context.site,
    items: blog.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `${context.site}blog/${post.slug}`
    })),
    customData: `<language>es</language>`
  })
}