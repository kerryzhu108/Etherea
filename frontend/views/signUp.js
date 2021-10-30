import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { signUp } from "../api";

export default class SignUp extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  onChangeInputHandler = (name, value) => {
    console.log(name)
    this.setState({
        [name]: value,
    });
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

        <Button title='Sign Up' onPress={text => {console.log(signUp(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.confirmPassword))}}/>
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