'use strict'
import React from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getImpactStats } from "../apis/progress";
import { Calendar } from 'react-native-calendars';
import NavigationPanel from '../components/navigationPanel.js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentTheme, getAllThemes } from "../apis/tasks";

export default class Progress extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
        impact: "0",
        stat: ""
    }
  }

  setStatName = async () => {
    // Set the user's currently chosen theme
    const theme = await getCurrentTheme();
    let allThemes = await getAllThemes();
    allThemes = await allThemes.json()
    allThemes.map(themeDetails=>{
      console.log(themeDetails)
      if(themeDetails["id"] == theme){
        this.setState({
          stat: themeDetails["statname"]
        })
        return
      }
    })
  }

  async componentDidMount() {
      // Set user impact stats by changing the React state
      const user_id = await AsyncStorage.getItem("userid");
      const impact = await getImpactStats(user_id);
      this.setState({
          impact: impact
      });
      this.setStatName()
  }

  render() { 
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>PROGRESS</Text>
        <Text style={styles.desc}>
          Welcome to the Progress section! Here you can see the 
          direct impact you have made on the planet depending 
          on the missions you have completed. Remember, every 
          small action can add up to make a big difference!
        </Text>
        <View style={styles.circlesWrapper}>
          <View style={styles.circle2}>
            <Text style={styles.textStyle}>{this.state.impact}</Text>
            <Text style={styles.circleText}>{this.state.stat}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Missions Completed</Text>
        <View style={styles.rectanglesWrapper}>
          <View style={styles.rectangle}>
            <Text style={styles.rectanglesText}>S</Text>
          </View>
          <View style={styles.rectangle}>
            <Text style={styles.rectanglesText}>M</Text>
          </View>
          <View style={styles.rectangle}>
            <Text style={styles.rectanglesText}>T</Text>
          </View>
          <View style={styles.rectangle}>
            <Text style={styles.rectanglesText}>W</Text>
          </View>
          <View style={styles.rectangle}>
            <Text style={styles.rectanglesText}>TH</Text>
          </View>
          <View style={styles.rectangle}>
            <Text style={styles.rectanglesText}>F</Text>
          </View>
          <View style={styles.rectangle}>
            <Text style={styles.rectanglesText}>ST</Text>
          </View>
        </View>
          <View style={{ paddingTop: 10, paddingBottom: 80, flex: 1 }}>
          <Calendar
            // Set minimum date to be first day of month
            minDate={getFirstDay()}
            // Set maximum date to be last day of month
            maxDate={getLastDay()}
            hideArrows={true}
            disableMonthChange={true}
            firstDay={1}
          />
        </View>
        <NavigationPanel navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    );
  }
}

function getFirstDay(){
  let date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();
  
  let numericalMonth = month + 1;

  let yearString = String(year);
  let monthString = String(numericalMonth);
  yearString = yearString.concat("-");
  monthString = monthString.concat("-");
  yearString = yearString.concat(monthString);
  yearString = yearString.concat("1");
  return yearString;
}

function getLastDay(){
  let date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();

  let numericalMonth = month + 1;

  let yearString = String(year);
  let monthString = String(numericalMonth);
  yearString = yearString.concat("-");
  monthString = monthString.concat("-");
  yearString = yearString.concat(monthString);

  let long_months = [1, 3, 5, 7, 8, 10, 12];
  let short_months = [4, 6, 9, 11]
  if(long_months.includes(numericalMonth)){
    yearString = yearString.concat("31");
  }else if(short_months.includes(numericalMonth)){
    yearString = yearString.concat("30");
  }else{
    if((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)){
      yearString = yearString.concat("29");
    }else{
      yearString = yearString.concat("28");
    }
  }
  return yearString
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  textStyle: {
      fontSize: 25,
      marginTop: 35,
      color: "white",
      fontWeight: "bold"
  },
  scrollView: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#747070",
    marginTop: 100,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#747070",
    marginTop: 15,
    textAlign: 'center'
  },
  desc: {
    margin: 30,
    marginTop: 5,
    textAlign: 'center',
    color: 'grey',
  },
  circlesWrapper:{
    flexDirection:'row',
  },
  circle1: {
    width: 120,
    height: 120,
    margin: 10,
    marginTop: -20,
    borderRadius: 120/2,
    alignItems: 'center',
    backgroundColor: '#F296B8',
    textAlign: 'center',
    flex: 1
 },
 circle2: {
  width: 120,
  height: 120,
  margin: 10,
  marginTop: -20,
  borderRadius: 120/2,
  alignItems: 'center',
  backgroundColor: '#98E396',
  flex: 1
},
 circleText: {
   marginTop: 20,
   fontSize: 14,
   color: 'white',
   fontWeight: 'bold',
 },
 rectanglesWrapper:{
  flexDirection:'row',
},
rectangle:{
  width: 27,
  height: 100,
  borderRadius: 60,
  margin: 5,
  alignItems: 'center',
  backgroundColor: '#dcdcdc',
  textAlign: 'center',
  flex: 1
},
rectanglesText: {
  fontSize: 12,
  fontWeight: 'bold',
  marginTop: 81,
  color: 'black',
},
});