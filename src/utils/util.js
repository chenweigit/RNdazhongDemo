/*
 * @Description: 基础工具
 * @Author: chenwei
 * @LastEditors: kelelle
 * @Date: 2019-05-06 13:35:25
 * @LastEditTime: 2019-05-07 14:35:44
 */


'use strict';

import {Dimensions} from 'react-native';

// device width/height
const deviceWidthDp = Dimensions.get('window').width;
// const deviceHeightDp = Dimensions.get('window').height;
// design width/height
const uiHeightPx = 750;

const px2dp = function(uiElementPx) {
    //console.log(deviceWidthDp);
    //console.log(deviceHeightDp);
    return uiElementPx *  deviceWidthDp / uiHeightPx;
}

const filter = function(str) { // 特殊字符转义
    str += ''; // 隐式转换
    str = str.replace(/%/g, '%25');
    str = str.replace(/\+/g, '%2B');
    str = str.replace(/ /g, '%20');
    str = str.replace(/\//g, '%2F');
    str = str.replace(/\?/g, '%3F');
    str = str.replace(/&/g, '%26');
    str = str.replace(/\=/g, '%3D');
    str = str.replace(/#/g, '%23');
    return str;
  }
  
  const formateObjToParamStr = function(paramObj) {
    const data = [];
    for (let attr in paramObj) {
      data.push(`${attr}=${filter(paramObj[attr])}`);
    }
    return data.join('&');
  };

export {px2dp,formateObjToParamStr}