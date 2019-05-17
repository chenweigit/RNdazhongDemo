import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, ImageBackground, Image} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Header from '../component/header/header'
import { px2dp } from '../utils/util';

/**
 * 用户
 */
export default class User extends Component{
  constructor (props) {
    super(props)
    this.state = {
      backgroundImg: require('../assets/login/my_user_background.png')
    }
  }

  /**
   * 去登录
   */
  goLogin () {
    let { navigation } = this.props
    navigation.navigate('Login')
  }

  /**
   * 点击过滤
   * @param {*} key 方法key
   */
  _clicks (key) {
    let _userInfo = global._userInfo
    if (_userInfo) {
      switch (key) {
        case value:
          break;
        default:
          console.log('默认')
          break;
      }
    } else {
      this.goLogin()
    }
  }

  render() {
    let headImg = require('../assets/login/default.png')
    return (
      <View style={{backgroundColor: '#f4f4f4', flex: 1}}>
        <Header text='我的彩票' goBack={() => {this.props.navigation.goBack()}}></Header>
        <ScrollView>
          <ImageBackground source={this.state.backgroundImg} style={styles.backgroundImg}>
            <View style={styles.headView}>
              <View style={styles.headLeft}>
                <Text style={[styles.textStyle, {fontSize: px2dp(30)}]} onPress={() => {this._clicks()}}>登录</Text>
              </View>
              <View style={styles.headRight}>
                <Image source={headImg} style={styles.headImg}></Image>
              </View>
            </View>
          </ImageBackground>
          <View style={{height: 500}}></View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImg: {
    width: '100%',
    height: px2dp(340)
  },
  headView: {
    flexDirection: 'row',
    height: px2dp(100),
    marginTop: px2dp(50),
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30)
  },
  headLeft: {
    flex: 1,
    justifyContent: 'center'
  },
  headRight: {
    justifyContent: 'center'
  },
  headImg: {
    width: px2dp(100),
    height: px2dp(100)
  },
  textStyle: {
    color: 'white'
  }
})