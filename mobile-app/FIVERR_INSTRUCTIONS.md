# Instructions for Fiverr Developer

## Project: Hamboi MindCare - Mental Health Support App

### What I Need
I need you to build an Android APK file from my React Native/Expo app code that I can upload to Google Play Store.

### Project Details
- **App Name:** Hamboi MindCare
- **Description:** Mental health support app for Nigerian teenagers with AI chat, crisis resources, and wellness tips
- **Framework:** React Native with Expo
- **Target Platform:** Android (APK for Play Store)

### What I'm Providing
- Complete mobile app source code (mobile-app folder)
- All dependencies listed in package.json
- App configuration in app.json
- All screens and components ready

### What You Need to Do

1. **Install Dependencies**
   ```bash
   cd mobile-app
   npm install
   ```

2. **Build Production APK**
   ```bash
   npm install -g eas-cli
   eas login
   eas build --platform android --profile production
   ```

3. **Deliver to Me**
   - The .apk file (production-ready)
   - Build confirmation/screenshot
   - Any build logs if there were issues

### Technical Specifications
- **Package Name:** com.hamboi.mindcare
- **Version:** 1.0.0
- **Min SDK:** 21
- **Target SDK:** 34

### App Features (FYI)
- Home screen with hero and features
- AI chat functionality (connects to web API)
- Mental health resources with crisis hotlines
- Emergency support screen
- Bottom tab navigation

### Important Notes
- The app connects to an external API for chat functionality (no backend setup needed)
- All assets (icons, splash screen) are included
- App is ready to build, just needs compilation

### Questions?
If you encounter any issues or need clarification, please message me before proceeding.

---

**Timeline Needed:** 1-3 days
**Budget:** $10-20
