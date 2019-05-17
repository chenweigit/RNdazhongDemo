//足球赛事
const nav_list = [
  { '_type': 0, 'title': '混合过关', alias: 'jclq_index' },
  { '_type': 1, 'title': '胜负', alias: 'jclq_shengping' },
  { '_type': 2, 'title': '让分胜负', alias: 'jclq_letshengping' },
  { '_type': 3, 'title': '胜分差', alias: 'jclq_differencescore' },
  { '_type': 4, 'title': '大小分', alias: 'jclq_score' }

];

//五大联赛
const matchList = ['欧蓝联', '美职篮'];
//获取最大选择的场次
export const get_screenings = 8;

export const PLAYODDSLIST = ['odds_1','odds_2','odds_3','odds_4']; //1 胜负 2 让胜负 3 胜分差 4 大小分
//获取足球赛事导航列表
export function getnav_football_list() {
  return nav_list;
}

//获取过关方式
export function getnav_football_parlay() {
  return [
      { 'is_choice': false, 'text': '单关', 'value': '1_1' },
      { 'is_choice': false, 'text': '2串1', 'value': '2_1' },
      { 'is_choice': false, 'text': '3串1', 'value': '3_1' },
      { 'is_choice': false, 'text': '4串1', 'value': '4_1' },
      { 'is_choice': false, 'text': '5串1', 'value': '5_1' },
      { 'is_choice': false, 'text': '6串1', 'value': '6_1' },
      { 'is_choice': false, 'text': '7串1', 'value': '7_1' },
      { 'is_choice': false, 'text': '8串1', 'value': '8_1' }
  ]
}

//获取竞猜篮球的标题
export function getnav_football_title(_name) {
  let name = nav_list.filter(navItem => navItem.alias === _name)[0];
  return name;
}

//获取默认联赛列表
export function get_matchList() {
  return matchList;
}

//胜平负=>让球胜平负
export function get_shengping_data(_name) {
  return [
      { 'value': "00", 'text': '客胜' },
      { 'value': "03", 'text': '主胜' },
      
  ];
}
export function get_letshengping_data(_name) {
  return [
      { 'value': "00", 'text': '让客胜' },
      { 'value': "03", 'text': '让主胜' },
      
  ];
}
//比分差
export function get_score_data(_name) {
  return [
      { 'value': "03-5", 'text': '1-5' },
      { 'value': "03-10", 'text': '6-10' },
      { 'value': "03-15", 'text': '11-15' },
      { 'value': "03-20", 'text': '16-20' },
      { 'value': "03-25", 'text': '21-25' },
      { 'value': "03-26", 'text': '26+' },
      { 'value': "00-5", 'text': '1-5' },
      { 'value': "00-10", 'text': '6-10' },
      { 'value': "00-15", 'text': '11-15' },
      { 'value': "00-20", 'text': '16-20' },
      { 'value': "00-25", 'text': '21-25' },
      { 'value': "00-26", 'text': '26+' },
  ];
}
//大小
export function get_small_big(_name) {
  return [
      { 'value': "03", 'text': '大' },
      { 'value': "00", 'text': '小' },
  ];
}

class OddItem {
  constructor(text, value, odds) {
      this.is_choice = false; //是否选中
      this.text = text;  //文本描述
      this.value = value;  //文本key值
      this.odds = odds; // 文本value值
  }
}
//首页处理足彩数据
export function get_home_jclq(is_item) {
  let _new_odds_1 = []; //胜负
  let _new_odds_1_data = get_shengping_data();
  let odds_1 = JSON.parse(is_item.odds_1);
  let odds_1_add = JSON.parse(is_item.odds_1_add)||{};
  //胜平负
  for (let _datas of _new_odds_1_data) {
      let odds1 = (+odds_1[_datas.value]);
      let odds2 = (+odds_1_add[_datas.value])||0;
      let odds = odds1 + odds2;
      _new_odds_1.push({
          'text': _datas.text,
          'value': _datas.value,
          'odds': odds || 0,
      });
  }
  return _new_odds_1;
}



