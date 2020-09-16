import { app } from '../App';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from "firebase"

import { firebaseConfig } from '../config';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore();

class MainPage extends React.Component {

  state = {
    email: "",
    displayName: "",
    content: null,
    uid: "",
    firstName: "",
    lastName: "",
    admin: 0
  }

  componentDidMount() {
    const {email, displayName, uid} = firebase.auth().currentUser;
    this.setState({email, displayName, uid})

    const userRef= db.collection('users').doc(uid);
    userRef.get().then((doc) => {

      if (doc.exists) {
        console.log("Document data of user:", doc.data());
        var firstName = doc.data().firstName;
        var lastName = doc.data().firstName;
        var admin = doc.data().admin;
        this.setState({firstName, lastName, admin})

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

      if (this.state.admin) { // add "if admin" condition
        var content = <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('Admin Dashboard')}>
          <View>
            <Text>Admin Dashboard</Text>
          </View>
        </TouchableOpacity>

        this.setState({content})
      }

    })

  }

  logout = () => {
    firebase.auth()
        .signOut()
        .then(() => console.log('User signed out!'));
  }

  render() {
    return (
      <View style={styles.screen}>
       
        <Text style={styles.hello}> Hello {this.state.displayName} </Text>
   
        <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('Daily Symptom Survey')}>
          <View>
            <Text>Daily Symptom Survey</Text>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('COVID-19 Statistics')}>
          <View>
            <Text>COVID-19 Statistics</Text>
          </View>
        </TouchableOpacity>

        {this.state.content}
  
        <TouchableOpacity style={styles.card} onPress={() => this.logout()}>
          <View>
            <Text>Logout</Text>
          </View>
        </TouchableOpacity>
  
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "flex-start",
    padding: 10,
    marginTop: 10
  },
  card: {
    elevation: 5,
    backgroundColor: 'white',
    paddingVertical: 17,
    paddingHorizontal: 22,
    borderRadius: 20,
    width: '90%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1
  },
  hello: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default MainPage;
