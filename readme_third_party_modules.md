# 项目中使用的模块
> 这里会详细说明每个模块的使用
> 当前版本  

````

nodejs  9.0
react : 16.8.3
react-native : 0.59.8

````

## react-native-splash-screen
> 解决启动页白屏问题
android 上设置
- 1、安装模块 yarn  add react-native-splash-screen  这里建议使用  yarn 少用npm 一定不要使用cnpm 
- 2、安装依赖 react-native link react-native-splash-screen 
- 3、配置启动图片
    - 3.1、android 项目配置

    > 3.1.1 MainActivity.java 文件配置 
    ````
      import android.os.Bundle;  // 启动页配置1
      import org.devio.rn.splashscreen.SplashScreen;  // 导入启动包  启动页配置2

      /**
     * 启动的时候，显示界面 
     * 启动页配置3
     */
    @Override
    protected void onCreate(Bundle savedInstanceState){
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }
    ````

    - 3.1.2 创建布局文件  android/app/src/mian/res目录下创建layout文件夹 。并在创建的layout文件夹中创建launch_screen.xml。内容如下 

    ````
    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/screen">
    </LinearLayout>
    ````

    - 3.1.3 创建图片文件 。 在 android/app/src/mian/res目录下创建drawable-xhdpi文件夹，并添加名为launch_screen.png的图片（其实你要想适配的更全面可以像mipmap一样添加不同分辨率的图片）




    - B、查看链接  https://zhuanlan.zhihu.com/p/29495955
