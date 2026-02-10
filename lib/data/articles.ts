export interface Article {
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
      image: "/images/authors/fareeah-bada.jpg",
      bio: "Fareeah Bada is the Head Girl of Ansar-ud-Deen Academy, where she leads by example both academically and in character. A passionate advocate for student wellbeing, Fareeah uses her voice and writing to inspire her peers to embrace resilience, self-reflection, and growth. Her article on dealing with failure reflects her belief that setbacks are not endings, but opportunities to become stronger.",
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
  {
    slug: "managing-stress-finding-balance-in-a-demanding-world",
    title: "Managing Stress: Finding Balance in a Demanding World",
    description:
      "Stress is a natural response to pressure, but unmanaged stress can affect mental clarity, physical health, and overall well-being. Learn practical strategies for finding balance.",
    author: {
      name: "Fareeah Bada",
      role: "Head Girl",
      school: "Ansar-ud-Deen Academy",
      image: "/images/authors/fareeah-bada.jpg",
      bio: "Fareeah Bada is the Head Girl of Ansar-ud-Deen Academy, where she leads by example both academically and in character. A passionate advocate for student wellbeing, Fareeah uses her voice and writing to inspire her peers to embrace resilience, self-reflection, and growth.",
    },
    category: "Student Voices",
    readTime: "7 min read",
    publishedDate: "February 2026",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Stress is a natural response to pressure. It appears when demands exceed our perceived ability to cope, whether those demands come from school, work, relationships, finances, or personal expectations. While a small amount of stress can motivate action, unmanaged stress can gradually affect mental clarity, physical health, and overall well-being. Learning how to manage stress is therefore not a luxury, but a necessity.",
      },
      {
        type: "heading",
        text: "Recognizing the Sources of Stress",
      },
      {
        type: "paragraph",
        text: "The first step in managing stress is awareness. Stress often feels overwhelming because its sources are unclear or ignored. Common stressors include heavy workloads, tight deadlines, fear of failure, uncertainty about the future, and unresolved conflicts.",
      },
      {
        type: "paragraph",
        text: "Identifying what triggers stress allows individuals to respond intentionally rather than react emotionally. When stress is named, it becomes easier to manage.",
      },
      {
        type: "heading",
        text: "Understanding Stress Responses",
      },
      {
        type: "paragraph",
        text: "Stress affects people differently. Some experience headaches, fatigue, or loss of appetite, while others struggle with irritability, anxiety, or difficulty concentrating. These responses are signals from the body and mind that balance is being disrupted.",
      },
      {
        type: "paragraph",
        text: "Ignoring these signs can worsen the impact of stress. Paying attention to them helps in choosing the right coping strategies early.",
      },
      {
        type: "heading",
        text: "Healthy Stress-Management Strategies",
      },
      {
        type: "paragraph",
        text: "Effective stress management does not eliminate stress entirely; it helps regulate it. Some practical strategies include:",
      },
      {
        type: "list",
        items: [
          "Time management: Breaking tasks into smaller steps reduces pressure and increases focus.",
          "Rest and sleep: Adequate rest restores mental and physical energy.",
          "Physical activity: Exercise releases tension and improves mood.",
          "Mindful breathing: Slow, deep breathing calms the nervous system.",
          "Setting boundaries: Knowing when to say no prevents burnout.",
        ],
      },
      {
        type: "paragraph",
        text: "These habits create stability in daily life, even during demanding periods.",
      },
      {
        type: "heading",
        text: "Mental and Emotional Balance",
      },
      {
        type: "paragraph",
        text: "Managing stress also involves internal discipline. Negative self-talk and constant comparison intensify pressure. Replacing self-criticism with realistic expectations promotes emotional balance.",
      },
      {
        type: "paragraph",
        text: "Talking to trusted friends, mentors, or professionals can also reduce stress. Sharing concerns often brings clarity and emotional relief.",
      },
      {
        type: "heading",
        text: "Stress in Academic and Professional Life",
      },
      {
        type: "paragraph",
        text: "In academic and work environments, stress often stems from performance expectations. While striving for excellence is positive, excessive pressure can lead to exhaustion.",
      },
      {
        type: "paragraph",
        text: "Learning to prioritize tasks, accept imperfections, and focus on effort rather than outcomes reduces unnecessary tension. Growth is most sustainable when it is balanced with care.",
      },
      {
        type: "heading",
        text: "Building Long-Term Resilience",
      },
      {
        type: "paragraph",
        text: "Long-term stress management requires consistency. Developing routines, maintaining healthy habits, and regularly evaluating personal limits strengthen resilience over time.",
      },
      {
        type: "quote",
        text: "Stress does not disappear when life becomes easier; it becomes manageable when coping skills improve.",
      },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "Stress is an unavoidable part of life, but it does not have to control it. With awareness, healthy habits, and emotional balance, stress can be managed effectively. When handled properly, stressful moments become opportunities to strengthen self-discipline, resilience, and personal growth.",
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
