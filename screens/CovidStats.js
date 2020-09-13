import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

class CovidStats extends Component {

  constructor() {
    super();
    this.state = {
        dataSource: {},
        input: ''
    };
  }

  componentDidMount = () => {
    this.apiCall('United States of America')
  }

  apiCall = (con) => {
    fetch("https://api.covid19api.com/summary")
      .then(response => response.json())
      .then((responseJson)=> {
        for (let countryInfo of responseJson.Countries) {
          if (countryInfo.Country == con) {
            this.setState({
              dataSource: countryInfo
            })
          }
        }
      })
      .catch(error=>console.log(error))
  }

  render() {
    this.apiCall();
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <TextInput
            style={styles.textInputContainer}
            placeholder="Country"
            onChangeText={text => this.setState({input: text})}
            value={this.state.input}
          />
          <Button 
            title="Search"
            onPress={() => {this.apiCall(this.state.input)}}
          />
        </View>
        <Text style={styles.text}>{this.state.dataSource.Country} has {this.state.dataSource.TotalConfirmed} confirmed cases, {this.state.dataSource.TotalDeaths} deaths, and {this.state.dataSource.TotalRecovered} recovered cases </Text>
      </View>
    );
  }
}

export default CovidStats;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-evenly"
  },
  text: {
    fontSize: 16
  },
  textInputContainer: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 0.8,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: '70%'
  }
});