//处理足彩数据
/**
* @description 处理足彩数据
* @param {Array[Object]} is_data 赛事列表
* @param {Number} type 玩法类型 0 混合过关 1 胜负 2 让分胜负 3 胜分差 4 大小分
*/
export function get_processing_data(is_data,palyType){
  let _list_data=[];//列表
  let timeList=[]; //存放时间=>用于分组['2019-03-26']
  let is_match=[];//赛事种类列表
  let match_list = []; //非热门赛事列表
  let openFlag;
  is_data.forEach((item,index) => {
      openFlag = openFlag === undefined?index:openFlag; //是否展开的标识符
      if(timeList.indexOf(item.number_date) === -1){//赛事时间去重
          timeList.push(item.number_date);
      }
      //一次遍历处理数据
      handleListItem(item,index,palyType)

  })

  function handleListItem (item,index,palyType) {
      let timeIndex=timeList.indexOf(item.number_date);
      item['is_choice']=false;
      let new_listItem = match_list[timeIndex];
      if(new_listItem){ //是否存在该元素
          let _new_data=type1(item,palyType);
          new_listItem.list.push(_new_data);
          new_listItem.length++;
      }else{
          let list = [type1(item,palyType)];

          match_list.push({
              "is_open":index==openFlag?true:false,
              "number_date":item.number_date,
              "changci":item.changci,
              "list":list,
              'length':list.length
          })
      }
  }
  let _new_match=[];
  for(let item of is_match){//赛事类别数组
      _new_match.push({'text':item,'choice':true,'new_choice':true});
  }
  return {
      js_match:is_match,
      match:_new_match,
      list: match_list

  }
  function type1(_data,palyType){ //数据处理
      if(is_match.indexOf(_data.match_name) === -1){
          is_match.push(_data.match_name);
      }
      let typeLoopObj = {
          '1': {
              loopArr: get_shengping_data(),
              dataArr: null,
              state: 1
          },
          '2': {
              loopArr: get_letshengping_data(),
              dataArr: null,
              state: 1
          },
          '3': {
              loopArr: get_score_data(),
              dataArr: null,
              state: 1
          },
          '4': {
              loopArr: get_small_big(),
              dataArr: null,
              state: 1
          }
      }
      //胜负(1) 让球胜负(2) 比分差(3) 大小(4)
      if(palyType){
          let typeObj = typeLoopObj[palyType];
          let concatData = handleLoop(typeObj,palyType,_data)
          typeObj.dataArr = concatData;
      }else{//混合过关
          let hhggList = [2,4];
          hhggList.forEach(playType => {
              let typeObj = typeLoopObj[playType];
              let concatData = handleLoop(typeObj,playType,_data)
              typeObj.dataArr = concatData;
          })
      }
      _data.odds_1=typeLoopObj['1'].dataArr;
      _data.odds_2=typeLoopObj['2'].dataArr;
      _data.odds_3=typeLoopObj['3'].dataArr;
      _data.odds_4= typeLoopObj['4'].dataArr;
      _data.oddsState = {
          odds_1_state: typeLoopObj['1'].state,
          odds_2_state: typeLoopObj['2'].state,
          odds_3_state: typeLoopObj['3'].state,
          odds_4_state: typeLoopObj['4'].state,
      }
      return _data;
  }

}
//辅助组装odds数据
function handleLoop(typeObj,palyType,_data) {
  let {loopArr,dataArr} = typeObj; //当前循环的玩法类型
  let name = `odds_${palyType}_all`; //当前的循环名称
  let afterName = `odds_${palyType}`; //拼接后的数据名称
  let arr = [];
  if(_data[afterName]){ //存在拼接后的数据 返回
      return _data[afterName]
  }
  loopArr.forEach((item,i) => {
      let oddItems = handleWinData(item,_data[name]);
      arr.push(oddItems.data);
      if(!oddItems.state){
          typeObj.state = oddItems.state;
      }
  })
  return typeObj.state? arr : dataArr;
}



