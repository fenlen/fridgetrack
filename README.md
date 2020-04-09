# Installation Instructions

End users only need to execute the .apk file on an Android phone and the application shall be installed. The minimum version requirement is Android 5.0 but 8.0 and above is recommended.

NB: While the application is written in JavaScript, which allows compilation and building for both Android and iOS, we can only provide instructions for Android. A prerequisite for compiling and building the app for iOS is XCode. XCode is only available on macOS and we simply did not have computers running macOS readily accessible during development. 

# Compilation

In order to compile and run the code for development purposes there are a few prerequisites:

* NodeJS - The latest LTS version should work. As of the time of writing this, that is v12.16.1. (v10.16.3 was used during development)
* A package manager - NPM, which comes automatically installed with NodeJS should work. (Yarn was our package manager of choice)
* Java SE Development Kit (JDK) - a recent version of the JDK. (Version 8 minimum)
* Python 2
* Watchman (only for Linux and Mac users)

In addition to that you will have to have an Android development environment set up. That 
includes:

* Android Studio
* Android SDK - Android Studio installs the latest one by default, we need version 28 specifically
* An Android Device - that could be a physical device with USB debugging turned on or an Emulator 
* To setup an Emulator: open Android studio and from there open the AVD Manager (Android virtual device manager) and create a virtual device, preferably with SDK Level 28.

After you have those installed, you will have to configure the ANDROID_HOME environment variable to point to the location the SDK was installed in. 

* For Windows users: that is straightforwardly done through the Command Panel. Under System and Security, click Change Settings , go to the Advanced Tab and click Edit Environment variables and create it. 

* For Linux and Mac users: The following lines need to be added either to .bashrc or .bash_profile:

export ANDROID_HOME= {path to the SDK}
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools


After this, navigate to the project root with your terminal of choice and type either 'npm install' or 'yarn', depending on which package manager you chose. After all the packages have been installed type one of these (they all do the same thing):

npx react-native run android
npm run android
yarn run android

This command may take a while but it does a few things:

* Opens your emulator, if you do not have one open or a device connected. 
* Compiles the application, installs it on your device and runs it. 
* Starts a Metro development server which will watch for changes in the project files and  serve an updated version to the application if there have been changes. 

Now you can work on the code and changes will be automatically reflected on the app running on your device. 

# Building An Executable .apk File

* To build an .apk file to install the app on a device without needing a development server running, first run this command while in the project root:

react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res

* Then navigate to the ./android folder. 'cd android'. And execute the 'gradlew' file with the 'assembleDebug' parameter. On Windows that looks like:

./gradlew assembleDebug

* After execution is finished the .apk file will be located in 

./android/app/build/outputs/apk/debug
