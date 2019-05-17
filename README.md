
# 项目说明

react native demo

## app 运行 
> 安装模块
-  npm i
> 首屏模块，解决启动白屏问题
-  react-native link react-native-splash-screen
> 手势模块，swiper 模块依赖
-  react-native link react-native-gesture-handler
> 插件安装,热更新 RN 版本0.27+
> │ Production │ HiohXNxvVkg9aBouevzWWlm_0RmJ7f49db43-8b02-4316-9ab5-394fa2f5d52a │
  ├────────────┼──────────────────────────────────────────────────────────────────┤
  │ Staging    │ NQj3RK14lrtMUGs7zgnstLWDZpyI7f49db43-8b02-4316-9ab5-394fa2f5d52a
  
- react-native link react-native-code-push
> 启动服务
-  react-native run-android

## 打包
> 默认已经创建了签名文件
````
// 1、将签名文件拷贝并放在 android 文件下

// 2、在 android/.gradle/gradle.properies(如果没有就创建这个文件) 配置以下内容
MYAPP_RELEASE_STORE_FILE=dazhongkey.keystore  // 签名文件名称
MYAPP_RELEASE_KEY_ALIAS=dazhongkey              // 签名别名
MYAPP_RELEASE_STORE_PASSWORD=1234qwer           // 密码
MYAPP_RELEASE_KEY_PASSWORD=1234qwer             // 别名密码

// 3、 在android/app/build.gradle 配置
android{
    ....
    // 打包配置
    signingConfigs {
        release {
            storeFile file('../dazhongkey.keystore')  // 签名文件路径
            storePassword '1234qwer'                    // 密码
            keyAlias 'dazhongkey'                       // 别名
            keyPassword '1234qwer'                      // 别名密码
        }
    }
    ....
}

// 打包命令
// 在项目的根路径下
cd android 
// 打测试包 打包离线Bundle
./gradlew installRelease
// 打正式包
./gradlew assembleRelease
// 清理缓存
./gradlew clean



## 项目规范

### 命名规范
 - 文件夹命名   文件名要全部小写,以'_' 分割单词 比如 base_component, business_component
 - 文件命名     文件名要全部小写,以'_' 分割单词 比如 base_component, business_component
 - 变量         驼峰命名
 - JS类命名     驼峰命名

## 项目目录结构

````
bundle           // 编译后的文件
    ios           // ios bundle 文件
    android       // android bundle 文件
src 
    assets       // 静态资源
        image    // 图片
    style        // 样式
    common       // 公共模块
        net      // 网络模块封装
        tool     // 工具
    UI_component    // 基础组件
    config       // 项目全局配置
    view         // 视图
        business_component  // 业务组件


 ## 性能优化 
 - babel-plugin-transform-remove-console  生产环境删除所有的 console
 > npm i babel-plugin-transform-remove-console --save
 > 新建并配置 .babelrc 文件

 ````
 {
     "env": {
      "production": {
        "plugins": ["transform-remove-console"]  //在正式环境移除 所有的console 代码，减少性能消耗
      }
    }
 }
````

 - 对于超过4屏的数据使用 fastList 来代替 listView

 - 项目代码中尽量避免JS 线程中同时做很多事情，会导致线程阻塞 掉帧。造成界面卡顿

 - 重复渲染问题，使用 shouldComponentUpdate 处理

 - 动画
 > Animated的前提是尽量减少不必要的动画。一些折叠、增加减少view、改变大小等简单的操作，可以使用LayoutAnimation来流畅的完成一次性动画
