# 网关扩展 SDK

## 启动激活网关

**网关控制实现了参数配置、回调注册、网关启动、入网、DP点下发/上报等功能。**

#### 获取网关sdk实例

```java
ioTGatewaySDKManager = IoTGatewaySDKManager.getInstance();
```

#### 注册回调函数

**按需实例化并注册4类回调函数到SDK中：**

```java
    GwInfraCallbacks gwInfraCallbacks = new GwInfraCallbacks() {
        @Override
        public void onStartSuccess() {
            Log.d(TAG, "onStartSuccess called");
        }

        @Override
        public void onStartFailure(int err) {
            Log.d(TAG, "onStartFailure called");

        }

        @Override
        public int onGetUuidAuthkey(String uuid, int uuidSize, String authkey, int authkeySize) {
            Log.d(TAG, "onGetUuidAuthkey called");
            return 0;
        }

        @Override
        public int onGetProductKey(String pk, int pkSize) {
            Log.d(TAG,  "onGetProductKey called");
            return 0;
        }

        @Override
        public int onGwUpgrade(String imgFile) {
            Log.d(TAG, "onGwUpgrade called");
            return 0;
        }

        @Override
        public void onGwReboot() {
            Log.d(TAG, "onGwReboot called");
        }

        @Override
        public void onGwReset() {
            Log.d(TAG, "onGwReset called");
        }

        @Override
        public void onGwEngineerFinished() {
            Log.d(TAG, "onGwEngineerFinished called");
        }

        @Override
        public String onGwFetchLocalLog(int pathLen) {
            Log.d(TAG, "onGwFetchLocalLog called");
            return null;
        }

        @Override
        public int onGwConfigureOpMode(int mode) {
            Log.d(TAG, "onGwConfigureOpMode called");
            return 0;
        }

        @Override
        public int onGwActiveStatusChanged(int status) {
            Log.d(TAG, "onGwActiveStatusChanged called");
            return 0;
        }

        @Override
        public int onGwOnlineStatusChanged(int registered, int online) {
            Log.d(TAG, "onGwOnlineStatusChanged called");
            return 0;
        }
    };

    MiscDevCallbacks miscDevCallbacks = new MiscDevCallbacks() {
        @Override
        public int onMiscDevAdd(boolean permit, int timeout) {
            Log.d(TAG, "onMiscDevAdd +  called" + " permit: " + permit + " timeout: " + timeout);

            return 0;
        }

        @Override
        public int onMiscDevDel(String devId) {
            Log.d(TAG, "onMiscDevDel called " + " devid: " + devId);
            return 0;
        }

        @Override
        public int onMiscDevBindIfm(String devId, int result) {
            Log.d(TAG, "onMiscDevBindIfm called " + "devid:" + devId + " result: " + result);
           
            return 0;
        }

        @Override
        public int onMiscDevUpgrade(String devId, String img) {
            Log.d(TAG, "onMiscDevUpgrade called " + "devid:" + devId + " img: " + img);
            return 0;
        }

        @Override
        public int onMiscDevReset(String devId) {
            Log.d(TAG, "onMiscDevReset called " + "devid:" + devId);
            return 0;
        }

        @Override
        public void onDevHeartbeatSend(String devId) {
            Log.d(TAG, "onDevHeartbeatSend called " + "devid:" + devId);
        }
    };

    DevCmdCallbacks devCmdCallbacks = new DevCmdCallbacks() {
        @Override
        public void onDpQuery(DPEvent event) {
            if (event == null)
                Log.d(TAG, " called. send all dp info");
            else
                Log.d(TAG, " called. " + "event:" + event.toString());
        }

        @Override
        public void onDpEvent(int cmd_tp, int dtt_tp, String cid, String mb_id, DPEvent event) {
            Log.d(TAG, " onDpEvent called " + "cmd_tp:" + cmd_tp + " dtt_tp:" + dtt_tp + " cid: " + cid + " mb_id:" + mb_id + " " + event.toString());

        }

        @Override
        public int onDevObjCmd() {
            // ignore
            return 0;
        }

        @Override
        public int onDevRawCmd() {
            // ignore
            return 0;
        }

        @Override
        public int onDevGroup(int action, String devId, String grpId) {
            Log.d(TAG, " onDevGroup called");
            return 0;
        }

        @Override
        public int onDevScene(int action, String devId, String grpId, String sceId) {
            Log.d(TAG, " onDevScene called");
            return 0;
        }

        @Override
        public int onDevDataQuery() {
            // ignore
            return 0;
        }

        @Override
        public void onCloudMedia(IoTGatewaySDKManager.MediaAttribute[] mediaAttributes) {
            Log.d(TAG, " onCloudMedia called");

        }

        @Override
        public SmartConfig onSmartConfig() {
            Log.d(TAG, " onSmartConfig called");

        }
    };

    Z3DevCallbacks z3DevCallbacks = new Z3DevCallbacks() {
        @Override
        public int onZ3DevActiveStateChanged(String id, int state) {
            Log.d(TAG, " onZ3DevActiveStateChanged called " + "id: " + id + " state: " + state);

            return 0;
        }

        @Override
        public int onZ3DevInitData() {
            Log.d(TAG, " onZ3DevInitData called");

            return 0;
        }

        @Override
        public int onZ3DevJoin(Z3Desc desc) {
            Log.d(TAG, " onZ3DevJoin called " + desc.toString());

            return 0;
        }

        @Override
        public int onZ3DevLeave(String id) {
            Log.d(TAG, " onZ3DevLeave called " + "id: " + id);

            return 0;
        }

        @Override
        public int onZ3DevZclReport(Z3ApsFrame frame) {
            Log.d(TAG, " onZ3DevZclReport called " + frame.toString());

            return 0;
        }

        @Override
        public int onZ3DevOnlineFresh(String id, int version) {
            Log.d(TAG, " onZ3DevOnlineFresh called " + "id:" + id + " version: " + version);

            return 0;
        }

        @Override
        public int onZ3DevUpgradeStatus(String id, int rc, int version) {
            Log.d(TAG, " onZ3DevUpgradeStatus called " + "id: " + id + "rc: " + rc + "version: " + version);
            return 0;
        }
    };

    ioTGatewaySDKManager.setGwInfraCallbacks(gwInfraCallbacks);
    ioTGatewaySDKManager.setMiscDevCallbacks(miscDevCallbacks);
    ioTGatewaySDKManager.setDevCmdCallbacks(devCmdCallbacks);
    ioTGatewaySDKManager.setZ3DevCallbacks(z3DevCallbacks);
```

