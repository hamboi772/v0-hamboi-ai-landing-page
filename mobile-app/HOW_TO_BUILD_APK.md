# How to Build Your Hamboi MindCare Android APK

This guide will walk you through building an Android APK file that you can upload to the Google Play Store.

## What You Need

- A computer (Windows, Mac, or Linux)
- 30-45 minutes of time
- Internet connection
- This mobile-app folder

## Step 1: Install Node.js

**Windows:**
1. Go to https://nodejs.org
2. Download the LTS version (Long Term Support)
3. Run the installer
4. Click "Next" through all the options
5. Restart your computer after installation

**Mac:**
1. Go to https://nodejs.org
2. Download the LTS version
3. Open the .pkg file and follow instructions
4. Installation takes about 5 minutes

**Verify Installation:**
Open Terminal (Mac/Linux) or Command Prompt (Windows) and type:
```bash
node --version
```
You should see something like: v20.x.x

## Step 2: Open Terminal/Command Prompt

**Windows:**
- Press Windows key + R
- Type `cmd` and press Enter
- A black window opens (Command Prompt)

**Mac:**
- Press Command + Space
- Type "Terminal" and press Enter
- A window opens with text

**Linux:**
- Press Ctrl + Alt + T

## Step 3: Navigate to the Mobile App Folder

In Terminal/Command Prompt, type:

**If you saved it in Downloads:**
```bash
cd Downloads/mobile-app
```

**If you saved it in Documents:**
```bash
cd Documents/mobile-app
```

**If you're not sure where it is:**
- Windows: Type `dir` to see files in current location
- Mac/Linux: Type `ls` to see files

## Step 4: Install Dependencies

Type this command and press Enter:
```bash
npm install
```

**What this does:** Downloads all the code libraries your app needs
**How long:** 2-5 minutes
**What you'll see:** Lots of text scrolling, progress bars

Wait until you see a prompt again (usually shows your folder path).

## Step 5: Install Expo CLI

Type this command:
```bash
npm install -g eas-cli
```

**What this does:** Installs Expo's build tool globally on your computer
**How long:** 1-2 minutes

## Step 6: Create Expo Account

Go to https://expo.dev in your browser:
1. Click "Sign Up"
2. Enter your email and create a password
3. Verify your email
4. Remember these credentials

## Step 7: Login to Expo

Back in Terminal/Command Prompt, type:
```bash
eas login
```

**What happens:**
- It asks for your email: Type the email you used for Expo account
- Press Enter
- It asks for password: Type your password (you won't see it as you type, this is normal)
- Press Enter

You should see: "Logged in as [your-email]"

## Step 8: Build the APK

Now type this command:
```bash
eas build --platform android --profile production
```

**What happens next:**

1. **Question: "Would you like to automatically create an EAS project?"**
   - Type: `y` and press Enter

2. **Question: "Generate a new Android Keystore?"**
   - Type: `y` and press Enter
   - (Keystore is needed to sign your app for Play Store)

3. **Uploading your code**
   - Progress bar shows upload status
   - Takes 1-3 minutes

4. **Building in the cloud**
   - Expo builds your APK on their servers
   - You'll see: "Build in progress..."
   - Takes 10-20 minutes
   - You can close the terminal and check status at expo.dev

5. **Build complete**
   - You'll see: "Build finished"
   - A download link appears

## Step 9: Download Your APK

**Option A: From Terminal**
- The terminal shows a link like: https://expo.dev/artifacts/eas/...
- Copy this link
- Paste it in your browser
- The APK file downloads

**Option B: From Expo Website**
1. Go to https://expo.dev
2. Log in
3. Click "Builds"
4. Find your Hamboi MindCare build
5. Click the download button

**Your APK file will be named something like:**
`hamboi-mindcare-1.0.0.apk`

## Step 10: Test Your APK

Before uploading to Play Store, test it:

1. Transfer the APK to your Android phone
2. Open it on your phone
3. You might see "Install blocked" - Go to Settings and allow installing from unknown sources
4. Install and test all features

## Step 11: Upload to Google Play Store

Now you have the APK file ready for the Play Store.

**Next steps:**
1. Go to https://play.google.com/console
2. Create a developer account ($25 one-time fee)
3. Create new app
4. Upload your APK
5. Fill in app details, screenshots, description
6. Submit for review

---

## Troubleshooting

**Problem: "npm is not recognized"**
- Solution: Node.js didn't install correctly. Restart computer and try again.

**Problem: "eas: command not found"**
- Solution: The global install didn't work. Try: `npx eas-cli build --platform android --profile production`

**Problem: Build fails with error**
- Solution: Copy the error message and tell me. I'll help you fix it.

**Problem: "Network request failed"**
- Solution: Check your internet connection. Expo needs to upload your code.

**Problem: Build takes longer than 30 minutes**
- Solution: This is normal if Expo servers are busy. Check expo.dev/builds for status.

---

## Important Notes

- The first build always takes longest (15-20 minutes)
- Expo builds are free (500 builds/month on free plan)
- Keep your Expo login details safe
- The APK file is around 50-80 MB
- You can rebuild anytime with the same command

---

## What's Included in Your APK

Your Hamboi MindCare app includes:
- Home screen with hero and features
- AI Chat screen with Gemini integration
- Mental Health Resources with Nigerian crisis hotlines
- Crisis Support with grounding techniques
- Beautiful purple-blue gradient design
- Offline support
- Fast performance

---

## Need Help?

If you get stuck at any step, take a screenshot of the error and show me. I'll guide you through fixing it.

The most common issue is Node.js installation - if you have problems, just restart the computer after installing Node.js and try again.
