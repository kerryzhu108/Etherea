import React from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsername } from "../apis/profile";
import { getUserType } from "../apis/auth";
import { getTasks, finishTask } from "../apis/tasks";
import Task from "../components/Task";
import Popup from '../components/Popup';
import NavigationPanel from '../components/navigationPanel.js';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        // Get and set the username for the user
        // Moved this below because of UI spacing issues
        // AsyncStorage.getItem('userid').then((item) => {
        //     return getUsername(item);
        // }).then(response => response.json()).then((json) => {
        //     this.setState((state, props) => ({
        //         username: json.name,
        //     }));
        // }).catch((error) => {
        //     console.error(error);
        // });

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
          <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContainer}>
            <FetchTasks navigation={this.props.navigation}/>
            <View style={styles.navigation}>
              <NavigationPanel navigation={this.props.navigation}/>              
            </View>
          </ScrollView>
        );
    }

}

// Need this to use onload hook
function FetchTasks( props ) {
  const [getUserName, setUserName] = React.useState('')
  const [getDailyTasks, setDailyTasks] = React.useState([]);
  const [getSelectedTasks, setSelectedTasks] = React.useState([]);
  const [getAllTasksDoneStatus, setAllTasksDoneStatus] = React.useState(false);
  const [getPopupInfo, setPopupInfo] = React.useState(['titel', 'details'])
  const [isHidden, setIsHidden] = React.useState(true)
  const [getThemeColour, setThemeColour] = React.useState('white')

  const loadTasks = async () => {
    const userid = await AsyncStorage.getItem('userid')
    let userName = await getUsername(userid)
    userName = await userName.json()
    setUserName(userName.name)

    let tasks = await getTasks(userid)
    tasks = await tasks.json()
    if (tasks.length == 0) {
      props.navigation.navigate('SelectTasks')
      return
    }
    setThemeColour(tasks[0]['colour'])
    setDailyTasks(tasks)
    allTasksDone(tasks)
  }

  // reloads tasks every time page loads
  useFocusEffect(
    React.useCallback(() => {
      loadTasks()
    }, [])
  );

  const selectTask = (taskid) => {
    if(!getSelectedTasks.includes(taskid)){
      setSelectedTasks([...getSelectedTasks, taskid])
    } else {
      let selctedTasks = getSelectedTasks
      selctedTasks.splice(getSelectedTasks.indexOf(taskid), 1)
      setSelectedTasks(selctedTasks)
    }
  }

  const togglePopup = (taskName, taskDetails) => {
    setIsHidden(!isHidden)
    setPopupInfo([taskName, taskDetails])
  }

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
  
  const handleSubmit = async () => {
    const userid = await AsyncStorage.getItem('userid')
    for (let i=0; i<getSelectedTasks.length; i++){
      await finishTask(userid, getSelectedTasks[i])
    }
    await loadTasks()
  }

  return (
    <View>
      <Text style={[styles.title, {color: getThemeColour}]}>Hello,</Text>
      <Text style={[styles.username, {color: getThemeColour}]}>{getUserName}</Text>
      <Text style={styles.topic}>This month's topic: </Text>
      <View style={[styles.theme, {backgroundColor: getThemeColour}]}>
        <Text style={styles.themeText}>{renderThemeName()}</Text>
      </View>
      <Text style={styles.todaysChallenge}>Today's challenges</Text>
      
      <View style={styles.items}>
      { 
        getDailyTasks.map((item, index) => {
          if (item['complete'] == true) {
            return
          }
          return (
              <Task style={styles.taskItem} key={index} taskName={item['taskname']} 
                selectTask={selectTask} 
                taskid={item['taskid']} 
                themeColour={item['colour']}
                taskPoints={item['points']}
                showPopup={togglePopup}
                taskDetails={item['descript']}
              />
          )
        })
      }
      { !getAllTasksDoneStatus && (
        <TouchableOpacity style={styles.submit} onPress={()=> handleSubmit()}>
          <Text style={styles.habitText}>Mark as completed</Text>
        </TouchableOpacity>) 
      }
      </View>

      { getAllTasksDoneStatus && <Text style={styles.tasksCompleted}>You have completed your daily challenges!</Text>}
      { !isHidden && <Popup themeColour={getThemeColour} closePopup={togglePopup} title={getPopupInfo[0]} desc={getPopupInfo[1]}/> }
    </View>
  )
}

const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      scrollViewContainer: {
        flexGrow: 1, 
        justifyContent: 'space-between',
        flexDirection: 'column',
      },
      title: {
        fontSize: 35,
        marginTop: 50,
        marginBottom: 0,
        left: 30,
        fontWeight: 'bold',
      },
      username: {
        marginTop: -10,
        fontSize: 60,
        left: 30,
        fontWeight: "bold",
      },
      topic: {
        color: 'grey',
        marginTop: 10,
        left: 30,
        fontSize: 20,
        fontWeight: "bold"
      },
      theme: {
        marginTop: 10,
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
        marginTop: 15,
        marginLeft: 30,
        color: 'grey',
        fontWeight: "bold"
      },
      tasksCompleted: {
        marginTop: 80,
        textAlign: 'center',
        fontSize: 15
      },
      items: {
        paddingLeft: 30,
        paddingRight: 30,
      },
      submit: {
        backgroundColor: '#4B4B4B',
        padding: 20,
        borderRadius: 20,
        marginTop: 40,
        textAlign: 'center',
        marginBottom: 30,
      },
      habitText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
      },
      navigation: {
        marginTop: 50,
        justifyContent: 'flex-end'
      },
});