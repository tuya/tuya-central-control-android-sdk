# 新风机 xfj

## 获取Device实例

```java
ITuyaVerticalSdk centralControlSdk = TuyaOptimusSdk.getManager(ITuyaVerticalSdk.class);
IDeviceManager deviceManager = centralControlSdk.getDeviceManager();
ITuyaVentilationDevice ventilationDevice = deviceManager.getVentilationDevice();
```



## ITuyaVentilationDevice 接口说明

### 开关控制

```java
boolean getSwitch();
```

**参数说明**

| 返回值  | 说明         |
| :------ | :----------- |
| boolean | 返回开关状态 |

### 获取室内问题

```java
@Nullable Integer getTempIndoor();
```

**参数说明**

| 返回值  | 说明                             |
| :------ | :------------------------------- |
| Integer | 返回当前 室内的温度 null则不支持 |

### 获取室内湿度

```java
@Nullable Integer getHumidityIndoor();
```

**参数说明**

| 返回值  | 说明                             |
| :------ | :------------------------------- |
| Integer | 返回当前 室内的温度 null则不支持 |

### 获取当前的工作模式

```java
VentilationMode getCurrentMode();
```

**参数说明**

| 返回值          | 说明                                                         |
| :-------------- | :----------------------------------------------------------- |
| VentilationMode | 枚举类型包含 <br /> AUTO("auto") 自动模式<br /> SLEEP("sleep") 睡眠模式<br /> MANUAL("manual"); 智能模式<br /> 返回当前的工作模式 |



### 获取当前产品支持的工作模式

```java
@Nullable  List<VentilationMode> getSupportModeList();
```

**参数说明**

| 返回值                    | 说明                                       |
| :------------------------ | :----------------------------------------- |
| List<**VentilationMode**> | 返回设备支持的 VentilationMode工作模式集合 |

### 获取当前风速

```java
@Nullable VentilationFanSpeed getCurrentFanSpeed();
```

**参数说明**

| 返回值              | 说明                                                         |
| :------------------ | :----------------------------------------------------------- |
| VentilationFanSpeed | 枚举类型 包含<br /> LOW("low"), MID("mid"), MIDDLE("middle"), MEDIUM("medium"), HIGH("high"), SLEEP("sleep");<br /> 返回当前的风速 |

### 获取当前设备支持的所有的标准的风速模式

```java
@Nullable List<VentilationFanSpeed> getSupportFanSpeedList();
```

**参数说明**

| 返回值                        | 说明                                            |
| :---------------------------- | :---------------------------------------------- |
| List<**VentilationFanSpeed**> | 返回设备支持的 VentilationFanSpeed 风速调节集合 |

## 发起设备控制

```java
IControlVentilation operate();
```

**参数说明**

| 返回值              | 说明                                          |
| :------------------ | :-------------------------------------------- |
| IControlVentilation | 获取设备控制能力的IControlVentilation实例对象 |



## IControlVentilation 接口说明

### 控制开关

```java
IControlVentilation commandSwitch(boolean enabled);
```

**参数说明**

| 返回值              | 说明                   | 参数            | 说明         |
| :------------------ | :--------------------- | --------------- | ------------ |
| IControlVentilation | 返回当前实例，链式调用 | boolean enabled | 设备开关状态 |

### 切换到下一等级的风速

```java
IControlVentilation commandNextFanSpeed();
```

**参数说明**

| 返回值              | 说明                   |
| :------------------ | :--------------------- |
| IControlVentilation | 返回当前实例，链式调用 |

### 控制风速

```java
IControlVentilation commandFanSpeed(VentilationFanSpeed mode);
```

**参数说明**

| 返回值              | 说明                   | 参数                     | 说明                              |
| :------------------ | :--------------------- | ------------------------ | --------------------------------- |
| IControlVentilation | 返回当前实例，链式调用 | VentilationFanSpeed mode | 对应VentilationFanSpeed设置的风速 |

**示例代码**

```java
ventilationDevice.operate()
				//控制当前风速 LOW
        .commandFanSpeed(VentilationFanSpeed.LOW)
        //控制当前工作模式 AUTO
        .commandMode(VentilationMode.AUTO)
        // 发送
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

### 设置工作模式

```java
IControlVentilation commandMode(VentilationMode mode);
```

**参数说明**

| 返回值              | 说明                   | 参数                 | 说明                                |
| :------------------ | :--------------------- | -------------------- | ----------------------------------- |
| IControlVentilation | 返回当前实例，链式调用 | VentilationMode mode | 对应 VentilationMode 设置的工作模式 |

## 发送控制命令

```java
void publish(IResultCallback resultCallback);
```

**参数说明**

| 返回值          | 说明         |
| :-------------- | :----------- |
| IResultCallback | 发送结果回调 |

## 获取控制指令转换后的dps

```java
Map<String, Object> getConvertDpIds();
```

**参数说明**

| 返回值              | 说明                         |
| :------------------ | :--------------------------- |
| Map<String, Object> | 返回标准指令转化后的dp点集合 |



## 设备共有能力参见：

[设备公共能力方法说明 .md](./device_public_ablity_method.md)  