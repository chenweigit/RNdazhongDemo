import React, {Component} from 'react';
import { StyleSheet, Text, View, Modal, Button, Image} from 'react-native';
import Header from '../../../component/header/header'
import { px2dp } from '../../../utils/util'
import api from '../../../common/net/api'
import server from '../../../common/net/server'
/**
 * 代理
 */
export default class AboutUs extends Component{
  constructor (props) {
    super(props)
    this.state = {
      is_number: 0,
      timer: '',
      isend: '000000',
      isModal: false,
      jiantou: require('../../../assets/login/icon_right.png')
    }
  }

  componentDidMount() {
    this._getTime()
  }

  /**
   * 获取时间
   */
  _getTime () {
    server.post(api.login.getBetOne, {
      cp_key: 'txffc'
    }).then(res =>{
      this.setState({
        is_number: parseInt(res.data.bet_time)
      })
      this.is_endtime(res.data)
    }).catch(err => {})
  }

  /**
   * 倒计时
   */
  is_endtime () {
    let last_time = this.state.is_number
    let new_time = ''
    if (last_time === 0) {
      new_time = '0000'
      clearTimeout(this.state.timer)
      this.setState({
        isModal: true
      })
    } else {
      const px_d=60*60*24;// 天
      const px_h=60*60;  //小时
      const px_m=60; //分
      const px_s=1;  //秒
      let m=Math.floor((last_time)/px_m)>=10?Math.floor((last_time)/px_m):'0'+Math.floor((last_time)/px_m);
      let s=Math.floor((last_time-m*px_m)/px_s)>=10?Math.floor((last_time-m*px_m)/px_s):'0'+Math.floor((last_time-m*px_m)/px_s);
      new_time=m+''+s
      this.setState({
        timer: setTimeout(() => {
          this.setState({
            is_number: last_time - 1
          })
          this.is_endtime()
        }, 1000)
      })
    }
    this.setState({
      isend: new_time
    })
  }

  /**
   * 温馨提示
   */

  render() {
    let time = this.state.isend
    let arrowImg = this.state.jiantou
    return (
      <View style={{backgroundColor: '#f4f4f4', flex: 1}}>
        <Header text="腾讯分分彩" goBack={() => {this.props.navigation.goBack()}} showModel={() => {alert(1)}}></Header>
        <View style={styles.topView}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{}}>
              <Text style={{fontSize: px2dp(20), textAlign: 'center'}}>———— 距离0882投注截止 ————</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: px2dp(20)}}>
              <Text style={styles.redView}>{time[0]}</Text>
              <Text style={styles.redView}>{time[1]}</Text>
              <Text> 分</Text>
              <Text style={styles.redView}>{time[2]}</Text>
              <Text style={styles.redView}>{time[3]}</Text>
              <Text> 秒</Text>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, paddingLeft: px2dp(100)}}>
              <View style={{}}>
                <Text style={{fontSize: px2dp(20)}}>0882开奖结果</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: px2dp(15)}}>
                <Text>2</Text>
                <Text>2</Text>
                <Text>2</Text>
                <Text>2</Text>
                <Text>2</Text>
              </View>
            </View>
            <View style={{justifyContent: 'center', paddingRight: px2dp(20)}}>
              <Image source={arrowImg} style={{width: px2dp(20), height: px2dp(30)}}></Image>
            </View>
          </View>
        </View>
        <View style={{padding: px2dp(20),backgroundColor: 'white', marginTop: px2dp(20)}}>
          <Text>
            猜中开奖号码万位和个位的大小关系（万位大于个位为龙,万位小于个位为虎,万位等于个位为和）,龙中奖<Text style={{color: 'red'}}>4.3元</Text>,虎中奖<Text style={{color: 'red'}}>4.3元</Text>,和中奖<Text style={{color: 'red'}}>19.4元</Text>
          </Text>
          <View>
            
          </View>
        </View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.isModal}
          >
          <View style={styles.modelView}>
            <View style={{backgroundColor: 'white'}}>
              <Text>尊敬的用户,当前期已截止,期号已更新至下一期,请你核对期号后再投注.</Text>
              <Button title="我知道了" onPress={() => {
                this.setState({
                  isModal: false
                })
                this._getTime()
              }}></Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topView: {
    flexDirection: 'row',
    paddingTop: px2dp(20),
    paddingBottom: px2dp(20),
    backgroundColor: 'white'
  },
  redView: {
    backgroundColor: '#ff473a',
    width: px2dp(40),
    height: px2dp(40),
    borderRadius: px2dp(4),
    textAlign: 'center',
    marginLeft: px2dp(10),
    color: 'white'
  },
  modelView: {
    backgroundColor: 'rgba(00,00,00, 0.5)',
    flex: 1,
    justifyContent: 'center'
  }
})