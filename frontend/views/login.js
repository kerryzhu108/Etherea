import React from "react";
import { View, KeyboardAvoidingView, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { login } from "../apis/login.js";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  render() { 
    return (
      <KeyboardAvoidingView style={styles.container}>
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

        <View style={styles.greenBottom}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
  },
  top: {
    marginTop: 80
  },
  title: {
    fontSize: 30,
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
  }
});