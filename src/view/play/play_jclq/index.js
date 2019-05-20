import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native'
import BaseTitle from '../../../component/base/base_title';
import JclqList from './components/jclq_list';
import server,{api} from '../../../common/net/server';
import { px2dp,deviceHeightDp } from '../../../utils/util';
import ShopBottom from '../../../component/base/base_shop_bottom';

export default class Jclq extends Component {
  static navigationOptions = ({ navigation })=> {
    const  titleList = ['混合过关','胜负','让分胜负','胜分差','大小分']
    return {
      header: <BaseTitle  goto = {() => navigation.goBack()} back = {() => navigation.goBack()} 
          titleList = {titleList}
          />,
    }
  }
  constructor(props) {
    super(props)
  
    this.state = {
      //  dataList: ['混合过关','胜负','让分胜负','胜分差','大小分'],
      matchList: null
    }
    this.setChose = this.setChose.bind(this);
  }
  goto(path){
    let {navigation} = this.props;
    navigation.navigate('Jclq', {
      itemId: 85,
      otherParam: 'anything you want here',
    });
  }

  componentWillMount() {
    this.getList()
  }
  testData(){
    return [
      {
        changci: "周一301",
        guest: "勇士",
        host: "开拓者",
        id: "293",
        is_add_prize: "0",
        is_hot: "0",
        match_id: "20190520301",
        match_name: "美职篮",
        match_time: "2019-05-21 09:00:00",
        match_time_dawn: 1558368000,
        match_time_int: "1558400400",
        number_date: "2019-05-20",
        odds_1_all: {'03': "2.01", '00': "1.47"},
        odds_2_all: {'03': "1.76", '00': "1.64"},
        odds_3_all: {
          '00-5': "4.20",
          '00-10': "4.15",
          '00-15': "6.85",
          '00-20': "11.00",
          '00-25': "18.00",
          '00-26': "20.00",
          "03-5": "4.90",
          "03-10": "5.20",
          "03-15": "9.40",
          '03-20': "18.00",
          '03-25': "23.00",
          '03-26': "28.00"
        },
        odds_4_all: {'03': "1.70", '00': "1.70"},
        rq: "2.50",
        sd: "219.50"
      },
      {
        changci: "周一301",
        guest: "勇士",
        host: "开拓者",
        id: "293",
        is_add_prize: "0",
        is_hot: "0",
        match_id: "20190520302",
        match_name: "美职篮",
        match_time: "2019-05-21 09:00:00",
        match_time_dawn: 1558368000,
        match_time_int: "1558400400",
        number_date: "2019-05-20",
        odds_1_all: {'03': "2.01", '00': "1.47"},
        odds_2_all: {'03': "1.76", '00': "1.64"},
        odds_3_all: {
          '00-5': "4.20",
          '00-10': "4.15",
          '00-15': "6.85",
          '00-20': "11.00",
          '00-25': "18.00",
          '00-26': "20.00",
          "03-5": "4.90",
          "03-10": "5.20",
          "03-15": "9.40",
          '03-20': "18.00",
          '03-25': "23.00",
          '03-26': "28.00"
        },
        odds_4_all: {'03': "1.70", '00': "1.70"},
        rq: "2.50",
        sd: "219.50"
      }, {
        changci: "周一301",
        guest: "勇士",
        host: "开拓者",
        id: "293",
        is_add_prize: "0",
        is_hot: "0",
        match_id: "20190520303",
        match_name: "美职篮",
        match_time: "2019-05-21 09:00:00",
        match_time_dawn: 1558368000,
        match_time_int: "1558400400",
        number_date: "2019-05-20",
        odds_1_all: {'03': "2.01", '00': "1.47"},
        odds_2_all: {'03': "1.76", '00': "1.64"},
        odds_3_all: {
          '00-5': "4.20",
          '00-10': "4.15",
          '00-15': "6.85",
          '00-20': "11.00",
          '00-25': "18.00",
          '00-26': "20.00",
          "03-5": "4.90",
          "03-10": "5.20",
          "03-15": "9.40",
          '03-20': "18.00",
          '03-25': "23.00",
          '03-26': "28.00"
        },
        odds_4_all: {'03': "1.70", '00': "1.70"},
        rq: "2.50",
        sd: "219.50"
      }, {
        changci: "周一301",
        guest: "勇士",
        host: "开拓者",
        id: "293",
        is_add_prize: "0",
        is_hot: "0",
        match_id: "20190520304",
        match_name: "美职篮",
        match_time: "2019-05-21 09:00:00",
        match_time_dawn: 1558368000,
        match_time_int: "1558400400",
        number_date: "2019-05-20",
        odds_1_all: {'03': "2.01", '00': "1.47"},
        odds_2_all: {'03': "1.76", '00': "1.64"},
        odds_3_all: {
          '00-5': "4.20",
          '00-10': "4.15",
          '00-15': "6.85",
          '00-20': "11.00",
          '00-25': "18.00",
          '00-26': "20.00",
          "03-5": "4.90",
          "03-10": "5.20",
          "03-15": "9.40",
          '03-20': "18.00",
          '03-25': "23.00",
          '03-26': "28.00"
        },
        odds_4_all: {'03': "1.70", '00': "1.70"},
        rq: "2.50",
        sd: "219.50"
      }, {
        changci: "周一301",
        guest: "勇士",
        host: "开拓者",
        id: "293",
        is_add_prize: "0",
        is_hot: "0",
        match_id: "20190520305",
        match_name: "美职篮",
        match_time: "2019-05-21 09:00:00",
        match_time_dawn: 1558368000,
        match_time_int: "1558400400",
        number_date: "2019-05-20",
        odds_1_all: {'03': "2.01", '00': "1.47"},
        odds_2_all: {'03': "1.76", '00': "1.64"},
        odds_3_all: {
          '00-5': "4.20",
          '00-10': "4.15",
          '00-15': "6.85",
          '00-20': "11.00",
          '00-25': "18.00",
          '00-26': "20.00",
          "03-5": "4.90",
          "03-10": "5.20",
          "03-15": "9.40",
          '03-20': "18.00",
          '03-25': "23.00",
          '03-26': "28.00"
        },
        odds_4_all: {'03': "1.70", '00': "1.70"},
        rq: "2.50",
        sd: "219.50"
      }, {
        changci: "周一301",
        guest: "勇士",
        host: "开拓者",
        id: "293",
        is_add_prize: "0",
        is_hot: "0",
        match_id: "20190520306",
        match_name: "美职篮",
        match_time: "2019-05-21 09:00:00",
        match_time_dawn: 1558368000,
        match_time_int: "1558400400",
        number_date: "2019-05-20",
        odds_1_all: {'03': "2.01", '00': "1.47"},
        odds_2_all: {'03': "1.76", '00': "1.64"},
        odds_3_all: {
          '00-5': "4.20",
          '00-10': "4.15",
          '00-15': "6.85",
          '00-20': "11.00",
          '00-25': "18.00",
          '00-26': "20.00",
          "03-5": "4.90",
          "03-10": "5.20",
          "03-15": "9.40",
          '03-20': "18.00",
          '03-25': "23.00",
          '03-26': "28.00"
        },
        odds_4_all: {'03': "1.70", '00': "1.70"},
        rq: "2.50",
        sd: "219.50"
      }, {
        changci: "周一301",
        guest: "勇士",
        host: "开拓者",
        id: "293",
        is_add_prize: "0",
        is_hot: "0",
        match_id: "20190520307",
        match_name: "美职篮",
        match_time: "2019-05-21 09:00:00",
        match_time_dawn: 1558368000,
        match_time_int: "1558400400",
        number_date: "2019-05-20",
        odds_1_all: {'03': "2.01", '00': "1.47"},
        odds_2_all: {'03': "1.76", '00': "1.64"},
        odds_3_all: {
          '00-5': "4.20",
          '00-10': "4.15",
          '00-15': "6.85",
          '00-20': "11.00",
          '00-25': "18.00",
          '00-26': "20.00",
          "03-5": "4.90",
          "03-10": "5.20",
          "03-15": "9.40",
          '03-20': "18.00",
          '03-25': "23.00",
          '03-26': "28.00"
        },
        odds_4_all: {'03': "1.70", '00': "1.70"},
        rq: "2.50",
        sd: "219.50"
      }, {
        changci: "周一301",
        guest: "勇士",
        host: "开拓者",
        id: "293",
        is_add_prize: "0",
        is_hot: "0",
        match_id: "20190520308",
        match_name: "美职篮",
        match_time: "2019-05-21 09:00:00",
        match_time_dawn: 1558368000,
        match_time_int: "1558400400",
        number_date: "2019-05-20",
        odds_1_all: {'03': "2.01", '00': "1.47"},
        odds_2_all: {'03': "1.76", '00': "1.64"},
        odds_3_all: {
          '00-5': "4.20",
          '00-10': "4.15",
          '00-15': "6.85",
          '00-20': "11.00",
          '00-25': "18.00",
          '00-26': "20.00",
          "03-5": "4.90",
          "03-10": "5.20",
          "03-15": "9.40",
          '03-20': "18.00",
          '03-25': "23.00",
          '03-26': "28.00"
        },
        odds_4_all: {'03': "1.70", '00': "1.70"},
        rq: "2.50",
        sd: "219.50"
      }

    ]
  }

