import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

export default class Landing extends React.Component { 
  constructor(props) {
    super(props);
  }
  render() { 
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/landingPage.png')}
          resizeMode="cover" style={styles.background}>
          <View style={styles.loginButtons}>
            <Text style={styles.login} onPress={() => this.props.navigation.navigate('Login')}>Login</Text>
            <View style={styles.verticleLine}></View>
            <Text style={styles.signup} onPress={() => this.props.navigation.navigate('SignUp')}>Sign Up</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginTop: 120,
  },
  login: {
    fontSize: 20,
    marginTop: 780,
    marginRight: 15,
    color: '#4C494A',
    fontWeight: '500'
  },
  signup: {
    fontSize: 20,
    marginTop: 780,
    marginLeft: 15,
    color: '#4C494A',
    fontWeight: '500'
  },
  verticleLine: {
    marginTop: 770,
    height: '6%',
    width: 2,
    backgroundColor: '#4C494A',
  },
  loginButtons: {
    flexDirection: 'row'
  }
});