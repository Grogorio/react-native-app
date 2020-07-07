# BOD

React Native app to help users make reservations for their favourite bus rides.

| Branch |  Android | iOS |
|---|---|---|
| Master | [![Build status](https://build.appcenter.ms/v0.1/apps/5f9d504f-a05a-4a2d-bb1e-cbb0cb40c1fe/branches/master/badge)](https://appcenter.ms) | [![Build status](https://build.appcenter.ms/v0.1/apps/4f5cfc22-0605-4b21-8406-535bbaf14225/branches/master/badge)](https://appcenter.ms) |
| Development | [![Build status](https://build.appcenter.ms/v0.1/apps/5f9d504f-a05a-4a2d-bb1e-cbb0cb40c1fe/branches/development/badge)](https://appcenter.ms) | [![Build status](https://build.appcenter.ms/v0.1/apps/4f5cfc22-0605-4b21-8406-535bbaf14225/branches/development/badge)](https://appcenter.ms) |
| Staging | [![Build status](https://build.appcenter.ms/v0.1/apps/5f9d504f-a05a-4a2d-bb1e-cbb0cb40c1fe/branches/staging/badge)](https://appcenter.ms) | [![Build status](https://build.appcenter.ms/v0.1/apps/4f5cfc22-0605-4b21-8406-535bbaf14225/branches/staging/badge)](https://appcenter.ms) |
| Production | [![Build status](https://build.appcenter.ms/v0.1/apps/5f9d504f-a05a-4a2d-bb1e-cbb0cb40c1fe/branches/production/badge)](https://appcenter.ms) | [![Build status](https://build.appcenter.ms/v0.1/apps/4f5cfc22-0605-4b21-8406-535bbaf14225/branches/production/badge)](https://appcenter.ms) |

## Resources

- [**InVision**](https://projects.invisionapp.com/d/main#/projects/prototypes/13347424)
- [**Pildo Swagger**](https://ambbod-dev.herokuapp.com/swagger-ui.html)
- [**Pildo API endpoint**](https://ambbod-dev.herokuapp.com/)

## Commands

Before running it:

```sh
npm install
npm run build
# Or alternatively you can run it on watch mode:
npm run build:watch
```

Run it on **Android**: `npm run start:android`

Make sure you have an Android device on debug mode plugged into your computer or some emulator running.

Run it on **iOS**: `npm run start:ios`

Run it on Valudio's **iPhone**: `react-native run-ios --device "Valudio iPhone"`

## Google Maps API

The API key: AIzaSyAFQYdoiBFLlRy8lBAd7gCvFEr4w7uFS-k

We've used our Gmail account (development.valudio@gmail.com) in order to create it.

## Notice about package incompatibilities

It seems that `react-native+0.53.3` doesn't work well with `react-native-maps@0.20.1`.

We've also have a breaking change in `aws-amplify@0.2.11` so for the moment we're sticking with the `0.2.6` version until a fix is provided.

## Version bump

**Update:**
- package.json - version
- android/app/build.gradle - versionCode
- android/app/build.gradle - versionName
- ios/bod/info.plist - CFBundleShortVersionString
- ios/bod/info.plist - CFBundleVersion


## React Native Vector Icons

Bundled icon sets. [Browse all](https://oblador.github.io/react-native-vector-icons/).

## Push notifications

**Android**
It is very important to notice that notifications received while the app is suspended or killed won't be totally handled by `getInitialNotification`. You must rely on the custom keys to pass data. The title and the body will be shown in the toast. All the rest of the properties won't matter.
