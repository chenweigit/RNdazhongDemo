import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, Image, ScrollView } from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Swipe from "../component/base/Swipe";
import server from '../common/net/server';
import api from '../common/net/api';
import { px2dp } from '../utils/util';
import imgUrl from '../utils/image_index';
import PlayList from './home/home_components/Play_list'
class NoticeSwipe extends Component {
  render() {
    return (
      <View style={[styles.noticeSwipe, styles.flexBox]}>
        <View style={styles.nS_leftBox}>
          <Image
            source={imgUrl.prize_HOME}
            // source = {require('../assets/image/prize_home.png')}
            style={styles.noticeLogo}
          />
        </View>
        <View style={styles.nS_rightBox}>

          {/* <Text>sdfsdf</Text> */}
          <View
            style={styles.slideWrap}
          >
            {/* <Swiper 
              // style={styles.slideWrap} 
              autoplay
              showsPagination={false}
              // height={50}
              // horizontal={false}
            >
              <View style={styles.slide}>
                  <Text style={styles.text}>Hello Swiper</Text>
              </View>
              <View style={styles.slide}>
                  <Text style={styles.text}>Beautiful</Text>
              </View>
              <View style={styles.slide}>
                  <Text style={styles.text}>And simple</Text>
              </View>
            </Swiper>*/}
          </View>

        </View>
      </View>
    )
  }
}


class Home extends Component {
  static navigationOptions = ({navigation}) => {
    const { redPoint, tabBarOnPress = ()=>{}, tabBarVisible = false } = navigation.state.params || {};
    return {
      tabBarVisible
    }
  }


  constructor(props) {
    super(props)
    this.state = {
      bannerList: [],
      cpList: [],
      test11: false
    }
    this._onPressButton = this._onPressButton.bind(this);
    if (!this.state.test11) {
      this.props.navigation.setParams({
        tabBarVisible: true
      });
    }
  }
  _onPressButton () {
    // this.props.navigation
    let {navigation} = this.props;
    
    navigation.navigate('Details', {
      itemId: 86,
      otherParam: 'anything you want here',
    });
  }
  
  getCpList () {
    server.post(api.home.CPList)
    .then(res =>{
      // console.log(res);
      this.setState({
        cpList:res.data
      })
      // console.log(this.state.cpList);
      
    })
    
  }


  componentDidMount() {
    server.post(api.home.Banner)
      .then(res => {
        // console.log(res);
        this.setState({
          bannerList: res.data
        })
      })
    this.getCpList()  
  }

  render() {
    let { bannerList, cpList } = this.state;
    console.log(this.props.navigation,22);
    
    return (
      <View style={styles.content}>
        <ScrollView
          style={{ flex: 1 }}
        >
          {/* 处理 */}
          {bannerList.length ? <Swipe dataList={bannerList} /> : <View style={{ height: px2dp(300) }}></View>}
          <NoticeSwipe></NoticeSwipe>
          <View style={styles.contentBox}>
            <View style={styles.title}>
              <Text>热门彩种</Text>
            </View>
            <PlayList data={cpList} _onPressButton={this._onPressButton} ></PlayList>
          </View>
        </ScrollView>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#f4f4f4',
    flex: 1
    // backgroundColor: 'blue'
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noticeSwipe: {
    marginHorizontal: px2dp(30),
    marginVertical: px2dp(20),
    backgroundColor: '#fff',
    borderRadius: px2dp(8),
    paddingVertical: px2dp(30)
  },
  nS_leftBox: {
    // width: px2dp(123),
    // height: px2dp(96), 
  },
  noticeLogo: {
    width: px2dp(123),
    height: px2dp(96),
    marginLeft: px2dp(20)
  },
  nS_rightBox: {
    flex: 1,
    height: px2dp(96),
    // backgroundColor: 'red'
  },
  slideWrap: {
    // width: px2dp(96),
    // height: px2dp(510),
    height: px2dp(96),
    width: px2dp(96),
    // height: px2dp(200),
    // width: px2dp(200),
    // height: px2dp(200),
    backgroundColor: 'green',
    // overflow: 'hidden',
    // transform: [{ rotate: "90deg" }, { translateX: 100 },],
    // transformOrigin: 0,
  },
  slide: {
    // height: px2dp(96),
    // width: px2dp(600),
    width: px2dp(200),
    height: px2dp(200),
    // width: px2dp(510),
    // height: px2dp(96),
    backgroundColor: 'yellow',
    // transform: [{ rotate: "-90deg" }],
  },
  text: {
    color: 'green'
  },
  title: {
    // paddingHorizontal: px2dp(25),
    paddingVertical: px2dp(30),
    fontSize: px2dp(30)
  },
  contentBox: {
    marginHorizontal: px2dp(30),
  },
  playName: {
    textAlign: 'center',
    fontSize: px2dp(30),
    color: '#333',


  },
  desName: {
    backgroundColor: '#ff473a',
    borderRadius: px2dp(15),
    textAlign: 'center',
    fontSize: px2dp(22),
    color: '#fff',
    lineHeight: px2dp(34),

  }
})

export default Home;
