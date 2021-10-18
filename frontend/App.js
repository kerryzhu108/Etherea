'use strict'
import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import { getItems, getTotalCost } from './api';
import MenuItem from './components/menu_item.js'

class App extends Component {

  state = {
    selectedItems: [],
    discountCode: '',
    menuItems: [],
    orderInfo: []
  }

  componentDidMount() {
    getItems().then(res => res.json()).then( json => {
      this.setState({menuItems: json.items})
    })
  }

  clickItem(itemName) {
    let newlySelectedItems = [...this.state.selectedItems]
    if (itemName !== 'apply discount') {
      newlySelectedItems.push(itemName)
      this.setState({selectedItems: newlySelectedItems})
    }
    getTotalCost(newlySelectedItems, this.state.discountCode).then(res => res.json()).then( json => {
      this.setState({orderInfo: json})
    })
  }
  
  removeItem(index) {
      let lessSelectedItems = [...this.state.selectedItems]
      lessSelectedItems.splice(index, 1);
      this.setState({selectedItems: lessSelectedItems});

      getTotalCost(lessSelectedItems, this.state.discountCode).then(res => res.json()).then( json => {
        this.setState({orderInfo: json})
      })
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.largeFont}>Enrico Pavernitti</Text>
        <Text style={styles.description}>~Authentic Italian Cusine~</Text>
        <Text style={styles.instructions}>Tap and hold to order item</Text>

        { this.state.menuItems.map((item, key) => (
            <MenuItem key={key} imgURL={item[2]} name={item[0]} price={item[1]} handleClick={this.clickItem.bind(this)}></MenuItem>
          ))
        }

        <Text style={styles.largeFont}>Your Order</Text>
        <Text style={styles.description}>(Tap to remove)</Text>
        { this.state.selectedItems.map((item, key) => (
            <Text key={key} style={styles.item} onPress={()=>{this.removeItem.bind(this)(key)}}>{item}</Text>)
          )
        }

        <View style={styles.discount}>
          <TextInput placeholder="Enter discount code" 
            style={styles.discountCode}
            onChangeText={(text)=>{this.setState({discountCode: text})}}
            value={this.state.discountCode}
          />
          <Button title='Apply' onPress={()=>{        
            this.clickItem.bind(this)('apply discount')
            this.setState({discountCode: ''})
          }}/>
        </View>

        <Text style={styles.orderInfo}>Subtotal: {this.state.orderInfo.subtotal}</Text>
        <Text style={styles.orderInfo}>Discount: {this.state.orderInfo.discount}</Text>
        <Text style={styles.orderInfo}>Tax: {this.state.orderInfo.tax}</Text>
        <Text style={styles.orderInfo}>Total: {this.state.orderInfo.total}</Text>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeFont: {
    marginTop: 25,
    fontSize: 35,
  },
  description: {
    fontSize: 15,
  },
  instructions: {
    marginTop: 35,
  },
  item: {
    marginTop: 10,
    fontSize: 20
  },
  discount: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  discountCode: {
    padding: 5,
    margin: 30,
    fontSize: 15,
    borderWidth: 1
  },
  orderInfo: {
    fontSize: 20,
    marginBottom: 20
  }
});

export default App;
