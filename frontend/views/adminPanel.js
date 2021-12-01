import React from "react";
import { StyleSheet, TextInput, Text, ScrollView, Button } from "react-native";
import NavigationPanel from '../components/navigationPanel.js';
import {insertNewTask, insertNewTheme} from '../apis/adminControls';

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
    if(this.state.newThemeName === '' || this.state.statName === ''){
      alert('You are missing a field.')
      return
    }

    // Check colour
    if(this.state.color.length != 7 || this.state.color[0] != '#'){
      alert("Your color must have 7 characters where the first character is # and the other characters are hex digits.");
      return
    }

    for(let i = 1;i <= 6;i++){
      let possibleValues = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
      if(!possibleValues.includes(this.state.color[i])){
        alert("You have not properly formatted the color.")
        return
      }
    }

    let splitDate = this.state.dateLaunched.split('-')

    // Check length of date
    if(splitDate.length != 3){
      alert('You have not properly formatted the date.');
      return
    }

    let year = parseInt(splitDate[0])
    let month = parseInt(splitDate[1])
    let day = parseInt(splitDate[2])

    // Check if fields are integers.
    if(isNaN(year) || isNaN(month) || isNaN(day)){
      alert("Either your year, month, or day is not a valid value.")
      return
    }

    if(splitDate[0].length != 4 || splitDate[1].length != 2 || splitDate[2].length != 2){
      alert("The date must be formatted as yyyy--mm-dd")
      return
    }else if(month < 1 || month > 12){
      alert("Your month is not a valid value.")
      return
    }else{
      let high_months = [1, 3, 5, 7, 8, 10, 12];
      let low_months = [4, 6, 9, 11]
      if((high_months.includes(month) && (day < 1 || day > 31)) || (low_months.includes(month) && (day < 1 || day > 30)) || (month == 2 && (day < 1 || day > 28))){
        alert("The day is invalid for month chosen.")
        return
      }
    }
 
    let multiplier_cast = parseInt(this.state.multiplier)
    if(isNaN(multiplier_cast) || multiplier_cast <= 0){
      alert('Your multiplier value is invalid.')
      return
    }

    insertNewTheme(this.state.newThemeName, multiplier_cast, this.state.statName, this.state.dateLaunched, this.color).then((response) => {
      if(response.status === 200){
        alert('You have successfully created a new theme.')
      }else if(response.status === 500){
        alert('This theme has already been created.')
      }else if(response.status === 400){
        alert('There was an internal server error and your theme was not successfully inserted.')
      }
    })
    return
  }

  taskButton = () => {
    if(this.state.taskName === '' || this.state.description === ''){
      alert('You are missing a field.')
      return
    }

    let id_cast = parseInt(this.state.themeID)
    if(isNaN(id_cast) || id_cast < 0){
      alert('Your Theme ID value is invalid.')
      return
    }

    let points_cast = parseInt(this.state.points)
    if(isNaN(points_cast) || points_cast <= 0){
      alert('Your points value is invalid.')
      return
    }

    insertNewTask(id_cast, this.state.description, this.state.taskName, points_cast).then((response) => {
      if(response.status === 200){
        alert('You have successfully created a new task.')
      }else if(response.status === 500){
        alert('A task with this name already exists.')
      }else if(response.status === 400){
        alert('There was an internal server error and your task was not successfully inserted.')
      }
    })
    
    return
  }

  render(){
    return (
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
          <Text style={styles.box_desc}>Date Launched (Ex. 2021-12-31)</Text>
          <TextInput
            style={styles.input}
            onChangeText={dateLaunched => this.onChangeText('dateLaunched', dateLaunched)}
          />
          <Text style={styles.box_desc}>Color (Ex. #0000aa)</Text>
          <TextInput
            style={styles.input}
            onChangeText={color => this.onChangeText('color', color)}
          />
        <Button
            title="Confirm New Theme"
            onPress={this.themeButton}
            color="blue"
        />
        <NavigationPanel/>
        </ScrollView>
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