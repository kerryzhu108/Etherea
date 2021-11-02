import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { signUp } from "../apis/login.js";

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
  
  signUpButtonHandler = (response) => {
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
        setTimeout(() => { this.props.navigation.navigate('Home') }, 2000);
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
                if ( error.value.length < 8 ) {
                  messageString += "Password must be a least 8 characters long. ";
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

  render() { 
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30}}>Sign Up</Text>
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

        <Button title='Sign Up' onPress={() => {
          signUp(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.confirmPassword)
          .then(response => this.signUpButtonHandler(response));
        }}/>

        <FlashMessage position="top" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  top: {
    marginTop: 80
  },
  input: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#DCDCDC',
  },
  goLogin: {
    margin: 20,
    textDecorationLine: 'underline'
  }
});