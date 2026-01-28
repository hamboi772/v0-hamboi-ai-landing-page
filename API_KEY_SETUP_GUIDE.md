# Hamboi MindCare - Complete API Key Setup Guide

## 🎯 Quick Overview

You have **3 options** for managing your Gemini API:

1. **Multiple Free Keys** (Best for starting) - 100 free requests/day
2. **Upgrade to Paid** (Best for scaling) - Unlimited for ~$5/month
3. **Keep Current Setup** (Testing only) - 20 requests/day

---

## 🔑 Option 1: Set Up Multiple Free API Keys (Recommended)

This gives you **100 free requests per day** by rotating between 5 keys.

### Step-by-Step Instructions:

#### 1. Create 5 Google Accounts
- Use different emails (Gmail, Yahoo, Outlook, etc.)
- Example:
  - hamboi.account1@gmail.com
  - hamboi.account2@gmail.com
  - hamboi.account3@gmail.com
  - hamboi.account4@gmail.com
  - hamboi.account5@gmail.com

#### 2. Get API Keys from Each Account

**For EACH account, do this:**

1. Go to https://ai.google.dev
2. Sign in with the account
3. Click **"Get API Key"** (top right)
4. Click **"Create API Key in new project"**
5. Copy the API key (starts with `AIza...`)
6. Save it somewhere safe

**You should now have 5 API keys.**

#### 3. Add Keys to Vercel

1. Go to https://vercel.com/dashboard
2. Find your **Hamboi MindCare** project
3. Click **Settings** → **Environment Variables**
4. Add these 5 variables:

\`\`\`
GEMINI_API_KEY = [Your first API key]
GEMINI_API_KEY_2 = [Your second API key]
GEMINI_API_KEY_3 = [Your third API key]
GEMINI_API_KEY_4 = [Your fourth API key]
GEMINI_API_KEY_5 = [Your fifth API key]
\`\`\`

5. Click **Save**
6. Go to **Deployments** tab
7. Click **"Redeploy"** to apply changes

#### 4. How It Works

The system automatically:
- Rotates between all 5 keys
- Tracks usage for each key (20 requests per key)
- Resets counts daily at midnight Pacific time (8 AM Nigerian time)
- Gives you **100 total free requests per day**

#### 5. Monitor Usage

Add this endpoint to check your API status:

\`\`\`typescript
// app/api/key-status/route.ts
import { NextResponse } from "next/server"
import { getAPIKeyRotation } from "@/lib/api-key-rotation"

export async function GET() {
  try {
    const rotation = getAPIKeyRotation()
    const status = rotation.getStatus()
    return NextResponse.json({
      success: true,
      ...status,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Rotation not initialized" })
  }
}
\`\`\`

Visit `/api/key-status` to see remaining requests.

---

## 💳 Option 2: Upgrade to Paid Gemini API

For serious deployments, paid is the best option.

### Pricing:
- **Gemini 2.5 Flash:** $0.075 per 1 million input tokens
- **Real cost:** ~$0.005 per chat message (500 tokens average)
- **1000 chats/day = ~$5/month**
- **No daily limits**

### How to Upgrade:

1. Go to https://ai.google.dev
2. Sign in with your main Google account
3. Click **"Get API Key"**
4. Click **"Upgrade to paid"** or **"Enable billing"**
5. Add a credit card or payment method
6. Set spending limits (optional but recommended):
   - Start with $10/month limit
   - Google will notify you if you approach it
7. Your existing API key automatically becomes unlimited

### Update Vercel:

No code changes needed! Just update the environment variable:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Keep `GEMINI_API_KEY` with your upgraded key
3. Remove `GEMINI_API_KEY_2` through `GEMINI_API_KEY_5` (optional)
4. Redeploy

---

## 🧪 Option 3: Keep Current Setup (Testing Only)

**Only use this if:**
- You're beta testing with < 20 users/day
- You haven't launched publicly yet
- You're still building features

**Limitations:**
- 20 requests per day total
- Users 21+ will get error messages
- Resets daily at 8 AM Nigerian time

**No action needed** - it's already set up!

---

## 📊 Comparison Table

| Feature | Multiple Free Keys | Paid API | Current Setup |
|---------|-------------------|----------|---------------|
| Daily Requests | 100 | Unlimited | 20 |
| Cost | Free | ~$5/month | Free |
| Best For | Launching | Scaling | Testing |
| Setup Time | 20 minutes | 5 minutes | 0 minutes |
| Reliability | Good | Excellent | Poor |

---

## 🚀 Ready for Play Store?

| Option | Play Store Ready? |
|--------|-------------------|
| Multiple Free Keys | ✅ Yes (for small apps with <100 users/day) |
| Paid API | ✅ Yes (recommended for public apps) |
| Current Setup | ❌ No (will fail with >20 users) |

---

## 🆘 Troubleshooting

### "All API keys exhausted"
- Wait until 8 AM Nigerian time for quota reset
- Add more API keys (repeat Option 1 steps)
- Upgrade to paid plan

### "API Key Rotation not initialized"
- Check that you added all 5 environment variables in Vercel
- Make sure keys start with `AIza`
- Redeploy your app after adding keys

### "Invalid API key"
- Check for typos when copying keys
- Make sure you didn't include extra spaces
- Regenerate the key at ai.google.dev if needed

---

## 📝 Recommended Path

**For Play Store Launch:**
1. Start with **Multiple Free Keys** (100 requests/day)
2. Monitor usage for 1-2 weeks
3. If you get >100 users/day consistently, **upgrade to paid**

**Cost estimates:**
- 0-100 users/day: Free (multiple keys)
- 100-1000 users/day: $5/month (paid)
- 1000-10,000 users/day: $50/month (paid)

---

## ✅ Next Steps

Choose your option and follow the steps above. Once set up, test your app by:

1. Opening the chat
2. Sending multiple messages
3. Checking that responses come through
4. Visiting `/api/key-status` to see remaining quota

Good luck with your launch! 🚀
