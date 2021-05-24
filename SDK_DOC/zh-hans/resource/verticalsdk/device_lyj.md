# 晾衣架 lyj

## 获取Device实例

```java
ITuyaVerticalSdk centralControlSdk = TuyaOptimusSdk.getManager(ITuyaVerticalSdk.class);
IDeviceManager deviceManager = centralControlSdk.getDeviceManager();
ITuyaDryingRackDevice dryingRackDevice = deviceManager.getDryingRackDevice(mDevId);
```

## ITuyaDryingRackDevice 接口说明

### 获取开关状态

```java
boolean getPowerSwitch();
```

**参数说明**

| 返回值  | 说明                        |
| :------ | :-------------------------- |
| boolean | 返回设备开关状态，true 开启 |

### 获取消毒状态

```java
boolean getDisinfectionStatus();
```

**参数说明**

| 返回值  | 说明                            |
| :------ | :------------------------------ |
| boolean | 返回设备消毒开关状态，true 开启 |



### 获取风干状态

```java
boolean getWindDryStatus();
```

**参数说明**

| 返回值  | 说明                            |
| :------ | :------------------------------ |
| boolean | 返回设备风干开关状态，true 开启 |





### 获取烘干状态

```java
boolean getHotDryStatus();
```

**参数说明**

| 返回值  | 说明                            |
| :------ | :------------------------------ |
| boolean | 返回设备烘干开关状态，true 开启 |





### 获取灯的开关状态

```java
boolean getLightStatus();
```

**参数说明**

| 返回值  | 说明                          |
| :------ | :---------------------------- |
| boolean | 返回设备灯开关状态，true 开启 |



### 获取当前升降状态

```java
PositionControl getCurrentPositionControlStatus();
```

**参数说明**

| 返回值          | 说明                            |
| :-------------- | :------------------------------ |
| PositionControl | 返回当前设备的升降状态枚举值 包含<br /> UP("up")   上升<br /> DOWN("down")  下降<br /> STOP("stop")   暂停 |



### 获取晾衣架可控制状态

```java
List<PositionControl> getSupportsPositionControl();
```

**参数说明**

| 返回值                    | 说明                                        |
| :------------------------ | :------------------------------------------ |
| List<**PositionControl**> | 返回设备可以控制的状态PositionControl的集合 |



### 获取晾衣架当前的位置 

```java
Integer getCurrentPosition();
```

**参数说明**

| 返回值  | 说明                                         |
| :------ | :------------------------------------------- |
| Integer | 返回当前设备升降位置百分比 可能为null 不支持 |



###  获取晾衣架升降位置范围 步长  

```java
StandardStepRangeBean getPositionRangeBean();
```

**参数说明**

| 返回值                | 说明                                                         |
| :-------------------- | :----------------------------------------------------------- |
| StandardStepRangeBean | 返回包含<br />   String unit;  单位<br />   int min;  最小范围  <br />   int max;  最大范围  <br />   int step;  变化的步长 <br /> 的信息 当max=min=0则数据获取失败|

### 发起设备控制

```java
IControlDryingRack operate();
```

**参数说明**

| 返回值             | 说明                                         |
| :----------------- | :------------------------------------------- |
| IControlDryingRack | 获取设备控制能力的IControlDryingRack实例对象 |

## IControlDryingRack接口说明

### 控制设备开关

```java
IControlDryingRack powerSwitch(boolean enabled);
```

**参数说明**

| 返回值             | 说明                   | 参数            | 说明         |
| :----------------- | :--------------------- | --------------- | ------------ |
| IControlDryingRack | 返回当前实例，链式调用 | boolean enabled | 设备开关状态 |



### 控制消毒模式开关

```java
IControlDryingRack disinfection(boolean enabled);
```

**参数说明**

| 返回值             | 说明                   | 参数            | 说明                 |
| :----------------- | :--------------------- | --------------- | -------------------- |
| IControlDryingRack | 返回当前实例，链式调用 | boolean enabled | 设备消毒模式开关状态 |



### 控制风干模式开关

```java
IControlDryingRack windDry(boolean enabled);
```

**参数说明**

| 返回值             | 说明                   | 参数            | 说明                 |
| :----------------- | :--------------------- | --------------- | -------------------- |
| IControlDryingRack | 返回当前实例，链式调用 | boolean enabled | 设备风干模式开关状态 |



### 控制烘干模式开关

```java
IControlDryingRack hotDry(boolean enabled);
```

**参数说明**

| 返回值             | 说明                   | 参数            | 说明                 |
| :----------------- | :--------------------- | --------------- | -------------------- |
| IControlDryingRack | 返回当前实例，链式调用 | boolean enabled | 设备烘干模式开关状态 |



### 控制设备灯开关

```java
IControlDryingRack light(boolean enabled);
```

**参数说明**

| 返回值             | 说明                   | 参数            | 说明           |
| :----------------- | :--------------------- | --------------- | -------------- |
| IControlDryingRack | 返回当前实例，链式调用 | boolean enabled | 设备灯开关状态 |



### 控制设备升降状态

```java
IControlDryingRack positionControl(PositionControl control);
```

**参数说明**

| 返回值             | 说明                   | 参数                    | 说明         |
| :----------------- | :--------------------- | ----------------------- | ------------ |
| IControlDryingRack | 返回当前实例，链式调用 | PositionControl control | 设备升降状态 |

示例代码

```java
dryingRackDevice.operate()
        .positionControl(PositionControl.UP)//控制上升
        .light(true)//控制灯开启
        .publish(new IResultCallback() {
    @Override
    public void onError(String code, String error) {
        System.out.println("code = " + code + ", error = " + error);
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