#### 网关参数配置

**根据实际情况填充配置参数。**

```java
    IoTGatewaySDKManager.Config config = new IoTGatewaySDKManager.Config();
    config.mUuid = ""; // User TODO
    config.mAuthKey = ""; // User TODO
    config.mProductKey = "";
    ...
```

#### 启动网关

```java
ioTGatewaySDKManager.IotGatewayStart(this, config);
```

#### 使用 token 激活网关

启动网关成功之后，才可以入网。

##### 获取激活 token

开始配网之前，SDK 需要在联网状态下从涂鸦云获取配网 Token，Token 的有效期为 10 分钟，且配置成功后就会失效（再次配网需要重新获取）。

```java
TuyaHomeSdk.getActivatorInstance().getActivatorToken(homeId,
		new ITuyaActivatorGetToken() {

			@Override
			public void onSuccess(String token) {

			}

			@Override
			public void onFailure(String s, String s1) {

			}
		});
```

**参数说明**

| 参数   | 说明                                                         |
| :----- | :----------------------------------------------------------- |
| homeId | 家庭 ID，从用户信息中获取，参考：二维码授权登录 -  获取登录状态 章节 |

#####  使用 token 激活网关

```java
ioTGatewaySDKManager.IotGatewayActive(token);
```

## 配置说明

### Config 配置说明

使用者需实例化 Config 配置类：

Config 类说明如下：

