# 智能场景

## 智能场景管理


智能场景分为 **一键执行场景** 和 **自动化场景** ，本文分别简称为 **场景** 和 **自动化**。

- 场景是用户添加动作，手动触发。
- 自动化是由用户设定条件，当条件触发后自动执行设定的动作

### 获取场景列表

**接口说明**

获取场景列表数据。场景和自动化一起返回，通过条件 `conditions` 字段是否为空来区分场景和自动化。

```java
void getSimpleSceneList(long homeId, ITuyaResultCallback<List<SceneBean>> callback)
```

**参数说明**

| 参数     | 说明    |
| :------- | :------ |
| homeId   | 家庭 id |
| callback | 回调    |

其中，`SceneBean`的主要属性定义如下

| 字段       | 类型                 | 描述                                             |
| :--------- | :------------------- | :----------------------------------------------- |
| id         | Sting                | 场景 ID                                          |
| name       | String               | 场景名称                                         |
| conditions | List<SceneCondition> | 场景条件列表                                     |
| actions    | List<SceneTask>      | 场景任务列表                                     |
| matchType  | int                  | 满足条件的类型，满足任意条件为1，满足所有条件为2 |
| enable     | boolean              | 自动化是否启用                                   |

**示例代码**

```java
	TuyaHomeSdk.getSceneManagerInstance().getSimpleSceneList(SceneUtil.getHomeId(), new ITuyaResultCallback<List<SceneBean>>() {
			@Override
			public void onSuccess(List<SceneBean> result) {
				
			}

			@Override
			public void onError(String errorCode, String errorMessage) {
			}
		});
```

中控设备上显示的建议只保留一键执行，过滤掉自动化

一键执行中也可以过滤掉动作为空的，保留能执行的一键执行。

### 执行场景

**接口说明**

用于执行手动场景。

> **注意**：这个方法只管发送指令到云端执行场景，具体设备执行成功与否，需要通过TuyaHomeSdk.newDeviceInstance(devId).registerDevListener() 监听设备的 DP 点变化。

```java
void executeScene(IResultCallback callback);
```

**参数说明**

| 参数     | 说明 |
| :------- | :--- |
| callback | 回调 |

**示例代码**

```java
String sceneId = sceneBean.getId();
TuyaHomeSdk.newSceneInstance(sceneId).executeScene(new IResultCallback() {
	@Override
	public void onSuccess() {
		Log.d(TAG, "Excute Scene Success");
	}

	@Override
	public void onError(String errorCode, String errorMessage) {
	}
});
```

