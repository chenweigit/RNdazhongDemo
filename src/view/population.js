/**
 * 入口页面
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage'

/**
 * 用户
 */
export default class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      network: true
    }
    this._readData = this._readData.bind(this)
  }

  componentDidMount() {
    this._readData()
  }

  // 获取登录状态
  async _readData () {
    // AsyncStorage.removeItem('UserInfo')
    let userinfo = await AsyncStorage.getItem('UserInfo')
    let jsonValue = ''
    if (userinfo) {
      jsonValue = JSON.parse(userinfo)
      global._userInfo = jsonValue
    }
    this.init(jsonValue)
  }

  init(userInfo) {
    const { navigation } = this.props
    let router = userInfo ? 'LoginBottom' : 'NotLoginBottom'
    this.setState({
      loading: false
    })
    navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: router })]
    }))
  }

  render() {
    return (
      <View>
        <Text>入口</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({})