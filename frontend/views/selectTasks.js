import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTasksForTheme, chooseTasks } from "../apis/tasks.js";
import Task from '../components/Task';

export default function SelectTasks() {
    
    const [allTasksToPickFrom, setAllTasksToPickFrom] = useState([{
        "themeid": 1,
        "theme": "Climate Change",
        "taskid": 1,
        "descript": "Eat vegetarian",
        "points": 10
    },
    {
        "themeid": 1,
        "theme": "Climate Change",
        "taskid": 2,
        "descript": "Make your commute green",
        "points": 20
    },
    {
        "themeid": 1,
        "theme": "Climate Change",
        "taskid": 3,
        "descript": "Reduce use of plastic packaging",
        "points": 30
    }]);
    const [allTasksSelected, setAllTasksSelected] = useState([]);

    console.log(allTasksToPickFrom)

    const selectTask = (index) => {
        if(!allTasksSelected.includes(allTasksToPickFrom[index]['taskid'])){
            setAllTasksSelected([...allTasksSelected, allTasksToPickFrom[index]['taskid']])
            console.log(allTasksSelected)
        } 
    }

    const handleSubmit = () => {
        chooseTasks(AsyncStorage.getItem('userid'), allTasksSelected).then(response => response.json()).then(res=>{console.log(res)})
        this.props.navigation.navigate('Home')
    }

    return (
            <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Climate Change Tasks</Text>
            <Text style={styles.sectionTitleTwo}>Choose your tasks for this month</Text>

            <View style={styles.items}>
              {
                allTasksToPickFrom.map((item, index) => {
                  return (
                    <TouchableOpacity key={index}  onPress={() => selectTask(index)}>
                      <Task text={item['descript']} /> 
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            <Button title="Submit" onClick={()=> handleSubmit()}/>
          </View>
        
        );
      }

const styles = StyleSheet.create({
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
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
        marginTop: 30,
      },
  });