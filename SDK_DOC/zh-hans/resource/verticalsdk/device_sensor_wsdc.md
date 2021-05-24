# 温湿度传感器 wsdc

## 获取Device实例

```java
ITuyaVerticalSdk centralControlSdk = TuyaOptimusSdk.getManager(ITuyaVerticalSdk.class);
IDeviceManager deviceManager = centralControlSdk.getDeviceManager();
ITuyaSensorWSDCDevice sensorWSDCDevice = deviceManager.getSensorWSDCDevice(mDevId);
```

## ITuyaSensorWSDCDevice 接口说明

### 获取当前温度值

```java
Double getVaTemperature()
```

**参数说明**

| 返回值  | 说明                        |
| :------ | :-------------------------- |
| Double | 获取当前温度值 |

### 获取当前湿度值

```java
Double getVaHumidity()
```

**参数说明**

| 返回值  | 说明                        |
| :------ | :-------------------------- |
| Double | 获取当前湿度值 |



### 获取设备电池电量状态

```java
String getBatteryState();
```

**参数说明**

| 返回值  | 说明                            |
| :------ | :------------------------------ |
| String | 设备电池电量状态 “low”,“middle”,“high”] |


### 获取电池电量值

```java
Double getBatteryValue();
```

**参数说明**

| 返回值  | 说明                            |
| :------ | :------------------------------ |
| Double | 获取电池电量值 |

### 获取电池电量

```java
Double getBattery();
```

**参数说明**

| 返回值  | 说明                            |
| :------ | :------------------------------ |
| Double | 获取电池电量值 |

### 获取设备电池电量百分比

```java
Double getBatteryPercentage();
```

**参数说明**

| 返回值  | 说明                            |
| :------ | :------------------------------ |
| double | 设备电池电量;默认 0 |


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

