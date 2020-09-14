import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator'

import { createAppContainer, createSwitchNavigator   } from 'react-navigation'
import { createStackNavigator, TransitionPresets} from 'react-navigation-stack';

import LoginScreen from './screens/LoginScreen'
import LoadingScreen from './screens/LoadingScreen'
import Register from './screens/RegisterPage'

import MainPage from './screens/MainPage'
import SymptomSurvey from './screens/SymptomSurvey'
import CovidStats from './screens/CovidStats'
import SurveyQ1 from './screens/SurveyQ1'
import SurveyQ2 from './screens/SurveyQ2'
import SurveyQ3 from './screens/SurveyQ3'
import SurveyQ4 from './screens/SurveyQ4'
import SurveyQ5 from './screens/SurveyQ5'
import SurveyQ6 from './screens/SurveyQ6'
import SurveyQ7 from './screens/SurveyQ7'
import SurveyQ8 from './screens/SurveyQ8'

import * as firebase from 'firebase'
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig)
// import LoginPage from './screens/LoginPage'
// import MainPage from './screens/MainPage'

const AuthStack = createStackNavigator({
  LoginScreen: LoginScreen,
  Register: Register
})

const AppStack = createStackNavigator({
  'Home': MainPage,
  'Daily Symptom Survey': SymptomSurvey,
  'COVID-19 Statistics': CovidStats,
  'Question 1': SurveyQ1,
  'Question 2': SurveyQ2,
  'Question 3': SurveyQ3,
  'Question 4': SurveyQ4,
  'Question 5': SurveyQ5,
  'Question 6': SurveyQ6,
  'Question 7': SurveyQ7,
  'Question 8': SurveyQ8,
})

export default createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "LoadingScreen"
    }
  )
)




