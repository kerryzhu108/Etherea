'use strict'
import React from "react";
import { View, Text, StyleSheet, FlatList, ImageBackground } from "react-native";
import NavigationPanel from '../components/navigationPanel.js';


import { domain, defaultHeaders } from "../apis/headers";

const Item = ({ pos, name, level, exp }) => (
  <View style={styles.item}>
    <Text style={styles.itemTextRank}>{pos}</Text>
    <Text style={styles.itemTextName}>{name}</Text>
    <ImageBackground source={require('../assets/leaderboardLevelBanner.png')} style={styles.imageLevelBackground}>
      <Text style={styles.itemTextLevel}>{level}</Text>
    </ImageBackground>
    <Text style={styles.itemTextPoints}>{exp}</Text>
    <Text style={styles.itemTextPointsLetter}>pts</Text>
  </View>
);

export default class Leaderboard extends React.Component {

  state = { data: [] }

  constructor(props) {
    super(props);
    fetch(domain + 'leaderboard', {
      method: 'GET',
      headers: defaultHeaders
    })
      .then((response) => response.json())
      .then((json) => {
        let data_unrank = json.results
        let i = 1
        const data_rank = data_unrank.map((user) => {
          user.rank = i
          i = i + 1
          return user
        })
        this.setState({ data: data_rank })
        console.log(this.state.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const renderItem = ({ item }) => (
      <Item
        pos={item.rank}
        name={item.name}
        level={item.level}
        exp={item.exp} />
    );

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/leaderboardBackground.png')}
          resizeMode="cover"
          style={styles.imageScreenBackground}>
          <Text style={styles.title}>LEADERBOARD</Text>
          <View style={styles.topThreeView}>
          </View>
          <FlatList
            style={styles.list}
            data={this.state.data}
            renderItem={renderItem}
            initialNumToRender={5}
            keyExtractor={(item, index) => index.toString()}
          />
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
  imageScreenBackground: {
    flex: 1
  },
  imageLevelBackground: {
    flex: 1,
    resizeMode: "cover",
    flex: 1
  },
  item: {
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
  itemTextRank: {
    fontSize: 20,
    color: "white",
    //fontFamily:"Poppins",
    flex: 1,
    alignSelf: "center",
    marginLeft: '5%'
  },
  itemTextName: {
    fontSize: 14,
    color: "white",
    //fontFamily:"Poppins",
    alignSelf: "center",
    flex: 3
  },
  itemTextLevel: {
    fontSize: 20,
    color: "#F296B8",
    // fontFamily:"Poppins",
    alignSelf: "center"
  },
  itemTextPoints: {
    fontSize: 20,
    color: "white",
    //fontFamily:"Poppins",
    flex: 0.75,
    fontWeight: 'bold',
    alignSelf: "center",
  },
  itemTextPointsLetter: {
    fontSize: 20,
    color: "white",
    //fontFamily:"Poppins",
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    marginTop: 50,
    alignSelf: 'center',
    // fontFamily:"Poppins",
    fontWeight: 'bold',
    color: "#747070"
  },
  list: {
    height: 170,
    flexGrow: 0,
    marginLeft: "5%"
  },
  topThreeView: {
    height: "30%"
  }

});