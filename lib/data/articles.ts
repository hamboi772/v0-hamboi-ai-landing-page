export interface Article {
  slug: string
  title: string
  description: string
  author: {
    name: string
    role: string
    school: string
  }
  category: string
  readTime: string
  publishedDate: string
  featured?: boolean
  content: ArticleSection[]
}

export interface ArticleSection {
  type: "paragraph" | "heading" | "quote" | "list"
  text?: string
  items?: string[]
}

export const articles: Article[] = [
  {
    slug: "the-bronze-medal-we-won-from-our-bedrooms",
    title: "The Bronze Medal We Won from Our Bedrooms",
    description:
      "How winning a global robotics award from home led to creating Hamboi MindCare - a mental health platform for Nigerian teens.",
    author: {
      name: "Abiodun Abdul Hameed",
      role: "Founder, Hamboi MindCare",
      school: "Age 15",
    },
    category: "Founder's Story",
    readTime: "5 min read",
    publishedDate: "January 2025",
    featured: true,
    content: [], // This article has its own dedicated page at /about/article
  },
  {
    slug: "dealing-with-failure-turning-setbacks-into-stepping-stones",
    title: "Dealing With Failure: Turning Setbacks Into Stepping Stones",
    description:
      "Failure is one of the few experiences every human being shares. Learn how to turn setbacks into growth opportunities with the right mindset.",
    author: {
      name: "Fareeah Bada",
      role: "Head Girl",
      school: "Ansar-ud-Deen Academy",
    },
    category: "Student Voices",
    readTime: "6 min read",
    publishedDate: "February 2026",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Failure is one of the few experiences every human being shares. No matter how intelligent, talented, spiritual, or hardworking a person is, failure will show up at some point. It may come as a failed exam, a rejected application, a broken relationship, a lost opportunity, or an unmet expectation. While failure is inevitable, how we respond to it determines whether it becomes a stumbling block or a stepping stone.",
      },
      {
        type: "heading",
        text: "Understanding Failure Differently",
      },
      {
        type: "paragraph",
        text: 'Many people see failure as proof of inadequacy. They attach their identity to their mistakes: "I failed, therefore I am a failure." But failure is an event, not a personality. It is feedback, not a final verdict.',
      },
      {
        type: "paragraph",
        text: 'When we begin to see failure as information rather than condemnation, our mindset shifts. Instead of asking, "Why am I not good enough?" we start asking, "What can I learn from this?" That single shift changes everything.',
      },
      {
        type: "heading",
        text: "The Emotional Reality of Failure",
      },
      {
        type: "paragraph",
        text: "It is important to acknowledge that failure hurts. It can bring embarrassment, disappointment, frustration, and even self-doubt. Pretending not to feel these emotions only delays healing.",
      },
      {
        type: "paragraph",
        text: "Healthy coping begins with honesty:",
      },
      {
        type: "list",
        items: [
          "Admit that it hurts.",
          "Allow yourself to feel disappointed.",
          "Avoid suppressing emotions or comparing your journey to others.",
        ],
      },
      {
        type: "paragraph",
        text: "However, staying too long in self-pity can become destructive. The goal is not to ignore pain, but to move through it.",
      },
      {
        type: "heading",
        text: "Learning From the Experience",
      },
      {
        type: "paragraph",
        text: "Every failure carries a lesson. Sometimes the lesson is about preparation. Other times, it is about timing, strategy, discipline, or even humility.",
      },
      {
        type: "paragraph",
        text: "Ask reflective questions:",
      },
      {
        type: "list",
        items: [
          "What went wrong?",
          "What could I have done differently?",
          "What is within my control?",
          "What is not within my control?",
        ],
      },
      {
        type: "paragraph",
        text: "This reflection transforms failure into growth. Without reflection, failure becomes repeated patterns. With reflection, it becomes experience.",
      },
      {
        type: "heading",
        text: "Building Resilience",
      },
      {
        type: "paragraph",
        text: "Resilience is the ability to rise again after falling. It is not built during success; it is built in moments of difficulty.",
      },
      {
        type: "paragraph",
        text: "To develop resilience:",
      },
      {
        type: "list",
        items: [
          "Focus on progress, not perfection.",
          "Surround yourself with supportive people.",
          "Practice self-discipline and consistency.",
          "Celebrate small improvements.",
        ],
      },
      {
        type: "paragraph",
        text: "Resilience grows when you decide that quitting is not an option.",
      },
      {
        type: "heading",
        text: "Separating Worth From Results",
      },
      {
        type: "paragraph",
        text: "One of the most dangerous consequences of failure is tying self-worth to achievement. A bad result does not erase your value. Academic results, business outcomes, or public opinions do not define your identity.",
      },
      {
        type: "paragraph",
        text: "Confidence should be rooted in character, effort, and willingness to grow\u2014not just outcomes.",
      },
      {
        type: "heading",
        text: "Using Failure as Motivation",
      },
      {
        type: "paragraph",
        text: "Many successful individuals have stories filled with rejection and setbacks. What made the difference was persistence. Failure can either weaken determination or fuel it.",
      },
      {
        type: "quote",
        text: 'Instead of saying, "This is the end," say, "This is part of the process."',
      },
      {
        type: "paragraph",
        text: "Sometimes failure redirects you to a better path. Other times, it strengthens you for the path you are already on.",
      },
      {
        type: "heading",
        text: "Moving Forward",
      },
      {
        type: "paragraph",
        text: "The true tragedy is not failure itself, but refusing to try again because of it. Growth requires courage\u2014the courage to attempt, to fail, to learn, and to try once more.",
      },
      {
        type: "paragraph",
        text: "Failure is not the opposite of success; it is a component of success. When handled with reflection, resilience, and the right mindset, failure becomes one of life's most powerful teachers.",
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

export function getAllArticles(): Article[] {
  return articles
}
