import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class Landing extends React.Component { 
  constructor(props) {
    super(props);
  }
  render() { 
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Etherea</Text>
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