# TuyaIotGateway.GatewayListener 回调函数详细介绍

在调用 tuyaIotStart 之前应该注册 TuyaIotGateway.GatewayListener 回调函数，以接收处理结果。

## 网关状态回调

**接口说明**

网关状态更新时回调。

```java
void onStatusChanged(int status);
```

**参数说明**

| 返回值 | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| status | 状态更改通知回调函数： STATUS_RESET：网关被重置 STATUS_ACTIVATED：网关被激活 STATUS_FIRST_START：网关第一次启动 STATUS_NORMAL：网关激活而且已经启动 |

## 网关重置回调

**接口说明**

网关被重置后回调，app 需要根据 type 的值做相应的操作。

```java
void onReset(int type);
```

**参数说明**

| 返回值 | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| type   | 重置类型： RESET_TYPE_LOCAL_RESET_FACTORY：本地恢复工厂设置 RESET_TYPE_REMOTE_UNACTIVE：远端网关重置，即为通过 APP 取消与账号绑定 RESET_TYPE_LOCAL_UNACTIVE：本地网关重置，取消与账号绑定 RESET_TYPE_REMOTE_RESET_FACTORY：远端恢复工厂设置 RESET_TYPE_RESET_DATA_FACTORY：恢复数据工厂设置 |

## 重启请求回调

**接口说明**

网关请求重启设备。

```java
void onReboot();
```

## 网关网络状态回调

**接口说明**

网关已经被重置，app 需要根据 type 的值做相应的操作。

```java
void onNetworkStatus(int status);
```

**参数说明**

| 返回值 | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| type   | 网络状态： NETWORK_STATUS_LAN_UNCONNECTED：联网失败 NETWORK_STATUS_LAN_CONNECTED：本地网络连接成功 NETWORK_STATUS_CLOUD_CONNECTED：云端连接成功，设备已经激活 |

## 云端多媒体数据回调

**接口说明**

接收云端下发多媒体数据结构体，获取音频需要通过地址和参数请求音频数据流。

```java
void onCloudMedia(TuyaIotGateway.MediaAttribute[] mediaAttributes);


class TuyaIotGateway.MediaAttribute {
	public int mMediaType; //MEDIA_TYPE_MEDIA = 0 多媒体类型; MEDIA_TYPE_TTS = 1 TTS类型;MEDIA_TYPE_INVALD = 2 无效类型;
	public String mUrl; //音频数据请求地址
	public String mRequestBody; //音频数据请求参数
}
```

**参数说明**

| 返回值          | 含义         |
| --------------- | ------------ |
| mediaAttributes | 多媒体结构体 |

## 云端定制数据回调

**接口说明**

客户定制501透传接口函数，具体协议内容由云端与客户制定，并提供说明。

```java
void onCloudCustom(String type, String msgJson);
```

**参数说明**

| 返回值  | 含义     |
| ------- | -------- |
| type    | 接口类型 |
| msgJson | 数据json |

## 网关 DP 点下发回调

**接口说明**

DP 点下发。

```java
void onDataPointCommand(int type, int dttType, String cid, String groupid, DataPoint[] dataPoint);
```

**参数说明**

| 返回值    | 含义                                                         |
| --------- | ------------------------------------------------------------ |
| type      | 指令类型： DATAPOINT_CMD_LAN：LAN 触发 DATAPOINT_CMD_MQ：MQTT 触发 DATAPOINT_CMD_TIMER：本地定时触发 DATAPOINT_CMD_SCENE_LINKAGE：场景联动触发 DATAPOINT_CMD_RELIABLE_TRANSFER：重发 |
| dttType   | 传输方式： DATAPOINT_DTT_SCT_UNC：LAN 触发 DATAPOINT_DTT_SCT_BNC：MQTT 触发 DATAPOINT_DTT_SCT_MNC：本地定时触发 DATAPOINT_DTT_SCT_SCENE：场景联动触发 |
| cid       | cid == NULL 表示控制的网关的功能点；cid != NULL 表示控制的网关子设备的功能点，其中 cid 是子设备的唯一 ID |
| groupid   | 群组 ID，只有当 dtt_tp = 2 时，该字段才有效。                |
| dataPoint | dp点数据，DataPoint类型参考[DP点异步上报](https://github.com/TuyaInc/tuyasmart_android_device_central_sdk#DP点异步上报)中的说明。 |

## 获取 IP 回调

**接口说明**

获取设备IP。

```java
String onGetIP();
```

## 获取 MAC 地址回调

**接口说明**

获取设备 MAC 地址。

```java
String onGetMacAddress();
```

## 网关启动结果回调

**接口说明**

tuyaIotStart 成功时调用 onStartSuccess 回调。

```java
void onStartSuccess();
```

**接口说明**

tuyaIotStart 失败时调用 onStartFailure 回调。

```java
void onStartFailure(int err);
```

**参数说明**

| 返回值 | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| type   | 错误码，为 GatewayError 中定义的值之一，常见错误： ERROR_COM_ERROR：网络连接错误 ERROR_INVALID_PARM：参数错误 ERROR_INVALID_STATUS：状态错误 |

## 获取日志文件

**接口说明**

获取日志文件，如果启用了日志系统，通过 LogDaemon 的 getZippedLogFile() 方法获取日志文件。

```java
String onGetLogFile();
```

**示例代码**

```java
@Override
public String onGetLogFile() {
    Log.d(TAG, "onGetLogFile");
    if(mLogDaemon != null) {
        return mLogDaemon.getZippedLogFile();
    }
    return null;
}
```