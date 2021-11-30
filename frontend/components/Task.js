import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Task extends React.Component { 
  constructor(props) {
    super(props);
  }

  render() { 
    const openDis = (tasks) => {}

    return(
      <TouchableOpacity
        style={[styles.taskItem, {backgroundColor: this.props.themeColour}]}
        onPress={()=>{ this.props.selectTask(props.taskid) }}
      >  
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.taskText}>{this.props.taskName}</Text>
          <View style={styles.verticleLine} opacity={0.5}></View>
          <Text style={styles.taskText}>{this.props.taskPoints}</Text>
          <Text style={styles.pointsText}>{'pts'}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  taskItem: {
    marginTop: 20,
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderWidth: 0.5,
  },
  taskText: {
    fontSize: 15,
    color: 'white',
    textTransform: 'capitalize'
  },
  verticleLine: {
    marginStart: '2.5%',
    marginEnd: '2.5%',
    height: '120%',
    width: 2,
    backgroundColor: 'white',
  },
  pointsText: {
    fontSize: 13,
    color: 'white',
  },
})
