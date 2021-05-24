# 集成中控 SDK


### 第一步：创建 Android 工程

在 Android Studio 中新建工程。

### 第二步：配置 build.gradle 文件

在安卓项目的 `build.gradle` 文件里，添加集成准备中下载的 `dependencies` 依赖库。

```groovy
dependencies {
	implementation 'com.tuya.smart:optimus:1.0.0'
    implementation 'com.tuya.smart:tuyasmart-centralcontrolsdk:0.0.1'
    implementation 'com.tuya.smart:tuyasmart-verticalcategory:0.0.1'
}
```