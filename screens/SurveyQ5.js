import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const SurveyQ5 = props => {

  const answers = props.navigation.getParam('answers', 'Nothing')

  const answerNo = () => {
    // upload a "no" answer to firebase
    answers[4] = 0
    props.navigation.navigate('Question 6', {answers: answers})
  }

  const answerYes = () => {
    // upload a "yes" answer to firebase
    answers[4] = 1
    props.navigation.navigate('Question 6', {answers: answers})
  }

  return (
    <View style={styles.screen}>

      <Text style={styles.title}>New loss of taste or smell</Text>
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

export default SurveyQ5;
