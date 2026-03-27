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
  {
    slug: "when-your-best-isnt-enough-dealing-with-a-low-score",
    title: "When Your Best Isn't Enough: Dealing with a Low Score",
    description:
      "You stayed up late, revised every page, pushed through the tiredness... and still the score disappointed. Here's how to process that pain and turn it into growth.",
    author: {
      name: "Aliyah Ali",
      role: "Social Prefect",
      school: "Ansar-ud-Deen Academy",
      image: "/images/authors/aliyah-ali.jpg",
      bio: "Aliyah Ali is the Social Prefect at Ansar-ud-Deen Academy, known for her inspiring and supportive nature. She is passionate about uplifting her peers through honest, relatable writing that speaks directly to the struggles students face every day.",
    },
    category: "Student Voices",
    readTime: "5 min read",
    publishedDate: "February 2026",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "You've stayed up late, revised every page, pushed through the tiredness... and still the score stares back at you: low. Disappointing. Not what you expected after all that effort.",
      },
      {
        type: "paragraph",
        text: "That gut-punch feeling is real. It can make you question everything: \"Am I even good enough?\"",
      },
      {
        type: "paragraph",
        text: "Here's the truth most people won't say out loud \u2014 your best won't always be enough right now, and that's okay. It doesn't mean you're broken. It means you're human in a world that isn't always fair.",
      },
      {
        type: "heading",
        text: "First, Let It Hurt (But Don't Stay There)",
      },
      {
        type: "paragraph",
        text: "Give yourself 24 hours to feel the sting. Cry, vent to a friend, punch a pillow, eat comfort food \u2014 whatever helps. Suppressing it only makes it explode later.",
      },
      {
        type: "paragraph",
        text: "Then, breathe. Literally. Take five slow breaths and remind yourself: This number is feedback, not your identity.",
      },
      {
        type: "heading",
        text: "Talk to Yourself Like You'd Talk to Your Best Friend",
      },
      {
        type: "paragraph",
        text: "Imagine your closest person got this same score after trying hard. Would you call them useless? Probably not. You'd say:",
      },
      {
        type: "list",
        items: [
          "\"You gave it everything \u2014 that's huge.\"",
          "\"One result doesn't cancel out all your intelligence and hard work.\"",
          "\"We'll figure out the next step together.\"",
        ],
      },
      {
        type: "paragraph",
        text: "Now say those same kind words to yourself. It feels awkward at first, but it works.",
      },
      {
        type: "heading",
        text: "Quick Reality Check Questions",
      },
      {
        type: "paragraph",
        text: "Ask yourself these (write the answers if you can):",
      },
      {
        type: "list",
        items: [
          "What parts did I actually do well? (Be specific \u2014 you probably nailed some sections.)",
          "Were there outside factors? (Tough marker, bad day, unclear questions, sickness?)",
          "What can I control next time? (Different study method, more practice questions, asking for help earlier?)",
        ],
      },
      {
        type: "paragraph",
        text: "Most low scores come from a mix of effort gaps + external stuff \u2014 not pure \"I'm not capable.\"",
      },
      {
        type: "heading",
        text: "Flip the Script: Growth Mode On",
      },
      {
        type: "paragraph",
        text: "The people who end up winning long-term aren't the ones who never get low scores. They're the ones who treat low scores like data.",
      },
      {
        type: "paragraph",
        text: "Try saying:",
      },
      {
        type: "list",
        items: [
          "Not \"I'm a failure\" \u2192 \"This shows me where to level up.\"",
          "Not \"I'll never get it\" \u2192 \"I haven't got it yet.\"",
        ],
      },
      {
        type: "paragraph",
        text: "Your brain literally grows stronger when you push through challenges \u2014 science backs this.",
      },
      {
        type: "heading",
        text: "One Tiny Step Today",
      },
      {
        type: "paragraph",
        text: "Don't try to fix everything at once. Pick one small action:",
      },
      {
        type: "list",
        items: [
          "Watch one 10-minute YouTube explanation on the hardest topic",
          "Message a friend or teacher: \"Can you help me understand where I went wrong?\"",
          "Do 15 minutes of active recall instead of re-reading",
          "Go for a walk to clear your head",
        ],
      },
      {
        type: "paragraph",
        text: "Small wins rebuild belief faster than big dramatic changes.",
      },
      {
        type: "heading",
        text: "The Bottom Line",
      },
      {
        type: "paragraph",
        text: "A low score after real effort hurts because you care \u2014 and caring is proof you're someone who wants to grow.",
      },
      {
        type: "quote",
        text: "You are not defined by this moment. You are defined by what you do next.",
      },
      {
        type: "paragraph",
        text: "You've already shown you can give your best. Now show yourself you can rise after it wasn't enough.",
      },
      {
        type: "paragraph",
        text: "You've got more in you than one score can ever measure. Keep going \u2014 we're rooting for you.",
      },
    ],
  },
  {
    slug: "peer-pressure-and-mental-health",
    title: "Peer Pressure and Mental Health",
    description:
      "Peer pressure is something most of us face, even if we don't like to admit it. Learn how to protect your peace while staying true to who you are.",
    author: {
      name: "Abiodun Abdul Hameed",
      role: "Founder",
      school: "Hamboi MindCare",
      image: "/images/founder-abdulhameed.webp",
      bio: "Abiodun Abdul Hameed is the 15-year-old founder of Hamboi MindCare, a mental health platform built for Nigerian teens. Driven by his own experiences and a passion for youth wellbeing, Abiodun writes to connect with young people going through real struggles.",
    },
    category: "Founder's Corner",
    readTime: "5 min read",
    publishedDate: "February 2026",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Let's be honest \u2014 peer pressure is something most of us face, even if we don't like to admit it.",
      },
      {
        type: "paragraph",
        text: "It's that quiet feeling that you need to act a certain way just to fit in. Laugh when something isn't funny. Say yes when you want to say no. Pretend you're okay so you don't look \"weird\" or \"different.\" And over time, it can really mess with your mental health.",
      },
      {
        type: "heading",
        text: "When Fitting In Starts to Hurt",
      },
      {
        type: "paragraph",
        text: "Wanting friends is normal. Wanting to belong is human. But when you constantly feel like you have to change who you are just to be accepted, it becomes draining.",
      },
      {
        type: "paragraph",
        text: "You may start feeling:",
      },
      {
        type: "list",
        items: [
          "Tired all the time",
          "Anxious before hanging out with certain people",
          "Bad about yourself after trying to impress others",
          "Confused about who you really are",
        ],
      },
      {
        type: "paragraph",
        text: "And the worst part? You might blame yourself for feeling this way.",
      },
      {
        type: "heading",
        text: "Why It Feels So Heavy as a Teen",
      },
      {
        type: "paragraph",
        text: "As teens, friendships feel like everything. Being left out hurts. Being judged hurts. Social media doesn't help either \u2014 it makes it look like everyone else has life figured out, when in reality, most people are struggling quietly.",
      },
      {
        type: "paragraph",
        text: "So you start comparing. And comparison slowly steals your peace.",
      },
      {
        type: "heading",
        text: "Signs You're Under Too Much Pressure",
      },
      {
        type: "paragraph",
        text: "You don't have to be \"broken\" to be affected. Some signs include:",
      },
      {
        type: "list",
        items: [
          "You agree to things you're uncomfortable with",
          "You hide your real opinions or feelings",
          "You feel anxious around people who are supposed to be your friends",
          "You feel relieved when you're finally alone",
        ],
      },
      {
        type: "paragraph",
        text: "If this sounds like you, you're not weak. You're human.",
      },
      {
        type: "heading",
        text: "Protecting Your Peace",
      },
      {
        type: "paragraph",
        text: "You don't need to fight everyone. Sometimes protecting your mental health looks like:",
      },
      {
        type: "list",
        items: [
          "Saying \"no\" without explaining yourself",
          "Choosing friends who respect you",
          "Stepping back from social media",
          "Talking to someone older you trust",
        ],
      },
      {
        type: "paragraph",
        text: "It might feel lonely at first, but peace is better than pressure.",
      },
      {
        type: "heading",
        text: "Gentle Reminder",
      },
      {
        type: "quote",
        text: "You don't have to lose yourself to belong. The right people will never require you to be someone else.",
      },
      {
        type: "paragraph",
        text: "You are enough, even when you don't fit in.",
      },
      {
        type: "heading",
        text: "Big Shoutout to My Friends!",
      },
      {
        type: "paragraph",
        text: "I want to give a huge shoutout to Shittu Robiu, Fareeah Bada, Ali Aliyah, Asaolu Tomiwa, and all my amazing friends who always have my back. You guys make life fun, keep me motivated, and remind me I'm never alone.",
      },
      {
        type: "paragraph",
        text: "Thank you for all the laughs, the advice, and the support \u2014 I really appreciate every one of you. Here's to more memories, more fun, and always having each other's backs!",
      },
    ],
  },
  {
    slug: "laughing-on-the-outside-hurting-on-the-inside-bullying",
    title: "Laughing on the Outside, Hurting on the Inside: Bullying",
    description:
      "Bullying isn't always loud. It can be subtle, repeated, and deeply personal. Learn how it affects you and practical ways to respond with confidence and seek support.",
    author: {
      name: "Tairu Rahamotallahi",
      role: "Student Advocate",
      school: "Ansar-ud-Deen Academy",
      image: "/images/authors/tairu-rahamotallahi.jpg",
      bio: "Tairu Rahamotallahi is a teenager and student committed to promoting kindness, empathy, and courage within the school environment. She is passionate about using her voice to eradicate bullying in schools and among teenagers, believing that every student deserves dignity, respect, and emotional safety.",
    },
    category: "Student Voices",
    readTime: "6 min read",
    publishedDate: "February 2026",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "\"They're just joking.\"",
      },
      {
        type: "paragraph",
        text: "But it doesn't feel like a joke.",
      },
      {
        type: "paragraph",
        text: "It feels sharp. Repeated. Personal.",
      },
      {
        type: "paragraph",
        text: "You laugh so you don't look sensitive.",
        text: "But later, you replay it in your mind.",
      },
      {
        type: "heading",
        text: "Bullying Isn't Always Loud",
      },
      {
        type: "paragraph",
        text: "Sometimes it's:",
      },
      {
        type: "list",
        items: [
          "Sarcastic comments",
          "Subtle exclusion",
          "Public embarrassment",
          "Backhanded compliments",
        ],
      },
      {
        type: "paragraph",
        text: "Over time, it chips away at confidence.",
      },
      {
        type: "heading",
        text: "What Bullying Actually Does",
      },
      {
        type: "paragraph",
        text: "It activates your stress response. Your body may react to it by:",
      },
      {
        type: "list",
        items: [
          "Racing heart",
          "Tight chest",
          "Overthinking",
          "Self-doubt",
        ],
      },
      {
        type: "paragraph",
        text: "It's not \"being dramatic.\" It's your nervous system reacting to the threat.",
      },
      {
        type: "heading",
        text: "The Self-Doubt Spiral",
      },
      {
        type: "paragraph",
        text: "Over time, you start questioning yourself:",
      },
      {
        type: "list",
        items: [
          "\"Am I too sensitive?\"",
          "\"Should I just ignore them?\"",
          "\"Is something wrong with me?\"",
        ],
      },
      {
        type: "paragraph",
        text: "No. Bullying is wrong, and repeated pain is not harmless. Your nervous system recognizes social threat.",
      },
      {
        type: "heading",
        text: "Building Confidence Through Response",
      },
      {
        type: "paragraph",
        text: "Try to speak even if your voice shakes. Be confident, and take a stand. Often times, bullies don't expect a reply.",
      },
      {
        type: "paragraph",
        text: "If they say: \"You are not smart\"",
      },
      {
        type: "paragraph",
        text: "You say: \"I am learning and improving.\"",
      },
      {
        type: "paragraph",
        text: "Confidence rebuilds through repetition.",
      },
      {
        type: "heading",
        text: "The Bottom Line",
      },
      {
        type: "paragraph",
        text: "You deserve emotional safety.",
      },
      {
        type: "paragraph",
        text: "You deserve respect — without conditions.",
      },
      {
        type: "quote",
        text: "No insult, no laughter, no opinion has the authority to define you unless you hand it that power. Your worth is constant, even when others fail to recognize it.",
      },
      {
        type: "heading",
        text: "MindCare Reminder",
      },
      {
        type: "paragraph",
        text: "If you are feeling:",
      },
      {
        type: "list",
        items: [
          "Constantly exhausted",
          "Isolated",
          "Anxious around others",
          "Afraid to go to school",
          "Hopeless or emotionally numb",
        ],
      },
      {
        type: "paragraph",
        text: "Please talk to a trusted adult or counselor. Mental health support is not a weakness. It is maintenance for your mind.",
      },
      {
        type: "paragraph",
        text: "You are not alone in this.",
      },
      {
        type: "paragraph",
        text: "You are not broken.",
      },
      {
        type: "paragraph",
        text: "You are navigating growth — and growth is uncomfortable. But you are stronger than you think.",
      },
      {
        type: "quote",
        text: "Healing is not loud. Growth is not instant. But every small step toward self-awareness is proof that you are choosing yourself. And that is power.",
      },
      {
        type: "heading",
        text: "A Stand for Change",
      },
      {
        type: "paragraph",
        text: "I refuse to stay silent in the face of bullying. Every student has the right to learn in a safe and supportive environment. As an advocate for change, I stand firmly against cruelty and choose to promote respect, inclusion, and accountability among students.",
      },
      {
        type: "paragraph",
        text: "I believe kindness is not weakness — it is courage. Bullying harms more than we see, and I am committed to standing up for those who may feel unheard. Every student deserves dignity, respect, and emotional safety.",
      },
    ],
  },
  {
    slug: "trauma-understanding-the-invisible-wound",
    title: "Trauma: Understanding the Invisible Wound",
    description:
      "Trauma is an invisible wound with real impact. Learn what trauma is, its different types, its effects on the mind and body, and pathways to healing and recovery.",
    author: {
      name: "Fathia King",
      role: "Student Advocate",
      school: "Ansar-ud-Deen Academy",
      image: "/images/authors/fathia-king.jpg",
      bio: "Fathia King is a thoughtful and compassionate student at Ansar-ud-Deen Academy dedicated to raising awareness about mental health and trauma. Through her writing, she aims to help others understand that healing is possible and that seeking support is a sign of strength.",
    },
    category: "Student Voices",
    readTime: "5 min read",
    publishedDate: "February 2026",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Trauma is a complex and multifaceted experience that can leave deep emotional scars. Whether it's a single event or a series of experiences, trauma can impact anyone, regardless of age, background, or circumstances.",
      },
      {
        type: "heading",
        text: "What is Trauma?",
      },
      {
        type: "paragraph",
        text: "Trauma is a response to a distressing event or situation that overwhelms an individual's ability to cope. This can include physical or emotional abuse, natural disasters, accidents, or witnessing violence.",
      },
      {
        type: "heading",
        text: "Types of Trauma",
      },
      {
        type: "list",
        items: [
          "Acute Trauma: Results from a single incident such as a car accident or assault.",
          "Chronic Trauma: Ongoing experiences like domestic violence or bullying.",
          "Complex Trauma: Exposure to multiple traumatic events, often involving interpersonal harm.",
        ],
      },
      {
        type: "heading",
        text: "Effects of Trauma",
      },
      {
        type: "paragraph",
        text: "Trauma affects us in multiple ways:",
      },
      {
        type: "list",
        items: [
          "Emotional effects",
          "Physical effects",
          "Behavioral effects",
        ],
      },
      {
        type: "heading",
        text: "Healing from Trauma",
      },
      {
        type: "list",
        items: [
          "Seek Professional Help: Therapy, counseling, or support groups can provide a safe place to process emotions.",
          "Self-Care: Engage in activities that promote relaxation and stress reduction, like exercise or meditation.",
          "Support Network: Surround yourself with caring individuals who understand and support your journey.",
        ],
      },
      {
        type: "paragraph",
        text: "Trauma may be invisible, but its impact is real. By acknowledging and addressing trauma, we can begin the journey towards healing and recovery.",
      },
    ],
  },
  {
    slug: "your-circle-your-mood-how-friends-determine-emotions",
    title: "Your Circle, Your Mood: How Friends Determine One's Emotions",
    description:
      "Discover how your social circle shapes your emotional well-being. Learn about the mood signs in friendships and practical steps to protect your emotional health.",
    author: {
      name: "Olapade Aisha",
      role: "Assistant Head Girl",
      school: "Ansar-ud-Deen Academy",
      image: "/images/authors/olapade-aisha.jpg",
      bio: "Olapade Aisha is the Assistant Head Girl at Ansar-ud-Deen Academy, committed to fostering positive relationships and emotional well-being among her peers. Through her leadership and insightful writing, she advocates for healthy friendships and self-love.",
    },
    category: "Student Voices",
    readTime: "5 min read",
    publishedDate: "February 2026",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "A circle is a group, it can be composed of friends or associates. It helps one grow, and can sometimes retard one's growth. Determining one's emotions through friends is easy as it is very recognizable.",
      },
      {
        type: "heading",
        text: "How Friends Determine One's Growth",
      },
      {
        type: "paragraph",
        text: "Friends are very important aspects of one's entire well-being. They boost one's morale and make one happy.",
      },
      {
        type: "heading",
        text: "Mood Signs",
      },
      {
        type: "paragraph",
        text: "1) Happiness: One's happiness can be determined through one's circle. When one is with the right friends, one's mood equally brightens. The right circle always helps one grow and develop.",
      },
      {
        type: "paragraph",
        text: "2) Sadness: Hypocrisy and bad friends go together. Friends who ignore, who backbite and insult one another develop unhealthy members. Members who don't speak the truth and hide their feelings create a toxic environment.",
      },
      {
        type: "paragraph",
        text: "3) Withdrawal: This is the most common emotion exhibited due to a bad friendship circle. Friends that cannot speak the truth with one another end up causing untold harm to their fellow friends. This leads to withdrawal from the society and circle.",
      },
      {
        type: "heading",
        text: "What To Do To Prevent Withdrawal",
      },
      {
        type: "list",
        items: [
          "Be Yourself",
          "Speak Up When One Is Hurt",
          "Remember, Your Happiness Matters",
          "Love Yourself",
        ],
      },
      {
        type: "paragraph",
        text: "One's emotion is one's greatest asset. Learn to treat it with care.",
      },
    ],
  },{
    slug: "the-importance-of-mental-health-for-teenagers",
    title: "The Importance of Mental Health for Teenagers",
    description: "Mental health is just as important as physical health. Discover why teenage mental health matters and how to develop healthy coping strategies.",
    author: {
      name: "Shittu Robiu",
      role: "Head Boy",
      school: "Ansar-ud-Deen Academy",
      image: "/images/authors/shittu-robiu.jpg",
      bio: "Shittu Robiu is the Head Boy of Ansar-ud-Deen Academy, passionate about youth mental health and wellbeing.",
    },
    category: "Student Voices",
    readTime: "7 min read",
    publishedDate: "March 2026",
    featured: false,
    content: [
      { type: "paragraph", text: "Mental health is just as important as physical health, yet it is often overlooked, especially among teenagers. Young people today face many challenges — academic pressure, social expectations, personal changes, and uncertainty about the future. These pressures can lead to stress, anxiety, low self-esteem, and even depression if not addressed in healthy ways." },
      { type: "heading", text: "Why Mental Health Matters" },
      { type: "paragraph", text: "Mental health affects how we think, feel, and behave; it influences learning, relationships, decision-making, and overall well-being. Poor mental health can make everyday tasks feel overwhelming, while good mental health helps teens cope with challenges, build resilience, and reach their full potential." },
      { type: "heading", text: "Building Healthy Coping Strategies" },
      { type: "paragraph", text: "Caring for mental health means understanding your emotions, managing stress, and seeking support when needed. Simple habits like talking to a trusted friend, getting enough rest, staying physically active, and practicing mindfulness can make a huge difference." },
      { type: "paragraph", text: "Developing healthy coping strategies, such as journaling, meditation, or creative outlets like art and music, can also help teenagers process emotions and reduce anxiety." },
      { type: "heading", text: "The Power of Support Systems" },
      { type: "paragraph", text: "Support systems are essential, both in real life and online. Many teens find comfort in spaces where they can express themselves without judgment, learn about emotional health, and feel understood." },
      { type: "paragraph", text: "Hamboi Mindcare — Hope And Mind Balance Outreach Initiative — is one such platform that provides 24/7 emotional support through an AI-powered companion, mood-tracking tools, and personalized coping strategies to help teens understand and manage their emotions." },
      { type: "paragraph", text: "The platform also offers crisis resources and access to professional guidance when needed, while featuring community-generated articles and real stories from teens, helping young people feel less alone and more empowered to take care of their mental well-being." },
      { type: "heading", text: "Education and Awareness" },
      { type: "paragraph", text: "Education about mental health empowers teens to recognize signs of emotional distress in themselves and others, encouraging early intervention and healthier choices." },
      { type: "quote", text: "Mental health is the foundation for a balanced and fulfilling life." },
      { type: "heading", text: "Moving Forward" },
      { type: "paragraph", text: "By learning to recognize emotions, manage stress, and seek guidance, teenagers can develop the resilience and confidence needed to thrive. With supportive communities, education, and platforms like Hamboi Mindcare, young people have access to tools and guidance that help them face challenges, maintain emotional balance, and grow into healthier, more self-aware individuals." },
      { type: "paragraph", text: "Remember, seeking help is not a sign of weakness — it is a sign of strength and self-awareness. Your mental health matters, and you deserve support." },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

export function getAllArticles(): Article[] {
  return articles
}
