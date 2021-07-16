<h1 align="center"><b> Marketplace React Native App </b> </h1>

<p align="center">A minimal, clean and beautiful mobile app to help people find the jobs to book and change the world.</p>

<p align="center"><i>"How to save a life?"-The Shoping Job</i> </p>

<p align="center">
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/progress-40%25-brightgreen.svg" alt="PRs Welcome">
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/contribuition-welcome-brightgreen.svg" alt="PRs Welcome">
  </a>
  <a href="https://saythanks.io/to/wendelfreitas">
      <img src="https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg">
  </a>
<a href="https://www.repostatus.org/#wip"><img src="https://www.repostatus.org/badges/latest/wip.svg" alt="Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public." /></a>  
</p>

<p align="center">
  <a href="#blush-overview">Overview</a> •
  <a href="#dizzy-roadmap">Roadmap</a> •
  <a href="#wrench-install-instructions">Install</a> •
  <a href="#zap-tech-stack">Tech Stack</a> •
  <a href="#iphone-Test">Test</a> •
  <a href="#eyes-version">Version</a> 
</p>

<p align="center">
  <kbd>
    <img width="240" style="border-radius: 5px" height="450" src="images/1.png" alt="1">
  </kbd>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <kbd>
    <img width="240" style="border-radius: 5px" height="450" src="images/2.png" alt="2">
  </kbd>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <kbd>
    <img width="240" style="border-radius: 5px" height="450" src="images/3.png" alt="3">
  </kbd>
  <br/><br/>
  <kbd>
    <img width="240" style="border-radius: 5px" height="450" src="images/4.png" alt="4">
  </kbd>
    &nbsp;&nbsp;&nbsp;&nbsp;
  <kbd>
    <img width="240" style="border-radius: 5px" height="450" src="images/5.png" alt="5">
  </kbd>
    &nbsp;&nbsp;&nbsp;&nbsp;
  <kbd>
    <img width="240" style="border-radius: 5px" height="450" src="images/6.png" alt="6">
  </kbd>
    <br/><br/>
  <kbd>
    <img width="240" style="border-radius: 5px" height="450" src="images/7.png" alt="7">
  </kbd>
    &nbsp;&nbsp;&nbsp;&nbsp;
  <kbd>
    <img width="240" style="border-radius: 5px" height="450" src="images/8.png" alt="8">
  </kbd>
    &nbsp;&nbsp;&nbsp;&nbsp;
</p>

## :blush: **Overview?**

MarketPlace is the shoping app to find a job both employer and worker. It will be very comfortable to search jobs in Singapore and Malaysia.

## :dizzy: **Roadmap**

-   [x] Make it work on IOS
-   [x] Make it work on Android
-   [x] Make it work on Typescript
-   [x] Payment Integration
-   [x] Search Job
-   [x] Transform into responsive
-   [x] Update to latest React Native version

## :wrench: **Install instructions**

### Getting Started

#### 1) Clone & Install Dependencies

- 1.1) `git clone https://github.com/funnyjerry/marketplace.git`
- 1.2) `cd marketplace` - cd into your newly created project directory.
- 1.3) Install NPM packages with `yarn install`
        **Note:** NPM has issues with React Native so `yarn` is recommended over `npm`.
- 1.4) **[iOS]** `cd ios` and run `pod install` - if you don't have CocoaPods you can follow [these instructions](https://guides.cocoapods.org/using/getting-started.html#getting-started) to install it.
- 1.5) **[Android]** If you haven't already generated a `debug.keystore` file you will need to complete this step from within the `/android/app` folder. Run `keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000`

#### 2) Start your app

- 2.1) **[iOS]** Build and run the iOS app, run `react-native run-ios` (to run on simulator) or `react-native run-ios --device` (to run on real device) from the root of your project. The first build will take some time.
- 2.2) **[Android]** If you haven't already got an android device attached/emulator running then you'll need to get one running (make sure the emulator is with Google Play / APIs). When ready run `react-native run-android` from the root of your project.

## :zap: **Tech Stack**

<h1 align="center">
  <img src="https://apprecs.org/gp/images/app-icons/300/d8/host.exp.exponent.jpg" alt="Stack" height="100" width="100">
  <img src="https://ionicframework.com/docs/assets/icons/logo-react-icon.png" alt="Stack" height="100" width="100">
  <img src="https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-512.png" alt="Stack" height="100" width="100">
  <img src="https://icon-library.net/images/png-map-icon/png-map-icon-26.jpg" alt="Stack" height="100" width="100">
  <img src="https://cdn.iconscout.com/icon/free/png-512/facebook-logo-2019-1597680-1350125.png" alt="Stack" height="100" width="100">

  <br>
</h1>

-   [React Native](https://github.com/facebook/react-native)
-   [Eslint](https://eslint.org/)
-   [Redux](https://github.com/reduxjs/react-redux)
-   [Formik + Yup](https://jaredpalmer.com/formik/)
-   [Redux-Persist](https://github.com/rt2zz/redux-persist)
-   [Antd Mobile RN](https://github.com/ant-design/ant-design-mobile-rn)
-   [Lottie React Native](https://github.com/react-native-community/lottie-react-native)
-   [React Native Firebase](https://github.com/invertase/react-native-firebase)

## :iphone: **Test**

- [x] Test on Android
- [x] Test on iOS

## :eyes: **Version**
- [ ] React-Native 
- [x] Expo 35
