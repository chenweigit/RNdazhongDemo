package com.dazhongdemo;

import android.os.Bundle;
import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;  // 导入启动包  启动页配置2

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
        // SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }
}
