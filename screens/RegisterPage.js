import { app } from '../App';
import React, {Component} from 'react'
import { StyleSheet, Text, View, Image, Button, TextInput, Dimensions, TouchableOpacity} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import firebase from "firebase"

import { firebaseConfig } from '../config';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore();


class Register extends React.Component {

    state = {firstName: "", lastName: "", email: "", password: "", errorMessage: null};
    
    createUser = () => {

        const {firstName, lastName, email, password} = this.state;
        

        firebase.auth()
        
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                console.log('User account created & signed in!');
                userCredentials.user.updateProfile({
                    displayName: this.state.firstName + " " + this.state.lastName
                })

                //Adding the user information to cloud firestore
                const userRef = db.collection("users").doc(userCredentials.user.uid).set({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    admin: 0
                })

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                }
    
                if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                }

                this.setState({errorMessage: error.message})
    
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../assets/people.jpg')} />
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>Welcome to your Symptom Tracker App</Text>

                    <TextInput
                    style={styles.textInputContainer}
                    placeholder="First Name"
                    onChangeText={firstName => this.setState({firstName})}
                    value={this.state.firstName}
                    />

                    <TextInput
                    style={styles.textInputContainer}
                    placeholder="Last Name"
                    onChangeText={lastName => this.setState({lastName})}
                    value={this.state.lastName}
                    />


                    <TextInput
                    style={styles.textInputContainer}
                    placeholder="Email"
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                    />
                    

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
                    title='Register' 
                    color='rgb(6,85,178)'
                    onPress={ () => this.createUser()}
                    />
                </View>

                <TouchableOpacity 
                    style={{alignSelf: "center", marginTop: 32}} 
                    onPress = {() => this.props.navigation.navigate("LoginScreen")}
                >
                    <Text style={{ color: "#414959", fontSize: 13}}>
                        Have an account? <Text style={{fontWeight: "500", color: "#E9446A"}}> Sign In</Text>
                    </Text>
                </TouchableOpacity>


            </View>
        )
    }
}

Register.navigationOptions = {
    headerShown: false
  };

export default Register;

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