```java
    /**
     * 初始化 SDK 的基本属性
     */
    public final static class Config {
        /**
         * 存储路径是系统存储 SDK 数据库等文件的路径，所指定的路径必须有可读写权限，缺省是当前路径
         */
        public String mStoragePath;
        /**
         * 临时路径是系统保存临时文件的路径，必须有可读写权限，缺省是 /tmp
         */
        public String mCachePath;
        /**
         * 是否使用 Zigbee，必须一开始就设置
         */
        public boolean mEnableZigbee;
        /**
         * 网关与 Zigbee 模组的串口通讯所使用的串口设备，如 /dev/ttyS1
         */
        public String mTtyDevice;
        /**
         * 网关与 Zigbee 模组的串口通讯所使用的串口波特率，仅支持 115200 和 57600
         * 波特率为 115200 需要硬件流控
         * 波特率为 57600 不需要硬件流控
         */
        public int mTtyBaudrate;
        /**
         * 广播 UDP 报文的接口，用于有线网关局域网发现
         */
        public String mEthIfname;
        /**
         * AP 配网模式，指定网关 AP 的 SSID
         */
        public String mSsid;
        /**
         * AP 配网模式，指定网关 AP 的 Password
         */
        public String mPassword;
        /**
         * 网关应用的版本号，用于固件升级，必须是“x.x.x”的格式
         */
        public String mVer;
        /**
         * 0：普通模式；
         * 1：工程模式
         */
        public int mIsEngr;
        /**
         * 指定过滤 Zigbee 子设备的策略配置文件。policy 表示策略：0. 不过滤；1. 过滤部分；2. 过滤全部。当 policy = 1 时，也就是过滤部分，用户需要将设备的厂商名和型号记录到 devices 字段，示例配置文件：
         * {
         * “policy”: 1,
         * “devices”: [
         * {“manufacture”: “test1_name”, “model_id”: “test1_id”},
         * {“manufacture”: “test2_name”, “model_id”: “test2_id”}
         * ]
         * }
         */
        public String mUzCfg;
        /**
         * 无线配网可以指定网关工作以哪种模式启动。
         * TY_CONN_MODE_AP_ONLY：仅工作在 AP 模式；
         * TY_CONN_MODE_EZ_ONLY：仅工作在 EZ 模式；
         * TY_CONN_MODE_AP_FIRST：支持 AP & EZ 模式，首次工作在 AP 模式，解绑或重置网关时切换；
         * TY_CONN_MODE_EZ_FIRST：支持 AP & EZ 模式，首次工作在 EZ 模式，解绑或重置网关时切换。
         */
        public int mWifiMode;
        /**
         * 设置 log 打印等级，开发阶段可开启 debug 模式
         */
        public int mLogLevel;

        /* 新增几个字段 */
        /**
         * 设备 UUID
         */
        public String mUuid;
        /**
         * 设备 Authkey
         */
        public String mAuthKey;
        /**
         * 设备 PID
         */
        public String mProductKey;
    }
```

## 函数说明

### 回调接口

#### 网关基础回调接口：GwInfraCallbacks
```java
    public interface GwInfraCallbacks {

    /* ty_op_mode_t */
    int TY_OP_MODE_ADD_START    = 0;
    int TY_OP_MODE_ADD_STOP     = 1;
    int TY_OP_MODE_AP           = 2;
    int TY_OP_MODE_EZ           = 3;

    // ty_zigbee_status_t
    int TY_ZIGBEE_STATUS_POWERUP  = 0;
    int TY_ZIGBEE_STATUS_PAIRING  = 1;
    int TY_ZIGBEE_STATUS_NORMAL   = 2;

    // ty_gw_status_t
    int TY_GW_STATUS_UNREGISTERED = 0;
    int TY_GW_STATUS_REGISTERED   = 1;

    /**
     * 预留接口，请忽略
     */
    int onGetUuidAuthkey(String uuid, int uuidSize, String authkey, int authkeySize);

    /**
     * 预留接口，请忽略
     */
    int onGetProductKey(String pk, int pkSize);

    /**
     * 涂鸦应用升级的回调函数，第三方系统开发者在此回调函数中实现升级的功能。
     *
     * @param imgFile 网关固件文件所在的路径
     * @return 成功，返回0；失败，非0
     */
    int onGwUpgrade(String imgFile);

    /**
     * 重启涂鸦应用的回调函数。
     */
    void onGwReboot();

    /**
     * 重置网关的回调函数，第三方系统开发者在此回调函数中实现实现清空网关数据的功能。
     */
    void onGwReset();

    /**
     * 工程部署完成的回调函数，第三方系统开发者在此回调函数中实现重启涂鸦应用，并切换到普通模式。
     */
    void onGwEngineerFinished();

    /**
     * 从涂鸦运营平台拉取设备日志的回调函数。
     *
     * @param pathLen 返回的path路径最大长度不能超过pathLen
     * @return 成功，返回路径
     */
    String onGwFetchLocalLog(int pathLen);

    /**
     * 网关操作模式通知回调函数，第三方系统开发者可以在此回调函数中实现其业务功能。
     *
     * @param mode 操作模式。
     * TY_OP_MODE_ADD_START：设备配网开始；
     * TY_OP_MODE_ADD_STOP：设备配网结束。
     * @return 成功，返回0；失败，非0
     */
    int onGwConfigureOpMode(int mode);

    /**
     * 网关成功绑定或解绑涂鸦云的通知回调函数，第三方系统开发者可以在此回调函数中根据网关成功绑定或解绑处理其特定业务。
     *
     * @param status 网关激活状态。
     * 0：未绑定；
     * 1：已绑定。
     * @return 成功，返回0；失败，非0
     */
    int onGwActiveStatusChanged(int status);

    /**
     * 网关上下线状态变化的回调函数，第三方系统开发者可以在此回调函数中根据网关上线或下线处理其特定业务。
     *
     * @param registered 网关是否已激活
     * @param online 网关在线状态。
     * 0：离线；
     * 1：在线。
     * @return 成功，返回0；失败，非0
     */
    int onGwOnlineStatusChanged(int registered, int online);


    /**
     * 网关 start 成功
     */
    void onStartSuccess();

    /**
     * 网关 start 失败
     *
     * @param err 失败信息。START_ERROR_XXX
     */
    void onStartFailure(int err);
}
```

