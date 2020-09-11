import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';

const LoginPage = props => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/people.jpg')} />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Welcome to your Symptom Tracker App</Text>
        <TextInput
          style={styles.textInputContainer}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <Text></Text>
        <TextInput
          style={styles.textInputContainer}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title='Login' 
          color='rgb(6,85,178)'
          onPress={() => props.navigation.navigate('Home')}
        />
      </View>
    </View>
  );
};

LoginPage.navigationOptions = {
  headerShown: false
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginTop: 40
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
    height: 373 * 392 / 649,
    width: 392
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
});

export default LoginPage;
