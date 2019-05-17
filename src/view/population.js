/**
 * 入口页面
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'LoginBottom' }),
  ],
});

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
    if (userInfo) {
      this.setState({
        loading: false
      })
      navigation.dispatch(resetAction);
    } else {
      this.setState({
        loading: false
      })
      navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'NotLoginBottom' })]
      }))
    }
  }

  render() {
    return (
      <View>
        <Text>入口</Text>
        <Button title='登录' onPress={() => { this.props.navigation.dispatch(resetAction) }}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({})