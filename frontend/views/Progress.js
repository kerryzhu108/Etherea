'use strict'
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class Progress extends React.Component { 
  constructor(props) {
    super(props);
  }
  render() { 
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.desc}>
          Welcome to the Progress section! Here you can see the 
          direct impact you have made on the planet depending 
          on the missions you have completed. Remember, every 
          small action can add up to make a big difference!
        </Text>
        <View style={styles.circlesWrapper}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>Animals Saved</Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.circleText}>Co2</Text>
          </View>
        </View>
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
  desc: {
    margin: 30,
    textAlign: 'center',
  },
  circlesWrapper:{
    flexDirection:'row',
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 120/2,
    backgroundColor: 'green',
    alignItems: 'center',
 },
 circleText: {
   top: 20,
   fontSize: 12,
   color: 'white',
 }
});