#### 其他设备接入回调接口：MiscDevCallbacks
```java
public interface MiscDevCallbacks {
    /**
     * 添加设备的回调函数。
     *
     * @param permit 允许 or 禁止子设备入网
     * @param timeout 允许配网的时间，单位为秒
     * @return 成功，返回0；失败，非0
     */
    int onMiscDevAdd(boolean permit, int timeout);

    /**
     * 删除设备的回调函数。
     *
     * @param devId 子设备的 MAC 地址
     * @return 成功，返回0；失败，非0
     */
    int onMiscDevDel(String devId);

    /**
     * 子设备绑定涂鸦云结果通知的回调函数。
     *
     * @param devId 子设备的 MAC 地址
     * @param result 绑定结果。
     * 0：绑定成功；
     * 1：绑定失败
     * @return 成功，返回0；失败，非0
     */
    int onMiscDevBindIfm(String devId, int result);

    /**
     * 通知子设备升级的回调函数。
     *
     * @param devId 子设备的 MAC 地址
     * @param img 固件文件所在的路径
     * @return 成功，返回0；失败，非0
     */
    int onMiscDevUpgrade(String devId, String img);

    /**
     * 重置设备的回调函数。
     *
     * @param devId 子设备的 MAC 地址
     * @return 成功，返回0；失败，非0
     */
    int onMiscDevReset(String devId);

    /**
     * 子设备心跳回调
     *
     * @param devId 子设备的 MAC 地址
     * @return 成功，返回0；失败，非0
     */
    void onDevHeartbeatSend(String devId);
}
```

#### 设备功能点回调接口：DevCmdCallbacks
```java
public interface DevCmdCallbacks {

    // ty_group_action_t
    int GROUP_ADD = 0;
    int GROUP_DEL = 1;

    // ty_scene_action_t
    int SCENE_ADD = 0;
    int SCENE_DEL = 1;
    int SCENE_EXEC = 2;

    /**
     * dp查询回调
     @param event 参考DPEvent类说明
     */
    void onDpQuery(DPEvent event);

    /**
     * dp事件回调
     *
     * @param cmd_tp 指令类型。
     * 0：LAN 触发；
     * 1：MQTT 触发；
     * 2：本地定时触发；
     * 3：场景联动触发；
     * 4：重发
     * @param dtt_tp 传输方式。
     * 0：单播；
     * 1：广播；
     * 2：组播；
     * 3：场景
     * @param cid cid == NULL，表示网关功能点；
     * cid != NULL，表示子设备功能点，cid 为子设备的 MAC 地址
     * @param mb_id 群组 ID，只有当 dtt_tp = 2 时，该字段才有效
     @param event 参考DPEvent类说明
     */
    void onDpEvent(int cmd_tp, int dtt_tp, String cid, String mb_id, DPEvent event);
    /**
     * 预留接口，请忽略
     */
    int onDevObjCmd(); // TODO: int (*dev_obj_cmd_cb)(ty_obj_cmd_s *dp);
    /**
     * 预留接口，请忽略
     */
    int onDevRawCmd(); // TODO: int (*dev_raw_cmd_cb)(ty_raw_cmd_s *dp);
    /**
     * 预留接口，请忽略
     */
    int onDevGroup(int action, String devId, String grpId);
    /**
     * 预留接口，请忽略
     */
    int onDevScene(int action, String devId, String grpId, String sceId);
    /**
     * 预留接口，请忽略
     */
    int onDevDataQuery();
    /**
     * 媒体信息，暂时无需关注
     *
     * @param mediaAttributes 参考MediaAttribute
     */
    void onCloudMedia(IoTGatewaySDKManager.MediaAttribute[] mediaAttributes);
    /**
     * 触发一键配网时的回调
     *
     * @return 返回配网配置对象
     */
    SmartConfig onSmartConfig();
}
```

