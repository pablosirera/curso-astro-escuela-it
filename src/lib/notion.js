import { Client } from "@notionhq/client";
import { NotionToMarkdown } from 'notion-to-md'

const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getNews() {
  const databaseId = import.meta.env.NOTION_DATABASE_ID
  const { results } = await notion.databases.query({
    database_id: databaseId
  })

  return results.map(page => {
    return {
      id: page.id,
      slug: page.properties.Slug.rich_text[0].plain_text,
      title: page.properties.Title.title[0].plain_text,
      description: page.properties.Description.rich_text[0].plain_text,
      author: page.properties.Author.people[0].name,
    }
  })
}

export async function getNewBySlug(slug) {
  const allNews = await getNews()

  const currentNew = allNews.find(page => page.slug === slug)

  const blocks = await n2m.pageToMarkdown(currentNew.id)
  const blocksString = n2m.toMarkdownString(blocks)

  return {
    ...currentNew,
    content: blocksString.parent
  }
}