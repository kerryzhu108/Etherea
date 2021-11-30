import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTasksForTheme, chooseTasks } from "../apis/tasks.js";
import Task from '../components/Task';
import Popup from '../components/Popup';
import { useFocusEffect } from '@react-navigation/native';
 
 
export default function SelectTasks({ navigation }) {

    const [allTasksToPickFrom, setAllTasksToPickFrom] = useState([]);
    const [allTasksSelected, setAllTasksSelected] = useState([]);
    const [getThemeColour, setThemeColour] = useState('white');

    // reloads tasks every time page loads
    useFocusEffect(
      React.useCallback(() => {
        getTasksForTheme(1).then(response=>response.json()).then(tasks => {
          setAllTasksToPickFrom(tasks)
          setThemeColour(tasks[0]['colour'])
        })
      }, [])
    );
 
    const selectTask = (taskid) => {
      if(!allTasksSelected.includes(taskid)){
          setAllTasksSelected([...allTasksSelected, taskid])
          let ogTasks = allTasksToPickFrom
          for (let i=0; i<ogTasks.length; i++){
            if (ogTasks[i]['taskid'] == taskid) {
              ogTasks.splice(i, 1)
              return setAllTasksToPickFrom(ogTasks)
            }
          }
      }
    }
 
    const handleSubmit = () => {
      AsyncStorage.getItem('userid').then(userid => {
        chooseTasks(userid, allTasksSelected).then(setTimeout(function(){navigation.navigate('Home')}, 1000))
      })
    }
 
    return (
      <View style={styles.tasksWrapper}>
        <View style={[styles.themeWrapper, {backgroundColor: getThemeColour}]}>
          <Text style={styles.sectionTitle}>Climate Change Tasks</Text>
          <Text style={styles.sectionTitleTwo}>Choose your tasks for this month</Text>
        </View>
        
        <View style={styles.items}>
          {
            allTasksToPickFrom.map((item, index) => {
              if (!allTasksSelected.includes(item['taskid'])) {
                return (
                  <Task key={index} taskName={item['descript']} 
                  selectTask={selectTask} taskid={item['taskid']} 
                  themeColour={getThemeColour}
                  taskPoints={item['points']}
                  />
                )
              }
            })
          }
        </View>

        <TouchableOpacity style={styles.submit} onPress={()=> handleSubmit()}>
          <Text style={styles.habitText}>Choose Habits</Text>
        </TouchableOpacity>
        <Popup style={styles.popup}/>
      </View>     
    );
  }
 
const styles = StyleSheet.create({
    tasksWrapper: {
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    themeWrapper: {
      padding: 30,
      borderRadius: 25,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    sectionTitleTwo: {
      fontSize: 18,
      fontWeight: 'bold'
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
    popup: {
      position: 'absolute',
      flex: 1,
      alignItems: 'center',
      left: '50%',
    }
  });


