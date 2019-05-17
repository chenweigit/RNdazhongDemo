
/*
 * @Description: 网络请求模块
 * @Author: chenwei
 * @LastEditors: kelelle
 * @Date: 2019-05-06 11:49:16
 * @LastEditTime: 2019-05-07 14:08:44
 */

import md5 from "react-native-md5";
import { formateObjToParamStr } from '../../utils/util';
import { fetchHost, urlVersion } from '../../config/project_config';


export default class FetchRequest {


    /**
     *
     * @static   get 请求获取数据
     * @param {*} url
     * @param {*} data
     * @memberof FetchRequest
     */
    static get(url, data, callBackSuccess, callBackError) {
        if (!url) {
            return false;
        }
        let urlData = url + "?";
        urlData = urlData + formateObjToParamStr(data);
        fetch(fetchHost + url, {
            method: 'GET',//如果为GET方式，则不要添加body，否则会出错    GET/POST
            header: {},
            // body:parames//请求参数
        })
            .then((response) => response.json())//将数据转成json,也可以转成 response.text、response.html
            .then((responseJson) => {//获取转化后的数据responseJson、responseText、responseHtml
                if (callBackSuccess) {
                    //成功回调
                    callBackSuccess(JSON.stringify(responseJson));//JSON.stringify()避免出现[object object]
                }
            }).catch((error) => {
                if (callBackError) {
                    //失败回调
                    callBackError(error);
                }

            });
    }

    /**
     *   post 请求方式
     *
     * @static
     * @param {*} url
     * @param {*} data
     * @returns
     * @memberof FetchRequest
     */
    static post(url, data) {

        if (!url) {
            return false;
        }
        // 验签参数封装
        data = signature(data);
        data.version = urlVersion;
        url = fetchHost + url;
       
        return fetch(url, {
            method: 'POST',//如果为GET方式，则不要添加body，否则会出错    GET/POST
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            return error;
            // if (callBackError) {
            //     //失败回调
            //     callBackError(error);
            // }
        });
    }
}

function signature(data = {}) {
    let signData = {};
    let _auth_key = global._userInfo.auth_key || '';
    const _key = 'xckj@#*&%&*%2018F#%jfkHUYDhe990';
    const nowDate = Date.parse(new Date()) / 1000;
    const hash = md5.hex_md5(_auth_key + '' + nowDate + '' + _key);
    signData['access_time'] = nowDate;
    signData['access_key'] = hash;
    signData['auth_key'] = _auth_key;
    return Object.assign(data, signData);
}
