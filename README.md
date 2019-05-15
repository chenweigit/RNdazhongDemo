
# 项目说明

react native demo

## app 运行 
- 1、 npm i
- 2、 react-native link react-native-splash-screen
- 3、 react-native run-android


## 项目规范

### 命名规范
 - 文件夹命名   文件名要全部小写,以'_' 分割单词 比如 base_component, business_component
 - 文件命名     文件名要全部小写,以'_' 分割单词 比如 base_component, business_component
 - 变量         驼峰命名
 - JS类命名     驼峰命名

## 项目目录结构

````
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