#### 接入Zigbee子设备相关的回调接口：Z3DevCallbacks
```java
public interface Z3DevCallbacks {
        /**
         * 所有 Zigbee 子设备成功绑定或解绑涂鸦云时的通知回调。
         *
         * @param id 子设备的 MAC 地址
         * @param state 子设备激活状态。
         * 0：解绑；
         * 1：绑定。
         * @return 成功，返回0；失败，非0
         */
        int onZ3DevActiveStateChanged(String id, int state);

        /**
         * 通知读取子设备属性值的回调。
         *
         * @return 成功，返回0；失败，非0
         */
        int onZ3DevInitData();

        /**
         * 用户处理的 Zigbee 子设备入网的回调。
         *
         * @param desc 参考 Z3Desc说明
         * @return 成功，返回0；失败，非0
         */
        int onZ3DevJoin(Z3Desc desc); // ty_z3_desc_s *desc

        /**
         * 用户处理的 Zigbee 子设备离网的回调。
         *
         * @param id 子设备的 MAC 地址
         * @return 成功，返回0；失败，非0
         */
        int onZ3DevLeave(String id);

        /**
         * 用户处理的 Zigbee 子设备状态上报的回调。
         *
         * @param frame 参考 Z3ApsFrame说明
         * @return 成功，返回0；失败，非0
         */
        int onZ3DevZclReport(Z3ApsFrame frame);  // ty_z3_aps_frame_s *frame

        /**
         * 设备在线刷新
         *
         * @param id 子设备的 MAC 地址
         * @param version 子设备版本
         * @return 成功，返回0；失败，非0
         */
        int onZ3DevOnlineFresh(String id, int version);

        /**
         * 设备升级状态回调
         *
         * @param id 子设备的 MAC 地址
         * @param rc rc
         * @param version 子设备版本
         * @return 成功，返回0；失败，非0
         */
        int onZ3DevUpgradeStatus(String id, int rc, int version);
}
```

### 主调函数

#### 发送DP：sendDP
```java
    /**
     * 发送dp
     *
     * @param dpId   dp id
     * @param type 类型 DPEvent.Type
     * @param val  值
     * @return 成功，返回0；失败，非0
     */
    final public int sendDP(String devId, int dpId, int type, Object val);
```

#### 发送带时间戳DP：sendDPWithTimeStamp
```java
    /**
     * 发送dp带时间戳
     *
     * @param dpId        dp id
     * @param type      类型 DPEvent.Type
     * @param val       值
     * @param timestamp 时间戳 单位秒
     * @return 成功，返回0；失败，非0
     */
    final public int sendDPWithTimeStamp(String devId, int dpId, int type, Object val, int timestamp);
```

#### 获取网关SDK管理器实例：getInstance
```java
    /**
     * 获取网关SDK管理器实例
     *
     * @return 成功，返回实例；失败，返回null
     */
    public static IoTGatewaySDKManager getInstance();
```

#### 注册网关基础回调函数到SDK：setGwInfraCallbacks

```java
    /**
     * 注册网关基础回调函数到SDK
     *
     * @param callbacks 用户实现此接口注册进来
     * @return 无返回值
     */
    public void setGwInfraCallbacks(GwInfraCallbacks callbacks);
```

#### 注册功能点及场景、音频等回调函数到SDK：setDevCmdCallbacks
```java
    /**
     * 注册功能点及场景、音频等回调函数到SDK
     *
     * @param callbacks 用户实现此接口注册进来
     * @return 无返回值
     */
    public void setDevCmdCallbacks(DevCmdCallbacks callbacks);
```

#### 注册安防相关回调函数到SDK：setHomeSecurityCallbacks
```java
    /**
     * 注册安防相关回调函数到SDK
     *
     * @param callbacks 用户实现此接口注册进来
     * @return 无返回值
     */
    public void setHomeSecurityCallbacks(HomeSecurityCallbacks callbacks);
```

#### 注册Misc设备相关回调函数到SDK：setMiscDevCallbacks
```java
    /**
     * 注册Misc设备相关回调函数到SDK
     *
     * @param callbacks 用户实现此接口注册进来
     * @return 无返回值
     */
    public void setMiscDevCallbacks(MiscDevCallbacks callbacks);
```

