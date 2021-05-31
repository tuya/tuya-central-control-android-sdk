<h1>获取设备的标准品类</h1> <span id='title_catgory'></span>

**示例代码**

```java
ITuyaVerticalSdk centralControlSdk = TuyaOptimusSdk.getManager(ITuyaVerticalSdk.class);
IDeviceManager deviceManager = centralControlSdk.getDeviceManager();
//依据mDevId 找到对应设备的 category 
String catgory = deviceManager.getDeviceCategory(mDevId);
//再创建设备实例
ITuyaXXDevice mDevice = deviceManager.getITuyaXXDevice(mDevId)
```



## **品类说明**

| 设备名 | catgory | sdk的实例类接口         |
| :----- | :------ | ----------------------- |
| 开关   | kg      | ITuyaSwitchDevice       |
| 插座   | cz      | ITuyaPlugDevice         |
| 灯具   | dj      | ITuyaLightDevice        |
| 窗帘   | cl      | ITuyaCurtainDevice      |
| 空调   | kt      | ITuyaAirConditionDevice |
| 温控   | wk      | ITuyaFloorHeatingDevice |
| 晾衣架 | lyj     | ITuyaDryingRackDevice   |
| 新风机 | xfj     | ITuyaVentilationDevice  |

**传感类**

| 设备名           | catgory | sdk的实例类接口        |
| :--------------- | :------ | ---------------------- |
| 多能能报警传感器 | dgnbj   | ITuyaSensorDGNBJDevice |
| 门磁传感器       | mcs     | ITuyaSensorMCSDevice   |
| 人体运动传感器   | pir     | ITuyaSensorPIRDevice   |
| 燃气报警传感器   | rqbj    | ITuyaSensorRQBJDevice  |
| 水浸传感器       | sj      | ITuyaSensorSJDevice    |
| SOS传感器        | sos     | ITuyaSensorSOSDevice   |
| 温湿度传感       | wsdcg   | ITuyaSensorWSDCGDevice |

> [!warning]
>
> 如果获取的品类是：
>
> * qt 则不支持垂直化品类控制
> * 其他未支持的品类


<h1>获取指令集，状态集</h1> <span id='title_code'></span>

> [!warning]
>
> 如果 状态集、指令集 都未空，那么该设备无法支持标准指令控制，需要通过自定义设备方式进行控制。
>

### 获取当前设备支持的指令集

**第一种**方法 获取筛选后的所支持的指令集  [参见设备公有能力方法说明1.2部分](./device_public_ablity_method.md#get_standard_code)

**示例代码**

```java
ITuyaVerticalSdk manager = TuyaOptimusSdk.getManager(ITuyaVerticalSdk.class);
IDeviceManager deviceManager = manager.getDeviceManager();
//拿到对应设备Device ITuyaXXDevice
ITuyaXXDevice mDevice = deviceManager.getXXDevice("deviceID");
//获取supportFunctionList
List<String> supportFunctionList = mDevice.getSupportFunctionList();
```

**第二种**方法 直接获取全部的FunctionSchemaBean对象

```java
DeviceBean deviceBean = TuyaHomeSdk.getDataInstance().getDeviceBean(mDevId);
ProductStandardConfig productStandardConfig = TuyaHomeSdk.getDataInstance().getStandardProductConfig(deviceBean.productId);
返回FunctionSchemaBean 对象
List<ProductStandardConfig.FunctionSchemaBean> functionSchemaList = productStandardConfig.functionSchemaList;
```

### 获取当前设备支持的状态集

**第一种**方法 获取筛选后的所支持的状态集  [参见设备公有能力方法说明1.3部分](./device_public_ablity_method.md#get_standard_status)

**示例代码**

```java
ITuyaVerticalSdk manager = TuyaOptimusSdk.getManager(ITuyaVerticalSdk.class);
IDeviceManager deviceManager = manager.getDeviceManager();
//拿到对应设备Device ITuyaXXDevice
ITuyaXXDevice mDevice = deviceManager.getXXDevice("deviceID");
//获取supportStatusList
List<String> supportStatusList = mDevice.getSupportStatusList();
```

**第二种**方法 直接获取全部的StatusSchemaBean对象 

```java
DeviceBean deviceBean = TuyaHomeSdk.getDataInstance().getDeviceBean(mDevId);
ProductStandardConfig productStandardConfig = TuyaHomeSdk.getDataInstance().getStandardProductConfig(deviceBean.productId);
//返回 StatusSchemaBean对象
List<ProductStandardConfig.StatusSchemaBean> statusSchemaList = productStandardConfig.statusSchemaList;
```

 