import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SymptomSurvey = props => {
  return (
    <View style={styles.screen}>
      <Text>Survey</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default SymptomSurvey;