#### 注册zigbee设备相关回调函数到SDK：setZ3DevCallbacks
```java
    /**
     * 注册zigbee设备相关回调函数到SDK
     *
     * @param callbacks 用户实现此接口注册进来
     * @return 无返回值
     */
    public void setZ3DevCallbacks(Z3DevCallbacks callbacks);
```

#### 准备工作完成后，启动网关：IotGatewayStart
```java
    /**
     * 启动网关设备
     *
     * @param context context of app
     * @param config config for gateway SDK
     * @return 成功，返回0；失败，非0
     */
    public void IotGatewayStart(Context context, Config config);
```

#### 使用token激活网关设备：IotGatewayActive
```java
    /**
     * 使用token激活网关设备
     *
     * @param token token of this gateway
     * @return 成功，返回0；失败，非0
     */
    public int IotGatewayActive(String token);
```

#### 本地解绑网关设备：IotGatewayUnactive
```java
    /**
     * 反激活网关设备
     *
     * @return 成功，返回0；失败，非0
     */
    public int IotGatewayUnactive();
```

#### 本地控制子设备入网的接口：IotGatewayPermitJoin
```java
    /**
     * 本地控制子设备入网的接口
     *
     * @param permit 0关闭，1开启
     * @return 成功，返回0；失败，非0
     */
    public int IotGatewayPermitJoin(boolean permit);
```

#### 将Misc子设备绑定到涂鸦云：IotGatewayMiscDevBind
```java
    /**
     * 将子设备绑定到涂鸦云
     *
     * @param uddd 用户自定义，可用于区分不同类型的设备
     * @param dev_id 子设备的 MAC 地址
     * @param pid 在涂鸦 IoT 平台上创建子设备产品得到的 PID
     * @param ver 子设备的软件版本，用于固件升级
     * @return 成功，返回0；失败，非0
     */
    public int IotGatewayMiscDevBind(int uddd, String dev_id, String pid, String ver);
```

#### 将Misc子设备从涂鸦云解绑：IotGatewayMiscDevBind
```java
    /**
     * unbind misc device from tuya cloud.
     *
     * @param dev_id device unique ID.
     * @return 成功，返回0；失败，非0
     */
    public int IotGatewayMiscDevUnbind(String dev_id);
```

#### 刷新Misc子设备在涂鸦云在线状态的接口：IotGatewayMiscDevHbFresh
```java
    /**
     * 刷新子设备在涂鸦云在线状态的接口
     *
     * @param dev_id 子设备的 MAC 地址
     * @param timeout 间隔在线的超时时间，单位是秒
     * @return 成功，返回0；失败，非0
     */
    public int IotGatewayMiscDevHbFresh(String dev_id, int timeout);
```

#### 设置网关本地日志存放路径：IotGatewayLogPathSet
```java
    /**
     * 设置网关本地日志存放路径
     *
     * @param path 日志路径，如：/sdcard/tuya/iot/
     * @return 成功，返回0；失败，非0
     */
    public int IotGatewayLogPathSet(String path);
```

#### 初始化心跳管理器：IotGatewayHbInit
```java
    /**
     * 初始化心跳管理器
     *
     * @return 成功，返回0；失败，非0
     */
    public int IotGatewayHbInit();
```

#### 将 Zigbee 子设备绑定到涂鸦云：IotGateWayZ3DevBind
```java
    /**
     * 将 Zigbee 子设备绑定到涂鸦云的接口
     *
     * @param uddd 用户自定义，可用于区分不同类型的设备
     * @param dev_id 子设备的 MAC 地址
     * @param pid 在涂鸦 IoT 平台上创建子设备产品得到的 PID
     * @param ver 子设备的软件版本，用于固件升级
     * @return 成功，返回0；失败，非0
     */
    public int IotGateWayZ3DevBind(int uddd, String dev_id, String pid, String ver);
```

#### 将 Zigbee 子设备从涂鸦云解绑：IotGateWayZ3DevUnbind
```java
    /**
     * unbind z3 device from tuya cloud
     *
     * @param dev_id device unique ID.
     * @return 成功，返回0；失败，非0
     */
    public int IotGateWayZ3DevUnbind(String dev_id);
```

#### 下发ZCL数据帧给Zigbee子设备：IotGateWayZ3DevSendZclCmd
```java
    /**
     * 下发 ZCL 数据帧给 Zigbee 子设备
     *
     * @param frame 参考 Z3ApsFrame 类说明
     * @return 成功，返回0；失败，非0
     */
    public int IotGateWayZ3DevSendZclCmd(Z3ApsFrame frame);
```

