import React, {Component}from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import firebase from "firebase";


class LoadingScreen extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user)
                this.props.navigation.navigate("App");
            else
                this.props.navigation.navigate("Auth");
        })
    }

    render() {
        return (
            <View style={StyleSheet.container}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
