# Hamboi MindCare - Mobile App Build Instructions

## Developer Guide

Thank you for building this app! This is a complete Expo/React Native project ready to build.

## What You Need To Do

1. Install dependencies:
\`\`\`bash
cd mobile-app
npm install
\`\`\`

2. Install EAS CLI globally:
\`\`\`bash
npm install -g eas-cli
\`\`\`

3. Login to Expo (you can use your own account):
\`\`\`bash
eas login
\`\`\`

4. Build the Android App Bundle (AAB):
\`\`\`bash
eas build --platform android --profile production
\`\`\`

5. Wait for the build to complete (10-15 minutes)
6. Download the .aab file from the link Expo provides
7. Send the .aab file to the client

## App Details
- **App Name:** Hamboi MindCare
- **Package:** com.hamboimindcare.app
- **Platform:** Android (Google Play Store)
- **Build Type:** Android App Bundle (.aab)

## Configuration
All configuration is already set up in:
- `app.json` - App metadata and settings
- `eas.json` - Build configuration

No additional setup needed. Just run the commands above.

## Support
If you encounter any issues, the configuration is standard Expo setup. Refer to Expo documentation at docs.expo.dev
\`\`\`

\`\`\`json file="" isHidden
