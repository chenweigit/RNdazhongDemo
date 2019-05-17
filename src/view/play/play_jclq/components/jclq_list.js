import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { px2dp,getWeekDay, lastTime } from '../../../../utils/util';
import PropTypes from 'prop-types';


class JclqItem extends Component {

  static propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    setChose: PropTypes.func,
  }
  constructor(props) {
    super(props)
    let {odds_1_all,odds_2_all,odds_3_all,odds_4_all} = props.data;
    this.state = {
        odds_1_all,
        odds_2_all,
        odds_3_all,
        odds_4_all
    }
    this.setChose1 = this.setChose1.bind(this);
    this.isChose = this.isChose.bind(this)
  }
  setChose1(name,key){
    let {setChose} = this.props;
    console.log(33);
    let items = this.state[name][key]||{};
    console.log(items.chose);
    // console.log(data);
    items.chose = !items.chose;

    this.setState({
      [name]: this.state[name]
    })
    setChose()
  }
  isChose(name,key){
    console.log({name,key});
    console.log(this.state,this.state[name]);
    
    let odds = this.state[name][key]||{};
    return odds.chose
  }
  
  render() {
    let {index,data} = this.props;
    let {odds_1_all,odds_2_all,odds_3_all,odds_4_all} = this.state;
    console.log('render');
    
    return (
      <View
        style={[jclqItemStyle.itemStyle,{marginTop:index===0?px2dp(22):0}]}
        key={data.match_id}
      >
        <View style={[jclqItemStyle.borderBottom]}>
          <Text style={[jclqItemStyle.text]}>{data.guest}&nbsp;&nbsp;&nbsp;VS&nbsp;&nbsp;&nbsp;{data.host}</Text>
        </View>

        <View style={[jclqItemStyle.flexBox]}>
          {/* 左部 */}
          <View style={[jclqItemStyle.leftBox, jclqItemStyle.borderRight]}>
            <Text style={jclqItemStyle.left_icon}>{data.match_id.substr(-3)}</Text>
            <Text style={jclqItemStyle.left_text}>{data.match_name}</Text>
            <Text style={jclqItemStyle.left_time}>{lastTime(data.match_time_int)}截止</Text>
          </View>
          {/* 中部 */}
          <View style={[jclqItemStyle.centerBox]}>
            <View style={[jclqItemStyle.flexBox, jclqItemStyle.center_top, jclqItemStyle.borderBottom]}>
              <View style={[jclqItemStyle.testText]}>
                <Text style={[jclqItemStyle.center_letText]}>让分</Text>
              </View>
              <TouchableOpacity
                onPress = {()=>{this.setChose1('odds_2_all','00')}}
              >
                <Text style={[jclqItemStyle.textStyle, jclqItemStyle.center_text, jclqItemStyle.borderLeft,this.isChose('odds_2_all','00')?jclqItemStyle.choseItem:null]}>让客胜 <Text style={jclqItemStyle.scoreColor}>{odds_2_all['00'].value}</Text></Text>
              </TouchableOpacity>
              
              <Text style={[jclqItemStyle.textStyle, jclqItemStyle.oddsNumber, jclqItemStyle.borderLeft]}>{data.rq}</Text>
              <TouchableOpacity>
                <Text style={[jclqItemStyle.textStyle, jclqItemStyle.center_text, jclqItemStyle.borderLeft]}>让主胜 <Text style={jclqItemStyle.scoreColor}>{data['odds_2_all']['03'].value}</Text></Text>
              </TouchableOpacity>
            </View>
            <View style={[jclqItemStyle.flexBox, jclqItemStyle.center_top]}>
              <View style={[jclqItemStyle.testText]}>
                <Text style={[jclqItemStyle.center_letText, jclqItemStyle.big_text]}>大小分</Text>
              </View>
              <TouchableOpacity>
                <Text style={[jclqItemStyle.textStyle, jclqItemStyle.center_text, jclqItemStyle.borderLeft]}>大 <Text style={jclqItemStyle.scoreColor}>{data['odds_4_all']['03'].value}</Text></Text>
              </TouchableOpacity>
              
              <Text style={[jclqItemStyle.textStyle, jclqItemStyle.oddsNumber, jclqItemStyle.borderLeft]}>{data.sd}</Text>
              <TouchableOpacity>
                <Text style={[jclqItemStyle.textStyle, jclqItemStyle.center_text, jclqItemStyle.borderLeft]}>小 <Text style={jclqItemStyle.scoreColor}>{data['odds_4_all']['00'].value}</Text></Text>
              </TouchableOpacity>
              
            </View>
          </View>
          {/* 右边 */}
          <View style={[jclqItemStyle.flexBox, jclqItemStyle.rightBox, jclqItemStyle.borderLeft]}>
            <Text style={jclqItemStyle.right_text}>展开</Text>
          </View>
        </View>
      </View>
    )
  }

}

