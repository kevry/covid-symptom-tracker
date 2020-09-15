import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Button } from 'react-native';

class AdminDashboard extends Component {

  constructor() {
    super();
    this.state = {
      percentageSymptom: 0,
      percentageDidntFill: 0,
      users: [
        {key: 1, Name: 'Student 1', Email: 'student1@bu.edu', Symptoms: 'No'},
        {key: 2, Name: 'Student 2', Email: 'student2@bu.edu', Symptoms: 'Yes'},
        {key: 3, Name: 'Student 3', Email: 'student3@bu.edu', Symptoms: ''},
        {key: 4, Name: 'Student 4', Email: 'student4@bu.edu', Symptoms: 'No'},
        {key: 5, Name: 'Student 5', Email: 'student5@bu.edu', Symptoms: 'No'},
        {key: 6, Name: 'Student 6', Email: 'student6@bu.edu', Symptoms: 'Yes'},
        {key: 7, Name: 'Student 7', Email: 'student7@bu.edu', Symptoms: 'No'},
        {key: 8, Name: 'Student 8', Email: 'student8@bu.edu', Symptoms: 'No'},
        {key: 9, Name: 'Student 9', Email: 'student9@bu.edu', Symptoms: 'No'},
      ]
    };
  }

  componentDidMount() {
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
      if(i.Symptoms == '') {
        n = n+1;
      }
    }
    n = Math.round(n*100/this.state.users.length);
    this.setState({percentageDidntFill: n});
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
