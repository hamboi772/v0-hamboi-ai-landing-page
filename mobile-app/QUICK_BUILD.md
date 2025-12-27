# Quick Build Commands

For experienced developers who just want the commands:

## Initial Setup (Once)

```bash
cd mobile-app
npm install
npm install -g eas-cli
eas login
eas build:configure
```

## Build AAB

```bash
eas build --platform android --profile production
```

## Build APK (for testing)

```bash
eas build --platform android --profile preview
```

## Check Build Status

```bash
eas build:list
```

## Download Latest Build

The download link will be provided in terminal after build completes, or check:
- https://expo.dev

## App Details

- Package Name: com.hamboi.mindcare
- Version: 1.0.0
- Features: Mood Tracker, Journal, Referral, Books, Voice Chat, Crisis Support

## New Features Added

This version includes all the latest features:
- Bottom tab navigation with 4 main tabs
- Mood tracker with 5 mood options
- Mental health journal with save/view entries
- Referral system with shareable code
- Book library with 7 readable books
- Direct links to hamboimindcare.site for full web features

Build time: ~15 minutes on EAS cloud servers.
