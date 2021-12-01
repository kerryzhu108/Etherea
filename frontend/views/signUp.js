import React from "react";
import { View, Text, Button, StyleSheet, TextInput, ImageBackground, TouchableOpacity, Image, Dimensions } from "react-native";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { signUp, googleLogIn, facebookLogIn } from "../apis/login.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

export default class SignUp extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  onChangeInputHandler = (name, value) => {
    this.setState({
        [name]: value,
    });
  }
  
  signUpButtonHandler = (response, nav) => {
    const status = response.status;
    var messageString = "";
    response.json().then((responseData) => {
      if (status === 200) {
        showMessage({
          message: "Congratulations!",
          description: "You have successfully registered",
          type: "success",
          duration: 4000,
        });
        setTimeout(function(){nav.navigate('Login');}, 500)
        return;
      }
      if (status === 400) {
        if (Array.isArray(responseData.error)) {
          responseData.error.forEach(function(error) {
            if ( error.param === "email" ) {
                if ( error.value === "" ) {
                  messageString += "The Email field is required. ";
                } else { 
                  messageString += "Please enter a valid email. ";
                }
            }
            if ( error.param === "first_name" ) {
                if ( error.value === "" ) {
                  messageString += "The First Name field is required. "; 
                } else {
                  messageString += "First Name contains invalid characters. ";
                }
            }
            if ( error.param === "last_name" ) {
                if ( error.value === "" ) {
                  messageString += "The Last Name field is required. ";
                } else {
                  messageString += "Last Name contains invalid characters. ";
                }
            }
            if ( error.param === "password" && error.value === "" ) {
              messageString += "The Password field is required. ";
            }
            if ( error.param === "confirmPassword" && error.value === "" ) {
              messageString += "The Confirm Password field is required. ";
            }
            if ( (error.param === "password" || error.param === "confirmPassword") && error.value !== "") {
                if ( error.value.length < 4 ) {
                  messageString += "Password must be a least 4 characters long. ";
                } else {
                  messageString += "Password contains invalid characters. ";
                }
            } 
          })
        } else {
          messageString = responseData.error.message;
        }
        showMessage({
          message: "There was a problem with your request.\nPlease try again.",
          description: messageString,
          type: "danger",
          duration: 6000,
        });
      } else {
        showMessage({
          message: "Internal Server Error. Please try again later.",
          description: "The server encountered an internal error or misconfiguration and was unable to complete your request.",
          type: "danger",
          duration: 6000,
        });
      }
    })
  }

  externalLoginHandler = (response) => {
    if (!response) return;
    response.json().then((responseData) => {
      if (!responseData.tokens) {
        showMessage({
          message: "Internal Server Error. Please try again later.",
          description: "The server encountered an internal error or misconfiguration and was unable to complete your request.",
          type: "danger",
          duration: 6000,
        });
        return;
      }
      else {
        AsyncStorage.setItem('userid', responseData.userid)
        this.props.navigation.navigate('Home')
      }
    }
    )}

  render() { 
    return (
      <View style={styles.container}>
          <ImageBackground style={styles.background} source={require('../assets/signUpBackground.png')}>
          <FlashMessage position="top"/>
          <Text style={styles.title}>Sign Up</Text>

          <TextInput 
          placeholder="First Name" 
          style={styles.input} 
          onChangeText={text => this.onChangeInputHandler('firstName', text)}
        />

        <TextInput 
          placeholder="Last Name" 
          style={styles.input} 
          onChangeText={text => this.onChangeInputHandler('lastName', text)}
        />

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

        <TextInput 
          placeholder="Confirm Password" 
          style={styles.input}
          onChangeText={text => this.onChangeInputHandler('confirmPassword', text)}
        />

        <Text style={styles.goLogin} onPress={() => this.props.navigation.navigate('Login')}>Already have an account? Click here.</Text>

          <TouchableOpacity style={styles.signUpButton} onPress={() => {
          signUp(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.confirmPassword)
          .then(response => this.signUpButtonHandler(response, this.props.navigation));
        }}>
            <Image source={require('../assets/loginButton.png')}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.facebookLoginButton} 
            onPress={() => facebookLogIn().then(response => this.externalLoginHandler(response))}>
            <Image source={require('../assets/loginFacebookGreen.png')}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleLoginButton} 
            onPress={() => googleLogIn().then(response => this.externalLoginHandler(response))}>
            <Image source={require('../assets/loginGoogleGreen.png')}/>
          </TouchableOpacity>
      
        </ImageBackground>
        <FlashMessage position="top" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A0E3B2'
  },
  background: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#A0E3B2'
  },
  title: {
    marginTop: 50,
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    marginTop: 22,
    width: 300,
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: 'white'
  },
  goLogin: {
    margin: 10,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    color: 'white',
  },
  signUpButton: {
    marginTop: 10
  },
  googleLoginButton: {
    marginTop: 7,
    textDecorationLine: 'underline',
  },
  facebookLoginButton: {
    textDecorationLine: 'underline',
  }
});