#### 本地移除Zigbee子设备：IotGateWayZ3DevDel
```java
    /**
     * 本地移除 Zigbee 子设备的接口
     *
     * @param id 子设备的 MAC 地址
     * @return 成功，返回0；失败，非0
     */
    public int IotGateWayZ3DevDel(String id);
```

#### 本地升级Zigbee子设备：IotGateWayZ3DevUpgrade
```java
    /**
     * 本地升级 Zigbee 子设备的接口
     *
     * @param id 子设备的 MAC 地址
     * @return 成功，返回0；失败，非0
     */
    public int IotGateWayZ3DevUpgrade(String id, String img);
```

#### 一键配网初始化：IotGateWaySmartConfigInit
```java
    /**
     * 一键配网初始化接口，申请相关资源。第三方开发者需要指定 2.4G 无线接口以及实现获取 SSID 和密码的回调
     *
     * @param ifname 2.4G 无线接口
     * @return 成功，返回0；失败，非0
     */
    public int IotGateWaySmartConfigInit(String ifname);
```

#### 开启一键配网：IotGateWaySmartConfigStart
```java
    /**
     * 开启一键配网，调用该接口发送无线空中包
     *
     * @param timeout 超时时间，单位是秒。超时后自动关闭一键配网
     * @return 成功，返回0；失败，非0
     */
    public int IotGateWaySmartConfigStart(int timeout);
```

#### 关闭一键配网：IotGateWaySmartConfigStop
```java
    /**
     * 关闭一键配网接口，调用该接口停止发送无线空中包
     *
     * @return 成功，返回0；失败，非0
     */
    public int IotGateWaySmartConfigStop();
```

#### 开启音频上传：tuyaIotUploadMediaStart
```java
    /**
     * 开启音频上传
     *
     * @return 成功，返回0；失败，非0
     */
    public static int tuyaIotUploadMediaStart();
```

#### 进行音频上传：tuyaIotUploadMedia
```java
    /**
     * 进行音频上传，可循环调用
     *
     * @param data 音频数据，格式为PCM，单声道，16K，16bit
     * @return 成功，返回0；失败，非0
     */
    public static int tuyaIotUploadMedia(byte[] data);
```

#### 结束音频上传：tuyaIotUploadMediaStop
```java
    /**
     * 结束音频上传
     *
     * @return 成功，返回0；失败，非0
     */
    public static int tuyaIotUploadMediaStop();
```

#### 取消音频上传：tuyaIotUploadMediaCancel
```java
    /**
     * （强制）取消音频上传
     *
     * @return 成功，返回0；失败，非0
     */
    public static int tuyaIotUploadMediaCancel();
```

#### 获取子设备信息：IotGateWayDevTraversal
```java
    /**
     * 获取子设备信息：子设备遍历，通过此接口可以遍历网关下所有的子设备
     *
     * @return 成功，返回DevDescIf对象；失败或结束，返回null
     */
    public static DevDescIf IotGateWayDevTraversal();
```

## 辅助类说明

### DPEvent

```java
   /**
    * DP点类
    */
    public class DPEvent {

        public class Type {
            //Boolean
            public static final int PROP_BOOL = 0;
            //Integer
            public static final int PROP_VALUE = 1;
            //String
            public static final int PROP_STR = 2;
            //Integer
            public static final int PROP_ENUM = 3;
            //Integer
            public static final int PROP_BITMAP = 4;
            //RAW
            public static final int PROP_RAW = 5;
        }

        public int dpid;            // dp id
        public short type;          // dp type
        public Object value;        // dp value
        /**
        * 发生的时间戳(单位秒)
        */
        public int timestamp;  // dp happen time. if 0, mean now
        ...
    }
```

### Z3ApsFrame

```java
    /**
    * 涂鸦封装的 Zigbee ZCL 数据帧。
    */
    public class Z3ApsFrame {
        /**
        * 子设备的 MAC 地址
        */
        public String mId;
        /**
        * 子设备的短地址
        */
        public int mNodeId;
        /**
        * Zigbee Profile ID
        */
        public int mProfileId;
        /**
        * Zigbee Cluster ID
        */
        public int mClusterId;
        /**
        * 源 endpoint
        */
        public int mSrcEndpoint;
        /**
        * 目的 endpoint
        */
        public int mDstEndpoint;
        /**
        * 组 ID，组播才需要
        */
        public int mGroupId;
        /**
        * ZCL 命令类型。
        * 1 表示 global；
        * 2 表示特定 cluster
        */
        public int mCmdType;
        /**
        * ZCL Command ID
        */
        public int mCmdId;
        /**
        * 传输类型。
        * 0 表示单播；
        * 1 表示组播；
        * 2 表示广播
        */
        public int mFrameType;
        /**
        * 禁止响应。
        * 1 表示禁止响应；
        * 0 表示使能响应
        */
        public int mDisableAck;
        /**
        * ZCL payload 的长度
        */
        public int mMsgLength;
        /**
        * ZCL payload
        */
        public byte[] mMessage;
        ...
    }
```

