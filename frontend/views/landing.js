import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import NavigationPanel from '../components/navigationPanel.js';

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
            <Text style={styles.navigation} onPress={() => this.props.navigation.navigate('Login')}>Login</Text>
            <Text style={styles.navigation} onPress={() => this.props.navigation.navigate('SignUp')}>Sign Up</Text>
          </View>
          <NavigationPanel navigation={this.props.navigation}/>
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
  navigation: {
    fontSize: 20,
    marginTop: 480,
    textDecorationLine: 'underline',
    marginRight: 15,
  },
  loginButtons: {
    flexDirection: 'row'
  }
});