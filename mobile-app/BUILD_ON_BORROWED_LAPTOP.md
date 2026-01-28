# How to Build Hamboi MindCare Android App on a Borrowed Laptop

**Print this guide or save it to your phone so you can follow along!**

---

## **What You'll Need:**
- Your uncle's laptop (Windows or Mac)
- Internet connection
- 1-2 hours of time
- Your email address for creating accounts

---

## **PART 1: PREPARE THE LAPTOP (15 minutes)**

### Step 1: Install Node.js

**Why?** Node.js is the tool that helps build apps.

**How to install:**

1. Open a web browser (Chrome, Safari, Edge)
2. Go to: **nodejs.org**
3. You'll see a big green button that says **"Download Node.js (LTS)"**
4. Click it and wait for download (takes 1-2 minutes)
5. Find the downloaded file (usually in Downloads folder)
6. Double-click it to install
7. Click **"Next"** → **"Next"** → **"Install"** → **"Finish"**
8. Restart the laptop (important!)

**After restart, check if it worked:**

- Open Command Prompt (Windows) or Terminal (Mac)
  - **Windows:** Press Windows key, type "cmd", press Enter
  - **Mac:** Press Command+Space, type "terminal", press Enter
- Type: `node --version`
- Press Enter
- You should see something like: `v20.11.0`
- If you see a version number, it worked! ✓

---

## **PART 2: DOWNLOAD YOUR APP CODE (5 minutes)**

### Step 2: Get the App Files

1. Open your web browser
2. Go to **v0.dev** and sign into your account
3. Open your Hamboi MindCare project chat
4. Look at the top right corner
5. Click the **three dots (•••)** menu
6. Click **"Download ZIP"**
7. Save to Desktop (easier to find)

### Step 3: Unzip the Files

**Windows:**
1. Find the ZIP file on Desktop
2. Right-click it
3. Click **"Extract All"**
4. Click **"Extract"**
5. A new folder appears with your app code

**Mac:**
1. Find the ZIP file on Desktop
2. Double-click it
3. A folder appears automatically

**Result:** You now have a folder called something like "v0-hamboi-ai-landing-page"

---

## **PART 3: OPEN THE COMMAND BOX (2 minutes)**

### Step 4: Navigate to Mobile App Folder

**Windows:**

