// Sample book content - In production, this would come from a database or CMS
export interface BookChapter {
  number: number
  title: string
  content: string[]
}

export interface BookContent {
  id: string
  title: string
  author: string
  chapters: BookChapter[]
}

export const bookContents: Record<string, BookContent> = {
  "the-happiness-trap": {
    id: "the-happiness-trap",
    title: "The Happiness Trap",
    author: "Russ Harris",
    chapters: [
      {
        number: 1,
        title: "Introduction to ACT",
        content: [
          "Welcome to The Happiness Trap. This book is designed to help you escape the trap of unhappiness and create a rich, full, and meaningful life.",
          "The happiness trap is a paradox: the more we try to be happy, the more we suffer. This happens because we're constantly fighting with our thoughts and feelings, trying to eliminate the 'bad' ones and keep only the 'good' ones.",
          "Acceptance and Commitment Therapy (ACT) offers a different approach. Instead of fighting your thoughts and feelings, you learn to accept them, be present, and take action based on your values.",
          "In this chapter, we'll explore why traditional approaches to happiness often fail and introduce you to the six core processes of ACT that can transform your relationship with difficult thoughts and feelings.",
          "Throughout this book, you'll learn practical skills that you can apply immediately. These aren't just theories - they're evidence-based techniques that have helped millions of people worldwide.",
        ],
      },
      {
        number: 2,
        title: "The Struggle Switch",
        content: [
          "Imagine there's a switch in your mind called the 'struggle switch.' When it's turned on, you're fighting against your thoughts and feelings. When it's off, you're accepting them.",
          "Most of us spend our lives with the struggle switch firmly in the 'on' position. We believe that to be happy, we must eliminate all negative thoughts and feelings.",
          "But here's the problem: the more we struggle against our internal experiences, the more powerful they become. It's like quicksand - the more you struggle, the deeper you sink.",
          "The alternative isn't giving up or resigning yourself to misery. It's about learning to turn off the struggle switch by accepting your thoughts and feelings as they are.",
          "When you stop struggling, you free up enormous amounts of energy that you can redirect toward living a meaningful life.",
        ],
      },
      {
        number: 3,
        title: "Defusion Techniques",
        content: [
          "Cognitive defusion is one of the most powerful techniques in ACT. It's about changing your relationship with your thoughts rather than trying to change the thoughts themselves.",
          "When you're 'fused' with a thought, you believe it completely. The thought seems like absolute truth. Defusion means stepping back and seeing thoughts for what they really are: just words and pictures in your mind.",
          "Here's a simple defusion technique: When you have a troubling thought, silently say to yourself, 'I'm having the thought that...' and then state the thought.",
          "For example, instead of 'I'm useless,' you say, 'I'm having the thought that I'm useless.' This creates distance between you and the thought.",
          "With practice, you'll discover that thoughts lose their power when you defuse from them. They become just background noise rather than commands you must obey.",
        ],
      },
    ],
  },
  "feeling-good": {
    id: "feeling-good",
    title: "Feeling Good: The New Mood Therapy",
    author: "David D. Burns",
    chapters: [
      {
        number: 1,
        title: "Understanding Depression",
        content: [
          "Depression is one of the most common and debilitating mental health conditions, affecting millions of people worldwide.",
          "The good news is that depression is highly treatable, and Cognitive Behavioral Therapy (CBT) has been proven to be as effective as medication for many people.",
          "At the core of depression are negative thought patterns. These aren't just 'bad thoughts' - they're systematic distortions in the way you perceive yourself, your experiences, and your future.",
          "When you're depressed, your thoughts become extremely negative and self-critical. You might think 'I'm worthless,' 'Everything is hopeless,' or 'I can't do anything right.'",
          "The key insight of CBT is this: your thoughts create your feelings. By changing your thoughts, you can change how you feel.",
        ],
      },
      {
        number: 2,
        title: "Identifying Cognitive Distortions",
        content: [
          "Cognitive distortions are systematic errors in thinking that maintain depression. Learning to identify them is the first step toward feeling better.",
          "All-or-nothing thinking: You see things in black-and-white categories. If your performance falls short of perfect, you see yourself as a total failure.",
          "Overgeneralization: You see a single negative event as a never-ending pattern of defeat.",
          "Mental filter: You pick out a single negative detail and dwell on it exclusively, so your vision of all reality becomes darkened.",
          "Disqualifying the positive: You reject positive experiences by insisting they 'don't count' for some reason or other.",
        ],
      },
      {
        number: 3,
        title: "The Daily Mood Log",
        content: [
          "The Daily Mood Log is a powerful tool for challenging negative thoughts and replacing them with more realistic ones.",
          "Here's how it works: When you notice yourself feeling upset, write down the situation, your automatic thoughts, and how strongly you believe them.",
          "Next, identify which cognitive distortions are present in your thoughts. Are you catastrophizing? Mind-reading? Labeling yourself?",
          "Then, write down rational responses to your automatic thoughts. What evidence supports your thought? What evidence contradicts it?",
          "Finally, rate how strongly you now believe the original thought. Most people find their belief in the negative thought decreases significantly.",
        ],
      },
    ],
  },
}
