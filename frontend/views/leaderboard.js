'use strict'
import React from "react";
import { View, Text, StyleSheet, FlatList, ImageBackground, Image } from "react-native";
import { leaderboard } from "../apis/leaderboard.js";
import { LeaderboardUser } from "../components/LeaderboardUser.js";
import { LeaderboardUserTopThree } from "../components/LeaderboardUserTopThree.js";
import NavigationPanel from '../components/navigationPanel.js';

const renderItem = ({ item }) => (
  <LeaderboardUser pos={item.rank} 
                   name={item.name} 
                   level={item.level} 
                   exp={item.exp}
                   color='#F296B8'/>
);

export default class Leaderboard extends React.Component {

  state = {
    usersList: [],
    usersTopThree: null,
    currUser: null
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const users = await leaderboard()
    this.setState({
      usersList: users[1], 
      usersTopThree: users[0],
      currUser: users[2]
    })
  }
  
  render() { 
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/leaderboardBackground.png')} 
                         resizeMode="cover" 
                         style={styles.imageScreenBackground}>
            <Text style={styles.title}>LEADERBOARD</Text>
            <View>
              {this.state.usersTopThree !== null ? 
              <View style={styles.topThreeView}>
                <LeaderboardUserTopThree name={this.state.usersTopThree[0].name} 
                                        exp={this.state.usersTopThree[0].exp}/>
                <View style={styles.twoThreeContainer}> 
                  <LeaderboardUserTopThree name={this.state.usersTopThree[1].name} 
                                          exp={this.state.usersTopThree[1].exp}/>
                  <LeaderboardUserTopThree name={this.state.usersTopThree[2].name} 
                                          exp={this.state.usersTopThree[2].exp}/>
                </View>
              </View>
              : null}
            </View>
            <FlatList    
              style={styles.list}
              data={this.state.usersList}
              renderItem={renderItem}
              initialNumToRender={6} 
              maxToRenderPerBatch={6}
              windowSize={6}
              keyExtractor={(item, index) => index.toString()}
            />

            {this.state.currUser !== null ? 
              <LeaderboardUser 
                style={styles.currUser}
                pos={this.state.currUser.rank}
                name={this.state.currUser.name}
                level='2' 
                exp={this.state.currUser.exp}
                color='#7AD7E0'/>
              : null}
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
    flex: 1, 
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginTop: '10%',
    alignSelf: 'center',
    //fontFamily:"Poppins",
    fontWeight: 'bold',
    color:'#747070'
  },
  list: {
    height:'45%',
    flexGrow: 0,
    width: '100%',
    marginLeft: '5%'
  },
  topThreeView:{
    marginTop: '2%',
    height: '25%'
  },
  twoThreeContainer:{
    marginTop: '5%',
    marginLeft: '25%',
    width: '50%',
    flexDirection: 'row',
    alignContent:'center',
    justifyContent:'space-between'
  },
  currUser:{
  }
});