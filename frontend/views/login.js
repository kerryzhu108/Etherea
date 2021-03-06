import React from "react";
import { View, ImageBackground, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from "react-native";
import { login, googleLogIn, facebookLogIn } from "../apis/login.js";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

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
      AsyncStorage.setItem('userid', responseData.userid);
      // Store access token in local storage
      AsyncStorage.setItem('access_token', responseData.tokens.access);
      AsyncStorage.setItem('refresh_token', responseData.tokens.refresh);
      this.props.navigation.navigate('Home')
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
        AsyncStorage.setItem('access_token', responseData.tokens.access);
        AsyncStorage.setItem('refresh_token', responseData.tokens.refresh);
        this.props.navigation.navigate('Home')
      }
    }
    )}

  render() { 
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.background} source={require('../assets/loginBackground.png')}>
          <FlashMessage position="top" />
          <Text style={styles.title}>Login</Text>

          <TextInput 
            placeholder="Email" 
            style={styles.inputEmail} 
            onChangeText={text => this.onChangeInputHandler('email', text)}
          />

          <TextInput 
            placeholder="Password" 
            style={styles.inputPassword}
            onChangeText={text => this.onChangeInputHandler('password', text)}
          />

          <Text style={styles.goSignup} onPress={() => this.props.navigation.navigate('SignUp')}>Don't have an account? Click here.</Text>

          <TouchableOpacity style={styles.loginButton} onPress={() => {
            login(this.state.email, this.state.password).then(response => this.loginHandler.bind(this)(response))
          }}>
            <Image source={require('../assets/loginButton.png')}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.facebookLoginButton} 
            onPress={() => facebookLogIn().then(response => this.externalLoginHandler(response))}>
            <Image source={require('../assets/loginFacebookWhite.png')}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleLoginButton} 
            onPress={() => googleLogIn().then(response => this.externalLoginHandler(response))}>
            <Image source={require('../assets/loginGoogleWhite.png')}/>
          </TouchableOpacity>
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
    height: height,
  },
  title: {
    marginTop: 55,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#A0E3B2',
  },
  inputEmail: {
    marginTop: 100,
    width: 300,
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 50,
    borderWidth: 1
  },
  inputPassword: {
    marginTop: 5,
    width: 300,
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 50,
    borderWidth: 1
  },
  goSignup: {
    margin: 10,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    color: '#A0E3B2',
  },
  loginButton: {
    position: 'absolute',
    marginTop: height / 1.8,
  },
  googleLoginButton: {
    position: 'absolute',
    marginTop: height / 1.2,
    textDecorationLine: 'underline',
  },
  facebookLoginButton: {
    position: 'absolute',
    marginTop: height / 1.4,
    textDecorationLine: 'underline',
  }
});