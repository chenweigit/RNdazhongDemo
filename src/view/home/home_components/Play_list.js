import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, Dimensions,TouchableOpacity } from 'react-native'
import { px2dp } from '../../../utils/util';
import PropTypes from 'prop-types'

let width = Dimensions.get('window').width

class PlayItem extends Component {
  static propTypes = {
    itemInfo: PropTypes.object,
    _onPressButton: PropTypes.func,
  }
  constructor (props) {
    super(props);
    // this._onPressButton = this._onPressButton.bind(this)
  }
  render() {
    let {itemInfo} = this.props;
    return (
      <TouchableOpacity 
        style={[styles.flexBox,styles.item]} 
        onPress={this.props._onPressButton}>
        <Image
          source={{uri: itemInfo.logo_url}}
          style = {{height:px2dp(95),width:px2dp(95)}}
        />
          <Text style = {styles.playName}>{itemInfo.name}</Text>
          <View style = {styles.desNameBox}>
            <Text numberOfLines={1} style = {styles.desName}>{itemInfo.introduce}</Text>
          </View>
      </TouchableOpacity>
    )
  }
}

export default class Play_list extends Component {
  static propTypes = {
    data: PropTypes.array,
    _onPressButton: PropTypes.func,
  }
  render() {
    let {data,_onPressButton} = this.props;
   
    return (
        <FlatList
          data={data}
          numColumns = {3}
          contentContainerStyle = {styles.boxTest}
          renderItem={({ item }) => <PlayItem  itemInfo = {item} _onPressButton={_onPressButton}/>}
        />
    )
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    width: '100%',

  },
  boxTest: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    backgroundColor: '#fff',
    flex: 1
  },
  flexBox: {
    // display: 'flex',
    // justifyContent: 'flex-start',
    alignItems: 'center'
  },
  item: {
    width: '33.33%',
    // width:  (width - px2dp(60))/3,
    // flex: 1,
    paddingVertical: px2dp(30),
  },
  playName: {
    textAlign: 'center',
    fontSize: px2dp(30),
    color: '#333',
  
  },
  desNameBox: {
    backgroundColor: '#ff473a',
    borderRadius: px2dp(15),
    width: px2dp(170),
  },  
  desName: {
    
    textAlign: 'center',
    fontSize: px2dp(22),
    color: '#fff',
    // 
    lineHeight: px2dp(34),
  },
  
  itemView: {
    // width: (width - px2dp(20)) / 3,
    // width: '33.33%',
    flex: 1,
    alignItems: 'center',
    padding: px2dp(20)
  },
  itemText: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    borderRadius: px2dp(6),
    paddingLeft: px2dp(10),
    paddingRight: px2dp(10)
  }
})

