/*
 * @Description:  项目中所有接口集合
 * @Author: chenwei
 * @LastEditors: kelelle
 * @Date: 2019-05-06 11:49:16
 * @LastEditTime: 2019-05-07 14:18:52
 */

const API_DRESS = '/cpapis/'
export default {
    home:{
        CPList: `${API_DRESS}inidentity/get_cp_list`,
        Banner: `${API_DRESS}inidentity/get_banner`,
    }
}