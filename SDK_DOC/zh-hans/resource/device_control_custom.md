# 设备管理

涂鸦智能提供了丰富的接口供您实现设备信息的获取和管理能力（移除等）。设备相关的返回数据都采用异步消息的方式通知接收者。`ITuyaDevice` 类提供了设备状态通知能力，通过注册回调函数，您可以方便的获取设备数据接受、设备移除、设备上下线、手机网络变化的通知。同时也提供了控制指令下发，设备固件升级的接口。

## 设备初始化

### 初始化家庭数据

设备控制必须先初始化数据，调用下面的方法获取家庭下的设备信息，每次 App 存活期间初始化一次就可以了，此外切换家庭也需要进行初始化。

```java
TuyaHomeSdk.newHomeInstance(homeId).getHomeDetail(new ITuyaHomeResultCallback() {
    @Override
    public void onSuccess(HomeBean homeBean) {
    	
    }

    @Override
    public void onError(String errorCode, String errorMsg) {

    }
});
```

该接口的 onSuccess 方法中将返回`HomeBean`，然后调用 `HomeBean` 的 `getDeviceList` 即可获得设备列表：

```java
List<DeviceBean> deviceList = homeBean.getDeviceList();
```

### 初始化设备控制

**接口说明**

根据设备 id 初始化设备控制类

```java
TuyaHomeSdk.newDeviceInstance(String devId);
```

**参数说明**

| 参数  | 说明    |
| :---- | :------ |
| devId | 设备 id |

**示例代码**

```java
ITuyaDevice mDevice = TuyaHomeSdk.newDeviceInstance(deviceBean.getDevId());
```

## 设备监听

### 注册设备监听

**接口说明**

ITuyaDevice 提供设备相关信息（DP 数据、设备名称、设备在线状态和设备移除）的监听，会实时同步到这里。

```java
ITuyaDevice.registerDevListener(IDevListener listener)
```

**参数说明**

| 参数     | 说明         |
| :------- | :----------- |
| listener | 设备状态监听 |

`IDevListener` 接口如下：

```java
public interface IDevListener {

    /**
     * DP 数据更新
     *
     * @param devId 设备 ID
     * @param dpStr 设备发生变动的功能点，为 JSON 字符串，数据格式：{"101": true}
     */
    void onDpUpdate(String devId, String dpStr);

    /**
     * 设备移除回调
     *
     * @param devId 设备id
     */
    void onRemoved(String devId);

    /**
     * 设备上下线回调。如果设备断电或断网，服务端将会在3分钟后回调到此方法。
     *
     * @param devId  设备 ID
     * @param online 是否在线，在线为 true
     */
    void onStatusChanged(String devId, boolean online);

    /**
     * 网络状态发生变动时的回调
     *
     * @param devId  设备 ID
     *  @param status 网络状态是否可用，可用为 true
     */
    void onNetworkStatusChanged(String devId, boolean status);

    /**
     * 设备信息更新回调
     *
     * @param devId  设备 ID
     */
    void onDevInfoUpdate(String devId);

}
```

