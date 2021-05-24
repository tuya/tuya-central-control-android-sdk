# 插座 cz

## 获取Device实例

```java
ITuyaVerticalSdk centralControlSdk = TuyaOptimusSdk.getManager(ITuyaVerticalSdk.class);
IDeviceManager deviceManager = centralControlSdk.getDeviceManager();
ITuyaPlugDevice plugDevice = deviceManager.getSinglePlugDevice(mDevId);
```



##  ITuyaPlugDevice 接口说明

### 获取默认单插的插座状态

```java
boolean getSwitchStatus();
```

**参数说明**

| 返回值  | 说明                           |
| :------ | :----------------------------- |
| boolean | 返回插座开关状态 true 开启状态 |



### 获取指定插座接口状态

```java
boolean getSwitchStatus(String standCode);
```

**参数说明**

| 返回值  | 说明                               | 参数             | 说明               |
| :------ | :--------------------------------- | ---------------- | ------------------ |
| boolean | 返回指定插座开关状态 true 开启状态 | String standCode | 指定插座的标准指令 |

### 发起设备控制

```java
IControlSinglePlug operate();
```

**参数说明**

| 返回值             | 说明                                         |
| :----------------- | :------------------------------------------- |
| IControlSinglePlug | 获取设备控制能力的IControlSinglePlug实例对象 |



## IControlSinglePlug 接口说明

### 发送控制命令

```java
void publish(IResultCallback resultCallback);
```

**参数说明**

| 返回值          | 说明         |
| :-------------- | :----------- |
| IResultCallback | 发送结果回调 |



### 控制默认单插插座开关的状态

```java
IControlSinglePlug controlSinglePlug(boolean status);
```

**参数说明**

| 返回值             | 说明                   | 参数           | 说明     |
| :----------------- | :--------------------- | -------------- | -------- |
| IControlSinglePlug | 返回当前实例，链式调用 | boolean status | 开关状态 |



### 控制指定插座开关的状态

```java
IControlSinglePlug controlPlug(String standCode, boolean status);
```

**参数说明**

| 返回值             | 说明                   | 参数                                   | 说明                                                 |
| :----------------- | :--------------------- | -------------------------------------- | ---------------------------------------------------- |
| IControlSinglePlug | 返回当前实例，链式调用 | String standCode<br />  boolean status | standCode 对应的标准指令<br /> status 控制的开关状态 |

示例代码

```java
 
//发送插座控制指令
plugDevice.operate()
        .controlPlug("switch", true)
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



### 获取控制指令转换后的dps

```java
Map<String, Object> getConvertDpIds();
```

**参数说明**

| 返回值              | 说明                         |
| :------------------ | :--------------------------- |
| Map<String, Object> | 返回标准指令转化后的dp点集合 |

示例代码

```java
//获取标准指令转化后的dp点集合
Map<String, Object> convertDpIds = mDevice.operate()
        .controlPlug(standerdCode, false)
        .controlPlug(standerdCode2, true)
        .getConvertDpIds();
        
String dps = JSONObject.toJSONString(convertDpIds);
mDevice.publishDps(dps, resultCallback);//发送控制指令
```



## 设备共有能力参见：

[设备公共能力方法说明 .md](./device_public_ablity_method.md)  

