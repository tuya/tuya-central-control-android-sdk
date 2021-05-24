# 用户账号管理

## 用户数据模型

### User

| 字段              | 描述                                                         |
| :---------------- | :----------------------------------------------------------- |
| headPic           | 用户头像链接                                                 |
| nickName          | 用户昵称                                                     |
| username          | 用户名 如果主账号是手机号，username 就是手机号 如果主账号是邮箱，username 就是邮箱 |
| mobile            | 手机号                                                       |
| email             | 邮箱                                                         |
| phoneCode         | 国家码 例如： 86：中国 1：美国                               |
| Domain.regionCode | 当前账号所在的国家区域。AY：中国，AZ：美国，EU：欧洲         |
| timezoneId        | 用户时区信息，例如： `Asia/Shanghai`                         |
| tempUnit          | 温度单位。1：`°C`， 2：`°F`                                  |
| snsNickname       | 第三方账号的昵称                                             |
| regFrom           | 账号注册的类型 0: 邮箱 1: 手机 2: 注册（其它） 3: qq 5: facebook 6: twitter 7: weixin 9: uid 10: google |

## 账号退出登录

### 账号退出登录

#### 示例

```java
TuyaHomeSdk.getUserInstance().logout(new ILogoutCallback() {
  @Override
  public void onSuccess() {
    //退出登录成功
  }

  @Override
  public void onError(String errorCode, String errorMsg) {
  }
});
```

## 登录会话过期

会话（Session）由于可能存在一些异常或者在一段时间不操作（45 天）会失效掉，修改密码，注销账户等会也走这个流程，这时候需要退出应用，重新登录获取 Session。

**接口说明**

```java
TuyaHomeSdk.setOnNeedLoginListener(INeedLoginListener needLoginListener);
```

**实现回调**

```java
needLoginListener.onNeedLogin(Context context);
```

**代码示例**

```java
TuyaHomeSdk.setOnNeedLoginListener(new INeedLoginListener() {
  @Override
  public void onNeedLogin(Context context) {

  }
});
```

**注意事项**

- 建议在 Application 中注册该监听。
- 一旦出现此类回调，请跳转到扫码登录页面，让用户重新登录。