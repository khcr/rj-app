# Push notifications

Push notifications are sent using the [Ruby Plugin RPush](https://github.com/rpush/rpush) on the website.

RPush uses the Google Firebase API (see [console](https://console.firebase.google.com)) that is able to sent both to Android and iOS. 

You need to download the configuration files for Android/iOS in the Firebase console and place it in `app/App_Resources/Android` or `app/App_Resources/iOS`.

Firebase need the development and production iOS certificates to be uploaded in the console.

# Set up environment

You need:
- nvm to manager your node.js/npm versions, installed using homebrew
- nativescript CLI, installed using npm
- Xcode
- andoid SDK, installed via homebrew cask
- install the platform tools using sdkmanager CLI
- set JAVA_HOME and ANDROID_HOME correctly