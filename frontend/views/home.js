import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsername } from "../apis/profile";
import { getTasks } from "../apis/tasks";
import Task from "../components/Task";

export default class Home extends React.Component {
    state = {
        username: "NULL",
        tasks: []
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

        this.state.tasks = getTasks(AsyncStorage.getItem('userid'))
    }
   
    render() {
        return (
            <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Your Tasks</Text>

            <View style={styles.items}>
              {
                this.state.tasks.map((item, index) => {
                  return (
                    <TouchableOpacity key={index}>
                      <Task text={item['descript']} /> 
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        );
    }

}

const styles = StyleSheet.create({
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
      },
      items: {
        marginTop: 30,
      },
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