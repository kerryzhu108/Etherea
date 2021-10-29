'use strict'
import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground} from "react-native";


const domain = 'https://etherea-dev.herokuapp.com/'
const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}



const DATA = [
  {
    pos: 4,
    name: 'Andy',
    level: 2,
    points: 120
  },
  {
    pos: 5,
    name: 'Morgan',
    level:2,
    points: 117
  },
  {
    pos: 6,
    name: 'Kerry',
    level: 1,
    points: 112
  },
  {
    pos: 7,
    name: 'Tanmay',
    level: 1,
    points: 110
  },
  {
    pos: 4,
    name: 'Andy',
    level: 2,
    points: 120
  },
  {
    pos: 5,
    name: 'Morgan',
    level:2,
    points: 117
  },
  {
    pos: 6,
    name: 'Kerry',
    level: 1,
    points: 112
  },
  {
    pos: 7,
    name: 'Tanmay',
    level: 1,
    points: 110
  }
];

const Item = ({ pos, name, level, points }) => (
  <View style={styles.item}>
    <Text style={styles.itemTextRank}>{pos}</Text>
    <Text style={styles.itemTextName}>{name}</Text>
    <ImageBackground source={require('../assets/leaderboardLevelBanner.png')} style={styles.imageLevelBackground}>
      <Text style={styles.itemTextLevel}>{level}</Text>
    </ImageBackground>
    <Text style={styles.itemTextPoints}>{points}</Text>
    <Text style={styles.itemTextPointsLetter}>pts</Text>

  </View>
);

export default class Leaderboard extends React.Component {

  /*state = {data: []}
  componentWillMount() {
    //return 
    console.log("Here")
    const inputObject = (fetch(domain + 'leaderboard', {
      method: 'GET',
      headers: defaultHeaders
    }))   
    this.setState({data: inputObject })
  } */
  constructor(props) {
    super(props);
  }
  
  render() { 
    const renderItem = ({ item }) => (
      <Item pos={item.pos} name={item.name} level={item.level} points={item.points}/>
    );
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/leaderboardBackground.png')} resizeMode="cover" style={styles.imageScreenBackground}>
            <Text style={styles.title}>LEADERBOARD</Text>
            <View style={styles.topThreeView}>

            </View>
            <FlatList    
              style={styles.list}
              data={DATA}
              renderItem={renderItem}
              initialNumToRender={5}   
            />
        </ImageBackground>
      </View>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageScreenBackground: {
    flex: 1
  },
  imageLevelBackground: {
    flex: 1,
    justifySelf: "center",
    resizeMode: "cover",
    flex: 1,
    alignSelf: "center",
  },
  item:{
    width: '90%',
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 2.75,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: '1%',
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#F296B8"
  },
  itemTextRank:{
    fontSize: 20,
    color: "white",
    fontFamily:"Poppins",
    flex: 1,
    alignSelf: "center",
  },
  itemTextName:{
    fontSize: 14,
    color: "white",
    fontFamily:"Poppins",
    alignSelf: "center",
    flex: 3
  },
  itemTextLevel:{
    fontSize: 20,
    color: "#F296B8",
    fontFamily:"Poppins",
    alignSelf: "center"
  },
  itemTextPoints:{
    fontSize: 20,
    color: "white",
    fontFamily:"Poppins",
    flex: 0.5,
    fontWeight: 'bold',
    alignSelf: "center",
  },
  itemTextPointsLetter:{
    fontSize: 20,
    color: "white",
    fontFamily:"Poppins",
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    alignSelf: 'center',
    fontFamily:"Poppins",
    fontWeight: 'bold',
    color:"#747070"
  },
  list: {
    height:170,
    flexGrow: 0,
    marginLeft: "5%"
  },
  topThreeView:{
    height: "30%"
  }

});