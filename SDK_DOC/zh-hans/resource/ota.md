# 固件升级

固件升级主要用于增强设备能力以及修复 bug；

## 初始化固件信息

**接口说明**

```java
ITuyaOta newOTAInstance(String devId);
```

**参数说明**

| 参数  | 说明              |
| :---- | :---------------- |
| devId | 设备 id / 网关 id |

**实例代码**

```java
ITuyaOta iTuyaOta = TuyaHomeSdk.newOTAInstance("devId");
```

## 获取固件升级信息

**接口说明**

```java
iTuyaOta.getOtaInfo(new IGetOtaInfoCallback({
	@Override
	void onSuccess(List<UpgradeInfoBean> list) {
	
	}
	@Override
	void onFailure(String code, String error) {
	
	}
});
```

**参数说明**

| 字段            | 类型   | 描述                                                      |
| :-------------- | :----- | :-------------------------------------------------------- |
| upgradeStatus   | int    | 升级状态，0 :无新版本 1 :有新版本 2 :在升级中             |
| version         | String | 最新版本                                                  |
| currentVersion  | String | 当前版本                                                  |
| timeout         | int    | 超时时间，单位：秒                                        |
| upgradeType     | int    | 0 :app 提醒升级 2: app 强制升级 3: 检测升级               |
| type            | int    | 0: Wi-Fi 设备 1:蓝牙设备 2:GPRS 设备 3:zigbee 设备 9: MCU |
| typeDesc        | String | 模块描述                                                  |
| lastUpgradeTime | long   | 上次升级时间，单位：毫秒                                  |

## 开始升级

**接口说明**

调用该方法开始升级,调用后注册的 OTA 监听会把升级状态返回回来，以便开发者构建 UI；

```java
iTuyaOta.startOta();
```

## 销毁

**接口说明**

离开升级页面后要销毁，回收内存；

```java
iTuyaOta.onDestory();
```