package com.dazhongdemo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.webview.RNCWebViewPackage;

import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// 1.导入插件类 codepush
import com.microsoft.codepush.react.CodePush;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import cn.jpush.reactnativejpush.JPushPackage; // 极光推送

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    // 设置为true将不弹出toast
    private boolean SHUTDOWN_TOAST = false;
    // 设置为true将不打印log
    private boolean SHUTDOWN_LOG = false;

    // 2.重写getJSBundleFile方法，以便让 CodePush运行时确定 从每个应用程序开始获取JS // bundle位置的位置
    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    // 3.实例化CodePush运行时的一个实例，并将其添加到列表中
    // 现有的软件包，并指定正确的部署重点。如果你还没有
    // 拥有它，你可以运行“代码推送部署ls <appName> -k”来检索你的密钥
    @Override
    protected List<ReactPackage> getPackages() {
<<<<<<< HEAD
      return Arrays.<ReactPackage>asList(new MainReactPackage(), 
          new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
          new AsyncStoragePackage(),
=======
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new RNCWebViewPackage(),
            new AsyncStoragePackage(),
>>>>>>> f5681ff656a5b69c47be8a49c463ade82180d4e3
          new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey),
              getApplicationContext(), BuildConfig.DEBUG),
          new RNGestureHandlerPackage(), new SplashScreenReactPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
