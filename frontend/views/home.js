import React from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsername, getExp } from "../apis/profile";
import { getUserType } from "../apis/auth";
import { getTasks, finishTask } from "../apis/tasks";
import Task from "../components/Task";
import Popup from '../components/Popup';
import NavigationPanel from '../components/navigationPanel.js';
import { Entypo } from '@expo/vector-icons'; 
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch
} from 'react-native-paper';

const { height, width } = Dimensions.get('window');

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        // // Get and set the username for the user
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
          <MenuProvider style={{ flexDirection: "column"}}>
            <SideMenu/>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContainer}>
              <FetchTasks navigation={this.props.navigation}/>
              <View style={styles.navigation}>
                <NavigationPanel navigation={this.props.navigation}/>              
              </View>
            </ScrollView>
          </MenuProvider>
        );
    }

}

function SideMenu() {

  const [getUserName, setUserName] = React.useState('')
  const [getPoints, setPoints] = React.useState(-1)
  const loadInfo = async () => {
    const userid = await AsyncStorage.getItem('userid')

    let userName = await getUsername(userid)
    userName = await userName.json()
    setUserName(userName.name)

    let points = await getExp(userid)
    points = await points.json()
    setPoints(points.exp)
  }

  // reloads tasks every time page loads
  useFocusEffect(
    React.useCallback(() => {
      loadInfo()
    }, [])
  );

  return(
        <Menu style={{ marginTop: 45}} onSelect={value => alert(`You Clicked : ${value}`)}>

          <MenuTrigger  >
            <Entypo name='menu' size={35} style={styles.menuIcon}/>
          </MenuTrigger  >

          <MenuOptions optionsContainerStyle={{width:width/1.1, height:height/1.2, borderRadius: 40,}}>
            <View style={{flexDirection:'row', marginTop: 30, marginLeft: 30 }}>
                <Avatar.Image 
                    source={{uri: 'https://www.bhphotovideo.com/images/images500x500/Savage_60_2612_Widetone_Seamless_Background_Paper_1341499561_203856.jpg'}}
                    size={60}
                />
                <View style={{marginLeft:15, flexDirection:'column'}}>
                    <Title style={styles.menuName}>{getUserName}</Title>
                    <Text style={styles.menuPoint}>{getPoints} points</Text>
                </View>
            </View>
            <Text style={styles.menuCaption}>Monthly Challenges</Text>
            <MenuOption style={styles.menuItem} value={"Climate changee".toUpperCase()}>
              <Text style={styles.menuContent}>{"Climate change".toUpperCase()}</Text>
            </MenuOption>
            {/* Morgan: change color code as parameter in function later */}
            <MenuOption style={{
                backgroundColor: '#7AD7E0', 
                borderRadius: 15, 
                width: 300, 
                height: 60, 
                left: 30,
                margin: '3%'
              }} value={"Mental health".toUpperCase()}>
              <Text style={styles.menuContent}>{"Mental health".toUpperCase()}</Text>
            </MenuOption>
            <MenuOption style={{
                backgroundColor: '#F296B8', 
                borderRadius: 15, 
                width: 300, 
                height: 60, 
                left: 30,
                margin: '3%'
              }} value={"Animal cruelty".toUpperCase()}>
              <Text style={styles.menuContent}>{"Animal cruelty".toUpperCase()}</Text>
            </MenuOption>
          </MenuOptions>

        </Menu>
  )
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
      <Text style={styles.title}>Hello,</Text>
      <Text style={styles.username}>{getUserName}</Text>
      <Text style={styles.topic}>This month's topic: </Text>
      <View style={styles.theme}>
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
        marginTop: 30,
        marginBottom: 0,
        left: 30,
        fontWeight: 'bold',
        color: '#A0E3B2',
      },
      username: {
        width: width/1.2,
        marginTop: -10,
        fontSize: 60,
        left: 30,
        fontWeight: "bold",
        color: '#A0E3B2',
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
      menuIcon: {
        margin: 20,
        color: '#4B4B4B'
      },
      menuContent: {
        color: "white",
        fontWeight: "bold",
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
      },
      menuName: {
        color: "#4B4B4B",
        fontWeight: "bold",
      },
      menuPoint: {
        color: "#4B4B4B",
        marginTop: -5
      },
      menuCaption: {
        fontSize: 30, 
        width: 250, 
        fontWeight: 'bold', 
        color: '#4B4B4B',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '5%'
      },
      menuItem: {
        backgroundColor: '#A0E3B2', 
        borderRadius: 15, 
        width: 300, 
        height: 60, 
        left: 30,
        margin: '3%'
      }
});