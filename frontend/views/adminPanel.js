import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, ScrollView, Button, Alert } from "react-native";
import NavigationPanel from '../components/navigationPanel.js';

export default class adminPanel extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      themeID: 0,
      taskName: '',
      description: '',
      points: 0,
      newThemeName: '',
      statName: '',
      multiplier: 0,
      dateLaunched: '',
      color: ''
    };
  }

  onChangeText = (name, value) => {
    this.setState({[name]: value});
  }
  
  themeButton = () => {
    if(typeof this.newThemeName === 'undefined' || typeof this.statName === 'undefined' || typeof this.color === 'undefined' || typeof this.dateLaunched === 'undefined'){
      alert('You are missing a field.')
      return
    }

    let multiplier_cast = parseInt(this.multiplier)
    if(isNaN(multiplier_cast) || multiplier_cast <= 0){
      alert('Your multiplier value is invalid.')
      return
    }

    alert('You have successfully created a new theme.')
    return
  }

  taskButton = () => {
    if(this.taskName == '' || this.description == ''){
      alert('You are missing a field.')
      return
    }

    let id_cast = parseInt(this.themeID)
    if(isNaN(id_cast) || id_cast < 0){
      alert('Your Theme ID value is invalid.')
    }

    let points_cast = parseInt(this.points)
    if(isNaN(points_cast) || points_cast <= 0){
      alert('Your points value is invalid.')
    }

    alert('You have successfully created a new task.')
    return
  }

  render(){
    return (
      <SafeAreaView>
      <ScrollView>
        <Text style={styles.title}>ADMIN PANEL</Text>
        <Text style={styles.desc}>
              Welcome to the admin panel. You can add new tasks and themes by filling in the appropriate fields.
        </Text>
          <Text style={styles.subtitle1}>ADD NEW TASK</Text>
          <Text style={styles.box_desc}>Theme ID</Text>
          <TextInput
            style={styles.input}
            onChangeText={themeID => this.onChangeText('themeID', themeID)}
          />
          <Text style={styles.box_desc}>Task Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={taskName => this.onChangeText('taskName', taskName)}
          />
          <Text style={styles.box_desc}>Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={description => this.onChangeText('description', description)}
          />
          <Text style={styles.box_desc}>Points</Text>
          <TextInput
            style={styles.input}
            onChangeText={points => this.onChangeText('points', points)}
          />
          <Button
            title="Confirm New Task"
            onPress={this.taskButton}
            color="blue"
          />
          <Text style={styles.subtitle2}>ADD NEW THEME</Text>
          <Text style={styles.box_desc}>Theme Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={newThemeName => this.onChangeText('newThemeName', newThemeName)}
          />
          <Text style={styles.box_desc}>Stat Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={statName => this.onChangeText('statName', statName)}
          />
          <Text style={styles.box_desc}>Multiplier</Text>
          <TextInput
            style={styles.input}
            onChangeText={multiplier => this.onChangeText('multiplier', multiplier)}
          />
          <Text style={styles.box_desc}>Date Launched</Text>
          <TextInput
            style={styles.input}
            onChangeText={dateLaunched => this.onChangeText('dateLaunched', dateLaunched)}
          />
          <Text style={styles.box_desc}>Color</Text>
          <TextInput
            style={styles.input}
            onChangeText={color => this.onChangeText('color', color)}
          />
        </ScrollView>
        <Button
            title="Confirm New Theme"
            onPress={this.themeButton}
            color="blue"
          />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#747070",
    marginTop: 40,
    textAlign: 'center'
  },
  desc: {
    margin: 30,
    marginTop: 5,
    textAlign: 'center',
    color: 'grey',
  },
  box_desc: {
    color: 'black',
    textAlign: 'center'
  },
  subtitle1: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#747070",
    marginTop: -10,
    textAlign: 'center'
  },
  subtitle2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#747070",
    marginTop: 20,
    textAlign: 'center'
  },
});