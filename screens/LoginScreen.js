import React, {Component} from 'react'
import { StyleSheet, Text, View, Image, Button, TextInput, Dimensions, TouchableOpacity} from 'react-native';
const windowWidth = Dimensions.get('window').width;

import firebase from "firebase"

class LoginScreen extends React.Component {

  
    state = {email: "", password: "", errorMessage: null};
  
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
                      {this.state.errorMessage && <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>}
                    </View>


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
