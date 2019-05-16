import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';


/**
 * 用户
 */
export default class User extends Component{
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  goLogin () {
    let { navigation } = this.props
    navigation.navigate('Login')
  }
  render() {
    return (
      <View>
        <Text>用户</Text>
        <Button title='登录' onPress={() => {this.goLogin()}}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({})