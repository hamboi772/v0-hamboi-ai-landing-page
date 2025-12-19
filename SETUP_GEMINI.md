# Setting Up Gemini API for Hamboi AI

To enable truly intelligent, human-like responses in your Hamboi AI voice demo, you need to add a Google Gemini API key.

## Why Gemini?

- **Free tier is very generous** - 60 requests per minute, perfect for demos
- **Natural conversations** - Gemini provides human-like, contextual responses
- **No credit card required** - Unlike Vercel AI Gateway, Gemini's free tier doesn't need billing setup
- **Fast responses** - Low latency for real-time chat

## Getting Your API Key

### Step 1: Go to Google AI Studio
Visit: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

### Step 2: Sign in with Google
Use any Google account (Gmail, Workspace, etc.)

### Step 3: Create API Key
1. Click **"Create API Key"**
2. Choose **"Create API key in new project"** (recommended)
3. Copy your API key (starts with `AIza...`)

### Step 4: Add to Your Project
In v0, add the environment variable:

1. Open the **Vars** section in the left sidebar
2. Click **"Add Variable"**
3. Enter:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your API key (paste the key you copied)
4. Click **"Save"**

## Testing

Once added, try the voice demo again. You should now get much more intelligent, contextual responses that feel like talking to a real person.

## Example Responses

**Before Gemini (keyword-based):**
- User: "I'm feeling anxious about my exam"
- Response: "Anxiety can feel so overwhelming. What's triggering these anxious feelings?"

**After Gemini (AI-powered):**
- User: "I'm feeling anxious about my exam"
- Response: "That pre-exam anxiety is so real - your brain is probably running through every possible scenario, right? What subject is the exam for? Sometimes talking through what specifically you're worried about can help us break it down into more manageable pieces."

## Free Tier Limits

- **60 requests per minute**
- **1,500 requests per day**
- **1 million requests per month**

This is more than enough for a landing page demo!

## Security Note

Never commit your API key to GitHub or share it publicly. The environment variable system keeps it secure.

## Troubleshooting

**"API key not found"** - Make sure you added `GEMINI_API_KEY` to your environment variables in the Vars section.

**"Quota exceeded"** - You've hit the free tier limit. Wait a minute and try again, or upgrade to a paid plan.

**Getting fallback responses** - Check that your API key is correct and hasn't expired.
