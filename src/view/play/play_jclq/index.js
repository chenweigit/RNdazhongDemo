import React, { Component } from 'react'
import { Text, View } from 'react-native'
import BaseTitle from '../../../component/base/base_title';

export default class Jclq extends Component {
  static navigationOptions = ({ navigation })=> {
    return {
      header: <BaseTitle  goto = {() => navigation.goBack()} back = {() => navigation.goBack()}/>,
    }
  }
  back(){
    let {navigation} = this.props;
    navigation.goBack()
  }
  goto(path){
    let {navigation} = this.props;
    navigation.navigate('Jclq', {
      itemId: 85,
      otherParam: 'anything you want here',
    });
  }

  componentDidMount() {
    // this.props.navigation.setParams({ 
    //   goto: this._increaseCount,
    //   back: this.back

    // });
  }
  render() {
    return (
      <View>
        <Text> Jclq </Text>
      </View>
    )
  }
}
