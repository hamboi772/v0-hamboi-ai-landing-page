import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import gfm from "remark-gfm"
import { cache } from "react"

const articlesDirectory = path.join(process.cwd(), "content/articles")

export interface MarkdownArticle {
  slug: string
  title: string
  description: string
  author: {
    name: string
    role: string
    school: string
    image?: string
    bio?: string
  }
  category: string
  readTime: string
  publishedDate: string
  date: string // ISO date for sorting
  featured?: boolean
  contentHtml?: string
}

export const getMarkdownArticleBySlug = cache(async (slug: string): Promise<MarkdownArticle | null> => {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) return null

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const processedContent = await remark()
      .use(gfm)
      .use(html)
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      contentHtml,
      title: data.title,
      description: data.description,
      author: data.author,
      category: data.category,
      readTime: data.readTime,
      publishedDate: data.publishedDate,
      date: data.date || "2026-05-09", // Default to task date if missing
      featured: data.featured || false,
    }
  } catch (error) {
    console.error(`Error reading markdown article ${slug}:`, error)
    return null
  }
})

export const getAllMarkdownArticles = cache((): MarkdownArticle[] => {
  try {
    if (!fs.existsSync(articlesDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(articlesDirectory)
    const allArticlesData = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "")
        const fullPath = path.join(articlesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data } = matter(fileContents)

        return {
          slug,
          title: data.title,
          description: data.description,
          author: data.author,
          category: data.category,
          readTime: data.readTime,
          publishedDate: data.publishedDate,
          date: data.date || "2026-05-09",
          featured: data.featured || false,
        }
      })

    // Sort articles by date descending
    return allArticlesData.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
  } catch (error) {
    console.error("Error reading markdown articles:", error)
    return []
  }
})
