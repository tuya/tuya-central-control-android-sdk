# 设备公有能力方法说明 



## IDevice接口说明

<h2>获取当前设备所支持的标准指令集 </h2> <span id='get_standard_code'></span>
**标准指令集**是设备可下发的控制功能指令集合。以产品类别区分，具体产品支持的控制指令是该类产品标准指令集的子集 {@see https://developer.tuya.com/cn/docs/iot/standarddescription?id=K9i5ql6waswzq  }

```java
List<String> getSupportFunctionList()；
```

**参数说明**

| 返回值           | 说明                               |
| :--------------- | :--------------------------------- |
| List<**String**> | 返回所支持的标准指令的标准Code集合 |



<h2>获取当前设备所支持的标准状态集 </h2> <span id='get_standard_status'></span>

**标准状态集**是设备可上报的功能状态集合。以产品类别区分，具体产品支持的功能状态是该类产品标准状态集的子集。{@see https://developer.tuya.com/cn/docs/iot/standarddescription?id=K9i5ql6waswzq  }

 ```java
   List<String> getSupportStatusList();
 ```

**参数说明**

| 返回值           | 说明                                 |
| :--------------- | :----------------------------------- |
| List<**String**> | 返回所支持的标准状态集的标准Code集合 |



## 判读是否是标准设备

```java
boolean isStandDevice();
```

**参数说明**

| 返回值  | 说明                                   |
| :------ | :------------------------------------- |
| boolean | true 标准设备 在标准指令集中定义的设备 |



## 发送标准指令

```java
void publishCommands(Map<String, Object> commands, IResultCallback resultCallback);
```

**参数说明**

| 参数           | 说明                                                         |
| :------------- | :----------------------------------------------------------- |
| commands       | Map<String, Object>   key是标准指令Code ，value 是 设定的值 eg.  switch:false ; switch_1:true |
| resultCallback | 发送结果回调                                                 |

**示例代码**

```java
mDevice.publishCommands(commands, new IResultCallback() {
     @Override
     public void onError(String code, String error) {
         System.out.println("code = " + code + ", error = " + error);
     }

     @Override
     public void onSuccess() {
         System.out.println("onSuccess");
     }
 });
```



## 发送设备功能点 dps（dataPoints）指令

```java
void publishDps(String dps, IResultCallback resultCallback);
```

**参数说明**

| 参数            | 说明                                                         |
| :-------------- | :----------------------------------------------------------- |
| String dps      | data points, 设备功能点，格式为 json 字符串 eg.  "{\"101\": true}"  为布尔型功能点示例 作用:开关打开 |
| IResultCallback | 发送结果回调                                                 |

示例代码

```java
//获取设备的dps 第一种方式
Map<String, Object> convertDpIds = mDevice.operate()
        .controlSwitch(standerdCode, false)
        .controlSwitch(standerdCode2, true)
        .getConvertDpIds();
String dps = JSONObject.toJSONString(convertDpIds);
mDevice.publishDps(dps,resultCallback); //发送控制指令

//获取设备的dps 第二种方式
 HashMap<String, Object> commands = new HashMap<>();
 commands.put("switch_1", true);
 commands.put("switch_2", true);
 //直接将标准指令转化成设备的dps
 String dps2 = mDevice.convertCodeToIdStr(commands);
 mDevice.publishDps(dps2,resultCallback); //发送控制指令
```



## 注册设备变化监听

```java
void registerDeviceListener(OnDeviceListener listener);
```

**参数说明**

| 参数             | 说明                     |
| :--------------- | :----------------------- |
| OnDeviceListener | 设备一系列状态变化的监听 |

## OnDeviceListener接口说明

| 方法名                                      | 参数                                                         | 说明                                               |
| :------------------------------------------ | :----------------------------------------------------------- | -------------------------------------------------- |
| onDpUpdate(String devId ,DpUpdateBean bean) | String devId  设备id <br />DpUpdateBean 包含原始返回的dps和转化后的标准Code的集合 | 设备dp点变化回调。所有的指令上报操作都会触发该回调 |
| onRemoved()                                 |                                                              | 当设备被移除后回调                                 |
| onStatusChanged(boolean online)             | boolean online                                               | 设备当前在线状态：true 在线                        |
| void onNetworkStatusChanged(boolean status) | boolean status                                               | 网络状态改变：ture 有网络                          |
| void onDevInfoUpdate(String devId)          | String devId                                                 | 设备本身信息改变如名称这些                         |

**示例代码**

```java
mDevice.registerDeviceListener(new OnDeviceListener() {
     @Override
     public void onDpUpdate(String devId, DpUpdateBean bean) {
         Map<String, Object> convertMap = bean.convertMap;
         String rawDps = bean.rawDps;
         updataView();
     }

     @Override
     public void onRemoved() {
         System.out.println("BaseDevice.onRemoved");
     }

     @Override
     public void onStatusChanged(boolean online) {
         System.out.println("online = " + online);
     }

     @Override
     public void onNetworkStatusChanged(boolean status) {
         System.out.println("status = " + status);
     }

     @Override
     public void onDevInfoUpdate(String devId) {
         System.out.println("devId = " + devId);
     }
 });
```

 ## 解除设备监听

```java
void unregisterDeviceListener();
```

**参数说明**

| 参数 | 说明                                                         |
| :--- | :----------------------------------------------------------- |
|      | 与registerDeviceListener对应， 建议在应用或者 Activity 关闭时，可以调用此接口解除回调 |

## 回收设备资源

```java
void onDestroy();
```

**参数说明**

| 参数 | 说明                     |
| :--- | :----------------------- |
|      | 应用或者 Activity 关闭时，可以调用此接口，回收设备占用的资源 |



## IDeviceCovertHelper接口说明

 ## 将dps值转换成标准指令

```java
Map<String, Object> convertIdToCodeMap(String dps);
```

**参数说明**

| 参数       | 说明                                   | 返回值              | 说明                              |
| :--------- | :------------------------------------- | ------------------- | --------------------------------- |
| String dps | json格式的dps值 eg.  "{\"101\": true}" | Map<String, Object> | 返回标准指令集合 eg.  switch:true |

 ## 将dps值转换成标准指令

```java
Map<String, Object> convertIdToCodeMap(Map<String, Object> dpIdMap);
```

**参数说明**

| 参数                        | 说明          | 返回值              | 说明                              |
| :-------------------------- | :------------ | ------------------- | --------------------------------- |
| Map<String, Object> dpIdMap | map格式的dp值 | Map<String, Object> | 返回标准指令集合 eg.  switch:true |



## 将标准指令转换成设备真实dps的功能点

```java
Map<String, Object> convertCodeToIdMap(Map<String, Object> commands);
```

**参数说明**

| 参数                          | 说明         | 返回值              | 说明                     |
| :---------------------------- | :----------- | ------------------- | ------------------------ |
| Map<String, Object>  commands | 标准指令集和 | Map<String, Object> | 返回对应的设备dp点的集合 |

## 将标准指令转换成设备真实dps的功能点

```java
String convertCodeToIdStr(Map<String, Object> commands);
```

**参数说明**

| 参数                          | 说明         | 返回值 | 说明                            |
| :---------------------------- | :----------- | ------ | ------------------------------- |
| Map<String, Object>  commands | 标准指令集和 | String | 返回对应的设备dp点的json 字符串 |

