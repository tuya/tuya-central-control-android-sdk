# 温控器 wk

## 获取Device实例

```java
ITuyaVerticalSdk centralControlSdk = TuyaOptimusSdk.getManager(ITuyaVerticalSdk.class);
IDeviceManager deviceManager = centralControlSdk.getDeviceManager();
ITuyaFloorHeatingDevice floorHeatingDevice = deviceManager.getFloorHeatingDevice(mDevId);
```

## ITuyaFloorHeatingDevice接口说明

### 获取当前开关状态

```java
boolean getSwitch();
```

**参数说明**

| 返回值  | 说明                   |
| :------ | :--------------------- |
| boolean | 返回开关状态 true 开启 |

### 获取当前室内温度

```java
@Nullable Integer getIndoorTemp();
```

**参数说明**

| 返回值  | 说明                                       |
| :------ | :----------------------------------------- |
| Integer | 返回当前室内的温度 可能为null 则不支持获取 |



### 获取控制面板设置的温度

```java
Integer getPanelTempSet();
```

**参数说明**

| 返回值  | 说明                                           |
| :------ | :--------------------------------------------- |
| Integer | 返回控制面板设置的温度 可能为null 则不支持获取 |

### 获取设备温度控制范围步长和单位

```java
StandardStepRangeBean getTempRangeBean();
```

**参数说明**

| 返回值                | 说明                                                         |
| :-------------------- | :----------------------------------------------------------- |
| StandardStepRangeBean | 返回包含<br />   String unit;  单位<br />   int min;  最小范围  <br />   int max;  最大范围  <br />   int step;  变化的步长 <br /> 的信息 当max=min=0则数据获取失败 |



### 获取当前设置的工作模式

```java
FloorHeatingMode getCurrentMode();
```

**参数说明**

| 返回值           | 说明                                                         |
| :--------------- | :----------------------------------------------------------- |
| FloorHeatingMode | FloorHeatingMode 枚举值 返回当前设备工作模式 包含<br /> AUTO("auto"), COLD("cold"), HOT("hot"), WIND("wind"), COMFORTABLE("comfortable"), ENERGY("energy"), HOLIDAY("holiday"), ECO("eco"), MANUAL("manual"), SLEEP("sleep"), DRY("dry"), PROGRAM("program"), FLOOR_HEAT("floor_heat"), AUXILIARY_HEAT("auxiliary_heat"); |



### 获取当前设备所支持的工作模式

```java
List<FloorHeatingMode> getSupportModeList();
```

**参数说明**

| 返回值                     | 说明                                       |
| :------------------------- | :----------------------------------------- |
| List<**FloorHeatingMode**> | 返回设备支持的工作模式FloorHeatingMode集合 |



### 发起设备控制

```java
IControlFloorHeating operate();
```

**参数说明**

| 返回值               | 说明                                           |
| :------------------- | :--------------------------------------------- |
| IControlFloorHeating | 获取设备控制能力的IControlFloorHeating实例对象 |



## IControlFloorHeating 接口说明

### 设置温度

```java
IControlFloorHeating commandTempSet(int temp);
```

**参数说明**

| 返回值               | 说明                   | 参数     | 说明                     |
| :------------------- | :--------------------- | -------- | ------------------------ |
| IControlFloorHeating | 返回当前实例，链式调用 | int temp | 温度值，要温度范围和步长 |



### 工作模式设置

```java
IControlFloorHeating commandMode(FloorHeatingMode mode);
```

**参数说明**

| 返回值               | 说明                   | 参数                  | 说明                            |
| :------------------- | :--------------------- | --------------------- | ------------------------------- |
| IControlFloorHeating | 返回当前实例，链式调用 | FloorHeatingMode mode | 支持的FloorHeatingMode 工作模式 |



### 开关控制

```java
IControlFloorHeating commandSwitch(boolean enabled);
```

**参数说明**

| 返回值               | 说明                   | 参数            | 说明                 |
| :------------------- | :--------------------- | --------------- | -------------------- |
| IControlFloorHeating | 返回当前实例，链式调用 | boolean enabled | 设备开关， true 打开 |

### 

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



