'use strict'
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class Landing extends React.Component { 
  constructor(props) {
    super(props);
  }
  render() { 
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Impact stats</Text>
      </View>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontSize: 30,
    marginTop: 120,
  },
  navigation: {
    fontSize: 20,
    marginTop: 80,
    textDecorationLine: 'underline'

  }
});