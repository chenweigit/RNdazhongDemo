
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
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
      isShow: true,
      jiantou: require('../../assets/image/down_icon.png')
    }
  }

  
  /**
   * 左边渲染
   */
  _renderLeft () {
    let { goBack } = this.props
    if (goBack) {
      return (
        <Text style={styles.textColor} onPress={() => {
          goBack()
        }}>返回</Text>
      )
    } else {
      return null
    }
  }

  /**
   * 渲染中间内容
   */
  _renderMiddle () {
    let { showModel, text } = this.props
    let arrowImg = this.state.jiantou
    if (showModel) {
      return (
      <TouchableHighlight onPress={() => {showModel()}} style={styles.middleView} activeOpacity={1}
         underlayColor='#ff473a'>
          <View style={styles.middleView}>
            <Text style={styles.textColor}>{text}</Text>
            <Image source={arrowImg} style={styles.jiantou}></Image>
          </View>
        </TouchableHighlight>
      )
    } else {
      return (
        <View style={styles.middleView}>
          <Text style={styles.textColor}>{text}</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.topView}>
        <View style={styles.bianView}>
          {this._renderLeft()}
        </View>
        {this._renderMiddle()}
        <View style={styles.bianView}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topView: {
    flexDirection: 'row',
    height: px2dp(80),
    backgroundColor: '#ff473a',
    zIndex: 1000
  },
  bianView: {
    width: px2dp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  jiantou: {
    width: px2dp(34),
    height: px2dp(18),
    marginLeft: px2dp(10)
  },
  textColor: {
    color: 'white'
  }
});