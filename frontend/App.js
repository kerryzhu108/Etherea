'use strict'
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

const Stack = createNativeStackNavigator();
class App extends Component {

  state = {
    selectedItems: [],
    discountCode: '',
  }

  render() {
    return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="Landing" screenOptions={{headerShown: false}} style={styles.container}>
          <Stack.Screen name="Landing" component={Landing}/>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Leaderboard" component={Leaderboard} />
          <Stack.Screen name="Progress" component={Progress} />
        </Stack.Navigator>
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
