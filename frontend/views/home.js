import React from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsername } from "../apis/profile";
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

    componentDidMount() {
        // Get and set the username for the user
        AsyncStorage.getItem('userid').then((item) => {
            return getUsername(item);
        }).then(response => response.json()).then((json) => {
            this.setState((state, props) => ({
                username: json.name,
            }));
        }).catch((error) => {
            console.error(error);
        })
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
      return getDailyTasks[0]['theme']
    }
  }

  return (
    <View>
      <Text style={styles.topic}>This month's topic: </Text>
      <View style={styles.theme}>
        <Text style={styles.themeText}>{renderThemeName()}</Text>
      </View>
      <Text style={styles.todaysChallenge}>Today's challenges:</Text>
      
      {
        getDailyTasks.map((item, index) => {
          if (item['complete'] == true) {
            return
          }
          return (
            <TouchableOpacity 
              key={index}
              style={styles.taskItem}
              onPress={()=>{ finishTask(item['userid'], item['taskid']).then(()=>{loadTasks()} )}}
            >
              <Task text={item['descript']} /> 
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
        fontSize: 30,
        top: 70,
        left: 30,
        fontWeight: 'bold',
        color: '#A0E3B2',
      },
      username: {
        fontSize: 60,
        top: 55,
        left: 30,
        fontWeight: "bold",
        color: '#A0E3B2',
      },
      topic: {
        color: 'grey',
        marginTop: 80,
        left: 30,
        fontSize: 20,
      },
      theme: {
        marginTop: 10,
        backgroundColor: '#A0E3B2',
        height: 50,
        justifyContent: 'center'
      },
      themeText: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
      },
      todaysChallenge: {
        fontSize: 20,
        marginTop: 25,
        marginLeft: 30,
        color: 'grey',
      },
      taskItem: {
        top: 30,
        left: 30,
      },
      tasksCompleted: {
        marginTop: 80,
        textAlign: 'center',
        fontSize: 15
      }
});