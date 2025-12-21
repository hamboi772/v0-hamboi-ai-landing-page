# Building Hamboi Mindcare APK for Play Store

## Prerequisites

1. Install Node.js (https://nodejs.org)
2. Install Expo CLI: `npm install -g expo-cli eas-cli`
3. Create Expo account at https://expo.dev

## Step-by-Step Build Process

### 1. Install Dependencies

```bash
cd mobile-app
npm install
```

### 2. Login to Expo

```bash
eas login
```

### 3. Configure the Project

```bash
eas build:configure
```

### 4. Build APK for Play Store

```bash
eas build --platform android --profile production
```

This will:
- Upload your code to Expo servers
- Build the APK in the cloud
- Provide a download link when complete (takes 10-20 minutes)

### 5. Download Your APK

After the build completes, you'll get a download link. Download the APK file.

### 6. Test the APK

- Transfer the APK to your Android phone
- Install it
- Test all features (chat, resources, crisis support)

### 7. Upload to Play Store

1. Go to https://play.google.com/console
2. Create a new app
3. Fill in app details:
   - App name: Hamboi Mindcare
   - Description: Mental health support for Nigerian teenagers
   - Category: Health & Fitness
4. Upload your APK
5. Add screenshots (take them from your phone)
6. Submit for review

## Quick Build (Preview APK)

For a faster build to test:

```bash
eas build --platform android --profile preview
```

This creates an APK you can install directly without Play Store.

## Troubleshooting

**Build fails?**
- Make sure you're logged in: `eas whoami`
- Check your internet connection
- Try: `eas build --platform android --profile production --clear-cache`

**APK won't install on phone?**
- Enable "Install from Unknown Sources" in Android settings
- Make sure you have Android 5.0 or higher

## Support

Need help? Contact Expo support at https://expo.dev/support
