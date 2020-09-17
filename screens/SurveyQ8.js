import { app } from '../App';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import firebase from "firebase"


//SurveyQ8 is the final step of the surbey process
const SurveyQ8 = props => {

  const db = firebase.firestore();

  //Accessing the firebase user UID
  const {uid} = firebase.auth().currentUser;
  const answers = props.navigation.getParam('answers', 'Nothing')
  
  //Getting the current data
  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '-' + dd + '-' + yyyy;
    return today;
  }

  //final No response
  const answerNo = () => {
    answers[7] = 0
    const userSurvey = db.collection("users").doc(uid).collection("surveys").doc(getDate()).set({
      surveyResponse: answers
    })
    props.navigation.navigate('Home')
  }

  //final No response
  const answerYes = () => {
    // upload a "yes" answer to firebase
    answers[7] = 1
    const userSurvey = db.collection("users").doc(uid).collection("surveys").doc(getDate()).set({
      surveyResponse: answers
    })
    props.navigation.navigate('Home')
  }

  return (
    <View style={styles.screen}>

      <Text style={styles.title}>Severe muscle aches</Text>
      <View style={styles.container}>
        <TouchableOpacity style={{...styles.card, marginRight: 20}} onPress={answerNo}>
          <Text style={{color: 'white'}}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={answerYes}>
          <Text style={{color: 'white'}}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 30
  },
  container: {
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center"
  },
  card: {
    elevation: 5,
    backgroundColor: 'rgb(6,85,178)',
    paddingVertical: 17,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    width: '35%',
    alignItems: "center"
  }
});

export default SurveyQ8;
