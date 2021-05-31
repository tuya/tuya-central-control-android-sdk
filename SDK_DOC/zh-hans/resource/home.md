# 家庭信息管理

## 获取家庭列表

**接口说明**

```java
void queryHomeList(ITuyaGetHomeListCallback callback)
```

**参数说明**

| 参数     | 说明     |
| :------- | :------- |
| callback | 结果回调 |

**示例代码**

```java
TuyaHomeSdk.getHomeManagerInstance().queryHomeList(new ITuyaGetHomeListCallback() {
		@Override
		public void onSuccess(List<HomeBean> homeBeans) {
			// do something
		}
		@Override
		public void onError(String errorCode, String error) {
			// do something
		}
	});
```

## 家庭信息变化监听

家庭信息变化的时机包括：家庭的增加、邀请、删除、信息变更、分享列表的变更和服务器连接成功的监听。

**接口说明**

```java
public interface ITuyaHomeChangeListener {
	/**
	* 家庭添加成功
	* 用于多设备数据同步
	*
	* @param homeId
	*/
	void onHomeAdded(long homeId);

	/**
	* 家庭邀请
	* @param homeId    家庭ID
	* @param homeName  家庭名称
	*/
	void onHomeInvite(long homeId,String homeName);

	/**
	* 家庭删除成功
	* 用于多设备数据同步
	*
	* @param homeId
	*/
	void onHomeRemoved(long homeId);

	/**
	* 家庭信息变更
	* 用于多设备数据同步
	*
	* @param homeId
	*/
	void onHomeInfoChanged(long homeId);

	/**
	* 分享设备列表变更
	* 用于多设备数据同步
	*
	* @param sharedDeviceList
	*/
	void onSharedDeviceList(List<DeviceBean> sharedDeviceList);

	/**
	*
	* 手机连接涂鸦云服务器成功，接收到此通知，
	* 本地数据与服务端数据可能会不一致或者无法控制设备，
	* 可以调用Home下getHomeDetail接口重新初始化数据。
	*/
	void onServerConnectSuccess();
}
```

### 注册家庭信息变更监听

**接口说明**

```java
void registerTuyaHomeChangeListener(ITuyaHomeChangeListener listener)
```

**参数说明**

| 参数     | 说明   |
| :------- | :----- |
| listener | 监听器 |

**示例代码**

```java
// 定义监听
ITuyaHomeChangeListener listener = new ITuyaHomeChangeListener() {
		@Override
		public void onHomeInvite(long homeId, String homeName) {
			// do something
		}
		@Override
		public void onHomeRemoved(long homeId) {
			// do something
		}
		@Override
		public void onHomeInfoChanged(long homeId) {
			// do something
		}
		@Override
		public void onSharedDeviceList(List<DeviceBean> sharedDeviceList) {
			// do something
		}
		@Override
		public void onSharedGroupList(List<GroupBean> sharedGroupList) {
			// do something
		}
		@Override
		public void onServerConnectSuccess() {
			// do something
		}
		@Override
		public void onHomeAdded(long homeId) {
			// do something
		}
	};

// 注册监听
TuyaHomeSdk.getHomeManagerInstance().registerTuyaHomeChangeListener(listener);
```

### 注销家庭监听

**接口说明**

```java
void unRegisterTuyaHomeChangeListener(ITuyaHomeChangeListener listener)
```

**参数说明**

| 参数     | 说明   |
| :------- | :----- |
| listener | 监听器 |

**示例代码**

```java
// 取消注册监听
TuyaHomeSdk.getHomeManagerInstance().unRegisterTuyaHomeChangeListener(listener);
```

## 获取家庭的详细信息

获取家庭下的所有数据，包括设备、群组、房间等。

**接口说明**

```java
void getHomeDetail(ITuyaHomeResultCallback callback)
```

**参数说明**

| 参数     | 说明           |
| :------- | :------------- |
| homeId   | 家庭 id        |
| callback | 获取结果的回调 |

**示例代码**

```java
TuyaHomeSdk.newHomeInstance(homeId).getHomeDetail(new ITuyaHomeResultCallback() {
		@Override
		public void onSuccess(HomeBean bean) {
			// do something
		}
		@Override
		public void onError(String errorCode, String errorMsg) {
			// do something
		}
	});
```

## 获取家庭的离线详细信息

获取家庭下的所有离线数据，包括设备、群组、房间等

**接口说明**

```java
void getHomeLocalCache(ITuyaHomeResultCallback callback)
```

**参数说明**

| 参数     | 说明           |
| :------- | :------------- |
| homeId   | 家庭 id        |
| callback | 获取结果的回调 |

**示例代码**

```java
TuyaHomeSdk.newHomeInstance(homeId).getHomeLocalCache(new ITuyaHomeResultCallback() {
		@Override
		public void onSuccess(HomeBean bean) {
			// do something
		}
		@Override
		public void onError(String errorCode, String errorMsg) {
			//sdk cache error do not deal
		}
	});
```

## 家庭缓存数据的操作

`ITuyaHomeDataManager` 提供了缓存数据的访问能力，接口入口 `TuyaHomeSdk.getDataInstance()`。

> **注意**：获取此数据前，应该调用家庭的初始化接口 `TuyaHomeSdk.newHomeInstance("homeId").getHomeDetail()`或者`TuyaHomeSdk.newHomeInstance("homeId").getHomeLocalCache()` 之后接口才会有缓存数据。



## HomeBean 字段信息

| 字段             | 类型               | 描述                                 |
| :--------------- | :----------------- | :----------------------------------- |
| name             | String             | 家庭名称                             |
| lon              | double             | 经度                                 |
| lat              | double             | 纬度                                 |
| geoName          | String             | 家庭地理位置名称                     |
| homeId           | long               | 家庭 ID                              |
| admin            | boolean            | 管理员身份                           |
| rooms            | List<RoomBean>     | 所有房间列表                         |
| deviceList       | List<DeviceBean>   | 所有设备列表                         |
| groupList        | List<GroupBean>    | 所有群组                             |
| meshList         | List<BlueMeshBean> | 网关设备                             |
| sharedDeviceList | List<DeviceBean>   | 收到的共享设备                       |
| sharedGroupList  | List<GroupBean>    | 收到的共享群组                       |
| homeStatus       | int                | 家庭状态（1:等待接受 2:接受 3:拒绝） |

# 获取中控上可以显示的设备列表

获取IDataManger实例

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

| 参数     | 说明                                     |
| :------- | :--------------------------------------- |
| screenId | 设备 id / 网关 id                        |
| listener | 回调接口，ArrayList<String> 设备 id 列表 |

## 查询中控屏显示设备列表

**接口说明**

```java
void getAllShowDevice(String screenId, Business.ResultListener<ArrayList<String>> listener);
```

**参数说明**

| 参数     | 说明                                     |
| :------- | :--------------------------------------- |
| screenId | 设备 id / 网关 id                        |
| listener | 回调接口，ArrayList<String> 设备 id 列表 |


## 查询中控屏隐藏设备列表

**接口说明**

```java
void getAllHideDevice(String screenId, Business.ResultListener<ArrayList<String>> listener);
```

**参数说明**

| 参数     | 说明                                     |
| :------- | :--------------------------------------- |
| devId    | 设备 id / 网关 id                        |
| listener | 回调接口，ArrayList<String> 设备 id 列表 |

代码示例：
```java
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

