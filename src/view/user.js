import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'LoginBottom'}),
  ],
});

/**
 * 用户
 */
export default class User extends Component{
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  goo () {
  }
  render() {
    return (
      <View>
        <Text>用户</Text>
        <Button title='登录' onPress={() => {this.props.navigation.dispatch(resetAction)}}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({})