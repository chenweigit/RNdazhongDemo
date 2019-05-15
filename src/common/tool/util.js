/*
 * @Description:  基础工具
 * @Author: chenwei
 * @Date: 2019-05-15 09:45:36
 * @LastEditors: chenwei
 * @LastEditTime: 2019-05-15 09:45:55
 */

'use strict';

import {Dimensions} from 'react-native';

// device width/height
//const deviceWidthDp = Dimensions.get('window').width;
const deviceHeightDp = Dimensions.get('window').height;
// design width/height
const uiHeightPx = 640;

const px2dp = function(uiElementPx) {
    //console.log(deviceWidthDp);
    //console.log(deviceHeightDp);
    return uiElementPx *  deviceHeightDp / uiHeightPx;
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

export default {px2dp,formateObjToParamStr}