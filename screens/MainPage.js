import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from "firebase"

class MainPage extends React.Component {

  state = {
    email: "",
    displayName: "",
    content: null
  }

  componentDidMount() {
    const {email, displayName} = firebase.auth().currentUser;
    this.setState({email, displayName})

    if (1) { // add "if admin" condition
    this.state.content = <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('Admin Dashboard')}>
      <View>
        <Text>Admin Dashboard</Text>
      </View>
    </TouchableOpacity>
    }
  }

  logout = () => {
    firebase.auth()
        .signOut()
        .then(() => console.log('User signed out!'));
  }

  render() {
    return (
      <View style={styles.screen}>
       
        <Text style={styles.hello}> Hello {this.state.email} </Text>
      
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
