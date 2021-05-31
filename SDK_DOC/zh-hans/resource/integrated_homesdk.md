# 集成 SDK

在 Android Studio 中新建工程。

## 配置 build.gradle

build.gradle 文件里添加集成准备中下载的 `dependencies` 依赖库。

```groovy
android {
    defaultConfig {
        ndk {
            abiFilters "armeabi-v7a", "arm64-v8a"
        }
    }
    packagingOptions {
        pickFirst 'lib/*/libc++_shared.so' // 多个aar存在此so，需要选择第一个
    }
}
dependencies {
    implementation 'com.alibaba:fastjson:1.1.67.android'
    implementation 'com.squareup.okhttp3:okhttp-urlconnection:3.14.9'
    implementation 'com.tuya.smart:tuyasmart:XXX'
    implementation 'com.tuya.smart:optimus:XXX'
    implementation 'com.tuya.smart:tuyasmart-centralcontrolsdk:XXX'
    implementation 'com.tuya.smart:tuyasmart-verticalcategory:XXX'
}
```

> [!NOTE]  
>
> 各个 SDK 版本号可以参考：[ SDK 版本号](sdk_versions.md) 章节，获取各版本对应的版本号

在根目录的 build.gradle 文件中增加涂鸦云仓库地址，进行仓库配置

```groovy
repositories {
    jcenter()
    google()
    // 涂鸦云仓库地址
    maven {
        url "https://maven-other.tuya.com/repository/maven-releases/"
    }
}
```

## 集成安全图片

点击 “下载安全图片” ——“安全图片下载” 下载安全图片。

![快速集成](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/goat/20210109/5c2f19ced7fc4bd8b0381da8142d606b.png)

在集成准备中点击“下载安全图片”。将下载的安全图片命名为 “t_s.bmp”，放置到工程目录的 assets 文件夹下。

![快速集成](https://images.tuyacn.com/fe-static/docs/img/2de282a3-5498-479e-bb31-3688e3ac1eb2.png)

## 设置 Appkey 和 AppSecret

在 `AndroidManifest.xml` 文件里配置 appkey 和 appSecret，在配置相应的权限等

```xml
<meta-data
android:name="TUYA_SMART_APPKEY"
android:value="应用 Appkey" />
<meta-data
android:name="TUYA_SMART_SECRET"
android:value="应用密钥 AppSecret" />
```

## 混淆配置

在 `proguard-rules.pro` 文件配置相应混淆配置

```bash
#fastJson
-keep class com.alibaba.fastjson.**{*;}
-dontwarn com.alibaba.fastjson.**

#mqtt
-keep class com.tuya.smart.mqttclient.mqttv3.** { *; }
-dontwarn com.tuya.smart.mqttclient.mqttv3.**

#OkHttp3
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**

-keep class okio.** { *; }
-dontwarn okio.**

-keep class com.tuya.**{*;}
-dontwarn com.tuya.**
```

## 初始化 SDK

用于初始化 SDK，请在 Application 中初始化 SDK，确保所有进程都能初始化。

**示例代码**

```java
public class TuyaSmartApp extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        TuyaHomeSdk.init(this);
    }
}
```

apply 和 appSecret 需要配置 `AndroidManifest.xml` 文件里，也可以在初始化代码里初始化。

```java
TuyaHomeSdk.init(Application application, String appkey, String appSerect)
```

## 注销云连接

在退出应用的时候调用以下接口注销掉。

```java
TuyaHomeSdk.onDestroy();
```

## 调试开关

在 debug 模式下可以开启 SDK 的日志开关，查看更多的日志信息，帮助快速定位问题。在 release 模式下建议关闭日志开关。

```java
TuyaHomeSdk.setDebugMode(true);
```