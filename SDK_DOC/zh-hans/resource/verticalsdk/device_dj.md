# 灯具类控制 dj

## 获取Device实例

```java
ITuyaVerticalSdk centralControlSdk = TuyaOptimusSdk.getManager(ITuyaVerticalSdk.class);
IDeviceManager deviceManager = centralControlSdk.getDeviceManager();
ITuyaLightDevice lightDevice = deviceManager.getLightDevice(mDevId);
```

## ITuyaLightDevice 接口介绍

### 获取当前灯具备的功能（几路灯） 

```java
LightType getLightType();
```

**参数说明**

| 返回值         | 说明                                     |
| :------------- | :--------------------------------------- |
| LightType | 获取当前是几路灯（是依据灯支持的照明功能分类）并且根据等选择不同的支持模式 |
| **灯类型枚举值** | **说明** |
| TYPE_C | 白光灯（一路灯），dpCode：bright_value <br />支持的工作模式为 LightMode#MODE_WHITE 白光模式 |
| TYPE_CW | 白光+冷暖（二路灯），dpCode：bright_value + temp_value<br /> 支持的工作模式为 LightMode#MODE_WHITE 白光模式 |
| TYPE_RGB | RGB（三路灯），dpCode：colour_data<br />支持的工作模式为  LightMode#MODE_COLOUR  彩光模式  <br /> LightMode#MODE_SCENE 情景模式 |
| TYPE_RGBC | 白光+RGB（四路灯），dpCode：bright_value + colour_data <br />支持的工作模式为 全都支持：LightMode#MODE_WHITE 白光模式； LightMode#MODE_COLOUR  彩光模式  ；LightMode#MODE_SCENE 情景模式 |
| TYPE_RGBCW | 白光+冷暖+RGB（五路灯），dpCode：bright_value + temp_value + colour_data <br /> 支持的工作模式为 全都支持：LightMode#MODE_WHITE 白光模式； LightMode#MODE_COLOUR  彩光模式  ；  LightMode#MODE_SCENE 情景模式 |



### 获取灯LightDataPoint数据

```java
LightDataPoint getLightDataPoint();
```

**参数说明**

| 返回值         | 说明                                                         |
| :------------- | :----------------------------------------------------------- |
| LightDataPoint | 包含<br /> boolean powerSwitch  开关状态<br /> **LightMode** workMode  工作模式 枚举<br /> int  brightness 亮度百分比值 从1～100 步长1<br /> int  colorTemperature 色温百分比值 从1～100 步长1<br /> **LightColourData ** colorHSV 颜色值<br /> **LightScene** scene  彩灯的情景模式 |

**补充参数说明**

| 数据类型        | 说明                                                         |
| :-------------- | :----------------------------------------------------------- |
| LightMode       | 枚举类型 包含<br /> MODE_WHITE("white") 白光模式<br /> MODE_COLOUR("colour") 彩光模式<br /> MODE_SCENE("scene") 情景模式 |
| LightColourData | 包含HSV <br /> h ：色调，hue，取值范围0-360<br /> s ：饱和度，saturation，取值范围0-100<br /> v ：明度，value，取值范围0-100 |
| LightScene      | 枚举类型 情景模式 包含<br />  SCENE_GOODNIGHT  晚安情景<br />  SCENE_WORK 工作情景；<br />  SCENE_READ   阅读情景； <br />  SCENE_CASUAL 休闲情景； |



### 获取当前灯支持的工作模式

```java
List<LightMode> getSupportWorkMode();
```

**参数说明**

| 返回值              | 说明                                                 |
| :------------------ | :--------------------------------------------------- |
| List<**LightMode**> | 依据当前灯的类型（属于几路灯）返回支持的工作模式集合 |

### 获取所支持的场景集合

```java
List<LightScene> getSupportLightScene();
```

**参数说明**

| 返回值               | 说明                                                         |
| :------------------- | :----------------------------------------------------------- |
| List<**LightScene**> | 返回**固定的**包含 <br />  SCENE_GOODNIGHT  晚安情景<br />  SCENE_WORK 工作情景；<br />  SCENE_READ   阅读情景； <br />  SCENE_CASUAL 休闲情景四种场景的的集合 |

### 发起设备控制

```java
IControlLight operate();
```

**参数说明**

| 返回值        | 说明                                    |
| :------------ | :-------------------------------------- |
| IControlLight | 获取设备控制能力的IControlLight实例对象 |

## IControlLight接口说明

### 控制灯开关

```java
IControlLight powerSwitch(boolean status);
```

**参数说明**

| 返回值        | 说明                   | 参数           | 说明           |
| :------------ | :--------------------- | -------------- | -------------- |
| IControlLight | 返回当前实例，链式调用 | boolean status | 控制的开关状态 |

### 控制切换工作模式

```java
IControlLight workMode(LightMode mode);
```

**参数说明**

| 返回值        | 说明                   | 参数           | 说明                    |
| :------------ | :--------------------- | -------------- | ----------------------- |
| IControlLight | 返回当前实例，链式调用 | LightMode mode | 对应的LightMode工作模式 |



### 控制灯的亮度值

```java
IControlLight brightness(int percent);
```

**参数说明**

| 返回值        | 说明                   | 参数        | 说明                          |
| :------------ | :--------------------- | ----------- | ----------------------------- |
| IControlLight | 返回当前实例，链式调用 | int percent | 亮度的百分比值，取值范围0-100 |



### 控制灯的色温值

```java
IControlLight colorTemperature(int percent);
```

**参数说明**

| 返回值        | 说明                   | 参数        | 说明                          |
| :------------ | :--------------------- | ----------- | ----------------------------- |
| IControlLight | 返回当前实例，链式调用 | int percent | 色温的百分比值，取值范围0-100 |



### 控制灯的颜色值

```java
IControlLight colorHSV(int hue, int saturation, int value);
```

**参数说明**

| 返回值        | 说明                   | 参数                                            | 说明                                                         |
| :------------ | :--------------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| IControlLight | 返回当前实例，链式调用 | int hue, <br /> int saturation,<br /> int value | hue          色调 （范围：0-360）<br />  saturation 饱和度（范围：0-100）<br />  value        明度（范围：0-100） |

**示例代码**

```java
//控制灯的颜色值
lightDevice.operate()
	.colorHSV(20,200,200).publish(new IResultCallback() {
    @Override
    public void onError(String code, String error) {
        System.out.println("code = " + code + ", error = " + error);
    }

    @Override
    public void onSuccess() {

    }
});
```



### 控制灯的场景切换

```java
IControlLight lightScene(LightScene lightScene);
```

**参数说明**

| 返回值        | 说明                   | 参数                  | 说明                                           |
| :------------ | :--------------------- | --------------------- | ---------------------------------------------- |
| IControlLight | 返回当前实例，链式调用 | LightScene lightScene | 当前灯的情景模式切换  LightScene对应的情景模式 |



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