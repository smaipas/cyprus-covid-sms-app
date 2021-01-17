# Cyprus Covid SMS Application
Request SMS permission to move during Covid curfew without having to memorize all sms codes and then copy and paste or even write manually the code ID/ARC/Passport no. and the zip code to get an approval to get out of home.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Build app for android
This application uses capacitor.js and cordova to support sending SMS.
Capacitor documentation can be found on the following link:
https://capacitorjs.com/docs/basics/building-your-app

Build your app:
```
npm run build
```
Once your web code is built, it needs to be copied into each native project:
```
npm run build:cap
```
Android relies on Android Studio (or, optionally, the Android CLI tools) to build the app:
```
npm run build:android
```
Once Android Studio launches, you can build your app through the standard Android Studio workflow.