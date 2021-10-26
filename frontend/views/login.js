import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

export default class SignUp extends React.Component { 
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

  render() { 
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30}}>Login</Text>

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

        <Button title='Login' onPress={text => {console.log(this.state.email)}}/>
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
  goSignup: {
    margin: 20,
    textDecorationLine: 'underline'
  }
});