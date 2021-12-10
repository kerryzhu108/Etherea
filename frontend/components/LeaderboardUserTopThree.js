import React from "react";
import { View, Text, StyleSheet, Image} from "react-native";

export class LeaderboardUserTopThree extends React.Component{
    render(){
      const { name, exp, place } = this.props
      return(
        <View style={styles.item}>
        <Image source={require('../assets/profilePictureDefault.png')} style={styles.profileImages}/>
             
        {place == '1' ? 
        <Image source={require('../assets/leaderboardFirstPlaceIcon.png')} style={styles.iconImagesFirst}/>
        : null}
        {place == '2' ? 
        <Image source={require('../assets/leaderboardSecondPlaceIcon.png')} style={styles.iconImages}/>
        : null}   
        {place == '3' ? 
        <Image source={require('../assets/leaderboardThirdPlaceIcon.png')} style={styles.iconImages}/>
        : null}

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
    item:{
      margin: 20,
      alignItems: 'center'  
    },
    textContainer:{
      flexDirection: 'column'
    },
    profileImages:{
      height: 50,
      width: 50,
      borderRadius: 100,
      overflow: 'hidden'
    },
    iconImagesFirst:{
      position: 'absolute',
      marginTop: '-20%'
    },
    iconImages:{
      marginTop: 15,
      position: 'absolute',
      top: '100%'
    },
    pointsContainer:{
      flexDirection: 'row',
      alignSelf: "center"
    },
    itemTextName:{
      marginTop: 5,
      fontSize: 15,
      color: "#707070",
      alignSelf: "center"
    },
    itemTextPoints:{
      fontSize: 20,
      color: "#707070",
      fontWeight: 'bold',
      textAlign: 'right'
    },
    itemTextPointsLetter:{
      fontSize: 16,
      color: "#707070",
      marginTop: "1%"
    }
  });