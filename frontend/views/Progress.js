'use strict'
import React from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet } from "react-native";
import { getImpactStats } from "../apis/progress";
import NavigationPanel from '../components/navigationPanel.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Progress extends React.Component { 
  constructor(props) {
    super(props);
  }

  render() { 
    return (
      <View style={styles.container}>

        <Text style={styles.title}>PROGRESS</Text>
        <Text style={styles.desc}>
          Welcome to the Progress section! Here you can see the 
          direct impact you have made on the planet depending 
          on the missions you have completed. Remember, every 
          small action can add up to make a big difference!
        </Text>
        <View style={styles.circlesWrapper}>
          <View style={styles.circle1}>
            <FetchImpact type='Animals'/>
            <Text style={styles.circleText}>Animals Saved</Text>
          </View>
          <View style={styles.circle2}>
            <FetchImpact type='Co2'/>
            <Text style={styles.circleText}>Co2</Text>
          </View>
        </View>
        <NavigationPanel navigation={this.props.navigation}/>
      </View>
    );
  }
 
}

// Need this to use onload hook
function FetchImpact(type) {
  const [getImpact1, setImpact1] = React.useState('N/A');
  const [getImpact2, setImpact2] = React.useState('N/A');

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('userid').then(id => {
        getImpactStats(id).then(resp => resp.json()).then(stat => {
          if (stat[0]) {
            setImpact1(stat[0]['animalssaved'])
            setImpact2(stat[0]['emissionsreduced'])
            return
          }
          setImpact1('N/A')
          setImpact2('N/A')
        });
      })
    }, [])
  );

  const textStyle = {fontSize: 25, marginTop: 35, color: 'white', fontWeight: 'bold'}
  return <Text style={textStyle}>{type['type']=="Animals" ? getImpact1 : getImpact2}</Text>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#747070",
    marginTop: 120,
  },
  desc: {
    margin: 30,
    textAlign: 'center',
    color: 'grey',
  },
  circlesWrapper:{
    flexDirection:'row',
  },
  circle1: {
    width: 120,
    height: 120,
    borderRadius: 120/2,
    alignItems: 'center',
    backgroundColor: '#F296B8',
 },
 circle2: {
  width: 120,
  height: 120,
  borderRadius: 120/2,
  alignItems: 'center',
  backgroundColor: '#98E396'
},
 circleText: {
   marginTop: 10,
   fontSize: 12,
   color: 'white',
 }
});