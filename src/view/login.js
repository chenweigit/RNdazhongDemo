import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableHighlight, AsyncStorage} from 'react-native';
import Header from '../component/header/header'
import { px2dp } from '../utils/util'
import { regExp } from '../common/reg_exp/reg_exp'
import api from '../common/net/api'
import server from '../common/net/server'

/**
 * 登录
 */
export default class Login extends Component{
  constructor (props) {
    super(props)
    this.state = {
      phone: '',
      phoneIsTrue: false,
      pass: '',
      passIsTrue: false
    }
    this.goback = this.goback.bind(this)
  }

  /**
   * 验证手机号输入
   */
  _ckeckPhone (phone) {
    let flag = false
    if (!regExp.Reg_TelNo.test(phone)) {
      flag = false
    } else {
      flag = true
    }
    this.setState({
      phoneIsTrue: flag,
      phone: phone
    })
  }

  /**
   * 验证密码输入
   */
  _ckeckPass (pass) {
    let flag = false
    if (pass.length == 6) {
      flag = true
    } else {
      flag = false
    }
    this.setState({
      passIsTrue: flag,
      pass: pass
    })
  }

  /**
   * 登录按钮渲染
   */
  _renderButton () {
    let phoneIsTrue = this.state.phoneIsTrue
    let passIsTrue = this.state.passIsTrue
    if (phoneIsTrue && passIsTrue) {
      return (
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor='#f5a8a2'
          onPress={() => {this._signIn()}}
          style={[styles.loginBtn, styles.btnColor1]}>
          <Text style={styles.textColor}>登录</Text>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight
          style={[styles.loginBtn, styles.btnColor2]}>
          <Text style={styles.textColor}>登录</Text>
        </TouchableHighlight>
      )
    }
  }

  /**
   * 登录
   */
  _signIn () {
    let phone = this.state.phone
    let pass = this.state.pass
    let { navigation } = this.props
    let userInfo = {
      mobile: phone,
      password: pass
    }
    server.post(api.login.Login, userInfo).then(res =>{
      alert(res.res_msg)
      AsyncStorage.setItem('UserInfo', JSON.stringify(res.data), (error) => {
        if (!error) {
          navigation.navigate('PopulationScreen')
        }else {
          alert('保存失败')
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  // 返回
  goback () {
    let { navigation } = this.props
    navigation.goBack()
  }

  render() {
    let phoneImg = require('../assets/login/signin_phone.png')
    let passImg = require('../assets/login/signin_password1.png')
    return (
      <View>
        <Header text="登录" goBack={this.goback}></Header>
        <View style={styles.middle}>
          <View style={styles.inputView}>
            <View style={styles.imgView}>
              <Image style={styles.imgStyle} source={phoneImg} />
            </View>
            <TextInput
              style={styles.inputStyle}
              placeholder="请输入手机号码"
              numberOfLines={1}
              maxLength={11}
              autoFocus={true}
              keyboardType='numeric'
              underlineColorAndroid={'transparent'}
              onChangeText={(phone) => {this._ckeckPhone(phone)}}
            />
          </View>
          <View style={styles.inputView}>
            <View style={styles.imgView}>
              <Image style={styles.imgStyle} source={passImg} />
            </View>
            <TextInput
              style={styles.inputStyle}
              placeholder="请输入密码"
              numberOfLines={1}
              maxLength={6}
              keyboardType='numeric'
              secureTextEntry={true}
              underlineColorAndroid={'transparent'}
              onChangeText={(pass) => {this._ckeckPass(pass)}}
            />
          </View>
          {this._renderButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  middle: {
    padding: px2dp(20)
  },
  inputView: {
    flexDirection: 'row',
    marginTop: px2dp(10),
    height: px2dp(80),
    backgroundColor: '#f7f7f7',
  },
  imgView: {
    backgroundColor: '#f7f7f7',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: px2dp(20),
    paddingRight: px2dp(10)
  },
  imgStyle: {
    width: px2dp(41.5),
    height: px2dp(50)
  },
  inputStyle: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
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
  btnColor2: {
    backgroundColor: '#e1e1e1',
  },
  textColor: {
    color: 'white'
  }
})