import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, ScrollView, Button, Alert } from "react-native";
import NavigationPanel from '../components/navigationPanel.js';

export default class adminPanel extends React.Component { 
    constructor(props) {
      super(props);
    }

    render() { 
        return (
            <SafeAreaView>
            <ScrollView>
            <Text style={styles.title}>ADMIN PANEL</Text>
            <Text style={styles.desc}>
                    Welcome to the admin panel. You can add new tasks and themes by filling in the appropriate fields.
            </Text>
                <Text style={styles.subtitle1}>ADD NEW TASK</Text>
                <Text style={styles.box_desc}>Theme ID</Text>
                <TextInput
                style={styles.input}
                />
                <Text style={styles.box_desc}>Theme Name</Text>
                <TextInput
                style={styles.input}
                />
                <Text style={styles.box_desc}>Task</Text>
                <TextInput
                style={styles.input}
                />
                <Text style={styles.box_desc}>Task ID</Text>
                <TextInput
                style={styles.input}
                />
                <Text style={styles.box_desc}>Task Name</Text>
                <TextInput
                style={styles.input}
                />
                <Text style={styles.box_desc}>Description</Text>
                <TextInput
                style={styles.input}
                />
                <Text style={styles.box_desc}>Points</Text>
                <TextInput
                style={styles.input}
                />
                <Button
                title="Confirm New Task"
                onPress={() => Alert.alert('You have created a new task!')}
                color="blue"
                />
                <Text style={styles.subtitle2}>ADD NEW THEME</Text>
                <Text style={styles.box_desc}>Theme ID</Text>
                <TextInput
                style={styles.input}
                />
                <Text style={styles.box_desc}>Theme Name</Text>
                <TextInput
                style={styles.input}
                />
                <Text style={styles.box_desc}>Stat Name</Text>
                <TextInput
                style={styles.input}
                />
                <Text style={styles.box_desc}>Multiplier</Text>
                <TextInput
                style={styles.input}
                />
                <Text style={styles.box_desc}>Date Launched</Text>
                <TextInput
                style={styles.input}
                />
            </ScrollView>
            <Button
                title="Confirm New Theme"
                onPress={() => Alert.alert('You have created a new theme!')}
                color="blue"
                />
            <NavigationPanel navigation={this.props.navigation}/>
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#747070",
    marginTop: 100,
    textAlign: 'center'
  },
  desc: {
    margin: 30,
    marginTop: 5,
    textAlign: 'center',
    color: 'grey',
  },
  box_desc: {
    color: 'black',
    textAlign: 'center'
  },
  subtitle1: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#747070",
    marginTop: -10,
    textAlign: 'center'
  },
  subtitle2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#747070",
    marginTop: 20,
    textAlign: 'center'
  },
});