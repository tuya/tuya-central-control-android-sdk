# 窗帘  cl

## 获取Device实例

```java
ITuyaVerticalSdk centralControlSdk = TuyaOptimusSdk.getManager(ITuyaVerticalSdk.class);
IDeviceManager deviceManager = centralControlSdk.getDeviceManager();
ITuyaCurtainDevice curtainDevice = deviceManager.getCurtainDevice(mDevId);
```

## ITuyaCurtainDevice 接口说明

### 获取窗帘打开位置

```java
@Nullable Integer getCurrentPercent();
```

**参数说明**

| 返回值  | 说明                                     |
| :------ | :--------------------------------------- |
| Integer | 返回当前窗帘打开位置百分比0～100 可能为null，则不支持获取  |

### 获取窗帘打开范围和步长

```java
StandardStepRangeBean getCurtainStepRangBean();
```

**参数说明**

| 返回值                | 说明                                                         |
| :-------------------- | :----------------------------------------------------------- |
| StandardStepRangeBean | 返回包含<br />   String unit;  单位<br />   int min;  最小范围  <br />   int max;  最大范围  <br />   int step;  变化的步长 <br /> 的信息 当max=min=0则数据获取失败 |



### 发起设备控制

```java
ITuyaCurtainDevice operate();
```

**参数说明**

| 返回值             | 说明                                         |
| :----------------- | :------------------------------------------- |
| ITuyaCurtainDevice | 获取设备控制能力的ITuyaCurtainDevice实例对象 |

## ITuyaCurtainDevice接口说明

### 打开窗帘

```java
IControlCurtain openCurtain();
```

**参数说明**

| 返回值          | 说明                              |
| :-------------- | :-------------------------------- |
| IControlCurtain | 返回当前实例，链式调用 ，打开窗帘 |

### 关闭窗帘

```java
IControlCurtain closeCurtain();
```

**参数说明**

| 返回值          | 说明                             |
| :-------------- | :------------------------------- |
| IControlCurtain | 返回当前实例，链式调用，关闭窗帘 |



### 暂停窗帘

```java
IControlCurtain closeCurtain();
```

**参数说明**

| 返回值          | 说明                                       |
| :-------------- | :----------------------------------------- |
| IControlCurtain | 返回当前实例，链式调用，暂定正在移动的窗帘 |

### 控制窗帘位置百分比

```java
IControlCurtain setPercentControl(int percent);
```

**参数说明**

| 返回值          | 说明                   | 参数        | 说明                            |
| :-------------- | :--------------------- | ----------- | ------------------------------- |
| IControlCurtain | 返回当前实例，链式调用 | int percent | 设置窗帘百分比位置  范围 0～100 |



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