import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator'
// import LoginPage from './screens/LoginPage'
// import MainPage from './screens/MainPage'

export default function App() {
  return (
    <View style={styles.screen}>
      <AppNavigator />
      {/* <LoginPage /> */}
      {/* <MainPage /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
