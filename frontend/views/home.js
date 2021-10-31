import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Landing extends React.Component { 
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    AsyncStorage.getItem('userid').then(item => console.log(item))
  }
  render() { 
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello (Need API for user's name)</Text>
        <Text style={styles.navigation} onPress={() => this.props.navigation.navigate('SignUp')}>Sign Up</Text>
        <Text style={styles.navigation} onPress={() => this.props.navigation.navigate('Login')}>Login</Text>
      </View>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginTop: 80
  },
  navigation: {
    fontSize: 20,
    marginTop: 80,
    textDecorationLine: 'underline'

  }
});