# 网关控制

## 网关启动

### 初始化网关 SDK 实例

**接口说明**

```java
mIotGateway = TuyaIotGateway.getInstance();
```

### 注册回调函数

创建`TuyaIotGateway.GatewayListener `对象， 调用` TuyaIotGateway` 的 `setGatewayListener`函数注册。回调函数的实现参考[回调函数](https://github.com/TuyaInc/tuyasmart_android_device_central_sdk#回调函数)中说明。

**接口说明**

```java
mIotGateway.setGatewayListener(new TuyaIotGateway.GatewayListener() {
    @Override
    public void onStatusChanged(int status) {

    }

    @Override
    public void onReset(int type) {

    }

    @Override
    public void onReboot() {

    }

    @Override
    public void onDataPointCommand(int type, int dttType, String cid, String groupid, TuyaIotGateway.DataPoint[] dataPoint) {

    }

    @Override
    public void onNetworkStatus(int status) {

    }

    @Override
    public void onCloudMedia(TuyaIotGateway.MediaAttribute[] mediaAttributes) {

    }
    
    @Override
    public void onCloudCustom(String type, String msgJson) {}

    @Override
    public String onGetIP() {
        return null;
    }

    @Override
    public void onStartSuccess() {

    }

    @Override
    public void onStartFailure(int err) {

    }

    @Override
    public String onGetLogFile() {
        return null;
    }

    @Override
    public String onGetMacAddress() {
        return null;
    }
});
```

### 启动网关

**接口说明**

```java
void tuyaIotStart(Context context, Config config);
```

**参数说明**

| 参数    | 说明                                 |
| ------- | ------------------------------------ |
| Context | 上下文                               |
| Config  | 网关配置，参看 TuyaIotGateway.Config |

TuyaIotGateway.Config

| 成员         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| mPath        | 存储路径，该目录要在app中创建                                |
| mFirmwareKey | 固件key或者pid，向涂鸦申请，产品唯一。 和mIsOEM配合使用: mIsOEM为true时，mFirmwareKey为固件key mIsOEM为false时，mFirmwareKey为pid |
| mUUID        | 设备唯一，成对出现                                           |
| mAuthKey     | authkey，向涂鸦申请，设备唯一，和mUUID成对出现               |
| mVersion     | 版本号，用于标识app 版本，而不是网关版本                     |
| mSerialPort  | 串口终端                                                     |
| mTempDir     | 临时文件目录，该目录要在app中创建                            |
| mBinDir      | bin文件目录，该文件夹下不要存放其他文件，该目录要在app中创建 |
| mIsCTS       | 是否带流控                                                   |
| mIsOEM       | 是否是oem产品，和mFirmwareKey配合使用。                      |

**返回值说明**

tuyaIotStart 是异步调用，其结果通过回调函数返回，启动成功回调函数 onStartSuccess，失败调用回调函数onStartFailure，参考 [网关启动结果回调](https://github.com/TuyaInc/tuyasmart_android_device_central_sdk#网关启动结果回调) 中的说明。

## 网关激活

启动网关成功之后，才可以入网。

### 获取激活 token

开始配网之前，SDK 需要在联网状态下从涂鸦云获取配网 Token，Token 的有效期为 10 分钟，且配置成功后就会失效（再次配网需要重新获取）。

```java
TuyaHomeSdk.getActivatorInstance().getActivatorToken(homeId,
		new ITuyaActivatorGetToken() {

			@Override
			public void onSuccess(String token) {

			}

			@Override
			public void onFailure(String s, String s1) {

			}
		});
```

**参数说明**

| 参数   | 说明                                                         |
| :----- | :----------------------------------------------------------- |
| homeId | 家庭 ID，从用户信息中获取，参考：二维码授权登录 -  获取登录状态 章节 |

### 激活网关

启动网关成功之后，才可以入网。

### 获取激活 token

开始配网之前，SDK 需要在联网状态下从涂鸦云获取配网 Token，Token 的有效期为 10 分钟，且配置成功后就会失效（再次配网需要重新获取）。

```java
TuyaHomeSdk.getActivatorInstance().getActivatorToken(homeId,
		new ITuyaActivatorGetToken() {

			@Override
			public void onSuccess(String token) {

			}

			@Override
			public void onFailure(String s, String s1) {

			}
		});
```

**参数说明**

| 参数   | 说明                                                         |
| :----- | :----------------------------------------------------------- |
| homeId | 家庭 ID，从用户信息中获取，参考：二维码授权登录 -  获取登录状态 章节 |

###

**接口说明**

```java
public int tuyaIotBindToken(String token);
```

**参数说明**

| 参数  | 说明       |
| ----- | ---------- |
| token | 入网 token |

**返回值说明**

| 返回值  | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| 0       | 调用成功，请注意，调用成功不代表已经入网成功，入网结果通过 onNetworkStatus 通知。 |
| 非 0 值 | 调用失败，没有入网。                                         |

激活成功后在网关状态回调 接口中有回调

### 网关状态回调

**接口说明**

网关状态更新时回调。

```
void onStatusChanged(int status);
```

**参数说明**

| 返回值 | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| status | 状态更改通知回调函数： STATUS_RESET：网关被重置 STATUS_ACTIVATED：网关被激活 STATUS_FIRST_START：网关第一次启动 STATUS_NORMAL：网关激活而且已经启动 |

##TuyaIotGateway.GatewayListener 回调函数介绍
关于 API 的详细介绍，请参考文档：
[TuyaIotGateway.GatewayListener 回调函数介绍](./gateway_api.md)