1. Press **Windows key**
2. Type **"cmd"**
3. Press **Enter**
4. A black box appears
5. Type this (replace "YourName" with actual Windows username):
   \`\`\`
   cd Desktop\v0-hamboi-ai-landing-page\mobile-app
   \`\`\`
6. Press **Enter**

**Tip:** Don't know your username? 
- Open the folder on Desktop
- Open the mobile-app folder inside it
- While inside mobile-app, right-click in the address bar
- Click "Copy address"
- In the command box, type `cd ` (with a space after cd)
- Right-click and paste
- Press Enter

**Mac:**

1. Press **Command + Space**
2. Type **"terminal"**
3. Press **Enter**
4. Type:
   \`\`\`
   cd Desktop/v0-hamboi-ai-landing-page/mobile-app
   \`\`\`
5. Press **Enter**

**Easier way for Mac:**
- Type `cd ` (with space)
- Drag the mobile-app folder into the terminal window
- Press Enter

---

## **PART 4: INSTALL TOOLS (10 minutes)**

### Step 5: Install App Dependencies

In the command box, type:
\`\`\`
npm install
\`\`\`

Press **Enter** and wait.

**What you'll see:**
- Lots of text scrolling
- Progress bars
- "Installing dependencies..."
- Takes 3-5 minutes

**When done, you'll see:**
- "added 1234 packages..."
- Command box is ready for next command (you can type again)

---

### Step 6: Install Build Tool (EAS)

Type this:
\`\`\`
npm install -g eas-cli
\`\`\`

Press **Enter** and wait (2-3 minutes).

**What you'll see:**
- More scrolling text
- "Installing..."

**When done:**
- Command box is ready again

---

## **PART 5: CREATE FREE ACCOUNT (5 minutes)**

### Step 7: Sign Up for Expo

Type:
\`\`\`
eas login
\`\`\`

Press **Enter**.

**What happens:**

1. A website opens in your browser automatically
2. You see **"Sign up for Expo"**
3. Fill in:
   - Your email address
   - Create a password (remember it!)
   - Your name
4. Click **"Create account"**
5. Check your email for verification
6. Click the verification link
7. Go back to the command box
8. It might say "Login successful!" automatically

**If it asks you to login again in the command box:**
- Type your email
- Press Enter
- Type your password
- Press Enter

**This is 100% FREE - no credit card needed!**

---

## **PART 6: BUILD YOUR APP (15 minutes + 15 minute wait)**

### Step 8: Start the Build

Type this command:
\`\`\`
eas build --platform android --profile production
\`\`\`

Press **Enter**.

**What happens:**

1. It asks: **"Would you like to automatically create an EAS project?"**
   - Type: `y`
   - Press Enter

2. It asks: **"Generate a new Android Keystore?"**
   - Type: `y`
   - Press Enter

3. You'll see:
   - "✔ Uploading project to Expo..."
   - "✔ Building Android app..."
   - "⏳ Build in progress..."

4. **WAIT 10-15 MINUTES**
   - The app is being built in the cloud
   - You'll see progress updates
   - DON'T close the window!

5. When finished, you'll see:
   \`\`\`
   ✔ Build finished!
   
   Download URL: https://expo.dev/artifacts/eas/xxxxx.aab
   \`\`\`

---

### Step 9: Download Your App File

1. Look for the download link in the command box
2. Copy the entire URL (starts with https://)
3. Paste it in your web browser
4. The .aab file downloads automatically
5. Save it to Desktop with a clear name like: **hamboi-mindcare.aab**

---

## **YOU'RE DONE! 🎉**

You now have **hamboi-mindcare.aab** - your Android app file!

This file is ready to upload to Google Play Store.

---

## **WHAT TO DO NEXT:**

### Save the AAB File

**Important:** Copy the .aab file to:
- Your email (attach it and send to yourself)
- A USB drive
- Google Drive / Dropbox
- WhatsApp to yourself

**Don't leave it only on your uncle's laptop!**

---

## **IF SOMETHING GOES WRONG:**

### Error: "node is not recognized"
**Fix:** Node.js didn't install properly
1. Uninstall Node.js (Settings → Apps → Node.js → Uninstall)
2. Download again from nodejs.org
3. Install again
4. Restart laptop
5. Try again

### Error: "npm ERR!"
**Fix:** Internet connection issue
1. Check internet is working
2. Try the command again
3. If it keeps failing, try on different WiFi

### Error: "Authentication failed"
**Fix:** Wrong email/password for Expo
1. Go to expo.dev
2. Click "Forgot password"
3. Reset your password
4. Try `eas login` again

### Build Failed
**Fix:** 
1. Take a screenshot of the error
2. Send it to me in v0 chat
3. I'll tell you exactly what to do

### Can't Find Downloaded .aab File
**Check these places:**
1. Desktop
2. Downloads folder
3. Web browser's download list (Ctrl+J on Windows, Command+Shift+J on Mac)

---

## **CHECKLIST - FOLLOW IN ORDER:**

- [ ] Install Node.js from nodejs.org
- [ ] Restart laptop
- [ ] Download app ZIP from v0
- [ ] Extract ZIP to Desktop
- [ ] Open Command Prompt/Terminal
- [ ] Navigate to mobile-app folder (cd command)
- [ ] Run: npm install
- [ ] Run: npm install -g eas-cli
- [ ] Run: eas login
- [ ] Create Expo account (free)
- [ ] Run: eas build --platform android --profile production
- [ ] Answer 'y' to both questions
- [ ] Wait 15 minutes for build
- [ ] Copy download URL
- [ ] Download .aab file
- [ ] Save .aab file to your email/drive/USB
- [ ] Thank your uncle! 😊

---

## **TIME NEEDED:**

- Setting up laptop: 15 minutes
- Installing tools: 10 minutes
- Creating account: 5 minutes
- Building app: 15 minutes (waiting: 15 minutes)
- **Total: About 1 hour**

---

## **QUESTIONS?**

If you get stuck, take a photo of:
1. The error message on screen
2. What step you're on

Send it to me in v0 chat and I'll help you fix it!

---

**Good luck! You've got this! 💪**