  getList(){
    server.post(api.jclq.jclqList)
    .then(res =>{
      // console.log(res);
      // let matchList = this.dayFilter([])
      let teee = this.testData();
      let matchList = this.dayFilter(teee)
      // let matchList = this.dayFilter([])
      // let matchList = this.dayFilter(res.data)
      
      console.log(matchList);
      
      this.setState({
        matchList:matchList
      })
      // console.log(this.state.cpList);
    })
  }
  dayFilter(data = []){
    return data.reduce((newObject,item)=>{
      let {number_date} = item;
      let dateObject = newObject[number_date];
      if(dateObject){
        dateObject.push(this.concatData(item))
      }else{
        dateObject = [];
        dateObject.push(this.concatData(item));
        newObject[number_date] = dateObject;
      }
      return newObject;
    },{})
  }

  concatData(listItem){
    let {odds_1_all,odds_2_all,odds_3_all,odds_4_all} = listItem;
    let oddList = [odds_1_all,odds_2_all,odds_3_all,odds_4_all];
    oddList.forEach(item =>{
      Object.keys(item).forEach(key => {
        let value = item[key]
        item[key] = {
          chose: false,
          value: value
        }
      })
    })
    // console.log(listItem);
    return listItem;
  }

  setChose(){
    let {matchList} = this.state;
    console.log(matchList);
    let newTest = {...matchList}
    this.setState({
      matchList:newTest
    })
    this.forceUpdate();
    // this.setState({
    //   matchList[]:
    // })
  }

