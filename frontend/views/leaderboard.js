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
            <View style={styles.topThree}>
              {this.state.usersTopThree !== null ? 
                <View style={styles.topThreeView}>
                  {this.state.usersTopThree[0] !== null ? 
                  <LeaderboardUserTopThree name={this.state.usersTopThree[0].name} 
                                      exp={this.state.usersTopThree[0].exp}
                                      place='1'/>
                  : null}
                <View style={styles.twoThreeContainer}> 
                  {this.state.usersTopThree[1] !== null ? 
                  <LeaderboardUserTopThree name={this.state.usersTopThree[1].name} 
                                          exp={this.state.usersTopThree[1].exp}
                                          place='2'/>
                  : null}
                  {this.state.usersTopThree[2] !== null ? 
                  <LeaderboardUserTopThree name={this.state.usersTopThree[2].name} 
                                          exp={this.state.usersTopThree[2].exp}
                                          place='3'/>
                  : null}
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
                level={this.state.currUser.level} 
                exp={this.state.currUser.exp}
                color='#7AD7E0'/>
              : null}
        </ImageBackground>
        <NavigationPanel navigation={this.props.navigation}/>
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
    top: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: '5%',
    fontWeight: 'bold',
    color:'#747070'
  },
  list: {
    height:'40%',
    flexGrow: 0,
    width: '100%',
    marginLeft: '5%'
  },
  topThree:{
    marginTop: '5%',
    height: '30%'

  },
  twoThreeContainer:{
    justifyContent:'space-between',
    flexDirection: 'row',
    position: 'absolute',
    marginTop: '40%',
    width: '300%',
    alignSelf: 'center'
  }
});