### Z3Desc

```java
public class Z3Desc {
    public final static int MAX_EP_NUM = 10;
    public final static int MAX_CLUSTER_NUM = 10;
    /**
     * 子设备的 MAC 地址
     */
    public String mId;
    /**
     * Zigbee Profile ID
     */
    public int mProfileId[];
    public int mDeviceId[];
    public int mClusterId[][];
    public int mEndpoint[];
    public int mEpNum;
    public int mUcNum;
    /**
     * 子设备的短地址
     */
    public int mNodeId;
    /**
     * 厂商名称
     */
    public String mManuName;
    /**
     * 设备型号
     */
    public String mModelId;
    /**
     * 重新入网标记
     */
    public int mRejoinFlag;
    public int mPowerSource;
    public int mVersion;
    ....
}
```

### DevDescIf

```java
    public class DevDescIf {
        public String mId;
        public String mSwVer;
        public String mSchemaId;
        public String mProductKey;
        public String mFirmwareKey;
        public boolean mIsOem;
        public String mSigmeshDevKey;
        public String mSigmeshMac;
        public int mUddd;
        public int mUddd2;
        public int mTp;
        public int mSubTp;
        public String mUuid;
        public int mAbi;
        public boolean mBind;
        public boolean mSync;
        public boolean mSigmeshSync;
        public boolean mBleMeshBindReptSync;
        public boolean mBindStatus;
        public GwAttachAttr[] mAttr;
        public boolean mResetFlag;
        public int mSubListFlag;
        public DevQos mDevQos;
        ...
    }
```

### MediaAttribute
```java
    public final static class MediaAttribute {
        public static final int DECODER_TYPE_WAV = 0;
        public static final int DECODER_TYPE_MP3 = 1;
        public static final int DECODER_TYPE_SPEEX = 2;
        public static final int DECODER_TYPE_AAC = 3;
        public static final int DECODER_TYPE_AMR = 4;
        public static final int DECODER_TYPE_M4A = 5;
        public static final int DECODER_TYPE_PCM = 6;             //for speaker stream data play
        public static final int DECODER_TYPE_INVALD = 7;

        public static final int MEDIA_TYPE_MEDIA = 0;
        public static final int MEDIA_TYPE_TTS = 1;
        public static final int MEDIA_TYPE_INVALD = 2;

        public final static int FOLLOW_ACTION_KEEP_SESSION = 1;
        public final static int FOLLOW_ACTION_NO_KEEP_SESSION = 2;

        public static final int HTTP_METHOD_GET = 0;
        public static final int HTTP_METHOD_POST = 1;
        public static final int HTTP_METHOD_PUT = 2;

        public static final int TASK_TYPE_NORMAL = 0;     //music story ...
        public static final int TASK_TYPE_CLOCK = 1;
        public static final int TASK_TYPE_ALERT = 2;
        public static final int TASK_TYPE_RING_TONE = 3;
        public static final int TASK_TYPE_CALL = 4;
        public static final int TASK_TYPE_CALL_TTS = 5;
        public static final int TASK_TYPE_INVALD = 6;
        public int mId;
        /**
         * decoder type, one of DECODER_TYPE_XXX
         */
        public int mDecodeType;
        public int mLength;
        public int mDuration;
        /**
         * media type, one of MEDIA_TYPE_XXX
         */
        public int mMediaType;

        public String mUrl;

        /**
         * follow action, one of FOLLOW_ACTION_XXX
         */
        public int mFollowAction;
        public String mSessionId;
        /**
         * http method, one of HTTP_METHOD_XXX
         */
        public int mHttpMethod;
        public String mRequestBody;
        /**
         * task type, one of TASK_TYPE_XXX
         */
        public int mTaskType;
        public String mCallbackValue;
        public String mPhoneNumber;
    }
```

## 如何获得技术支持
涂鸦帮助中心:  https://support.tuya.com/zh/help  
提交技术工单:  https://iot.tuya.com/council/   