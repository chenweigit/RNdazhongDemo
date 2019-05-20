import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, ImageBackground, Image, FlatList, TouchableHighlight} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Header from '../component/header/header'
import { px2dp } from '../utils/util';
import api from '../common/net/api'
import server from '../common/net/server'

/**
 * 用户
 */
export default class User extends Component{
  constructor (props) {
    super(props)
    this.state = {
      backgroundImg: require('../assets/login/my_user_background.png'),
      arrowImg: require('../assets/login/icon_right.png'),
      userInfo: {},
      tabList: [{
        text: '充值',
        icon: require('../assets/login/myicon_img8.png')
      }, {
        line: true
      }, {
        id: '2',
        text: '提款',
        icon: require('../assets/login/myicon_img7.png')
      }, {
        line: true
      } ,{
        text: '红包',
        icon: require('../assets/login/myicon_img9.png')
      }],
      list1: [{
        text: '购彩记录',
        icon: require('../assets/login/myicon_img6.png')
      }, {
        text: '追号记录',
        icon: require('../assets/login/myicon_img5.png')
      }, {
        text: '账户明细',
        icon: require('../assets/login/myicon_img4.png')
      }],
      list2: [{
        text: '安全中心',
        icon: require('../assets/login/myicon_img1.png')
      }, {
        text: '推送设置',
        icon: require('../assets/login/myicon_img2.png')
      }, {
        text: '更多选项',
        icon: require('../assets/login/myicon_img3.png')
      }],
      headerImgObj: {
        default: require('../assets/login/default.png'),
        default1: require('../assets/login/default1.png'),
        default2: require('../assets/login/default2.png'),
        default3: require('../assets/login/default3.png'),
        default4: require('../assets/login/default4.png'),
        default5: require('../assets/login/default5.png'),
        default6: require('../assets/login/default6.png')
      }
    }
  }

  componentDidMount() {
    this.init()
  }

  init () {
    let _userInfo = global._userInfo
    if (_userInfo) {
      server.post(api.login.mybaseinfo).then(res =>{
        this.setState({
          userInfo: res.data
        })
        this.initList()
      }).catch(err => {
        // this.refs.toast.show(err)
      })
    } else {
      this.setState({
        userInfo: _userInfo
      })
    }
  }

  initList () {
    let list = this.state.list2
    this.setState({
      list2: [...list,{
        text: '邀请码',
        icon: require('../assets/login/myicon_img10.png')
      }, {
        text: '联系客服',
        icon: require('../assets/login/service.png')
      }, {
        text: '个人中心',
        key: 'about_us',
        icon: require('../assets/login/service.png')
      }]
    })
  }

  /**
   * 去登录
   */
  goLogin () {
    let { navigation } = this.props
    navigation.navigate('Login')
  }

  /**
   * 进入退出页面
   */
  goSignOut () {
    let { navigation } = this.props
    navigation.navigate('SignOut')
  }
  
  /**
   * 点击过滤
   * @param {*} key 方法key
   * @param {*} par 参数
   */
  _clicks (key, par) {
    let _userInfo = this.state.userInfo
    if (_userInfo) {
      switch (key) {
        case 'goPage':
          this._goPage(par)
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
   * 点击列表进入页面
   */
  _goPage(par) {
    let { navigation } = this.props
    if (par.key == 'about_us') {
      navigation.navigate('AboutUs')
    }
  }

  /**
   * 渲染用户信息
   */
  _renderUser () {
    let _userInfo = this.state.userInfo
    let defaultImg = _userInfo.head_img ? _userInfo.head_img.split('.')[0] : 'default'
    let headImg = this.state.headerImgObj[defaultImg]
    if (_userInfo) {
      return (
        <ImageBackground source={this.state.backgroundImg} style={styles.backgroundImg}>
          <View style={styles.headView}>
            <View style={styles.headLeft}>
              <View>
                <Text style={[styles.textStyle, {fontSize: px2dp(30)}]}>{_userInfo.nick_name}</Text>
              </View>
              <View>
                <Text style={[styles.textStyle, {fontSize: px2dp(30)}]}>{`余额：${_userInfo.balance}`}</Text>
              </View>
            </View>
            <View style={styles.headRight}>
              <TouchableHighlight
                activeOpacity={1}
                underlayColor='#FF4D3A'
                onPress={() => {this.goSignOut()}}>
                <Image source={headImg} style={styles.headImg}></Image>
              </TouchableHighlight>
              <Text style={{fontSize: px2dp(20), color: 'white'}}>{_userInfo.mobile}</Text>
            </View>
          </View>
        </ImageBackground>
      )
    } else {
      return (
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
      )
    }
  }

  /**
   * 操作tab渲染
   */
  _renderItemTab (item) {
    if (item.line) {
      return (
        <View style={{width: 1, justifyContent: 'center'}}>
          <View style={{ height: '50%', backgroundColor: '#e9e9e9cc'}}></View>
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

  /**
   * 
   */
  _renderlist (item, index) {
    let arrowImg = this.state.arrowImg
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor='white'
        onPress={() => {this._clicks('goPage', item)}}>
        <View style={{flexDirection: 'row', height: px2dp(120), alignItems: 'center',justifyContent: 'center'}}>
          <Image source={item.icon} style={{width: px2dp(50), height: px2dp(50), marginRight: px2dp(20)}}></Image>
          <Text style={{fontSize: px2dp(26), flex: 1}}>{item.text}</Text>
          <Image source={arrowImg} style={{width: px2dp(20), height: px2dp(30)}}></Image>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={{backgroundColor: '#f4f4f4', flex: 1}}>
        <Header text='我的彩票'></Header>
        <ScrollView>
          {this._renderUser()}
          <View style={styles.buttomView}>
            <View style={styles.tabView}>
              <FlatList
                data={this.state.tabList}
                numColumns = {5}
                renderItem={({item}) => this._renderItemTab(item)}
              />
            </View>
            <View style={[styles.listContainer, {marginTop: px2dp(60)}]}>
              <FlatList
                data={this.state.list1}
                numColumns = {1}
                ItemSeparatorComponent={() => <View style={{backgroundColor: '#eee',height: 1}}></View>}  
                renderItem={({item, index}) => this._renderlist(item, index)}
              />
            </View>
            <View style={[styles.listContainer, {marginTop: px2dp(20)}]}>
              <FlatList
                data={this.state.list2}
                numColumns = {1}
                ItemSeparatorComponent={() => <View style={{backgroundColor: '#eee',height: 1}}></View>}  
                renderItem={({item}) => this._renderlist(item)}
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
    justifyContent: 'center',
    alignItems: 'center',
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
    position: 'relative',
    marginBottom: px2dp(30)
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
  },
  listContainer: {
    borderRadius: px2dp(10),
    backgroundColor: 'white',
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30)
  }
})