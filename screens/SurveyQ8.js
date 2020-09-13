import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const SurveyQ8 = props => {
  return (
    <View style={styles.screen}>

      <Text style={styles.title}>Severe muscle aches</Text>
      <View style={styles.container}>
        <TouchableOpacity style={{...styles.card, marginRight: 20}} onPress={() => props.navigation.navigate('Home')}>
          <Text style={{color: 'white'}}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => props.navigation.navigate('Home')}>
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
