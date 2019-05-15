/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import TabIcon from './component/base/TabIcon';
import imgUrl from './utils/image_index';
/**
 * 页面路由
 */
import HomeScreen from './view/home'
import UserScreen from './view/user'
import AgentScreen from './view/agent'
import LoginScreen from './view/login'
import JclqScreen from './view/play/play_jclq/index'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const NotLoginBottom = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions:{
      tabBarLabel: '首页',
      tabBarIcon: ({focused}) => {
        let icon = focused? imgUrl.home_chose_icon:imgUrl.home_icon;
        return <TabIcon img={icon} />
      },
    }
  },
  User: {
    screen: UserScreen,
    navigationOptions:{
      tabBarLabel: '我的',
      tabBarIcon: ({focused}) => {
        let icon = focused? imgUrl.mine_chose_icon:imgUrl.mine_icon;
        return <TabIcon img={icon} />
      }
    }
  }
},{
  initialRouteName: 'Home',
  defaultNavigationOptions:{
    tabBarOptions: { //是否选中的颜色
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
});

const LoginBottom = createBottomTabNavigator({
  Home2: {
    screen: HomeScreen,
    navigationOptions:{
      tabBarLabel: '首页',
      tabBarIcon: ({focused}) => {
        let icon = focused? imgUrl.home_chose_icon:imgUrl.home_icon;
        return <TabIcon img={icon} />
      },
    }
  },
  Agent2: {
    screen: AgentScreen,
    navigationOptions:{
      tabBarLabel: '代理',
      tabBarIcon: ({focused}) => {
        let icon = focused? imgUrl.prize_chose_icon:imgUrl.prize_icon;
        return <TabIcon img={icon} />
      }
    }
  },
  User2: {
    screen: UserScreen,
    navigationOptions:{
      tabBarLabel: '我的',
      tabBarIcon: ({focused}) => {
        let icon = focused? imgUrl.mine_chose_icon:imgUrl.mine_icon;
        return <TabIcon img={icon} />
      }
    }
  }
},{
  initialRouteName: 'Home2'
});

const AppIndex = createStackNavigator({
  NotLoginBottom: {
    screen: NotLoginBottom
  },
  LoginBottom: {
    screen: LoginBottom
  },
  Jclq: {
    screen: JclqScreen
  },
  Login: {
    screen: LoginScreen
  },

},{
  initialRouteName: 'NotLoginBottom',
  defaultNavigationOptions: {
    headerStyle: {
        // backgroundColor: '#f4511e',
    },
    headerBackTitle: null,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    header: null
  }
})

const AppContainer = createAppContainer(AppIndex);

export default class App extends Component{

  // 样式渲染完成后 隐藏启动屏幕
  componentDidMount(){
    SplashScreen.hide();
  }

  render() {
    return <AppContainer></AppContainer>
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.welcome}>W</Text>
    //     <Text style={styles.instructions}>To get started</Text>
    //     <Text style={styles.instructions}>{instructions}</Text>
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