function handleWinData(item, odds) { //处理胜负平玩法的数据
  let value = odds[item.value];
  let valueString = null;
  let flag_state = 1;
  if (value && value !== 0) {
      valueString = value + '';
  } else {
      flag_state = 0;
  }
  return {
      data: new OddItem(item.text,item.value,valueString),
      state: flag_state
  }
}
export function handleMoreData (listItem) {
  let hhggList = [1,2,3,4];
  let typeLoopObj = {
      '1': {
          loopArr: get_shengping_data(),
          dataArr: null,
          state: 1
      },
      '2': {
          loopArr: get_letshengping_data(),
          dataArr: null,
          state: 1
      },
      '3': {
          loopArr: get_score_data(),
          dataArr: null,
          state: 1
      },
      '4': {
          loopArr: get_small_big(),
          dataArr: null,
          state: 1
      }
  }
  hhggList.forEach(playType => {
      let typeObj = typeLoopObj[playType];
      let concatData = handleLoop(typeObj,playType,listItem)
      typeObj.dataArr = concatData;
  })
  listItem.odds_1=typeLoopObj['1'].dataArr;
  listItem.odds_2=typeLoopObj['2'].dataArr;
  listItem.odds_3=typeLoopObj['3'].dataArr;
  listItem.odds_4= typeLoopObj['4'].dataArr;
  listItem.oddsState = {
      odds_1_state: typeLoopObj['1'].state,
      odds_2_state: listItem.oddsState.odds_2_state,
      odds_3_state: typeLoopObj['3'].state,
      odds_4_state: listItem.oddsState.odds_4_state,
  }
  return listItem;
}
//过滤已选择项
/**
* @description 过滤已选择项
* @param {number} play_type 玩法
* @param {array} data_list 列表数据
*/
export function filter_data(play_type, data_list) {
  let _shopcars = [];
  if (data_list && data_list.length != 0) {
      let _data = football_filter_front(1, play_type, data_list);
      _shopcars.push.apply(_shopcars, _data);
  }
  return _shopcars;
}

/**
* @description 过滤前置控制
* @param {number} type 热门0 非热门1
* @param {nubmer} play_type 玩法类型
* @param {array} data_list 列表数据
*/
export function football_filter_front(type, play_type, data_list) {
  let data = [];
  if (type) {// 1 非热门列表 0 热门列表
      for (let items of data_list) {
          // if (items.is_open) { //仅展开才加入购物车
              let _new_item = football_filter_type7(items.list, play_type);
              data.push.apply(data, _new_item);
          // }
      }
  } else {
      return football_filter_type7(is_data.list, play_type);
  }
  return data;
}

//过滤数据 混合过关
/**
* @description 拼接购物车元素数据
* @param {ListItem} list 每天赛事list
* @param {Number} play_type 玩法类型
* @returns 购物车item
*/
export function football_filter_type7(list, play_type) {
  let list_data = [];
  for (let _item of list) {
      let datas = dataItem(_item,play_type);
      if(datas.odds_1||datas.odds_2||datas.odds_3||datas.odds_4){
          list_data.push(datas);
      }
  }
  return list_data;
}
function dataItem (_item,play_type) {//处理单个数据
      let _odds_1 = fuzhu(_item, 'odds_1');
      let _odds_2 = fuzhu(_item, 'odds_2');
      let _odds_3 = fuzhu(_item, 'odds_3');
      let _odds_4 = fuzhu(_item, 'odds_4');
      let _datas = {
          "match_id": _item.match_id,
          "changci": _item.changci,
          "rq": _item.rq,
          "sd": _item.sd,
          "host": _item.host,
          "guest": _item.guest,
          "match_time": _item.match_time,
          "match_time_int": _item.match_time_int,
          "play_type": play_type,
          "odds_1": _odds_1,
          "odds_2": _odds_2,
          "odds_3": _odds_3,
          "odds_4": _odds_4,
          'has_sfc': _odds_3?true:false
      };
      return _datas;
}
function fuzhu(_item, name) { //返回的shopcar中的 oddsItem
  let oddsList = _item[name];
  if(oddsList){//存在时
      let resultArr = _item[name].reduce((arr,item)=>{
          if(item.is_choice){
              arr.push({
                  text: item.text,
                  value: item.value,
                  odds: item.odds
              })
          }
          return arr
      },[])
      return resultArr.length?resultArr:null
  }else{
      return oddsList
  }
}

