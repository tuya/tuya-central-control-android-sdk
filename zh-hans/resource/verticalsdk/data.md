# 中控数据管理

中控数据管理，可查询中控屏下设备和场景 id 列表数据

## 获取IDataManger实例

```java
ITuyaCentralControlSdk manager = TuyaOptimusSdk.getManager(ITuyaCentralControlSdk.class);
IDataManger dataManager = manager.getDataManager();
```

## 查询中控屏可控设备列表

**接口说明**

```java
void getAllDevice(String screenId, Business.ResultListener<ArrayList<String>> listener);
```

**参数说明**

| 参数  | 说明              |
| :---- | :---------------- |
| screenId | 设备 id / 网关 id |
| listener | 回调接口，ArrayList<String> 设备 id 列表 |


## 查询中控屏显示设备列表

**接口说明**

```java
void getAllShowDevice(String screenId, Business.ResultListener<ArrayList<String>> listener);
```

**参数说明**

| 参数  | 说明              |
| :---- | :---------------- |
| screenId | 设备 id / 网关 id |
| listener | 回调接口，ArrayList<String> 设备 id 列表 |


## 查询中控屏隐藏设备列表

**接口说明**

```java
void getAllHideDevice(String screenId, Business.ResultListener<ArrayList<String>> listener);
```

**参数说明**

| 参数  | 说明              |
| :---- | :---------------- |
| devId | 设备 id / 网关 id |
| listener | 回调接口，ArrayList<String> 设备 id 列表 |

## 查询中控屏可控场景列表

**接口说明**

```java
void getAllScene(String screenId, Business.ResultListener<ArrayList<String>> listener);

```

**参数说明**

| 参数  | 说明              |
| :---- | :---------------- |
| screenId | 设备 id / 网关 id |
| listener | 回调接口，ArrayList<String> 场景 id 列表 |

## 查询中控屏显示设备列表

**接口说明**

```java
void getAllShowScene(String screenId, Business.ResultListener<ArrayList<String>> listener);

```

**参数说明**

| 参数  | 说明              |
| :---- | :---------------- |
| screenId | 设备 id / 网关 id |
| listener | 回调接口，ArrayList<String> 场景 id 列表 |

## 查询中控屏隐藏场景列表

**接口说明**

```java
void getAllHideScene(String screenId, Business.ResultListener<ArrayList<String>> listener);
```

**参数说明**

| 参数  | 说明              |
| :---- | :---------------- |
| screenId | 设备 id / 网关 id |
| listener | 回调接口，ArrayList<String> 场景 id 列表 |

**示例代码**

```java
ITuyaCentralControlSdk manager = TuyaOptimusSdk.getManager(ITuyaCentralControlSdk.class);
IDataManger dataManager = manager.getDataManager();

// 查询中控屏显示设备列表
dataManager.getAllShowDevice("sceneId", new Business.ResultListener<ArrayList<String>>() {
    @Override
    public void onFailure(BusinessResponse businessResponse, ArrayList<String> strings, String s) {
                
    }

    @Override
    public void onSuccess(BusinessResponse businessResponse, ArrayList<String> strings, String s) {

    }
});

// 查询中控屏隐藏设备列表
dataManager.getAllHideDevice("deviceID", new Business.ResultListener<ArrayList<String>>() {
    @Override
    public void onFailure(BusinessResponse businessResponse, ArrayList<String> strings, String s) {
                
    }

    @Override
    public void onSuccess(BusinessResponse businessResponse, ArrayList<String> strings, String s) {

    }
});
```