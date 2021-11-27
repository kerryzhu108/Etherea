import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";

export class LeaderboardUser extends React.Component{
    render(){
      const { pos, name, level, exp, color } = this.props
      return(
        <View style={[styles.item, {backgroundColor: color}]}>
          <Text style={styles.itemTextRank}>{pos}</Text>
          <Image source={require('../assets/profilePictureDefault.png')} style={styles.profileImages}/>
          <Text style={styles.itemTextName}>{name}</Text>
          <View style={styles.viewLevel}>
            <ImageBackground source={require('../assets/leaderboardLevelBanner.png')} style={styles.imageLevelBackground}>
              <Text style={styles.itemTextLevel}>5</Text>
            </ImageBackground>
          </View>
          <Text style={styles.itemTextPoints}>{exp}</Text>
          <Text style={styles.itemTextPointsLetter}>pts</Text>
        </View>
      )
    }
}


const styles = StyleSheet.create({
    viewLevel:{
      alignItems: 'center',
      flex: 1
    },
    imageLevelBackground: {
      marginTop: '20%',
      width: '90%',
      height: '80%'
    },
    item:{
      width: '90%',
      height: 50,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2.75,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      margin: '2%',
      flexDirection: "row",
      borderRadius: 17,
      backgroundColor: "#F296B8"
    },
    profileImages:{
      height: '80%',
      width: '95%',
      marginTop: '1.5%',
      flex: 1,
      borderRadius: 100,
      overflow: 'hidden'
    },
    itemTextRank:{
      fontSize: 20,
      color: "white",
      flex: 1,
      alignSelf: "center",
      marginLeft: '5%'
    },
    itemTextName:{
      fontSize: 16,
      color: "white",
      alignSelf: "center",
      flex: 3,
      marginLeft: '5%'
    },
    itemTextLevel:{
      marginRight: '12%',
      marginTop: '12%',
      fontSize: 15,
      color: "#F296B8",
      alignSelf: "center",
    },
    itemTextPoints:{
      fontSize: 22,
      color: "white",
      flex: 0.75,
      fontWeight: 'bold',
      alignSelf: "center",
      textAlign: "right"
    },
    itemTextPointsLetter:{
      fontSize: 18,
      color: "white",
      marginTop: "1%",
      flex: 1,
      alignSelf: "center",
    }
  });