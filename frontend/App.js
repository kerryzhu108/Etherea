'use strict'
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './views/landing.js'
import SignUp from './views/signUp.js'
import Login from './views/login.js'
import Home from './views/home.js'
import Leaderboard from './views/leaderboard.js'
import Progress from './views/Progress.js'
import SelectTasks from './views/selectTasks.js'
import { DrawerContent } from './components/drawerContent.js';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


class App extends Component {

  state = {
    selectedItems: [],
    discountCode: '',
  }
  render() {
    return (
      <NavigationContainer theme={MyTheme}>
        <Drawer.Navigator initialRouteName="Landing" screenOptions={{headerShown: false}} style={styles.container}
        drawerContent={props => <DrawerContent { ...props} />}>
          <Drawer.Screen name="Landing" component={Landing} options={ { gestureEnabled: false } }/>
          <Drawer.Screen name="SignUp" component={SignUp} options={ { gestureEnabled: false } }/>
          <Drawer.Screen name="Login" component={Login} options={ { gestureEnabled: false } }/>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="SelectTasks" component={SelectTasks} />
          <Drawer.Screen name="Leaderboard" component={Leaderboard} />
          <Drawer.Screen name="Progress" component={Progress} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeFont: {
    marginTop: 25,
    fontSize: 35,
  }
});

const MyTheme = {
  colors: {
    primary: 'rgb(255, 255, 255)'
  },
};

export default App;
