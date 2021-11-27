'use strict'
import React from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";


let ImagePicker = require('react-native-image-picker')
export default class Settings extends React.Component {

  state = {
    photo: null
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true
    }
    console.log("Hi")
    console.log(ImagePicker.launchImageLibrary)
    ImagePicker.launchImageLibrary(options, response =>{
      console.log("Working!")
    })
  }
  
  render() { 
    return (
      <View style={styles.container}>
          <Text style={styles.title}>Settings</Text>
          <Button title="Change profile picture" onPress={this.handleChoosePhoto}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: '5%',
    fontWeight: 'bold',
    color:'black'
  },
})