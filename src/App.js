/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
//  热更新 模块
import CodePush from 'react-native-code-push'
// 白屏
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
import PopulationScreen from './view/population'
import SignOutScreen from './view/signout'
import AboutUsScreen from './view/user/about_us'
import TxffcScreen from './view/play/play_txffc/index'

const NotLoginBottom = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({ focused }) => {
        let icon = focused ? imgUrl.home_chose_icon : imgUrl.home_icon;
        return (<TabIcon img={icon} />)
      },
    }
  },
  User: {
    screen: UserScreen,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ focused }) => {
        let icon = focused ? imgUrl.mine_chose_icon : imgUrl.mine_icon;
        return <TabIcon img={icon} />
      }
    }
  }
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      tabBarOptions: { //是否选中的颜色
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
  });

const loginBottom = createBottomTabNavigator({
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
}, {
    initialRouteName: 'Home2'
  });

const AppIndex = createStackNavigator({
  PopulationScreen: {
    screen: PopulationScreen
  },
  NotLoginBottom: {
    screen: NotLoginBottom
  },
  LoginBottom: {
    screen: loginBottom
  },
  Jclq: {
    screen: JclqScreen
  },
  Login: {
    screen: LoginScreen
  },
  SignOut: {
    screen: SignOutScreen
  },
  AboutUs: {
    screen: AboutUsScreen
  },
  Txffc: {
    screen: TxffcScreen
  }
},{
  initialRouteName: 'PopulationScreen',
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



// codepush 设置更新频率
let codePushOptions = {
  //设置检查更新的频率
  //ON_APP_RESUME APP恢复到前台的时候
  //ON_APP_START APP开启的时候
  //MANUAL 手动检查
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
};

class App extends Component {

  // 构造器,类实例化的时候自动会执行
  
  constructor() {
    super(...arguments)
    this.state = {
      isLogin:false,
      userinfo:{}
      // hasCheckUpdate: false,
      // remotePackage: null,
      // hasGetLocalPackage: false,
      // localPackage: null,
      // hasDownloadedPackage: false,
      // downloadPackage: null,
    }
  }

  //如果有更新的提示
  syncImmediate() {

    CodePush.sync();
    // CodePush.sync({
    //   //安装模式
    //   //ON_NEXT_RESUME 下次恢复到前台时
    //   //ON_NEXT_RESTART 下一次重启时
    //   //IMMEDIATE 马上更新
    //   installMode: CodePush.InstallMode.IMMEDIATE,
    //   //对话框
    //   updateDialog: {
    //      //是否显示更新描述
    //      appendReleaseDescription : true ,
    //      //更新描述的前缀。 默认为"Description"
    //      descriptionPrefix : "更新内容：" ,
    //      //强制更新按钮文字，默认为continue
    //      mandatoryContinueButtonLabel : "立即更新" ,
    //      //强制更新时的信息. 默认为"An update is available that must be installed."
    //      mandatoryUpdateMessage : "必须更新后才能使用" ,
    //      //非强制更新时，按钮文字,默认为"ignore"
    //      optionalIgnoreButtonLabel : '稍后' ,
    //      //非强制更新时，确认按钮文字. 默认为"Install"
    //      optionalInstallButtonLabel : '后台更新' ,
    //      //非强制更新时，检查到更新的消息文本
    //      optionalUpdateMessage : '有新版本了，是否更新？' ,
    //      //Alert窗口的标题
    //      title : '更新提示'
    //   }
    // });
  }
  async init(){
    // 判断是否登录
    // let userinfo = await 
    // this.setState({isLogin:true});
    SplashScreen.hide();
  }

  // 样式渲染完成后 隐藏启动屏幕
  componentDidMount() {
    this.init()
    

    // CodePush.sync({
    //   updateDialog: true,
    //   installMode: CodePush.InstallMode.IMMEDIATE,
    //   mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
    //   //deploymentKey为刚才生成的,用Platform判断下平台
    //   deploymentKey:'NQj3RK14lrtMUGs7zgnstLWDZpyI7f49db43-8b02-4316-9ab5-394fa2f5d52a'
    // });

    // CodePush.disallowRestart();//禁止重启
    // this.syncImmediate(); //开始检查更新
    // CodePush.notifyAppReady()
    // CodePush.allowRestart();//在加载完了，允许重启
  }



  // =========================================
  render() {
    let AppContainer = null;
    // if(this.state.isLogin){
    //   AppContainer = createAppContainer(loginBottom);
    // }else{
    //  AppContainer = createAppContainer(NotLoginBottom);
    // }
    AppContainer = createAppContainer(AppIndex);
    return (<AppContainer></AppContainer>);
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.welcome}>W</Text>
    //     <Text style={styles.instructions}>To get started</Text>
    //   </View>
    // );
  }
}

// 这一行必须要写
// App = CodePush(codePushOptions)(App)

export default App


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