  renderList(){
    let { matchList } = this.state;
    // console.log(matchList);
    if(!matchList) return null;
    let keyList = Object.keys(matchList);
    if(keyList.length){
      return keyList.map((item,index) =>{
        let datas = matchList[item];
        let date = item;
        return (<JclqList list={datas} date={date} listIndex = {index} key={date} setChose={this.setChose}></JclqList>)
      })
    }else{
      return (
        <View style={jclqStyle.noInfoWrap}>
          <Image source = {require('../../../assets/image/no_match_info.png')} style = {{width:px2dp(300),height: px2dp(300)}}/>
        </View>
      )
      
      
    }
  }

  render() {
    let {matchList} = this.state;
    let len = matchList && Object.keys(matchList).length;
    return (
      <View>
        <ScrollView 
          style= {jclqStyle.wrap}
          // // contentContainerStyle = {jclqStyle.wrap}
          contentContainerStyle = {len?[{paddingBottom: px2dp(100)}]: [{paddingBottom: px2dp(100)},jclqStyle.noInfoWrap]}
        >
          {this.renderList()}
        </ScrollView>
        <ShopBottom matchList={matchList} setMacthList = {this.setChose}></ShopBottom>
      </View>
      
    )
  }
}
// console.log(deviceHeightDp);

const jclqStyle = StyleSheet.create({
  wrap: {
    // borderRightColor: '#f4f4f4',
    // width: '100%',
    height: '100%',
    // height: (deviceHeightDp - px2dp(100)),
    // backgroundColor: 'green',
    // marginBottom: px2dp(1000),
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  
  noInfoWrap: {
    // zIndex: 1000,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  }
})
