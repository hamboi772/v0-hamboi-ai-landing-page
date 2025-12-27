# How to Build AAB File on Your Laptop

This guide shows you how to build the Android App Bundle (.aab) file for Hamboi Mindcare on your laptop.

## Prerequisites

You need these installed on your laptop:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org
   - Check version: `node --version`

2. **Git** (optional but recommended)
   - Download from: https://git-scm.com

## Step-by-Step Instructions

### Step 1: Download Your Project

1. In v0, click the **three dots** in the top right of your project
2. Click **"Download ZIP"**
3. Save the ZIP file to your laptop
4. Extract/Unzip the file to a folder (e.g., `hamboi-mindcare`)

### Step 2: Open Terminal/Command Prompt

**Windows:**
- Press `Windows Key + R`
- Type `cmd` and press Enter

**Mac:**
- Press `Command + Space`
- Type `terminal` and press Enter

### Step 3: Navigate to Mobile App Folder

```bash
cd path/to/hamboi-mindcare/mobile-app
```

Replace `path/to/hamboi-mindcare` with the actual path where you extracted the project.

### Step 4: Install Dependencies

```bash
npm install
```

This will take 2-5 minutes. Wait for it to complete.

### Step 5: Install EAS CLI

```bash
npm install -g eas-cli
```

This installs the Expo Application Services CLI globally on your laptop.

### Step 6: Create Expo Account (If You Don't Have One)

1. Go to: https://expo.dev
2. Click "Sign Up"
3. Create a free account
4. Remember your email and password

### Step 7: Login to Expo

```bash
eas login
```

Enter your Expo email and password when prompted.

### Step 8: Configure Your Project

```bash
eas build:configure
```

When asked:
- Select **Android**
- Press Enter to accept defaults

### Step 9: Build the AAB

```bash
eas build --platform android --profile production
```

**What happens now:**
- EAS uploads your code to Expo's servers
- Build process starts (takes 10-20 minutes)
- You'll see build progress in terminal
- When complete, you'll get a download link

### Step 10: Download Your AAB

1. When build completes, you'll see a link like: `https://expo.dev/accounts/...`
2. Click the link or copy it to your browser
3. Click **"Download"** button
4. Save the `.aab` file to your laptop

**The AAB file is now ready for Google Play Store!**

## New Features in This Version

Your mobile app now includes:
- ✅ Mood Tracker - Log daily moods
- ✅ Mental Health Journal - Write journal entries
- ✅ Referral System - Share and earn rewards
- ✅ Book Library - Access to 12 mental health books
- ✅ Voice Chat AI - Talk to Hamboi AI assistant
- ✅ Crisis Support - Emergency resources
- ✅ Bottom Navigation - Easy access to all features

## Common Issues and Solutions

### Issue: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org

### Issue: "eas: command not found"
**Solution:** Run `npm install -g eas-cli` again

### Issue: Build fails with "Android credentials"
**Solution:** When prompted, let EAS generate credentials automatically

### Issue: "Project not configured"
**Solution:** Run `eas build:configure` first

## Build Times

- First build: 15-20 minutes
- Subsequent builds: 10-15 minutes

The build happens on Expo's cloud servers, so you can close your terminal and check back later.

## Cost

- EAS Free tier: Limited builds per month
- EAS Production: $29/month for unlimited builds

For your first app, the free tier should be sufficient.

## After Building

Once you have the AAB file:

1. Go to Google Play Console: https://play.google.com/console
2. Create a new app (if you haven't)
3. Upload the AAB file
4. Fill in store listing details
5. Submit for review

## Need Help?

If you get stuck:
1. Check the error message carefully
2. Search the error on Google
3. Ask in Expo Discord: https://chat.expo.dev
4. Come back to v0 and share the error message

## File Locations

After building:
- AAB download link: Check your email from Expo
- Or visit: https://expo.dev/accounts/[your-username]/projects/hamboi-mindcare-mobile/builds

Your AAB is ready to upload to Google Play Store!
