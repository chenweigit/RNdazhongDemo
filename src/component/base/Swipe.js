import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import Swiper from 'react-native-swiper';
import {px2dp} from '../../utils/util';
import PropTypes from 'prop-types'


export default class Swipe extends Component {
  static propTypes = {
    dataList: PropTypes.array,
  }

  render() {
    let {dataList} = this.props;
    return (
 
      <View style={styles.box}>
        <Swiper 
          style={styles.wrapper} 
          paginationStyle={{ bottom: px2dp(10)}}
          dotStyle={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 6}}
          activeDotStyle={{backgroundColor:'rgba(0,0,0,.5)', width: 6, height: 6}}
          autoplay
          autoplayTimeout={5}
        >
          {dataList.map(item => {
            return  <View style={styles.slide} key={item.title}> 
                <Image 
                  source={{uri: item.path}}
                  style = {{width:'100%',height: '100%'}}
                  // style = {{width: 100,height: 100}}
                
                />
            </View> 
          })}
            {/* <View style={styles.slide}>
                <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide}>
                <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide}>
                <Text style={styles.text}>And simple</Text>
            </View> */}
        </Swiper>
      </View>
      
    )
  }
}
const styles = StyleSheet.create({
  box: {
    width: px2dp(750),
    height: px2dp(300)

  },
  slide: {
    width: '100%' 
  }
})


