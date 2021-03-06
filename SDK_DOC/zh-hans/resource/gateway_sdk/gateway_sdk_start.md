# 网关控制

网关控制实现了启动、入网、获取设备虚拟 id、DP 点 下发/上报 功能。

## 网关启动

### 获取网关 SDK 实例

**接口说明**

```java
mIotGateway = TuyaIotGateway.getInstance();
```

### 注册回调函数

创建`TuyaIotGateway.GatewayListener `对象， 调用` TuyaIotGateway` 的 `setGatewayListener`函数注册。回调函数的实现参考[回调函数](https://github.com/TuyaInc/tuyasmart_android_device_central_sdk/tree/hrs#回调函数)中说明。

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

tuyaIotStart 是异步调用，其结果通过回调函数返回，启动成功回调函数 onStartSuccess，失败调用回调函数onStartFailure，参考 [网关启动结果回调](https://github.com/TuyaInc/tuyasmart_android_device_central_sdk/tree/hrs#网关启动结果回调) 中的说明。

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
| homeId | 家庭 ID，从用户信息中获取，参考：二维码授权登录 - 获取登录状态 章节 |

### 激活网关

**接口说明**

```java
public int tuyaIotBindToken(String token);
```

**参数说明**

| 参数  | 说明                                                         |
| ----- | ------------------------------------------------------------ |
| token | 入网 token ， 需要登录涂鸦账号之后调用 Tuya Smart Android Home SDK 中的接口获取。 详情请参考 Tuya Smart Android Home SDK - 设备配网 - **获取配网 token** 的接口说明。 |

**返回值说明**

| 返回值  | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| 0       | 调用成功，请注意，调用成功不代表已经入网成功，入网结果通过 onNetworkStatus 通知。 |
| 非 0 值 | 调用失败，没有入网。                                         |

## 获取设备虚拟 ID

入网成功后，可以获取设备虚拟 ID。

**接口说明**

```java
public String tuyaIotGetId();
```

## DP 点上报

### 异步上报

**接口说明**

同步上传透传型 DP 点数据。

```java
public int tuyaIotReportDataPointJsonAsync(String devId, DataPoint[] dataPoint);
```

**参数说明**

| 参数      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| devId     | 如果是主设备，devId 是自设备 id；如果是网关 /soc/mcu，则 devId 为 null |
| dataPoint | dp 点信息，参考 TuyaIotGateway.DataPoint                     |

TuyaIotGateway.DataPoint

| 成员       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| mId        | 在涂鸦 IoT 平台上定义的功能点编号                            |
| mType      | 功能点的数据类型，支持的数据类型请参见涂鸦文档中心的功能点定义，参考[自定义功能](https://docs.tuya.com/zh/iot/configure-in-platform/function-definition/custom-functions?id=K937y38137c64): TYPE_BOOL：布尔型 TYPE_VALUE：数值型 TYPE_STRING：字符串型 TYPE_ENUM：枚举型 TYPE_BITMAP：故障型 |
| mData      | 功能点的值，数据类型由 mType 指定。                          |
| mTimeStamp | 时间戳，值为 0 时采用当前的时间。                            |

### 同步上报

**接口说明**

```java
public int tuyaIotReportDataPointRawSync(String devId, int dataPointId, byte[] data, int timeout);
```

**参数说明**

| 返回值      | 含义                                                         |
| ----------- | ------------------------------------------------------------ |
| devId       | 如果是主设备，devId 是自设备 id；如果是网关 /soc/mcu，则 devId 为 null |
| dataPointId | 在涂鸦 IoT 平台上定义的功能点编号                            |
| data        | 透传型 dp 点数据                                             |
| timeout     | 函数阻塞超时时间，以秒为单位                                 |

## 回调函数

在调用 tuyaIotStart 之前应该注册 TuyaIotGateway.GatewayListener 回调函数，以接收处理结果。

### 云端多媒体数据回调

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

### 云端定制数据回调

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

### 网关状态回调

**接口说明**

网关状态更新时回调。

```java
void onStatusChanged(int status);
```

**参数说明**

| 返回值 | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| status | 状态更改通知回调函数： STATUS_RESET：网关被重置 STATUS_ACTIVATED：网关被激活 STATUS_FIRST_START：网关第一次启动 STATUS_NORMAL：网关激活而且已经启动 |

### 网关重置回调

**接口说明**

网关被重置后回调，app 需要根据 type 的值做相应的操作。

```java
void onReset(int type);
```

**参数说明**

| 返回值 | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| type   | 重置类型： RESET_TYPE_LOCAL_RESET_FACTORY：本地恢复工厂设置 RESET_TYPE_REMOTE_UNACTIVE：远端网关重置，即为通过 APP 取消与账号绑定 RESET_TYPE_LOCAL_UNACTIVE：本地网关重置，取消与账号绑定 RESET_TYPE_REMOTE_RESET_FACTORY：远端恢复工厂设置 RESET_TYPE_RESET_DATA_FACTORY：恢复数据工厂设置 |

### 重启请求回调

**接口说明**

网关请求重启设备。

```java
void onReboot();
```

### 网关网络状态回调

**接口说明**

网关已经被重置，app 需要根据 type 的值做相应的操作。

```java
void onNetworkStatus(int status);
```

**参数说明**

| 返回值 | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| type   | 网络状态： NETWORK_STATUS_LAN_UNCONNECTED：联网失败 NETWORK_STATUS_LAN_CONNECTED：本地网络连接成功 NETWORK_STATUS_CLOUD_CONNECTED：云端连接成功，设备已经激活 |

### 网关 DP 点下发回调

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
| dataPoint | dp点数据，DataPoint类型参考[DP点异步上报](https://github.com/TuyaInc/tuyasmart_android_device_central_sdk/tree/hrs#DP点异步上报)中的说明。 |

### 获取 IP 回调

**接口说明**

获取设备IP。

```java
String onGetIP();
```

### 获取 MAC 地址回调

**接口说明**

获取设备 MAC 地址。

```java
String onGetMacAddress();
```

### 网关启动结果回调

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

### 获取日志文件

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

## 网关控制流程

```mermaid
sequenceDiagram
participant APP
participant Gateway
APP->Gateway:getInstance
APP->Gateway:setGatewayListener
APP->Gateway:tuyaIotStart
Gateway-->APP:onStartSuccess
APP->Gateway:tuyaIotBindToken
Gateway-->APP:onStatusChanged
Gateway-->APP:onNetworkStatus

Gateway-->APP:onReboot
APP->APP:reboot

Gateway-->APP:onReset
Note right of APP:如果 onReset 回调非RESET_TYPE_RESET_DATA_FACTORY，则reboot
APP->APP:reboot
```

## 日志系统

### 创建 LogDeamon 对象

**接口说明**

```java
public LogDaemon(String logDir, int maxfileCount, int fileSizeKB, String prefixName);
```

**参数说明**

| 参数         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| logDir       | 日志路径，如果路径没有创建，日志系统会创建该目录。           |
| maxfileCount | 备份的日志文件个数，不包括当前写的文件。                     |
| fileSizeKB   | 文件大小，当日志文件达到 fileSizeKB 指定大小时，会备份当前文件，如果备份的文件个数达到 maxfileCount 指定的值，则删除最老的一个文件。 |
| prefixName   | 日志文件名，最终生成日志文件 logDir/prefixName.log，备份文件为logDir/prefixName.log.1, logDir/prefixName.log.2... |

**示例代码**

```java
String filePath = getFilesDir().getAbsolutePath();
String logPath = filePath + File.separator + "log";

//logPath/gateawy.log
mLogDaemon = new LogDaemon(logPath, 10,3*1024, "gateway");
```

### 设置日志保存方式

**接口说明**

```java
public void setExpectation(int pid, String tags, boolean seperate)
```

**参数说明**

| 参数     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| pid      | -1：不按照进程抓取日志；正值：要抓取的进程id。               |
| tags     | 设置要抓取的 tag，多个 tag 用英文逗号分开，例如 “TuyaIotGateway,LogDaemon”，抓取Android LOG TAG 为 TuyaIotGateway 和 LogDaemon 的日志。 |
| seperate | 如果要通过 pid 和 tag 抓取日志，seperate 指定是否分开抓取，如果分开抓取，pid 一份 log，tag 一份 log；否则抓取 pid 中指定的 tag 日志。只有 pid 和 tag 同时有效时，该参数才有意义。 |

**示例代码**

- 收集指定进程的全部日志

	抓取本进程的所有日志：

	```java
	mLogDaemon.setExpectation(android.os.Process.myPid(),  null, false);
	mLogDaemon.start();
	```

- 收集指定进程中符合 tag 的日志

	抓取本进程中 tag 为 TuyaIotGateway 和 LogDaemon 的日志：

	```java
	mLogDaemon.setExpectation(android.os.Process.myPid(),  "TuyaIotGateway,LogDaemon", false);
	mLogDaemon.start();
	```

- 收集指定 tag 的日志

	抓取 tag 为 TuyaIotGateway和 LogDaemon 的日志：

	```java
	mLogDaemon.setExpectation(-1,  "TuyaIotGateway,LogDaemon", false);
	mLogDaemon.start();
	```

- 收集指定 pid 的日志和指定 tag 的日志，输出两份日志

	分别抓取本进程所有日志以及 tag 为 TuyaIotGateway 和 LogDaemon 的日志的日志。

	```java
	mLogDaemon.setExpectation(android.os.Process.myPid(),  "TuyaIotGateway,LogDaemon", true);
	mLogDaemon.start();
	```

### 开始日志保存

**接口说明**

```java
public boolean start();
```

### 停止日志保存

**接口说明**

设备退出或者重启 app 进程时，请务必也退出日志系统，因为日志系统内部起了 logcat 进程。

```java
public void stop();
```

### 获取日志文件

**接口说明**

该接口会将日志目录下的所有日志文件打包为一个 zip 文件。

```java
public String getZippedLogFile()；
```

### 日志保存流程

```mermaid
sequenceDiagram
participant APP
participant LogDaemon as Log
APP->Log:new
APP->Log:setExpectation
APP->Log:start
APP->Log:getZippedLogFile
APP->Log:stop
```

## 测试套件

libtestsuit 是封装的 zigBee 测试库，主要给产测工具用，调用方法：

1. 创建 ZigbeeTestSuit.Config 对象，并按说明配置参数。这个 config 和 TuyaIotGateway.Config 基本一致。
2. 注册回调函数 ZigbeeTestSuit.OnTestCompletion
3. 调用 tuyaZigbeeTest 开始测试
4. 在回调函数中检测测试结果，ZigbeeTestSuit.TEST_OK 为测试通过，其它为错误值 ZigbeeTestSuit.TEST_* 之一。

> 参考 demo ./app/src/main/java/com/tuya/smart/android/demo/test/ZigbeeTest.java中的调用方式。

## 语音相关

### 控制状态定义

```java
TuyaIotGateway.VoiceControl.VOICE_MIC_OPEN = 1,		//麦克风开启
TuyaIotGateway.VoiceControl.VOICE_MIC_CLOSE = 2, 	//麦克风关闭
TuyaIotGateway.VoiceControl.VOICE_PLAY = 3,			//播放
TuyaIotGateway.VoiceControl.VOICE_PAUSE = 4,			//暂停
TuyaIotGateway.VoiceControl.VOICE_BT_PLAY_OPEN = 5,	//打开蓝牙
TuyaIotGateway.VoiceControl.VOICE_BT_PLAY_CLOSE = 6,//关闭蓝牙
TuyaIotGateway.VoiceControl.VOICE_PLAY_NEXT = 7,     //下一首
TuyaIotGateway.VoiceControl.VOICE_PLAY_PREV = 8,		//上一首
```

### 语音控制初始化

**接口说明**

```java
void setVoiceCapableCallback(VoiceCapableCallback callback)
```

**参数说明**

| 参数     | 说明         |
| -------- | ------------ |
| callback | 语音能力回调 |

**示例代码**

```java
TuyaIotGateway.getInstance().setVoiceCapableCallback(new VoiceCapableCallback() {

		void onVolume(int volume) {
			 TODO("音量变化回调：volume 音量")
		}
		
		void onControl(int control) {
			 TODO("媒体控制回调: control 媒体控制状态")
		}
		
		void onAlarm(String alarm) {
			 TODO("闹钟回调: alarm 闹钟名称")
		}
	
	}
)
```

### 音量上报

**接口说明**

DP上报音量值，在音量改变的情况下，调用此接口。

```java
int voiceCapableReportVol(int volume)
```

**参数**

| 参数名 | 描述   |
| ------ | ------ |
| volume | 音量值 |

**返回值**

0 : 成功； 其他：失败错误码

**示例代码**

```java
TuyaIotGateway.getInstance().voiceCapableReportVol(0)
```

### 媒体控制上报

**接口说明**

DP上报媒体控制状态，在媒体控制状态改变的情况下，调用此接口。

```java
int voiceCapableReportCtl(int control)
```

**参数**

| 参数名  | 描述         |
| ------- | ------------ |
| control | 媒体控制状态 |

**返回值**

0 : 成功； 其他：失败错误码

**示例代码**

```java
TuyaIotGateway.getInstance().voiceCapableReportCtl(TuyaIotGateway.VoiceControl.VOICE_PLAY);
```

### 语音上报接口

**接口说明**

设备端上报语音数据，依次调用开启、上传、结束接口。

**示例代码**

```java
//开启上传;返回值：0(成功)；其他(失败错误码)
TuyaIotGateway.getInstance().tuyaIotUploadMediaStart();

//上传语音数据；参数buffer 音频数据;返回值：0(成功)；其他(失败错误码)
TuyaIotGateway.getInstance().tuyaIotUploadMedia(byte[] buffer);

//结束上传;返回值：0(成功)；其他(失败错误码)
TuyaIotGateway.getInstance().tuyaIotUploadMediaStop();
```

### 语音服务接口

**接口说明**

设置多媒体数据以及定制数据接收回调，参考 [回调函数](https://github.com/TuyaInc/tuyasmart_android_device_central_sdk/tree/hrs#回调函数) 中的说明。

**示例代码**

```java
TuyaIotGateway.getInstance().setGatewayListener(new TuyaIotGateway.GatewayListener() {
		
		···
		
		void onCloudMedia(TuyaIotGateway.MediaAttribute[] medias) {
			 TODO("接收云端下发tts报文。")
		}
		
		void onCloudCustom(String type, String msgJson) {
			 TODO("客户定制501透传接口函数，具体协议内容由云端与客户制定，并提供说明。")
		}
	}
)
```

#### ATOP透传接口

**接口说明**

```java
ATopResponse atopPost(String api, String version, String postData);
```

**参数说明**

| 参数     | 说明                     |
| -------- | ------------------------ |
| api      | 接口名                   |
| version  | 接口版本                 |
| postData | 上报云端的数据json字符串 |

| 返回值       | 含义                                                         |
| ------------ | ------------------------------------------------------------ |
| ATopResponse | 包含errCode（错误码）和result（请求结果）两个字段。请求正常返回时errCode为0 |

**示例代码**

```java
ATopResponse response = TuyaIotGateway.getInstance().atopPost("tuya.xx.xx", "1.0", "");
if (response.errCode == 0) {
	Log.d(TAG, "result: " + response.result);
}
```

## OTA 升级

### 设置升级回调

**接口说明**

通过 TuyaIotGateway 单例设置回调实现

```java
void setUpgradeCallback(UpgradeEventCallback upgradeCallback);
```

**参数说明**

| 参数            | 说明         |
| --------------- | ------------ |
| upgradeCallback | OTA 事件回调 |

**回调说明**

```java
	public interface UpgradeEventCallback {

    /**
     * sdk 接收到后端的升级推送的时候，会触发此接口 附带升级信息
     * @param version
     */
    void onUpgradeInfo(String version);

    /**
     * 升级文件开始下载
     */
    void onUpgradeDownloadStart();

    /**
     * 升级文件下载进度
     */
    void onUpgradeDownloadUpdate(int progress);

    /**
     * sdk 下载升级文件下载完成触发此接口
     */
    void upgradeFileDownloadFinished(boolean success);

    /**
     * 升级失败
     * @param msg 错误信息
     */
    void onUpgradeFail(String msg);
	}
```

### 上传升级固件

1. 准备 ROM 升级文件 update.zip（非必须）

2. 打升级包 app.apk（必须）

3. 准备版本文件 version.json，内容为：

	```json
		{
			"apkVersion": "1.2.0",  // apk版本号
			"romVersion": "1565694425",   //  系统升级文件版本，升级压缩包的/META-INF/com/android/metadata `post-timestamp`
		}
	```

4. 将上面三个(或两个)文件压缩为 `标识名_OTA_版本号.bin`，例：`test_acs_rk3399-all_OTA_1.0.2.bin`

5. 在固件及版本管理后台上传

6. 在固件升级管理后台添加升级