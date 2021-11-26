import React from "react";
import { View, ImageBackground, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { login, googleSignIn } from "../apis/login.js";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth';

export default class Login extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onChangeInputHandler = (name, value) => {
    this.setState({
        [name]: value,
    });
  }

  loginHandler = (response) => {
    response.json().then((responseData) => {
      if (!responseData.tokens) {
        showMessage({
          message: "Oops",
          description: responseData?.error?.message ? responseData.error.message : 'invalid credentials',
          type: "danger",
          duration: 4000,
        });
        return;
      }
      AsyncStorage.setItem('userid', responseData.userid)
      this.props.navigation.navigate('Home')
    })
  }



  googleLoginHandler = () => {
    const config = { iosClientId: `931919465131-5hg7mbiqsr7sh45aui3123r2regk1uit.apps.googleusercontent.com`,
                     androidClientId: `931919465131-c6oj3h4dpm6ji00q6usg7g1t9th1p2it.apps.googleusercontent.com`,
                     scopes: ['profile', 'email'] 
                    };
    Google
      .logInAsync(config)
      .then((result) => {
        const {type, user} = result;
        if (type == 'success') {
          console.log('Google signin successfully');
          const { email, givenName, familyName } = user;
          googleSignIn(givenName, familyName, email)
            .then(response => { 
              console.log("return from googleSignIn");
              
              response.json()
                .then((responseData) => {
                  console.log(responseData);
                  if (!responseData.tokens) {
                    showMessage({
                      message: "Internal Server Error. Please try again later.",
                      description: "The server encountered an internal error or misconfiguration and was unable to complete your request.",
                      type: "danger",
                      duration: 6000,
                    });
                    return;
                  } else {
                    AsyncStorage.setItem('userid', responseData.userid)
                    this.props.navigation.navigate('Home')
                  }
                })
            });
        } else {
          console.log('Google signin was cancelled');
        }
      })
      .catch(error => {
        console.log(error);
      })
  }


  render() { 
    return (
      <View style={styles.container}>
          <ImageBackground style={styles.background} source={require('../assets/loginBackground.png')}>
          <FlashMessage position="top" />
          <Text style={styles.title}>Login</Text>

          <TextInput 
            placeholder="Email" 
            style={styles.input} 
            onChangeText={text => this.onChangeInputHandler('email', text)}
          />

          <TextInput 
            placeholder="Password" 
            style={styles.input}
            onChangeText={text => this.onChangeInputHandler('password', text)}
          />

          <Text style={styles.goSignup} onPress={() => this.props.navigation.navigate('SignUp')}>Don't have an account? Click here.</Text>

          <TouchableOpacity style={styles.loginButton} onPress={() => {
            login(this.state.email, this.state.password).then(response => this.loginHandler.bind(this)(response))
          }}>
            <Image source={require('../assets/loginButton.png')}/>
          </TouchableOpacity>
          
          <Text style={styles.temp} onPress={() => this.googleLoginHandler()}>Log in with Google</Text>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 15,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#A0E3B2',
  },
  input: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderWidth: 1
  },
  goSignup: {
    margin: 20,
    textDecorationLine: 'underline',
  },
  loginButton: {
    position: "absolute",
    marginTop: 250,
  },
  greenBottom: {
    backgroundColor: '#A0E3B2',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 260,
  }, 
  temp: {
    marginTop: 370,
    textDecorationLine: 'underline',
  }
});