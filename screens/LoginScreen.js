import React, {Component} from 'react'
import { StyleSheet, Text, View, Image, Button, TextInput, Dimensions, TouchableOpacity} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import Expo from 'expo'
import * as Google from 'expo-google-app-auth';

import firebase from "firebase"

import { firebaseConfig } from '../config';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore();


class LoginScreen extends React.Component {

    state = {email: "", password: "", errorMessage: null};

    onSignIn = (googleUser) => {
      console.log('Google Auth Response', googleUser);
      // We need to register an Observer on Firebase Auth to make sure auth is initialized.
      var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
              );
          // Sign in with credential from the Google user.
          firebase.auth().signInWithCredential(credential).then(() => {
            console.log("User logged with Google!");
            const {uid} = firebase.auth().currentUser;
            
            //Adding the user information to cloud firestore
            const userRef = db.collection("users").doc(uid).set({
                firstName: googleUser.user.givenName,
                lastName: googleUser.user.familyName,
                email: googleUser.user.email,
                admin: 0,
            })

          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
      );
    }

    isUserEqual = (googleUser, firebaseUser) => {
      if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
          if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()) {
            // We don't need to reauth the Firebase connection.
            return true;
          }
        }
      }
      return false;
    }

    //Google Sign in
    signInWithGoogleAsync = async()  => {
      try {
        const result = await Google.logInAsync({
          behavior: 'web',
          androidClientId: '442367035141-390rcqr1cflsqo1bptg63530qr0p3qsl.apps.googleusercontent.com',
          iosClientId: '442367035141-8m3qrt7f0rgjejmfr5utmjcc5lop47jm.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
        });
    
        if (result.type === 'success') {
          this.onSignIn(result);
          return result.accessToken;
        } else {
          return { cancelled: true };
        }
      } catch (e) {
        return { error: true };
      }
    }
  
    signIn = () => {
        const {email, password} = this.state;

        console.log("Email: " + email);
        console.log("Password: " + password);

        firebase.auth()
            .signInWithEmailAndPassword(email , password)
            .catch(error => this.setState({errorMessage: error.message}));
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../assets/people.jpg')} />
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>Welcome to your Symptom Tracker App</Text>

                    <View style={styles.errorMessage}> 
                      {this.state.errorMessage && <Text style={styles.errorMessage, {fontWeight: "500", color: "#E9446A"}}>{this.state.errorMessage}</Text>}
                    </View>

                    <Text></Text>


                    <TextInput
                    style={styles.textInputContainer}
                    placeholder="Email"
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                    />
                    
                    <Text></Text>

                    <TextInput
                    style={styles.textInputContainer}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    />      

                </View>
                
                <View style={styles.buttonContainer}>
                    <Button 
                    title='Login' 
                    color='rgb(6,85,178)'
                    onPress={ () => this.signIn()}
                    />
                </View>

                <TouchableOpacity 
                    style={{alignSelf: "center", marginTop: 32}} 
                    onPress = {() => this.props.navigation.navigate("Register")}
                >
                    <Text style={{ color: "#414959", fontSize: 13}}>
                        Don't have an account? <Text style={{fontWeight: "500", color: "#E9446A"}}> Sign Up</Text>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{alignSelf: "center", marginTop: 32}} 
                    onPress = {() => this.signInWithGoogleAsync()}
                >
                    <Text style={{ color: "#414959", fontSize: 13}}>
                        Signed up with a Google Account? <Text style={{fontWeight: "500", color: "#E9446A"}}> Click here</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

LoginScreen.navigationOptions = {
    headerShown: false
  };

export default LoginScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        marginTop: 50
      },
      container: {
        alignItems: 'center',
        marginBottom: 20,
        width: '80%'
      },
      textInputContainer: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 0.8,
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 15
      },
      image: {
        justifyContent: 'center',
        height: 291 * windowWidth / 649,
        width: windowWidth
      },
      buttonContainer: {
        marginBottom: 30,
        width: '40%'
      },
      title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20
      }
})
