
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { px2dp } from '../../utils/util'

/**
 * 页面公用头部
 */
export default class Header extends Component{
  constructor (props) {
    super(props)
    /**
     * state(当前组件的默认参数，类似vue的data里面的默认参数)
     */
    this.state = {
      isShow: true
    }
  }
  render() {
    return (
      <View style={styles.topView}>
        <View style={styles.bianView}><Text style={styles.textColor}>返回</Text></View>
        <View style={styles.middleView}><Text style={styles.textColor}>{this.props.text}</Text></View>
        <View style={styles.bianView}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topView: {
    flexDirection: 'row',
    height: px2dp(80),
    backgroundColor: '#ff473a'
  },
  bianView: {
    width: px2dp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red'
  },
  textColor: {
    color: 'white'
  }
});