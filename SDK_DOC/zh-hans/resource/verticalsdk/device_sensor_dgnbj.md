# 多功能报警传感器 dgnbj

## 获取Device实例

```java
ITuyaVerticalSdk centralControlSdk = TuyaOptimusSdk.getManager(ITuyaVerticalSdk.class);
IDeviceManager deviceManager = centralControlSdk.getDeviceManager();
ITuyaSensorDGNBJDevice sensorDGNBJDevice = deviceManager.getSensorDGNBJDevice(mDevId);
```

## ITuyaSensorDGNBJDevice 接口说明

### 获取设备报警开关状态

```java
boolean getPowerSwitch();
```

**参数说明**

| 返回值  | 说明                        |
| :------ | :-------------------------- |
| boolean | 返回设备报警开关状态，true 开启 |

### 获取设备电池电量状态

```java
String getBatteryState();
```

**参数说明**

| 返回值  | 说明                            |
| :------ | :------------------------------ |
| String | 设备 电池电量状态 “low”,“middle”,“high”] |

### 获取设备电池电量百分比

```java
Double getBatteryPercentage();
```

**参数说明**

| 返回值  | 说明                            |
| :------ | :------------------------------ |
| double | 设备电池电量;默认 0 |


### 发起设备控制

```java
TuyaSensorDGNBJBuilder operate();
```

**参数说明**

| 返回值             | 说明                                         |
| :----------------- | :------------------------------------------- |
| TuyaSensorDGNBJBuilder | 获取设备控制能力的 TuyaSensorDGNBJBuilder 实例对象 |

## TuyaSensorDGNBJBuilder 接口说明

### 设置设备自检

```java
TuyaSensorDGNBJBuilder setSelfChecking(boolean selfChecking);
```

**参数说明**

| 返回值                 | 说明                   | 参数                 | 说明     |
| :--------------------- | :--------------------- | -------------------- | -------- |
| TuyaSensorDGNBJBuilder | 返回当前实例，链式调用 | boolean selfChecking | 设备自检 |


### 设置报警开关

```java
TuyaSensorDGNBJBuilder setAlarmSwitch(boolean alarmSwitch);
```

**参数说明**

| 返回值             | 说明                   | 参数            | 说明                 |
| :----------------- | :--------------------- | --------------- | -------------------- |
| TuyaSensorDGNBJBuilder | 返回当前实例，链式调用 | boolean alarmSwitch | 报警开关 |



### 设置消音开关

```java
TuyaSensorDGNBJBuilder setMuffling(boolean muffling)
```

**参数说明**

| 返回值             | 说明                   | 参数            | 说明                 |
| :----------------- | :--------------------- | --------------- | -------------------- |
| TuyaSensorDGNBJBuilder | 返回当前实例，链式调用 | boolean muffling | 消音开关 |

### 设置主机模式

```java
TuyaSensorDGNBJBuilder setMasterMode(String masterMode)
```

**参数说明**

| 返回值             | 说明                   | 参数            | 说明                 |
| :----------------- | :--------------------- | --------------- | -------------------- |
| TuyaSensorDGNBJBuilder | 返回当前实例，链式调用 | String masterMode | 主机模式 “disarmed”,“arm”,“home”,“sos” |

### 设置报警音量

```java
TuyaSensorDGNBJBuilder setAlarmVolume(String alarmVolume);
```

**参数说明**

| 返回值             | 说明                   | 参数            | 说明           |
| :----------------- | :--------------------- | --------------- | -------------- |
| TuyaSensorDGNBJBuilder | 返回当前实例，链式调用 | String alarmVolume | 报警音量 “low”,“middle”,“high”,“mute” |

### 设置报警铃声

```
TuyaSensorDGNBJBuilder setAlarmRingtone(String alarmRingtone);
```

**参数说明**

| 返回值             | 说明                   | 参数                    | 说明         |
| :----------------- | :--------------------- | ----------------------- | ------------ |
| TuyaSensorDGNBJBuilder | 返回当前实例，链式调用 | String alarmRingtone | 报警铃声  “1”,“2”,“3”,“4”,“5” |

示例代码

```java
sensorDGNBJDevice.operate()
                .setAlarmRingtone("1")
                .setMuffling(true)
                .publish(new IResultCallback() {
                    @Override
                    public void onError(String code, String error) {
                        
                    }

                    @Override
                    public void onSuccess() {

                    }
                });
```



### 发送控制命令

```java
void publish(IResultCallback resultCallback);
```

**参数说明**

| 返回值          | 说明         |
| :-------------- | :----------- |
| IResultCallback | 发送结果回调 |

### 获取控制指令转换后的dps

```java
Map<String, Object> getConvertDpIds();
```

**参数说明**

| 返回值              | 说明                         |
| :------------------ | :--------------------------- |
| Map<String, Object> | 返回标准指令转化后的dp点集合 |



## 设备共有能力参见：

[设备公共能力方法说明 .md](./device_public_ablity_method.md)  