//筛选处理数据
/**
* @description 筛选处理数据
* @param {array} _data 比赛列表数据
* @param {object} _datas 赛事赛选条件
*/
export function filter_list_data(_data, _datas) {
  if (_datas) { //存在筛选条件
      let filterList = _data.reduce((newArr,listItem) => {
          let filterArr = listItem.list.filter(item => _datas.indexOf(item.match_name)>-1);
          if(filterArr.length){
              newArr.push({
                  "is_open": false,
                  "number_date": listItem.number_date,
                  "changci": listItem.changci,
                  "list": filterArr,
                  "length": filterArr.length
              })
          }
          return newArr

     },[])
     if(filterList.length>0){
          filterList[0].is_open = true;
     }
     return filterList;
  } else {
      return _data;
  }
}
export function shopcarAdd (item,shopcar,play_type) {
  // console.log(333);
  console.log(item,shopcar,play_type);
  let i;
  for (let index = 0; index <shopcar.length; index++) {
      let shopItem = shopcar[index];
      if(shopItem.match_id === item.match_id){
          i = index;
          break;
      }
  }

  if(i !== undefined) { //存在i
      shopcar[i] = dataItem(item,play_type);

  }else{//不存在
      shopcar.push(dataItem(item,play_type))
  }
  return shopcar
}


export function football_data_empty(){}

//清空选择
/**
*
* @param {Array} list 列表数据数组
* @param {Number} playType 玩法类型 5 混合过关
*/
export function shopCar_empty(list, playType) {
  // let _hot = _data.list;
  // if (_hot.length != 0) {
  //     for (let item of _hot) {
  //         empty_data(item, type);
  //     }
  // }
  list.forEach(dayData => {
      let matchList = dayData.list;
      matchList.forEach(matchItem => empty_shopCarItem(matchItem,playType))
  })
}
/**
* @description 清空对应的odds的选中状态
* @param {Object} matchItem 比赛数据item
* @param {Number} playType 玩法类型
*/
export function empty_shopCarItem(matchItem,playType){
  if(playType == 5){ //混合过关
      let  loopList = [1,2,3,4];
      loopList.forEach(playType => loop(playType))
  }else{
      loop(playType)
  }
  function loop (playType) {
      let loopName = `odds_${playType}`;
      let oddsList = matchItem[loopName];
      if(oddsList){ //如果存在
          oddsList.forEach(oddsItem => {
              oddsItem.is_choice = false
          })
      }
  }
}

/**
   * @description 计算多窜1的注数
   * @param {Array[Number]} arrays 多串1 各组的组数
   * @param {Number} _type  多串1 类型
   * @param {Number} item 当前循环的item
   * @returns {Number} 返回的注数
   */

  export function js_note_number(arrays,_type,item){
      if(_type < 2) {
          let number = arrays.reduce((cont,value)=> {
              cont += value
              return cont
          },0)
          return number
      }else{
          let result = 0;
          for (let i = 0,len = arrays.length; i < len; i++) {
              let newArr = arrays.concat();
              newArr.splice(0,i+1);
              let nowValue = arrays[i];
              result +=  nowValue*js_note_number(newArr,_type-1,nowValue)
          }
          return result;
      }
  }

export function quickRender(that,vueList,_data_s){

  if(_data_s[0] && _data_s[0].list.length>10){
          that[vueList]=[
              {
                  changci:_data_s[0].changci,
                  is_open:_data_s[0].is_open,
                  number_date:_data_s[0].number_date,
                  list: _data_s[0].list.slice(0,10),
                  length:_data_s[0].length
              }
          ]
          setTimeout(() => {
              that[vueList]=_data_s;
          }, 1);
      }else{
          that[vueList]=_data_s;
      }



}
