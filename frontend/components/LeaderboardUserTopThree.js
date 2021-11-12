import React from "react";
import { View, Text, StyleSheet, ImageBackground} from "react-native";

export class LeaderboardUserTopThree extends React.Component{
    render(){
      const { name, exp } = this.props
      return(
        <View style={styles.item}>
          <View style={styles.textContainer}>
            <Text style={styles.itemTextName}>{name}</Text>
          <View style={styles.pointsContainer}>
            <Text style={styles.itemTextPoints}>{exp}</Text>
            <Text style={styles.itemTextPointsLetter}>pts</Text>
          </View>
          </View>
        </View>
      )
    }
}


const styles = StyleSheet.create({
    textContainer:{
      flexDirection: 'column'
    },
    pointsContainer:{
      flexDirection: 'row',
      alignSelf: "center"
    },
    itemTextName:{
      fontSize: 15,
      color: "#707070",
      //fontFamily:"Poppins",
      alignSelf: "center"
    },
    itemTextPoints:{
      fontSize: 20,
      color: "#707070",
      //fontFamily:"Poppins",
      fontWeight: 'bold',
      textAlign: 'right'
    },
    itemTextPointsLetter:{
      fontSize: 16,
      color: "#707070",
      marginTop: "1%",
      //fontFamily:"Poppins",
    }
  });