其中，设备功能点说明见文档中的 [设备功能点说明](https://developer.tuya.com/cn/docs/app-development/devicemanage?id=Ka6ki8r2rfiuu#DeviceFunction) 章节。

**示例代码**

```java
mDevice.registerDevListener(new IDevListener() {
    @Override
    public void onDpUpdate(String devId, String dpStr) {

    }
    @Override
    public void onRemoved(String devId) {

    }
    @Override
    public void onStatusChanged(String devId, boolean online) {

    }
    @Override
    public void onNetworkStatusChanged(String devId, boolean status) {

    }
    @Override
    public void onDevInfoUpdate(String devId) {

    }
});
```

> **注意**：请勿使用`void registerDeviceListener(IDeviceListener listener)`方法，此方法需要配合标准设备使用，该 API 暂未对外开放。

### 取消设备监听

当不需要监听设备时，注销设备监听器。

**接口说明**

```java
ITuyaDevice.unRegisterDevListener()
```

**示例代码**

```java
mDevice.unRegisterDevListener();
```

## 设备控制

设备控制接口功能为向设备发送功能点，来改变设备状态或功能。

**接口说明**

设备控制的自动方式（如果局域网在线，先走局域网控制，局域网不在线，走云端控制）

```java
ITuyaDevice.publishDps(dps, callback);
```

**参数说明**

| 参数            | 说明                                        |
| :-------------- | :------------------------------------------ |
| dps             | data points, 设备功能点，格式为 json 字符串 |
| publishModeEnum | 设备控制方式                                |
| callback        | 发送控制指令是否成功的回调                  |

**示例代码**

假设开灯的设备功能点是 101，那么开灯的控制代码如下所示：

```java
mDevice.publishDps("{\"101\": true}", new IResultCallback() {
    @Override
    public void onError(String code, String error) {
        Toast.makeText(mContext, "开灯失败", Toast.LENGTH_SHORT).show();
    }
	
    @Override
    public void onSuccess() {
        Toast.makeText(mContext, "开灯成功", Toast.LENGTH_SHORT).show();
    }
});
```

> **注意**
>
> - 指令下发成功并不是指设备真正操作成功，只是意味着指令成功发送出去。操作成功会有 DP 数据信息上报上来 ，且通过 `IDevListener onDpUpdate` 接口返回。
> - command 命令字符串 是以 `Map<String,Object>`(dpId 和 dpValue 键值对)数据格式转成 json 字符串。
> - command 命令可以一次发送多个 DP 数据。



## 设备功能点说明

DeviceBean 类 dps 属性定义了设备的状态，称作数据点（DP）或功能点。`dps` 字典里的每个 `key` 对应一个功能点的 `dpId`，`dpValue` 为该功能点的值。各自产品功能点定义参见 [涂鸦开发者平台 ](https://iot.tuya.com/index)的产品功能。
功能点具体参见 [功能点相关概念](https://developer.tuya.com/cn/docs/iot/configure-in-platform/function-definition/define-product-features?id=K97vug7wgxpoq)

**指令格式**

发送控制指令按照以下格式：

```java
	{"(dpId)":"(dpValue)"}
```

**功能点示例**

开发平台可以看到一个产品这样的界面：

![设备管理](https://images.tuyacn.com/fe-static/docs/img/8a057fb2-5d8b-409b-bfb0-971a8c856a10.png)

根据后台该产品的功能点定义，示例代码如下:

```java
//设置 dpId 为 101 的布尔型功能点示例，作用:开关打开 
dps = {"101": true};

//设置 dpId 为 102 的字符串型功能点示例，作用:设置 RGB 颜色为 ff5500
dps = {"102": "ff5500"};

//设置dpId为103的枚举型功能点示例，作用:设置档位为2档
dps = {"103": "2"};

//设置 dpId 为 104 的数值型功能点示例，作用:设置温度为 20°
dps = {"104": 20};

//设置 dpId 为 105 的透传型( byte 数组)功能点示例，作用:透传红外数据为 1122
dps = {"105": "1122"};

//多个功能合并发送
dps = {"101": true, "102": "ff5500"};

mDevice.publishDps(dps, new IResultCallback() {
        @Override
        public void onError(String code, String error) {
        //错误码11001
        //有下面几种情况：
        //1、类型不对导致，例如，string 类型格式，发成 B　oolean 类型数据。
        //2、只读类型 DP 数据不能下发，参考 SchemaBean getMode "ro" 是只读类型。
        //3、raw 格式发送数据格式不是 16 进制字符串。
        }
        @Override
        public void onSuccess() {
        }
    });
```

> **注意**
>
> - 控制命令的发送需要特别注意数据类型.
>
> 	例如，功能点的数据类型是数值型（ value ），那控制命令发送的应该是 `{"104": 25}` 而不是 `{"104": "25"}`
>
> - 透传类型传输的 byte 数组是 16 进制字符串格式并且必须是偶数位
> 	比如正确的格式是: `{"105": "0110"}` 而不是 `{"105": "110"}`

## 设备信息查询

**接口说明**

查询单个 DP 数据。

该接口并非同步接口，查询后的数据会通过 `IDevListener.onDpUpdate()` 接口回调。

```java
mDevice.getDp(String dpId, IResultCallback callback);
```

**示例代码**

```java
mDevice.getDp(dpId, new IResultCallback() {
    @Override
    public void onError(String code, String error) {

    }

    @Override
    public void onSuccess() {

    }
});
```

> **注意**
>
> 该接口主要是针对那些数据不主动去上报的 DP，例如倒计时信息查询。 常规查询 DP 数据值可以通过 DeviceBean 里面 getDps() 去获取。

## 恢复出厂设置

**接口说明**

用于将设备重置，恢复到出厂状态，设备恢复出厂设置后，会重新进入待配网状态（快连模式），设备的相关数据会被清除掉。

```java
void resetFactory(IResultCallback callback)；
```

**示例代码**

```java
mDevice.resetFactory(new IResultCallback() {
    @Override
    public void onError(String errorCode, String errorMsg) {
    }

    @Override
    public void onSuccess() {
    }
});
```

## 回收设备资源

**接口说明**

应用或者 Activity 关闭时，可以调用此接口，回收设备占用的资源。

```java
void onDestroy()
```

**示例代码**

```java
mDevice.onDestroy();
```


## DeviceBean 数据模型

| 字段          | 类型    | 描述                                                         |
| :------------ | :------ | :----------------------------------------------------------- |
| devId         | String  | 设备唯一标示 id                                              |
| name          | String  | 设备名称                                                     |
| iconUrl       | String  | 图标地址                                                     |
| getIsOnline   | Boolean | 设备是否在线（局域网或者云端在线）                           |
| schema        | String  | 设备控制数据点的类型信息                                     |
| productId     | String  | 产品ID，同一个产品 ID，Schema 信息一致                       |
| supportGroup  | Boolean | 设备是否支持群组，如果不支持请到开放平台开启此项功能         |
| time          | Long    | 设备激活时间                                                 |
| pv            | String  | 网关协议版本                                                 |
| bv            | String  | 网关通用固件版本                                             |
| schemaMap     | Map     | Schema 缓存数据                                              |
| dps           | Map     | 设备当前数据信息。key 是 DP ID，value 是值                   |
| isShare       | boolean | 是否是分享设备                                               |
| virtual       | boolean | 是否是虚拟设备                                               |
| lon、lat      | String  | 用来标示经纬度信息，需要用户使用 sdk 前，调用 TuyaSdk.setLatAndLong 设置经纬度信息 |
| isLocalOnline | boolean | 设备局域网在线状态                                           |
| nodeId        | String  | 用于网关和子设备类型的设备，属于子设备的一个属性，标识其短地址 ID，一个网关下面的 nodeId 都唯一的 |
| timezoneId    | String  | 设备时区                                                     |
| category      | String  | 设备类型                                                     |
| meshId        | String  | 用于网关和子设备类型的设备，属于子设备的一个属性，标识其网关 ID |
| isZigBeeWifi  | boolean | 是否是 ZigBee 网关设备                                       |
| hasZigBee     | boolean | hasZigBee                                                    |

