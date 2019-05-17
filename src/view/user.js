import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, ImageBackground, Image, FlatList} from 'react-native';
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
      backgroundImg: require('../assets/login/my_user_background.png'),
      tabList: [{
        text: '充值',
        icon: require('../assets/login/myicon_img8.png')
      }, {
        id: '2',
        text: '提款',
        icon: require('../assets/login/myicon_img7.png')
      }, {
        text: '红包',
        icon: require('../assets/login/myicon_img9.png')
      }]
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
        case '':
          break;
        default:
          this.goLogin()
          console.log('默认')
          break;
      }
    } else {
      this.goLogin()
    }
  }

  /**
   * 
   * 
   */
  _renderItemTab (item) {

    if (item.id == '2') {
      return (
        <View style={styles.listView}>
          <Image source={item.icon} style={{width: px2dp(60), height: px2dp(60)}}></Image>
          <Text style={{fontSize: px2dp(26), marginTop: px2dp(10)}}>{item.text}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.listView}>
          <Image source={item.icon} style={{width: px2dp(60), height: px2dp(60)}}></Image>
          <Text style={{fontSize: px2dp(26), marginTop: px2dp(10)}}>{item.text}</Text>
        </View>
      )
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
          <View style={styles.buttomView}>
            <View style={styles.tabView}>
              <FlatList
                data={this.state.tabList}
                numColumns = {3}
                renderItem={({item}) => this._renderItemTab(item)}
              />
            </View>
          </View>
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
  },
  buttomView: {
    marginLeft: px2dp(30),
    marginRight: px2dp(30),
    height: 500,
    position: 'relative'
  },
  tabView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: px2dp(10),
    position: 'absolute',
    top: px2dp(-115),
    flexDirection: 'row',
    paddingTop: px2dp(25),
    paddingBottom: px2dp(25)
  },
  listView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})