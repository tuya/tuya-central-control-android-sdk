#  空调 kt

获取Device实例

```java
ITuyaVerticalSdk centralControlSdk = TuyaOptimusSdk.getManager(ITuyaVerticalSdk.class);
IDeviceManager deviceManager = centralControlSdk.getDeviceManager();
ITuyaAirConditionDevice airConditionDevice = deviceManager.getAirConditionDevice(mDevId);
```

## ITuyaCurtainDevice 接口说明

### 获取当前空调温度

```java
int getCurrentTemperature();
```

**参数说明**

| 返回值 | 说明               |
| :----- | :----------------- |
| int    | 返回空调设置的温度 |



### 获取空调的温度控制范围步长

```java
StandardStepRangeBean getTempRangBean();
```

**参数说明**

| 返回值                | 说明                                                         |
| :-------------------- | :----------------------------------------------------------- |
| StandardStepRangeBean | 返回包含<br />   String unit;  单位<br />   int min;  最小范围  <br />   int max;  最大范围  <br />   int step;  变化的步长 <br /> 的信息 当max=min=0则数据获取失败 |



### 获取摆风模式

```java
SwingType getCurrentSwingType();
```

**参数说明**

| 返回值    | 说明                                                         |
| :-------- | :----------------------------------------------------------- |
| SwingType | 返回当前空调摆风模式<br /> SWING_HORIZONTAL = 0;//水平<br /> SWING_VERTICAL = 1;//垂直 <br /> SWING_NONE = 2; //不支持<br /> SWING_BOTH = 3;// 都支持<br /> boolean horizontalEnabled <br /> boolean verticalEnabled; |



### 获取当前设置的工作模式

```java
FanMode getCurrentFanMode();
```

**参数说明**

| 返回值  | 说明                                                         |
| :------ | :----------------------------------------------------------- |
| FanMode | 枚举类型 返回空调当前设置的工作模式<br /> 目前提供的主要有： AUTO("auto"), COLD("cold"), HOT("hot"), WET("wet"), WIND("wind"), ECO("eco"),   FLOOR_HEAT("floor_heat"), FLOOR_HEAT_AND_HEAT("floor_heat_and_heat"), UNKNOWN("unknow"); 模式 |



### 获取空调所有支持的工作模式

```java
List<FanMode> getSupportMode();
```

**参数说明**

| 返回值            | 说明                             |
| :---------------- | :------------------------------- |
| List<**FanMode**> | 返回空调当前支持的的工作模式集合 |



### 获取空调开关状态

```java
boolean getPowerSwitch();
```

**参数说明**

| 返回值  | 说明                 |
| :------ | :------------------- |
| boolean | 返回当前空调开关状态 |



### 获取当前设置的风速

```java
FanSpeed getCurrentFanSpeed();
```

**参数说明**

| 返回值   | 说明                                                         |
| :------- | :----------------------------------------------------------- |
| FanSpeed | 枚举类型  返回空调当前的风速大小 <br /> 目前提供的风速主要有：AUTO("auto"), LOW("low"), MIDDLE("middle"), MID("mid"), MEDIUM("medium"), HIGH("high"), STRONG("strong"), UNKNOWN("unknow"), |



### 获取当前支持的风速调节类型

```java
List<FanSpeed> getSupportFanSpeeds();
```

**参数说明**

| 返回值             | 说明                             |
| :----------------- | :------------------------------- |
| List<**FanSpeed**> | 返回空调当前支持的的风速模式集合 |



### 发起设备控制

```java
IControlAirCondition operate();
```

**参数说明**

| 返回值               | 说明                                           |
| :------------------- | :--------------------------------------------- |
| IControlAirCondition | 获取设备控制能力的IControlAirCondition实例对象 |



## IControlAirCondition接口说明

### 控制空调开关

```java
IControlAirCondition powerSwitch(boolean status);
```

**参数说明**

| 返回值               | 说明                   | 参数           | 说明     |
| :------------------- | :--------------------- | -------------- | -------- |
| IControlAirCondition | 返回当前实例，链式调用 | boolean status | 开关状态 |

### 控制温度

```java
IControlAirCondition setTemperature(int temperature);
```

**参数说明**

| 返回值               | 说明                   | 参数            | 说明       |
| :------------------- | :--------------------- | --------------- | ---------- |
| IControlAirCondition | 返回当前实例，链式调用 | int temperature | 设置的温度 |

**示例代码**

```java
//设置空调温度为20度
airConditionDevice.operate()
        .setTemperature(20).publish(new IResultCallback() {
    @Override
    public void onError(String code, String error) {
        System.out.println("code = " + code + ", error = " + error);
    }

    @Override
    public void onSuccess() {
    }
});
```



### 控制风速

```java
IControlAirCondition switchFanSpeed(FanSpeed speed);
```

**参数说明**

| 返回值               | 说明                   | 参数           | 说明     |
| :------------------- | :--------------------- | -------------- | -------- |
| IControlAirCondition | 返回当前实例，链式调用 | FanSpeed speed | 风速等级 |

### 设置工作模式

```java
IControlAirCondition switchMode(FanMode mode);
```

**参数说明**

| 返回值               | 说明                   | 参数         | 说明     |
| :------------------- | :--------------------- | ------------ | -------- |
| IControlAirCondition | 返回当前实例，链式调用 | FanMode mode | 工作模式 |



### 控制垂直方向的摆风

```java
IControlAirCondition switchHorizontal(boolean enabled);
```

**参数说明**

| 返回值               | 说明                   | 参数            | 说明                                         |
| :------------------- | :--------------------- | --------------- | -------------------------------------------- |
| IControlAirCondition | 返回当前实例，链式调用 | boolean enabled | true 设置成垂直方向<br /> false 取消垂直方向 |



### 控制水平方向的摆风

```java
IControlAirCondition switchHorizontal(boolean enabled);
```

**参数说明**

| 返回值               | 说明                   | 参数            | 说明                                         |
| :------------------- | :--------------------- | --------------- | -------------------------------------------- |
| IControlAirCondition | 返回当前实例，链式调用 | boolean enabled | true 设置成水平方向<br /> false 取消水平方向 |



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