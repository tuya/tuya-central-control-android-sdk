#  开关 kg

## 获取Device实例

```java
ITuyaVerticalSdk centralControlSdk = TuyaOptimusSdk.getManager(ITuyaVerticalSdk.class);
IDeviceManager deviceManager = centralControlSdk.getDeviceManager();
ITuyaSwitchDevice switchDevice = deviceManager.getSwitchDevice(mDevId);
```



## ITuyaSwitchDevice 接口说明

### 获取所支持的所有的开关和状态

```java
Map<String, Boolean> getSwitches();
```

**参数说明**

| 返回值               | 说明                                       |
| :------------------- | :----------------------------------------- |
| Map<String, Boolean> | String 设备标准指令 ；Boolean 开关当前状态 |



### 获取单个开关的状态

```java
boolean getSwitch(String standCode);
```

**参数说明**

| 返回值  | 说明                   | 参数             | 说明                          |
| :------ | :--------------------- | ---------------- | ----------------------------- |
| boolean | 开关当前状态 true 开着 | String standCode | 对应开关的标准指令 eg。switch |

### 发起设备控制

```java
IControlSwitch operate();
```

**参数说明**

| 返回值         | 说明                                     |
| :------------- | :--------------------------------------- |
| IControlSwitch | 获取设备控制能力的IControlSwitch实例对象 |

 ### 示例代码

```java
mDevice.operate()
	.controlSwitch(code,status)
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



## IControlSwitch 接口说明

###  控制开关的状态

```java
IControlSwitch controlSwitch(String standardCode, boolean status);
```

**参数说明**

| 返回值         | 说明                   | 参数                                | 说明                                       |
| :------------- | :--------------------- | ----------------------------------- | ------------------------------------------ |
| IControlSwitch | 返回当前实例，链式调用 | String standardCode, boolean status | String 设备标准指令 ；Boolean 开关当前状态 |

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

| 返回值              | 说明                       |
| :------------------ | :------------------------- |
| Map<String, Object> | 回标准指令转化后的dp点集合 |

实例代码

```java
//获取控制指令standerdCode standerdCode2的设备dp集合
Map<String, Object> convertDpIds = mDevice.operate()
        .controlSwitch(standerdCode, false)
        .controlSwitch(standerdCode2, true)
        .getConvertDpIds();
        
```



## 设备共有能力参见：

[设备公共能力方法说明 .md](./device_public_ablity_method.md)  