const jclqItemStyle = StyleSheet.create({
  itemStyle: {
    // padding: px2dp(20),
    backgroundColor: '#fff',
    borderRadius: px2dp(10),
    borderWidth: 1,
    borderColor: '#eaeaea',
    borderStyle: 'solid',
    marginBottom: px2dp(22),
    // marginTop: px2dp(22)

  },
  borderBottom: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#eaeaea',
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderStyle: 'solid',
    borderLeftColor: '#eaeaea',
  },
  borderRight: {
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderRightColor: '#eaeaea',
  },
  text: {
    fontSize: px2dp(28),
    lineHeight: px2dp(64),
    color: '#333',
    textAlign: 'center',
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },
  leftBox: {
    width: px2dp(160),
    height: px2dp(160),
    alignItems: 'center',
    justifyContent: 'center'
    // width: '20%',

  },
  left_icon: {
    fontSize: px2dp(20),
    backgroundColor: '#333',
    borderRadius: px2dp(17),
    // paddingVertical: px2dp(4),
    // paddingHorizontal: px2dp(18),
    color: '#fff',
    textAlign: 'center',
    width: px2dp(70),
    height: px2dp(30)
  },
  left_text: {
    width: '100%',
    fontSize: px2dp(20),
    lineHeight: px2dp(28),
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',

  },
  left_time: {
    width: '100%',
    fontSize: px2dp(24),
    lineHeight: px2dp(34),
    color: '#808080',
    textAlign: 'center',
  },
  centerBox: {
    width: px2dp(480),

  },
  center_top: {
    flex: 1,

  },
  testText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: px2dp(36),
    height: px2dp(80),
    backgroundColor: '#f4f4f4',

  },
  center_letText: {
    color: '#b18ae0',
    fontSize: px2dp(20),
    lineHeight: px2dp(28),
    textAlign: 'center',
  },
  big_text: {
    color: '#5bb2ff',
    lineHeight: px2dp(24),
  },
  textStyle: {
    fontSize: px2dp(24),
    color: '#333',
    textAlign: 'center',
  },
  center_text: {
    width: px2dp(170),
    height: px2dp(80),
    lineHeight: px2dp(80),

  },
  scoreColor: {

  },
  oddsNumber: {
    width: px2dp(116),
    color: '#5bb2ff',
    height: px2dp(80),
    lineHeight: px2dp(80),
  },
  rightBox: {
    flex: 1,
    height: px2dp(160),

  },
  right_text: {
    fontSize: px2dp(20),
    color: '#333'
  },
  choseItem: {
    backgroundColor: '#ff4536',
    color: '#fff'
  }


})



export default class JclqList extends Component {
  static propTypes = {
    list: PropTypes.array,
    date: PropTypes.string,
    setChose: PropTypes.func,
  }
  

  constructor(props) {
    super(props)

    this.state = {
      showList: false
    }
    this.setShowList = this.setShowList.bind(this)
  }
  showListItem(item,index){
    let {showList} = this.state;
    let {date,setChose} = this.props;
    return showList?<JclqItem data={item} index={index} date={date} setChose={setChose}></JclqItem>:null
  }
  setShowList(){
    this.setState({
      showList:!this.state.showList
    })
  }


  render() {
    const { list,date } = this.props;
    return (
      <View 
        
      >
        {/* title */}
        <TouchableOpacity
          style={[jclqStyle.wrap, jclqStyle.flexBox]}
          onPress = {this.setShowList}
        >
          <Text style={jclqStyle.text}>{getWeekDay(date)} {date}</Text>
          <View style={[jclqStyle.flexBox]}>
            <Text style={jclqStyle.text}>{list.length} 场比赛可投 </Text>
            <Image
              source={require('../../../../assets/image/jiantou_gray_icon.png')}
              style={jclqStyle.jiantouIcon}
            />
          </View>
        </TouchableOpacity>
        <FlatList
          data={list}
          extraData={this.state}
          // numColumns = {2}
          // contentContainerStyle = {jclqStyle.list}
          style={jclqStyle.list}
          renderItem={({ item, index }) => this.showListItem(item,index)}
        />


      </View>
    )
  }
}

const jclqStyle = StyleSheet.create({
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrap: {
    paddingHorizontal: px2dp(30),
    // backgroundColor: 'blue'
  },
  text: {
    fontSize: px2dp(28),
    lineHeight: px2dp(80),
    color: '#333'
  },
  jiantouIcon: {
    width: px2dp(34),
    height: px2dp(18)
  },
  list: {
    // flex: 1,
    width: '100%',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: px2dp(20),
  }
})

