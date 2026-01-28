# Hamboi MindCare - AAB Build Requirements

## Project Overview
**App Name:** Hamboi MindCare  
**Type:** Mental health support app for Nigerian teenagers  
**Platform:** Android (Google Play Store)  
**Framework:** Expo React Native  
**Deliverable:** Android App Bundle (.aab file)

---

## What I Need

I have a **complete, ready-to-build Expo React Native application**. I need you to:

1. Build an Android App Bundle (AAB) file using Expo EAS Build
2. Deliver the .aab file ready for Google Play Store upload
3. Provide any necessary signing keys or certificates

---

## Technical Stack

- **Framework:** React Native with Expo SDK 52
- **Build System:** EAS Build (Expo Application Services)
- **Language:** TypeScript
- **Target:** Android (Google Play Store submission)

---

## Project Structure

The mobile app code is in the `mobile-app/` folder with:

\`\`\`
mobile-app/
├── App.tsx                  # Main app entry
├── app.json                 # App configuration
├── eas.json                 # Build configuration
├── package.json             # Dependencies
├── screens/                 # App screens
│   ├── HomeScreen.tsx
│   ├── ChatScreen.tsx
│   ├── ResourcesScreen.tsx
│   └── CrisisScreen.tsx
└── assets/                  # Icons and images
\`\`\`

---

## Build Instructions

### Step 1: Install Dependencies
\`\`\`bash
cd mobile-app
npm install
\`\`\`

### Step 2: Install EAS CLI
\`\`\`bash
npm install -g eas-cli
\`\`\`

### Step 3: Login to Expo (or create account)
\`\`\`bash
eas login
\`\`\`
If you don't have an Expo account, create one at expo.dev (it's free)

### Step 4: Configure Build
The project is already configured in `eas.json` with production profile for AAB build.

### Step 5: Build AAB
\`\`\`bash
eas build --platform android --profile production
\`\`\`

This command will:
- Upload the code to Expo's build servers
- Build the Android App Bundle
- Generate a download link for the .aab file
- Take approximately 10-15 minutes

### Step 6: Download AAB
Once the build completes, EAS will provide a download link. Download the .aab file.

---

## App Configuration Details

**Package Name:** com.hamboimindcare.app  
**App Version:** 1.0.0  
**Build Number:** 1  
**Minimum SDK:** 21 (Android 5.0)  
**Target SDK:** 34 (Android 14)  

**App Icon:** Included in `mobile-app/assets/icon.png`  
**Splash Screen:** Included in `mobile-app/assets/splash.png`

---

## Deliverables Required

Please provide:

1. **AAB File:** `hamboi-mindcare.aab` (Android App Bundle ready for Play Store)
2. **Signing Certificate:** Keystore file and credentials (if generated)
3. **Build Details:**
   - Build ID from EAS
   - Any signing information needed for Play Store
4. **Screenshot/Proof:** Screenshot of successful build completion

---

## Important Notes

- **The code is complete** - No coding is required, just running the build commands
- **Internet connection required** - EAS Build runs in the cloud
- **Expo account needed** - Free account at expo.dev
- **Build time** - Approximately 10-20 minutes
- **No Android Studio needed** - EAS Build handles everything in the cloud

---

## Expected Timeline

- Setup and build: 1-2 hours
- Delivery: Within 24-48 hours

---

## API Keys & Environment Variables

The app connects to a live backend API. No additional environment variables need to be added for the build process. The app is configured to work immediately after installation.

---

## Testing After Build

After building, you can test the AAB by:
1. Uploading to Google Play Console Internal Testing track
2. Or converting to APK for local testing (optional)

---

## Questions or Issues?

If you encounter any issues during the build:
- Check that Node.js is installed (v18 or higher)
- Ensure you're logged into Expo CLI
- Verify internet connection for EAS Build cloud service
- Check the EAS Build logs for specific error messages

---

## Contact

If you need clarification on any part of this project, please message me immediately. I'm available to answer questions.

---

**Summary:** This is a straightforward EAS Build task. The entire codebase is ready. You just need to run the build commands and deliver the AAB file.
