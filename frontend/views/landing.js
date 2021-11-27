import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 'one',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../assets/landingPage.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../assets/landingPage.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../assets/landingPage.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 'four',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../assets/landingPage.png'),
    backgroundColor: '#22bcb5',
  }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      showNextButton: false,
      showDoneButton: false
    }
  }
  _renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <ImageBackground source={item.image}
          resizeMode="cover" style={styles.background}>
          <View style={styles.loginButtons}>
            <Text style={styles.login} onPress={() => this.props.navigation.navigate('Login')}>Login</Text>
            <View style={styles.verticleLine}></View>
            <Text style={styles.signup} onPress={() => this.props.navigation.navigate('SignUp')}>Sign Up</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  render() {
    if (this.state.showRealApp) {
      return <App />;
    } else {
      return <AppIntroSlider 
      renderItem={this._renderItem} 
      data={slides}
      
      showNextButton={this.state.showNextButton}
      showDoneButton={this.state.showDoneButton}/>;
    }
  }
}

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginTop: 120,
  },
  login: {
    fontSize: 20,
    marginTop: 780,
    marginRight: 15,
    color: '#4C494A',
    fontWeight: '500'
  },
  signup: {
    fontSize: 20,
    marginTop: 780,
    marginLeft: 15,
    color: '#4C494A',
    fontWeight: '500'
  },
  verticleLine: {
    marginTop: 770,
    height: '6%',
    width: 2,
    backgroundColor: '#4C494A',
  },
  loginButtons: {
    flexDirection: 'row'
  }
});