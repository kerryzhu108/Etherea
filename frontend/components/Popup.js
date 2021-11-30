import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default class Popup extends React.Component { 
  constructor(props) {
    super(props);
  }
  render() { 
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = {
    container: {
        height: 50,
        width: 50,
        backgroundColor: 'black',
    },
  }