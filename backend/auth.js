import firebase from 'firebase'
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import LoginPage from '../screens/LoginPage'
import Register from '../screens/RegisterPage'
import MainPage from '../screens/MainPage'

import LoginScreen from '../screens/LoginScreen'
import DashboardScreen from '../screens/DashboardScreen'
import LoadingScreen from '../screens/LoadingScreen'

signIn = (email, password) => {

    auth()
        .signInWithEmailAndPassword(email , password)
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch(error => {
            if (error.code === 'auth/wrong-password') {
            console.log('You entered the wrong password');
            }

            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }

            console.error(error);
        });


}

createUser = (email, password) => {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }

            console.error(error);
        });
}

logout = () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}


export default {signIn, createUser, logout};