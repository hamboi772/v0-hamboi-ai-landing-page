import Image from "next/image"
import { User, BookOpen, Calendar, Clock } from "lucide-react"
import { ArticleShareButton } from "@/components/article-share-button"

interface Author {
  name: string
  role: string
  school: string
  image?: string
  bio?: string
}

interface ArticleContentProps {
  title: string
  description: string
  category: string
  publishedDate: string
  readTime: string
  author: Author
  contentHtml?: string
  content?: any[] // For legacy static articles
}

export function ArticleContent({
  title,
  description,
  category,
  publishedDate,
  readTime,
  author,
  contentHtml,
  content,
}: ArticleContentProps) {
  return (
    <article className="max-w-3xl mx-auto">
      <div className="bg-hamboi-dark-card border-2 border-hamboi-purple/40 rounded-3xl shadow-xl shadow-hamboi-purple/20 p-8 md:p-12">
        <div className="prose prose-invert prose-lg max-w-none text-hamboi-text-muted leading-relaxed">
          {contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          ) : (
            content?.map((section, index) => {
              switch (section.type) {
                case "heading":
                  return (
                    <h2 key={index} className="text-2xl font-bold text-white mt-12 mb-6 first:mt-0">
                      {section.text}
                    </h2>
                  )
                case "paragraph":
                  return (
                    <p key={index} className="text-hamboi-text-muted leading-relaxed mb-6">
                      {section.text}
                    </p>
                  )
                case "quote":
                  return (
                    <div key={index} className="bg-hamboi-purple/20 rounded-2xl p-6 my-10 border-l-4 border-hamboi-purple">
                      <p className="text-white font-bold italic text-xl leading-relaxed">{section.text}</p>
                    </div>
                  )
                case "list":
                  return (
                    <ul key={index} className="space-y-3 my-6">
                      {section.items?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-hamboi-green rounded-full mt-2 flex-shrink-0" />
                          <span className="text-hamboi-text-muted">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )
                default:
                  return null
              }
            })
          )}
        </div>

        {/* Author Box */}
        <div className="mt-12 pt-8 border-t border-hamboi-purple/40">
          <h3 className="text-sm font-bold text-hamboi-text-muted uppercase tracking-wide mb-6">About the Author</h3>
          <div className="bg-gradient-to-br from-[#2a2640] to-[#1E1B2E] border border-hamboi-purple/40 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {author.image ? (
                <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-hamboi-purple/40 ring-offset-2 ring-offset-hamboi-dark-card flex-shrink-0 shadow-lg">
                  <Image src={author.image} alt={author.name} width={96} height={96} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-hamboi-purple/30 flex items-center justify-center flex-shrink-0">
                  <User className="w-10 h-10 text-hamboi-green" />
                </div>
              )}
              <div className="text-center sm:text-left">
                <p className="font-bold text-white text-xl">{author.name}</p>
                <p className="text-hamboi-green font-bold text-sm mt-0.5">{author.role}, {author.school}</p>
                <p className="text-hamboi-text-muted text-sm mt-3 leading-relaxed">
                  {author.bio || `A passionate student voice contributing to mental health awareness through Hamboi Mindcare.`}
                </p>
                <span className="inline-flex items-center gap-1.5 bg-hamboi-purple/30 border border-hamboi-purple/50 text-hamboi-green px-3 py-1.5 rounded-full text-xs font-bold mt-4">
                  <BookOpen className="w-3.5 h-3.5" />
                  Student Contributor
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-8 pt-8 border-t border-hamboi-purple/40">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-hamboi-text-muted text-sm">Found this helpful? Share it with a friend.</p>
            <ArticleShareButton title={title} description={description} />
          </div>
        </div>
      </div>
    </article>
  )
}
