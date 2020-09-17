# Covid Symptom Tracker
EC 463 Software MiniProject


## React Native Mobile App: Covid Symptom Tracker
This is a COVID19 related app that allow organizations to track their users symptoms through a daily symptom survey. 

#### User stories
* As a company I want to be able to track my employees symptoms to keep the workplace safe
* As an employee I want to let my supervisors know that I am not experiencing symptoms on a given day without sharing my information with anyone else.

### Authentication
All authenticaion was implemented through Google Firebase. Users can log into the app with email and password or using their Gmail. 

For registration, users will input their first name, last name, email, and password to be fully registered in the app. 

### Admin registration
Admins are manually selected. If the user is admin, they have access to the Admin Dashboard

### Admin Dashboard
Admin users have access to all Firebase user data. They will have access to whether the user has had symptoms on a given day, their first name, last name,and email.

### CovidAPI
The app provides users with COVID data by country through [publicly available COVID19 API](COVID19api.com)

### Testing 
The app has been fully tested. 

Issues that came up during testing
* Since we are using Expo, implementing the Google Sign-in brought issues since there needed to be an Android and iOS implementation. However, we solved this issue by creating the Google Sign in throguh the browser.
* Asynchronous tasks became an issue since for the Admin Dashboard, there needed to be multiple calls to the Firestore database. However, this was fixed by implementing Promises.
* Error handling was an issue with the login and registration page. When users input the wrong credentials or invalid information, the app will throw an error, however this error took up the entire screen. The solution to this was when the users tried to sign in or register, we caught the error and handled it by displaying it in the UI.

### Demo
[Mobile App Demo](https://youtu.be/WRs7Vjz7dAs)

### Symptom Survey
Users have the option to submit an 8 question symptom survey everyday that relate to COVID19 symptoms. After the user submits their final survey question, the results of the survey is sent to the Firebase Firestore. The results of the survey can only be accessed by the user and the admins.

### Logout
Once the user is done using the app, they can log out of their account


## Environment Setup
#### 1. Install the package manager 'npm'

#### 2. Install the Expo CLI
```
npm install -g expo-cli
```
## Running

#### 1. Clone or download the repository

#### 2. Install dependencies
Navigate to the folder and run
```
npm install
```

#### 3. Start app
Run
```
npm start
```

Then install the Expo client app on your iOS or Android phone and connect to the same wireless network as your computer. On Android, use the Expo app to scan the QR code from your terminal. On iOS, use the built-in QR code scanner of the Camera app.
