import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Header from '../../component/header/header'
import { px2dp } from '../../utils/util'
import { WebView } from 'react-native-webview';
/**
 * 代理
 */
export default class AboutUs extends Component{
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <View>
        <Header text="关于我们" goBack={() => {this.props.navigation.goBack()}}></Header>
        <View style={{backgroundColor: 'red', height: '100%'}}>
          <WebView automaticallyAdjustContentInsets={false} source={{uri: 'https://www.baidu.com'}}></WebView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({})