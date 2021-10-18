import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default class MenuItem extends React.Component { 
  constructor(props) {
    super(props);
  }
  render() { 
    return (
      <View>
        <TouchableOpacity delayPressIn={200} delayPressOut={200} onPress={()=>this.props.handleClick(this.props.name)}>
          <Image source={{uri: this.props.imgURL}}
          style={{height: 200, width: 200, marginTop: 20}}/>
        </TouchableOpacity>
        <Text style={{fontSize: 15}} >{this.props.name} {this.props.price}</Text>
      </View>
    );
  }
}