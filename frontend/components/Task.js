import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class Task extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      highlight: {}
    }
  }

  render() { 
    const highlightTask = () => {
      Object.keys(this.state.highlight).length == 0 ? this.setState({highlight: styles.highlightedBorder}) : this.setState({highlight: {}}) 
    }

    return(      
      <TouchableOpacity
        style={[styles.taskItem, {backgroundColor: this.props.themeColour}, this.state.highlight]}
        onPress={()=>{
          this.props.selectTask(this.props.taskid)
          highlightTask()
         }
        }
      >  
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.taskText}>{this.props.taskName}</Text>
          <View style={styles.verticleLine} opacity={0.5}></View>
          <Text style={styles.taskText}>{this.props.taskPoints}</Text>
          <Text style={styles.pointsText}>{'pts'}</Text>
          <TouchableOpacity 
            onPress={()=>this.props.showPopup(this.props.taskName, this.props.taskDetails)} 
            style={styles.rightArrowBtn}
          >
          <Image source={require('../assets/rightArrow.png')} style={styles.rightArrowImg}/>
        </TouchableOpacity>
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
  highlightedBorder: {
    borderWidth: 3,
    borderColor: '#008B8B',
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
  rightArrowBtn: {
    position: 'absolute',
    right: 0,
  },
  rightArrowImg: {
    height: 20,
    width: 20,
  },
})
