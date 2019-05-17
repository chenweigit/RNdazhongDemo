import React from "react";
import { View, Text, Button, Image, StyleSheet, Dimensions, TouchableOpacity, TouchableHighlight,Modal,FlatList,ImageBackground  } from "react-native";
import { px2dp } from '../../utils/util';
import PropTypes from 'prop-types'


let { width, height } = Dimensions.get("window");

class MyModel extends React.Component {
  static propTypes = {
    modalVisible: PropTypes.bool,
    handleVisible: PropTypes.func,
    titleList: PropTypes.array,
    choseIndex: PropTypes.number,
  }
  
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
  }
  render() {
    return (
      <View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.props.modalVisible}
        transparent = {true}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
        <ModelInfo closeModel={this.props.handleVisible} titleList={this.props.titleList} setIndex={this.props.setIndex} choseIndex={this.props.choseIndex}></ModelInfo>
      </Modal>
    </View>
    )
  }
}


class ModelInfo extends React.Component {
  static propTypes = {
    closeModel: PropTypes.func,
    titleList: PropTypes.array,
    setIndex: PropTypes.func,
    choseIndex: PropTypes.number,
  }
  constructor(props) {
    super(props)
  
    this.state = {
       isChose: 0
    }
  }

  render(){
    let {titleList,choseIndex,setIndex} = this.props;
    return (
      // <View style={model.box}>
        <TouchableOpacity
          style={model.box}
          onPress={() => {
            this.props.closeModel(false);
          }}
        >
        <View 
          style={model.textBox}
        >
          <FlatList
            data={titleList}
            extraData={this.props}
            numColumns = {2}
            contentContainerStyle = {model.boxTest}
            renderItem={({ item,index }) => {
              return (
                <TouchableOpacity
                  onPress = {()=> {
                    // console.log(this.state.isChose);
                    setIndex(index)
                  }}
                  keys={index}
                >
                  <Text style={[model.item,{marginLeft:index%2===0?0:px2dp(30)},index===choseIndex?model.itemChose:{}]}>{item}</Text>
                  {choseIndex === index?<Image source={require('../../assets/image/title_chose.png')} style={{width:px2dp(38),height:px2dp(38),position:'absolute',right:0,top:0,borderTopRightRadius:px2dp(10)}}/>:null}
                </TouchableOpacity>
              )
            }}
        />
        </View>
        </TouchableOpacity>
        
      // </View>
    )
  }
}

const model = StyleSheet.create({
  box: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
    zIndex: 100
  },
  boxTest:{
    paddingHorizontal: px2dp(60),
    paddingTop: px2dp(30),
    // justifyContent: 'space-between',
  },  
  textBox: {
    marginTop: px2dp(90),
    backgroundColor: '#fff',
    width: '100%'

  },
  item:{
    width: px2dp(300),
    height: px2dp(80),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e9e9e9',
    borderRadius: px2dp(10),
    fontSize: px2dp(26),
    textAlign: 'center',
    lineHeight: px2dp(80),
    marginBottom: px2dp(30),
    // marginLeft: px2dp(30)

  },
  itemChose:{
    borderColor: '#ff473a',
    color: '#ff473a'
  }
})


class BaseTitle extends React.Component {
  static propTypes = {
    back: PropTypes.func,
    goto: PropTypes.func,
    titleList: PropTypes.array,
  }
  
  constructor(props) {
    super(props)
    this.state = { 
      modalVisible: false,
      choseIndex: 0
    }
    this._onPress = this._onPress.bind(this)
    this.back = this.back.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
    this.setIndex = this.setIndex.bind(this)
  }
  _onPress(nativeEvent) {
    console.log(123);
    console.log(nativeEvent);
  }
  back(){
    this.props.back()
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setIndex(index){
    this.setState({
      choseIndex:index
    })
    this.setModalVisible(!this.state.modalVisible)
  }
  render() {
    let {choseIndex} = this.state;
    let {titleList} = this.props;
    if(!titleList){return null};
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
        {/* 中间 */}
        <View
          style={titleStyle.textBox}
        >
          <TouchableOpacity
            style={titleStyle.textBox}
            onPress = {()=>this.setModalVisible(!this.state.modalVisible)}
          >
            <Text style={titleStyle.text}>竞猜篮球-{(titleList&&titleList[choseIndex])||'全部'}</Text>
            <Image
              source={require('../../assets/image/down_icon.png')}
              style={titleStyle.centerIcon}
            />
          </TouchableOpacity>
          <MyModel modalVisible={this.state.modalVisible} handleVisible = {this.setModalVisible} titleList={this.props.titleList} setIndex = {this.setIndex} choseIndex = {this.state.choseIndex}></MyModel>
        </View>

        {/* 右边 */}
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
    backgroundColor: '#ff473a',
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
    // flex: 1,
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