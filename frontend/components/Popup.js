import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default class Popup extends React.Component { 
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.themeColour}]}>
        <TouchableOpacity style={styles.closeBtn} onPress={()=>{this.props.closePopup()}}>
          <Image source={require('../assets/closeBtn.png')} style={styles.closeBtnImg}/>
        </TouchableOpacity>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.desc}>{this.props.desc}</Text>
      </View>
    );
  }
}

const styles = {
    container: {
        borderWidth: 15,
        borderRadius: 30,
        borderColor: 'white',
        position: 'absolute',
        height: 300,
        width: '70%',
        left: '20%',
        top: '35%',
        alignItems: 'center'
    },
    closeBtn: {
      position: 'absolute',
      right: 5,
      top: 5,
    },
    closeBtnImg: {
      height: 15,
      width: 15,
    },
    title: {
      marginTop: 23,
      fontSize: 15,
      color: 'white',
      fontWeight: 'bold',
      borderBottomColor: 'white',
      borderBottomWidth:  2,
    },
    desc: {
      marginTop: 20,
      color: 'white'
    }
  }