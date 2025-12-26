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
  "mindfulness-for-beginners": {
    id: "mindfulness-for-beginners",
    title: "Mindfulness for Beginners",
    author: "Jon Kabat-Zinn",
    chapters: [
      {
        number: 1,
        title: "What Is Mindfulness?",
        content: [
          "Mindfulness is the art of paying attention on purpose, in the present moment, and non-judgmentally.",
          "It sounds simple, but it's not always easy. Our minds are constantly wandering - thinking about the past, worrying about the future, or judging the present.",
          "Mindfulness invites us to step out of autopilot mode and become aware of what's happening right now, in this very moment.",
          "When you practice mindfulness, you're training your mind to be more present, more aware, and more accepting of your experience as it is.",
          "This doesn't mean you'll never think about the past or future. It means you'll be more aware when you do, and you'll have more choice about where to direct your attention.",
        ],
      },
      {
        number: 2,
        title: "Beginning Your Practice",
        content: [
          "You don't need any special equipment or location to practice mindfulness. You can start right now, wherever you are.",
          "The simplest way to begin is with mindful breathing. Take a moment to notice your breath - the sensation of air entering and leaving your body.",
          "Don't try to change your breath. Just observe it. Notice how it feels in your nostrils, your chest, your belly.",
          "When your mind wanders (and it will), gently bring your attention back to the breath. This is the practice - noticing when the mind wanders and returning to the present.",
          "Start with just 5 minutes a day. Consistency is more important than duration.",
        ],
      },
      {
        number: 3,
        title: "Mindfulness in Daily Life",
        content: [
          "Mindfulness isn't just for meditation. You can bring mindful awareness to any activity in your daily life.",
          "Try mindful eating: Really taste your food, notice its texture, smell, and appearance. Eat slowly and without distractions.",
          "Practice mindful walking: Feel each step, notice the sensations in your feet and legs, observe your surroundings.",
          "Even routine activities like washing dishes or brushing your teeth can become opportunities for mindfulness practice.",
          "The more you practice, the more you'll find yourself naturally present throughout your day.",
        ],
      },
      {
        number: 4,
        title: "Working with Difficult Emotions",
        content: [
          "One of the most powerful applications of mindfulness is in dealing with difficult emotions.",
          "Instead of avoiding or suppressing painful feelings, mindfulness teaches us to turn toward them with curiosity and compassion.",
          "When a difficult emotion arises, pause and acknowledge it. 'This is anger,' or 'This is sadness.'",
          "Notice where you feel it in your body. Is there tension? Heaviness? Heat?",
          "Remember: emotions are temporary. They arise, peak, and pass away. By observing them mindfully, you create space around them rather than being consumed by them.",
        ],
      },
    ],
  },
  "the-anxiety-and-phobia-workbook": {
    id: "the-anxiety-and-phobia-workbook",
    title: "The Anxiety and Phobia Workbook",
    author: "Edmund J. Bourne",
    chapters: [
      {
        number: 1,
        title: "Understanding Anxiety",
        content: [
          "Anxiety is one of the most common mental health challenges, affecting approximately 40 million adults in the United States alone.",
          "While anxiety can feel overwhelming, it's important to understand that it's a natural and normal response to perceived threats.",
          "The problem isn't anxiety itself - it's when anxiety becomes excessive, persistent, or interferes with your daily life.",
          "Anxiety disorders include generalized anxiety disorder, panic disorder, social anxiety disorder, and specific phobias.",
          "The good news is that anxiety is highly treatable with the right tools and techniques, which we'll explore throughout this book.",
        ],
      },
      {
        number: 2,
        title: "The Physical Symptoms of Anxiety",
        content: [
          "Anxiety manifests not just in your mind, but throughout your entire body. Understanding these physical symptoms can help you recognize anxiety early.",
          "Common physical symptoms include: rapid heartbeat, shortness of breath, sweating, trembling, muscle tension, and digestive issues.",
          "These symptoms are caused by the activation of your body's 'fight or flight' response - an ancient survival mechanism.",
          "While uncomfortable, these symptoms are not dangerous. Your body is simply preparing to protect you from a perceived threat.",
          "Learning to recognize these physical signs is the first step in managing anxiety effectively.",
        ],
      },
      {
        number: 3,
        title: "Breathing Techniques for Anxiety",
        content: [
          "One of the most effective tools for managing anxiety is proper breathing. When you're anxious, your breathing becomes rapid and shallow.",
          "Abdominal breathing, also called diaphragmatic breathing, activates your body's relaxation response and calms your nervous system.",
          "Here's how to practice: Place one hand on your chest and one on your belly. Breathe in slowly through your nose, letting your belly expand while your chest stays relatively still.",
          "Breathe out slowly through your mouth, letting your belly fall. Continue for 5-10 minutes, or until you feel calmer.",
          "Practice this technique daily, even when you're not anxious, so it becomes automatic when you need it most.",
        ],
      },
      {
        number: 4,
        title: "Challenging Anxious Thoughts",
        content: [
          "Anxiety is fueled by anxious thoughts - often catastrophic predictions about the future or worst-case scenarios.",
          "The key is not to eliminate these thoughts (which is impossible), but to challenge and reframe them.",
          "Ask yourself: What evidence supports this thought? What evidence contradicts it? What would I tell a friend who had this thought?",
          "Often, you'll discover that your anxious predictions are exaggerated or unlikely. This doesn't make the anxiety disappear, but it reduces its intensity.",
          "With practice, you'll become skilled at catching anxious thoughts early and responding to them more rationally.",
        ],
      },
    ],
  },
  "self-compassion": {
    id: "self-compassion",
    title: "Self-Compassion: The Proven Power of Being Kind to Yourself",
    author: "Kristin Neff",
    chapters: [
      {
        number: 1,
        title: "What Is Self-Compassion?",
        content: [
          "Self-compassion is treating yourself with the same kindness, care, and understanding that you would offer to a good friend.",
          "It involves three key elements: self-kindness (being gentle with yourself), common humanity (recognizing that suffering is part of the human experience), and mindfulness (holding your experience in balanced awareness).",
          "Many people confuse self-compassion with self-esteem. Self-esteem is about evaluating yourself positively. Self-compassion is about relating to yourself kindly, regardless of your perceived successes or failures.",
          "Research shows that self-compassion is strongly associated with emotional well-being, less anxiety and depression, and greater life satisfaction.",
          "The good news is that self-compassion can be learned and cultivated through practice.",
        ],
      },
      {
        number: 2,
        title: "The Power of Self-Kindness",
        content: [
          "Most of us are much harder on ourselves than we would ever be on others. We criticize ourselves harshly for mistakes and shortcomings.",
          "Self-kindness means treating yourself with warmth and understanding when you suffer, fail, or feel inadequate, rather than ignoring your pain or flagellating yourself with self-criticism.",
          "Think about how you would respond to a close friend going through a difficult time. Would you criticize them? Tell them they're stupid or worthless? Of course not.",
          "You would offer them comfort, encouragement, and perspective. Self-compassion simply means extending that same kindness to yourself.",
          "This doesn't mean letting yourself off the hook or avoiding responsibility. It means acknowledging your imperfections with kindness rather than harsh judgment.",
        ],
      },
      {
        number: 3,
        title: "Common Humanity",
        content: [
          "When we're struggling, we often feel isolated and alone. We think 'I'm the only one who feels this way' or 'Everyone else has it together.'",
          "Common humanity is the recognition that suffering and personal inadequacy are part of the shared human experience - something we all go through rather than something that happens to 'me' alone.",
          "Everyone makes mistakes. Everyone experiences failure. Everyone feels inadequate at times. This isn't a sign that something is wrong with you - it's a sign that you're human.",
          "When you remember your common humanity, you feel more connected to others rather than isolated by your suffering.",
          "This perspective can be incredibly comforting and helps you maintain perspective during difficult times.",
        ],
      },
      {
        number: 4,
        title: "Practicing Self-Compassion",
        content: [
          "Self-compassion is a skill that can be developed with practice. Here are some ways to cultivate it:",
          "Self-compassion break: When you're suffering, pause and acknowledge your pain. Say to yourself: 'This is a moment of suffering. Suffering is part of life. May I be kind to myself.'",
          "Write a self-compassionate letter: Write to yourself as you would to a dear friend who is struggling. What would you say? How would you express your care and concern?",
          "Self-compassion meditation: Spend time each day offering yourself kindness and compassion through meditation.",
          "Remember: self-compassion is not self-indulgence or self-pity. It's about acknowledging your suffering and responding with care.",
        ],
      },
    ],
  },
}
