import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Button } from 'react-native';
import firebase from "firebase"

import { firebaseConfig } from '../config';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore();

class AdminDashboard extends React.Component{

    //Getting the current data
    getDate = ()  => {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); 
      var yyyy = today.getFullYear();
      today = mm + '-' + dd + '-' + yyyy;
      return today;
    }


  constructor(){
    super();

    this.state = {
      isLoading: true
    }



    this.state = {
      percentageSymptom: 0,
      percentageDidntFill: 0,
      users: []
    };
  }

  async componentDidMount() {


  var fetchData = new Promise(async (resolve, reject) => {

    const userRef= db.collection('users');
    const snapshot = await userRef.get();

    var lengthDoc = 0;

    snapshot.forEach(async (doc) => {
      //engthDoc = this.state.lengthDoc + 1
      //console.log(doc.id, '=>', doc.data());
      var name = doc.data().firstName + " " + doc.data().lastName;     
      var email = doc.data().email;

      const surveyRef = db.collection('users').doc(doc.id).collection('surveys').doc(this.getDate());

      const docSnap = await surveyRef.get();

      var symptom = "No";
      if (!docSnap.exists) {
      symptom = 'N/A'  
      console.log('No survey available')
      } else {
      var surveyAns = docSnap.data().surveyResponse;
      surveyAns.forEach(ans => {
        if (ans == 1)
          symptom = "Yes"
      })

      console.log("Experienced Symptoms?: " + symptom)
      
      }

      var userInfo = {key: this.state.lengthDoc, Name: name , Email: email, Symptoms: symptom};
      console.log("Info: => ", userInfo)

      this.state.users.push(userInfo);


      if (lengthDoc == snapshot.size - 1) {
        resolve();
      } else {
        lengthDoc  = lengthDoc + 1
      }


    })
    

  })


  fetchData.then((val) => {
    console.log("Finished")

    let n = 0;
    for(let i of this.state.users) {
      if(i.Symptoms == 'Yes') {
        n = n+1;
      }
    }
    n = Math.round(n*100/this.state.users.length);
    this.setState({percentageSymptom: n});

    n = 0;
    for(let i of this.state.users) {
      if(i.Symptoms == 'N/A') {
        n = n+1;
      }
    }
    n = Math.round(n*100/this.state.users.length);
    this.setState({percentageDidntFill: n});

    this.setState({
      isLoading: false
    })      

  });


    

}


  render() {
    return (
      <ScrollView>
        <View style={styles.screen}>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>{this.state.percentageSymptom}% of students are experiencing symptoms</Text>
        </View>
        <View style={styles.screen}>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>{this.state.percentageDidntFill}% of students did not fill the survey today</Text>
        </View>
        <View style={styles.screen}>
        {
          this.state.users.map((item) => {
            return (
              <View style={(item.Symptoms == 'No') ? styles.listNo : (item.Symptoms == 'Yes') ? styles.listYes : styles.listNone}>
                <Text style={styles.text1}>{item.Name}</Text>
                <Text style={styles.text}>Email: {item.Email}</Text>
                <Text style={styles.text}>Experiencing symptoms: {item.Symptoms}</Text>
              </View>
            );
          })
        }
        </View>
      </ScrollView>
    );
  }
}

export default AdminDashboard;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  text1: {
    fontWeight: 'bold',
    marginBottom: 7,
    fontSize: 18
  },
  text: {
    marginBottom: 5
  },
  listNo: {
    elevation: 5,
    paddingVertical: 17,
    paddingHorizontal: 22,
    borderRadius: 20,
    width: '98%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    backgroundColor: 'rgb(220, 255, 220)'
  },
  listYes: {
    elevation: 5,
    paddingVertical: 17,
    paddingHorizontal: 22,
    borderRadius: 20,
    width: '98%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    backgroundColor: 'rgb(255, 220, 220)'
  },
  listNone: {
    elevation: 5,
    paddingVertical: 17,
    paddingHorizontal: 22,
    borderRadius: 20,
    width: '98%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    backgroundColor: 'rgb(180, 180, 180)'
  }
});
