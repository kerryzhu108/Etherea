import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTasksForTheme, chooseTasks } from "../apis/tasks.js";
import Task from '../components/Task';
import Popup from '../components/Popup';
import { useFocusEffect } from '@react-navigation/native';
 
 
export default function SelectTasks({ navigation }) {

    const [allTasksToPickFrom, setAllTasksToPickFrom] = useState([])
    const [allTasksSelected, setAllTasksSelected] = useState([])
    const [getThemeColour, setThemeColour] = useState('white')
    const [getThemeName, setThemeName] = useState('')
    const [getPopupInfo, setPopupInfo] = useState(['titel', 'details'])
    const [isHidden, setIsHidden] = useState(true)


    // reloads tasks every time page loads
    useFocusEffect(
      React.useCallback(() => {
        getTasksForTheme(1).then(response=>response.json()).then(tasks => {
          setAllTasksToPickFrom(tasks)
          setThemeColour(tasks[0]['colour'])
          setThemeName(tasks[0]['theme'])
        })
      }, [])
    );
 
    const selectTask = (taskid) => {
      if(!allTasksSelected.includes(taskid)){
          setAllTasksSelected([...allTasksSelected, taskid])
      }
    }
 
    const handleSubmit = () => {
      AsyncStorage.getItem('userid').then(userid => {
        chooseTasks(userid, allTasksSelected).then(setTimeout(function(){navigation.navigate('Home')}, 1000))
      })
    }

    const togglePopup = (taskName, taskDetails) => {
      setIsHidden(!isHidden)
      setPopupInfo([taskName, taskDetails])
    }
 
    return (
      <View style={styles.container}>
        <View style={[styles.themeWrapper, {backgroundColor: getThemeColour}]}>
          <Text style={styles.sectionTitle}>Current Theme:</Text>
          <Text style={styles.sectionTitleTwo}>{getThemeName}</Text>
          <Image source={require('../assets/earthGraphic.png')} style={styles.themeImage}/>
        </View>
        
        <View style={styles.items}>
          {
            allTasksToPickFrom.map((item, index) => {
              return (
                <Task key={index} taskName={item['taskname']} 
                selectTask={selectTask} 
                taskid={item['taskid']} 
                themeColour={getThemeColour}
                taskPoints={item['points']}
                showArrow={true}
                showPopup={togglePopup}
                taskDetails={item['descript']}
                />
              )
            })
          }
        </View>

        <TouchableOpacity style={styles.submit} onPress={()=> handleSubmit()}>
          <Text style={styles.habitText}>Choose Habits</Text>
        </TouchableOpacity>
        { isHidden? null : <Popup themeColour={getThemeColour} closePopup={togglePopup} title={getPopupInfo[0]} desc={getPopupInfo[1]}/> }
      </View>     
    );
  }
 
const styles = StyleSheet.create({
    container: {
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    themeWrapper: {
      padding: 30,
      borderRadius: 25,
      position: 'relative',
    },
    themeImage: {
      height: 60,
      width: 60,
      position: 'absolute',
      right: 20,
      top: 20,
    },
    sectionTitle: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    sectionTitleTwo: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    items: {
      marginTop: 10,
    },
    submit: {
      backgroundColor: '#4B4B4B',
      padding: 20,
      borderRadius: 20,
      marginTop: 50,
      textAlign: 'center',
    },
    habitText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold'
    },
  });


