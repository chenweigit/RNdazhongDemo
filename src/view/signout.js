import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, WebView} from 'react-native';
import Header from '../component/header/header'
import { px2dp } from '../utils/util'
import AsyncStorage from '@react-native-community/async-storage'
/**
 * 代理
 */
export default class Agent extends Component{
  constructor (props) {
    super(props)
    this.state = {
    }
    this.goback = this.goback.bind(this)
  }

  // 返回
  goback () {
    let { navigation } = this.props
    navigation.goBack()
  }

  _sinOut () {
    AsyncStorage.removeItem('UserInfo')
    let { navigation } = this.props
    navigation.navigate('PopulationScreen')
  }
  render() {
    return (
      
      <View>
        <Header text="更多设置" goBack={this.goback}></Header>
        <View style={{padding: px2dp(30)}}>
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor='#f5a8a2'
            onPress={() => {this._sinOut()}}
            style={[styles.loginBtn, styles.btnColor1]}>
            <Text style={styles.textColor}>退出</Text>
          </TouchableHighlight>
          {/* <View style={{height: px2dp(300)}} >
            <WebView source={{uri: 'https://www.baidu.com'}}>
            </WebView>
          </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginBtn: {
    borderRadius: px2dp(40),
    marginTop: px2dp(100),
    alignItems: 'center',
    height: px2dp(80),
    justifyContent: 'center',
  },
  btnColor1: {
    backgroundColor: '#ff473a',
  },
  textColor: {
    color: 'white'
  }
})