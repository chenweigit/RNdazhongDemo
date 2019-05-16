import React, { Component } from 'react'
import { Text, View } from 'react-native'
import BaseTitle from '../../../component/base/base_title';

export default class Jclq extends Component {
  static navigationOptions = ({ navigation })=> {
    const  titleList = ['混合过关','胜负','让分胜负','胜分差','大小分']
    return {
      header: <BaseTitle  goto = {() => navigation.goBack()} back = {() => navigation.goBack()} 
          titleList = {titleList}
          />,
    }
  }
  constructor(props) {
    super(props)
  
    this.state = {
       dataList: ['混合过关','胜负','让分胜负','胜分差','大小分']
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

  componentWillMount() {
    this.props.navigation.setParams({ 
      titleList: this.state.dataList
    });
  }

  render() {
    return (
      <View>
        <Text> Jclq </Text>
      </View>
    )
  }
}
