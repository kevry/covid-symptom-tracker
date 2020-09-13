import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const SymptomSurvey = props => {
  return (
    <View style={styles.screen}>

      <Text style={styles.title}>Are you experiencing any of the following symptoms?</Text>
      <Text style={styles.text}>Please Note: These questions pertain only to new symptoms that have arisen in the past 14 days.</Text>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={styles.card} onPress={() => props.navigation.navigate('Question 1')}>
          <Text style={{color: 'white'}}>Begin Survey</Text>
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
    marginBottom: 12
  },
  text: {
    fontSize: 16,
    marginBottom: 20
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
    shadowRadius: 1
  }
});

export default SymptomSurvey;
