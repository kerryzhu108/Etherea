import React from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsername } from "../apis/profile";
import { getUserType } from "../apis/auth";
import { getTasks, finishTask } from "../apis/tasks";
import Task from "../components/Task";
import NavigationPanel from '../components/navigationPanel.js';

export default class Home extends React.Component {
    state = {
        username: "NULL",
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        // Get and set the username for the user
        AsyncStorage.getItem('userid').then((item) => {
            return getUsername(item);
        }).then((response) => response.json()).then((json) => {
            this.setState((state, props) => ({
                username: json.name,
            }));
        }).catch((error) => {
            console.error(error);
        });

        // Check this user's type
        // TODO: (Zachary) Ensure that we show the admin button to users
        // who are admin. Have to figure out how to do this.
        try {
            const type = await getUserType();   // Gets the user's type based off of their access token
            console.log(type);
        } catch (error) {
            console.error(error);
        }
    }
   
    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.title}>Hello,</Text>
            <Text style={styles.username}>{this.state.username}</Text>
            <FetchTasks navigation={this.props.navigation}/>
            <NavigationPanel navigation={this.props.navigation}/>
          </View>
        );
    }

}

// Need this to use onload hook
function FetchTasks( props ) {
  const [getDailyTasks, setDailyTasks] = React.useState([]);
  const [getAllTasksDoneStatus, setAllTasksDoneStatus] = React.useState(false);

  const loadTasks = () => {
    return AsyncStorage.getItem('userid').then(userid => {
      getTasks(userid).then(res => res.json()).then(tasks => {
        if (tasks.length == 0) {
          props.navigation.navigate('SelectTasks')
          return
        }
        setDailyTasks(tasks)
        allTasksDone(tasks)
      })
    })
  }

  // reloads tasks every time page loads
  useFocusEffect(
    React.useCallback(() => {
      loadTasks()
    }, [])
  );

  const allTasksDone = (tasks) => {
    let allDone = true
    let userHasDailyTasks = false
    
    tasks.map(item => {
      userHasDailyTasks = true
      if (item['complete'] == false) {
        allDone = false
      }
    })
    setAllTasksDoneStatus(allDone && userHasDailyTasks)
  }

  const renderThemeName = () => {
    if (getDailyTasks[0]) {
      return getDailyTasks[0]['theme'].toUpperCase()
    }
  }

  return (
    <View>
      <Text style={styles.topic}>This month's topic: </Text>
      <View style={styles.theme}>
        <Text style={styles.themeText}>{renderThemeName()}</Text>
      </View>
      <Text style={styles.todaysChallenge}>Today's challenges</Text>
      
      {
        getDailyTasks.map((item, index) => {
          if (item['complete'] == true) {
            return
          }
          return (
            <TouchableOpacity 
              key={index}
              style={styles.taskItem}
              onPress={()=>{ finishTask(item['userid'], item['taskid']).then(()=>{loadTasks()} )}}>  
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.taskText}>{item['descript']}</Text>
                <View style={styles.verticleLine} opacity={0.5}></View>
                <Text style={styles.taskText}>{item['points']}</Text>
                <Text style={{fontSize: 13, color: 'white', top: '2.2%'}}>{'pts'}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      }
      { getAllTasksDoneStatus && <Text style={styles.tasksCompleted}>You have completed your daily tasks!</Text>} 
    </View>
  )
}

const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      title: {
        fontSize: 35,
        top: 130,
        left: 30,
        fontWeight: 'bold',
        color: '#A0E3B2',
      },
      username: {
        fontSize: 60,
        top: 125,
        left: 30,
        fontWeight: "bold",
        color: '#A0E3B2',
      },
      topic: {
        color: 'grey',
        marginTop: 155,
        left: 30,
        fontSize: 20,
        fontWeight: "bold"
      },
      theme: {
        marginTop: 10,
        backgroundColor: '#A0E3B2',
        height: 65,
        justifyContent: 'center'
      },
      themeText: {
        fontSize: 28,
        color: 'white',
        textAlign: 'center',
        fontWeight: "bold"
        
      },
      todaysChallenge: {
        fontSize: 20,
        marginTop: 35,
        marginLeft: 30,
        color: 'grey',
        fontWeight: "bold"
      },
      taskItem: {
        top: 30,
        left: 30,
        height: 55,
        width: 350,
        backgroundColor: "#A0E3B2",
        borderRadius: 18,
        paddingVertical: 15,
        paddingHorizontal: 12,
        borderColor: '#707070',
        borderWidth: 1,
      },
      tasksCompleted: {
        marginTop: 80,
        textAlign: 'center',
        fontSize: 15
      },
      taskText: {
        fontSize: 20,
        color: 'white',
        textTransform: 'capitalize'
      },
      verticleLine: {
        marginStart: '2.5%',
        marginEnd: '2.5%',
        height: '120%',
        width: 2,
        backgroundColor: 'white',
      },
});