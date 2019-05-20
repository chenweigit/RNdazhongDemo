package com.dazhongdemo;

import android.os.Bundle;
import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;  // 导入启动包  启动页配置2
import cn.jpush.android.api.JPushInterface;      // 极光推送

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "dazhongDemo";
    }

    /**
     */
    @Override
    protected void onCreate(Bundle savedInstanceState){
        SplashScreen.show(this, true);
        JPushInterface.init(this);
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}
