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

        <TouchableOpacity style={{marginTop: 80}} onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
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
  }
});