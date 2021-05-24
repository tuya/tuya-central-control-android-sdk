# 快捷功能解析 Android SDK 接入指南

## 功能概述

ShortcutParser 是涂鸦 IoT 业务 SDK 的功能拓展包。提供了对设备数据模型（DeviceBean）和群组数据模型（GroupBean）快捷功能相关能力的解析功能。使业务层对设备或群组快捷功能相关的研发更加便捷。

我们知道在涂鸦的 IoT 体系中，设备侧的功能点是使用 dp 来描述的。设备的状态和控制，可以通过对 dp 数据在客户端进行解析、渲染和操作。通常设备的 dp 由设备面板部分来实现设备的所有功能，这部分一般是通过 RN 面板来实现的。所谓快捷功能，即我们提供了一种标记能力，可以把若干 dp 描述为可以在除设备面板之外的部分去展示、控制。一般会标记用户最感兴趣的设备功能 dp，用在 APP 的设备列表页面，免去用户进入面板的成本，更快捷的获取设备的状态或者去控制设备。

## 集成准备

本工具包依赖于 TuyaHomeKitSDK 3.11.0 以上版本。

在模块 `build.gradle` 文件下添加依赖：

```groovy
implementation 'com.tuya.smart:tuyasmart-shortcutparser:0.0.1'
```

在根目录的 `build.gradle `文件下 `repositories`内添加 maven 源：

```groovy
maven {
  url "https://maven-other.tuya.com/repository/maven-releases/"
}
```

## 拓展包接口工具

本工具包核心是提供对设备或群组的快捷 dp 信息的解析能力，各接口定义简要说明列表如下：

|          类名          |        说明        |
| :--------------------: | :----------------: |
| IShortcutParserManager |    入口工具接口    |
|     IClientParser      |  设备解析工具接口  |
|       IDpControl       |  快捷控制基础接口  |
|     IBoolDpControl     | 布尔型快捷控制接口 |
|     IEnumDpControl     | 枚举型快捷控制接口 |
|     INumDpControl      | 数值型快捷控制接口 |
|       IDpStatus        |    快捷状态接口    |

各 API 接口关系如下：

![apireleation](./images/apireleation.png)



其中，入口工具接口如下：

**接口说明**

```java
public interface IShortcutParserManager {
    /**
     * 获取设备解析信息
     *
     * @param deviceBean 
     * @return
     */
    IClientParser getDeviceParseData(DeviceBean deviceBean);

    /**
     * 获取群组解析信息
     *
     * @param groupBean
     * @return
     */
    IClientParser getGroupParseData(GroupBean groupBean, ProductBean productBean);
}
```

**示例代码**

```java
//工具初始化
IShortcutParserManager mIShortcutParserManager = new ShortcutParserManager(); 
```

## 快捷控制

根据设备的功能特点，一般指可读写的 dp 功能。在涂鸦开发者平台可以进行配置：

![control_dp_config1](./images/control_dp_config1.png)

![control_dp_config2](./images/control_dp_config2.png)

配置成功后，从业务 SDK 拉取到的 DeviceBean/GroupBean 数据中就会携带对应的快捷控制 dp 信息。才可以使用本拓展包，进行快捷控制相关的功能研发。


### 快捷开关

快捷控制类的 dp 可以分为两种。其一，是设备的开关 dp。一般标记为设备的快捷开关的 dp 对应的设备功能是该设备的电源开关。在通过入口工具类获取的设备解析接口 `IClientParserBean` 中有三部分跟快捷开关有关：

#### 快捷开关状态

```java
enum SHORTCUT_SWITCH_STATUS{
    //未配置快捷开关
    SWITCH_NONE(0),
    //快捷开关打开状态
    SWITCH_ON(1),
    //快捷开关关闭状态
    SWITCH_OFF(2);

    private int status;

    SHORTCUT_SWITCH_STATUS(int status) {
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
```

#### 获取快捷开关状态接口

**接口说明**

获取快捷开关状态的枚举类型

```java
/**
 * 获取快捷开关的状态
 * @return 状态枚举
 */
SHORTCUT_SWITCH_STATUS getSwitchStatus();
```

**示例代码**

```java
IClientParser mClientParser = mShortcutParserManager.updateDeviceParseData(mDev);
Log.d(TAG,mClientParser.getSwitchStatus());
```

#### 获取快捷开关的操作接口

**接口说明**

```java
/**
 * 获取快捷开关的dp解析数据
 * @return 解析接口
 */
IBoolDpControl getSwitchDpParseBean();
```

### 普通快捷 dp

其二，即普通快捷 dp。可以通过设备解析工具接口获取快捷 dp 列表。

```java
/**
 * 获取快捷控制的dp解析列表
 * @return
 */
List<IDpControl> getDpShortcutControlList();
```

其中，可能获取到的 dp 目前支持有枚举、数值、布尔三种。各自接口提供对应的可解析出的数据，具体可以参考接口类注释。

### 数据更新

一般情况下，设备进行控制后，dps 信息会发生改变，此时可以通过设备解析工具调用数据更新接口，用于获取最新的状态。

**接口说明**

```java
/**
 * 设备或群组的状态更新 数据跟进解析
 * @param dps 设备/群组的 dps 值
 * @param dpName 设备/群组的 dp name 值
 */
void update(Map<String, Object> dps, Map<String, String> dpName);
```

**示例代码**

```java
//从 SDK 中获取最新的数据缓存
mDev = TuyaHomeSdk.getDataInstance().getDeviceBean(devId);
//更新 dp s和 dpName 信息
mClientParserBean.update(mDev.getDps(),mDev.getDpName());
```

## 快捷状态

带有快捷状态标记的 dp，一般是用于类似传感器类型的设备，标记一些只读的设备状态信息。对于产品配置，目前这部分功能还没有开放到涂鸦开发者平台，设备产品的所有者可以联系涂鸦的工作对接人员去配置。

设备解析工具提供了获取当前设备或群组快捷状态的列表接口。

**接口说明**

```java
/**
 * 获取快捷状态 dp 解析列表
 * @return
 */
List<IDpStatus> getDpShortcutStatusList();
```

具体快捷状态提供的数据解析能力可以参考接口类注释，十分简单。