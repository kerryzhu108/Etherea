import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsername } from "../apis/profile";

export default class Home extends React.Component {
    state = {
        username: "NULL"
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Get and set the username for the user
        AsyncStorage.getItem('userid').then((item) => {
            return getUsername(item);
        }).then((response) => response.json()).then((json) => {
            this.setState((state, props) => ({
                username: json.name,
            }));
        }).catch((error) => {
            console.error(error);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Hello {this.state.username}</Text>
                <Text style={styles.navigation} onPress={() => this.props.navigation.navigate('SignUp')}>Sign Up</Text>
                <Text style={styles.navigation} onPress={() => this.props.navigation.navigate('Login')}>Login</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        marginTop: 80
    },
    navigation: {
        fontSize: 20,
        marginTop: 80,
        textDecorationLine: 'underline'

    }
});