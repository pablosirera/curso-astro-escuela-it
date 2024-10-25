import rss from '@astrojs/rss'
import { getNews } from '../lib/notion'


export async function GET(context) {
  const news = await getNews()

  return rss({
    title: 'Noticias de Techbazar',
    description: 'Bienvenido a las noticias de la tienda de Techbazar',
    site: context.site,
    items: news.map(item => ({
      title: item.title,
      description: item.description,
      pubDate: item.publishDate,
      link: `${context.site}news/${item.slug}`
    })),
    customData: `<language>es</language>`
  })
}