import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default class NavigationPanel extends React.Component { 
  constructor(props) {
    super(props);
  }
  render() { 
    const styles = {
      container: {
        position: 'absolute',
        bottom: 0,
        left: 0, 
        right: 0,
        flexDirection:'row',
        justifyContent: 'center',
      },
      images: {
        height: 40,
        width: 40,
      },
      navigationItem: {
        margin: 5,
        alignItems:'center',
      }
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')} style={styles.navigationItem}>
          <Image source={require('../assets/homeIcon.png')} style={styles.images}/>
          <Text>Home  </Text>  
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Leaderboard')} style={styles.navigationItem}>
          <Image source={require('../assets/leaderboardIcon.png')} style={styles.images}/>
          <Text>Leaderboard  </Text>  
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Leaderboard')} style={styles.navigationItem}>
          <Image source={require('../assets/progressIcon.png')} style={styles.images}/>
          <Text>Progess  </Text>  
        </TouchableOpacity>
      </View>
    );
  }
}