# My Universal React Project

<p>
  <!-- iOS -->
  <a href="https://itunes.apple.com/app/apple-store/id982107779">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <!-- Android -->
  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <!-- Web -->
  <a href="https://docs.expo.dev/workflow/web/">
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </a>
</p>

## 🚀 How to use

- Install packages with `yarn` or `npm install`.
  - If you have native iOS code run `npx pod-install`
- Run `yarn start` to start the bundler.
- Open the project in a React runtime to try it:
  - iOS: [Client iOS](https://itunes.apple.com/app/apple-store/id982107779)
  - Android: [Client Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample)
  - Web: Any web browser

## Adding Native Code

This project can be run from a web browser or the Expo client app. You may find that you want to add more native code later on. You can do this by ejecting the project and rebuilding it yourself.

- Run `yarn eject` to create the native projects.
- You can still run your project in the web browser or Expo client, you just won't be able to access any new native modules you add.

## Publishing

- Deploy the native app to the App store and Play store using this guide: [Deployment](https://docs.expo.dev/distribution/app-stores/).
- Deploy the website using this guide: [Web deployment](https://docs.expo.dev/distribution/publishing-websites/).

## Features
 - Authentication handled with firebase auth
 - Forms handled with formik

## Feature Wish-list
- Upload Custom Profile Photo
## Getting Started
```
npm start
```
or
```
open -a Simulator && expo start
```
## Uses
 - [tailwind-react-native-classnames](https://github.com/jaredh159/tailwind-react-native-classnames)
 - [Icons from Icons8](https://icons8.com/)
 - Formik for front-end validation
 - Firebase storage (same as web app)
 - Nativebase components
 - react-native-css-transformer, which transforms CSS into a React Native-compatible style object and handles live reloading
 - babel-plugin-react-native-platform-specific-extensions, which transforms ES6 import statements into platform-specific require statements if the platform specific files exist on disk.
 - babel-plugin-react-native-classname-to-style, which transforms the className property into a style property

## ToDo
- Instead of prop drilling navigation, use react-navigation-hooks

## 📝 Notes
 - Currently assigns each user that signs up a random profilePicture from randomUser.me