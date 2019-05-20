import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Button} from 'react-native'
import { px2dp } from '../../utils/util';
import PropTypes from 'prop-types'
export default class baseShopBottom extends Component {
  static propTypes = {
    matchList: PropTypes.object,
    setMacthList: PropTypes.func
  }
  constructor(props) {
    super(props)
  
    this.state = {
       choseLen: 0
    }
    this.clearAll = this.clearAll.bind(this)
  }
  componentWillReceiveProps(nextProps){
    let {matchList} = nextProps;
    this.filterMatch(matchList)
  }
  filterMatch (matchList) {
    // let {matchList} = this.props;
    if(!matchList) return;
    let choseLen = Object.values(matchList).reduce((len,dayList) => {
      len += this.filterChose(dayList);
      return len
    },0)  
    this.setState({
      choseLen
    })
  }
  filterChose(dayList){
    let choseLen = Object.values(dayList).reduce((len,matchItem) => {
      len += this.calNumber(matchItem);
      return len
    },0)
    return choseLen
  }
  calNumber(matchItem){
    let {odds_1_all,odds_2_all,odds_3_all,odds_4_all} = matchItem;
    let oddList = [odds_1_all,odds_2_all,odds_3_all,odds_4_all];
    let num = 0;
    for (const odds of oddList) {
      let result = Object.values(odds).some(oddsItem => oddsItem.chose);
      if(result) {
        num = 1;
        break;
      }
    }
    return num;
  }
  clearAll(){
    let {matchList,setMacthList} = this.props;
    Object.values(matchList).forEach(dayList => {
      dayList.forEach(matchItem => {
        let {odds_1_all,odds_2_all,odds_3_all,odds_4_all} = matchItem;
        let oddList = [odds_1_all,odds_2_all,odds_3_all,odds_4_all];
        oddList.forEach(item =>{
          Object.keys(item).forEach(key => {
            item[key].chose = false; 
          })
        })
      })
    })
    // console.log(setMacthList);
    setMacthList()
    this.setState({
      choseLen: 0
    })

  }

  render() {
    let {choseLen} = this.state;
    return (
      <View style={shopBottomStyles.wrap}>
        <TouchableOpacity 
        style={shopBottomStyles.leftBox}
        onPress = {this.clearAll}
        >
          <Image source={require('../../assets/image/clear_icon.png')} style={{width: px2dp(160),height: px2dp(50)}}></Image>
        </TouchableOpacity>
        <View style={shopBottomStyles.centerBox}>
          <Text style={shopBottomStyles.text}>已选择{choseLen}场</Text>
          <Text style={[shopBottomStyles.text,shopBottomStyles.textDesc]}>开奖结果包含加时赛</Text>
        </View>
        <TouchableOpacity style={shopBottomStyles.leftBox}>
          <Text style={shopBottomStyles.button}>确定</Text>
        </TouchableOpacity>
        
      </View>
    )
  }
}

const shopBottomStyles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    backgroundColor: '#fff',
    left: 0,
    right: 0,
    bottom: 0,
    height: px2dp(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftBox:{

  },
  centerBox:{
    flex: 1,
    
  },
  text:{
    color: '#333',
    fontSize: px2dp(30),
    lineHeight: px2dp(36),
    textAlign: 'center',
  },
  textDesc: {
    fontSize: px2dp(22),
  },
  rightBox:{
    width: px2dp(200),
    height: px2dp(100)
  },
  button: {
    width: px2dp(200),
    height: px2dp(100),
    backgroundColor: '#ff473a',
    textAlign: 'center',
    color: '#fff',
    lineHeight: px2dp(100)
  }
})
