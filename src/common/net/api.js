/*
 * @Description:  项目中所有接口集合
 * @Author: chenwei
 * @LastEditors: kelelle
 * @Date: 2019-05-06 11:49:16
 * @LastEditTime: 2019-05-17 15:22:43
 */

const API_DRESS = '/cpapis/'
export default {
    home:{
        CPList: `${API_DRESS}inidentity/get_cp_list`,
        Banner: `${API_DRESS}inidentity/get_banner`
    },
    jclq: {
        jclqList: `${API_DRESS}jczq-inidentity/jclq_match`,
    },
    login: {
        Login: `${API_DRESS}inidentity/login_pw`,
        mybaseinfo: `${API_DRESS}user/mybaseinfo`
    }
}