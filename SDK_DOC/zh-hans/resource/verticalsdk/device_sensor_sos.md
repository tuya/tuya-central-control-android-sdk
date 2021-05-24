# SOS传感器 sos

## 获取Device实例

```java
ITuyaVerticalSdk centralControlSdk = TuyaOptimusSdk.getManager(ITuyaVerticalSdk.class);
IDeviceManager deviceManager = centralControlSdk.getDeviceManager();
ITuyaSensorSOSDevice sensorSOSDevice = deviceManager.getSensorSOSDevice(mDevId);
```

## ITuyaSensorSOSDevice 接口说明

### 获取紧急模式状态

```java
Boolean getSosState();
```

**参数说明**

| 返回值  | 说明                        |
| :------ | :-------------------------- |
| Boolean | 获取紧急模式状态 |

### 获取设备电池电量状态

```java
String getBatteryState();
```

**参数说明**

| 返回值  | 说明                            |
| :------ | :------------------------------ |
| String | 设备电池电量状态 “low”,“middle”,“high”] |


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
TuyaSensorSOSBuilder operate();
```

**参数说明**

| 返回值             | 说明                                         |
| :----------------- | :------------------------------------------- |
| TuyaSensorSOSBuilder | 获取设备控制能力的 TuyaSensorSOSBuilder 实例对象 |

### 设置紧急模式

```java
TuyaSensorSOSBuilder setSosState(boolean sosState)
```

**参数说明**

| 返回值             | 说明                   | 参数            | 说明                 |
| :----------------- | :--------------------- | --------------- | -------------------- |
| TuyaSensorSOSBuilder | 返回当前实例，链式调用 | boolean sosState | 紧急模式状态 |

示例代码

```java
sensorSOSDevice.operate()
                .setSosState(true)
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