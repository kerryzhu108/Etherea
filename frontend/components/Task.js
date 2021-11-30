import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {
  return (
    <TouchableOpacity style={[styles.item, {backgroundColor: props.themeColour}]} onPress={() => props.selectTask(props.index)}>
      <Text>{props.taskName}</Text>
      <Text>{props.taskPoints}</Text>
      <Text style={styles.expand}>{'>'}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    margin: 10,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  expand: {
    fontSize: 30,
    textAlign: 'right',
  }
})

export default Task;