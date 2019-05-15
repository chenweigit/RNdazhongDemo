import React, { Component } from 'react'
import { Text, View, StyleSheet,Image  } from 'react-native'
import PropTypes from 'prop-types';


export default class TabIcon extends Component {
  static propTypes = {
    img: PropTypes.any,
  }
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <View>
        <Image
          source = {this.props.img}
          // source = {require('../../assets/image/home_icon.png')}
          style = {styles.tabBarIcon}
          // source = {this.props.Image}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabBarIcon: {
      width: 21,
      height: 21,
  }
})

