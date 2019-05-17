import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import BaseTitle from '../../../component/base/base_title';
import JclqList from './components/jclq_list';
import server,{api} from '../../../common/net/server';

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
       matchList: []
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
  getList(){
    server.post(api.jclq.jclqList)
    .then(res =>{
      console.log(res);
      let matchList = this.dayFilter(res.data)
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
    let addList = [odds_1_all,odds_2_all,odds_3_all,odds_4_all];
    addList.forEach(item =>{
      Object.keys(item).forEach(key => {
        let value = item[key]
        item[key] = {
          chose: false,
          value: value
        }
      })
    })
    console.log(listItem);
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

  render() {
    let {matchList} = this.state;
    return (
      <ScrollView 
        style= {jclqStyle.wrap}
      >
        {Object.keys(matchList).map(item =>{
          let datas = matchList[item];
          let date = item;
          return <JclqList list={datas} date={date} key={date} setChose={this.setChose}></JclqList>
        })}
      </ScrollView>
    )
  }
}

const jclqStyle = StyleSheet.create({
  wrap: {
    borderRightColor: '#f4f4f4'
  }
})
