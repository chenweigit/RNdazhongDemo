import React from "react";
import { View, Text, Button, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { px2dp } from '../../utils/util';
import PropTypes from 'prop-types'


let { width, height } = Dimensions.get("window");

class MyModel extends React.Component {
  render() {
    return (
      <View style={model.box}>
        <Text>sdf</Text>
      </View>
    )
  }
}
const model = StyleSheet.create({
  box: {
    position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    width: width,
    height: height * 2,
    backgroundColor: 'rgba(0,0,0,.5)',
    zIndex: 100
  }
})



class BaseTitle extends React.Component {
  static propTypes = {
    back: PropTypes.func,
    goto: PropTypes.func,
  }
  
  constructor(props) {
    super(props)

    this.state = {

    }
    this._onPress = this._onPress.bind(this)
    this.back = this.back.bind(this)
  }
  _onPress(nativeEvent) {
    console.log(123);
    console.log(nativeEvent);
    

  }
  back(){
    this.props.back()
  }

  render() {
    return (
      <View style={titleStyle.box}>
        <View style={titleStyle.leftBox}>
        <TouchableOpacity onPress={this.back}>
          <Image
              source={require('../../assets/image/back_icon.png')}
              style={titleStyle.image}
            />
        </TouchableOpacity>
          
        </View>
        <View
          style={titleStyle.textBox}
        >
          <Text style={titleStyle.text}>购彩记录-全部</Text>
          <Image
            source={require('../../assets/image/down_icon.png')}
            style={titleStyle.centerIcon}
          />
        </View>
        <View style={titleStyle.rightBox}>
          <TouchableOpacity style={titleStyle.imgBox} onPress={this._onPress}>
            <Image
              source={require('../../assets/image/jclq_select_icon.png')}
              style={titleStyle.rightIcon1}
            />
          </TouchableOpacity>
          <TouchableOpacity style={titleStyle.imgBox} onPress={this._onPress}>
            <Image
              source={require('../../assets/image/more_icon.png')}
              style={titleStyle.rightIcon2}
            />
          </TouchableOpacity>
        </View>

        {/* <MyModel></MyModel> */}

      </View>

    );
  }
}

const titleStyle = StyleSheet.create({
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'blue',
    height: px2dp(90),
    width: '100%',
    paddingHorizontal: px2dp(30)
    // height: 50
  },
  leftBox: {
    flex: 1,
    textAlign: 'left',
  },
  rightBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    textAlign: 'right',
  },
  image: {
    // position: 'absolute',
    // left: px2dp(10),
    width: px2dp(24),
    height: px2dp(42),
    // marginLeft: 10
  },
  centerIcon: {
    width: px2dp(34),
    height: px2dp(18)
  },
  textBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // textAlign: 'center',

  },

  text: {
    color: '#fff',
    marginRight: 5
  },
  imgBox: {
    width: px2dp(60)
  },
  rightIcon1: {
    // width: 10,
    // height: 10
    width: px2dp(38),
    height: px2dp(38)
  },
  rightIcon2: {
    width: px2dp(42),
    height: px2dp(10)
  }

})

export default BaseTitle;