# 二维码授权登录

## 流程说明

> [!WARNING]  
>
> 二维码授权登录，需要完成 [应用开启白名单](app_white_list.md) 章节，将开发的 SDK 应用开启白名单后，才能进行以下操作
>

二维码授权登录功能适用于 APP 扫码授权另一台设备登录相同账号。设备可以是中控设备、TV 、平板设备等。完整授权流程如下：

![二维码授权登录](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/goat/20201228/b61cf5a33f764fe3878bf385f6759245.png)

图中标注的关键步骤解释：

- ①：获取 token

	设备请求接口获取授权流程使用的 token，接口为`getQRCodeToken`

- ②：生成二维码

	将获取到的 token，使用特定格式生成二维码：

	格式为：`tuyaSmart--qrLogin?token=xxxxxxx`，例如：`tuyaSmart--qrLogin?token=AZc72de000-ec00-4000-9e51-b610fc300000`

	生成二维码后

	![二维码授权登录](https://images.tuyacn.com/fe-static/docs/img/b809c242-2b1e-418a-8906-dc2aba5d3a1d.png)

	将上面字符串生成二维码展示在设备的屏幕中。用于在手机 app 中扫码授权使用。

- ③：获取登录状态

	向服务端轮训获取是否授权成功，如果授权成功后将返回用户信息，跳转进入应用主页，进入后续操作。

	接口为： `QRCodeLogin`

- ④：扫描二维码

	app 扫描设备上的二维码，将二维码中 token 解析出来，进行授权操作。

- ⑤：授权

	app 端将解析出的二维码发送到云端，完成授权动作。

	授权接口为`QRcodeAuth`

## 接口说明

### 用户获取 Token

```java
void getQRCodeToken(String countryCode, IGetQRCodeTokenCallback callback);
```

**参数说明**

| 参数        | 说明               |
| :---------- | :----------------- |
| countryCode | 国家区号，例如：86 |
| callback    | 回调               |

**示例代码**

```java
TuyaHomeSdk.getUserInstance().getQRCodeToken("86", new IGetQRCodeTokenCallback() {
    @Override
    public void onSuccess(String token) {

    }

    @Override
    public void onError(String code, String error) {

    }
});
```

### 获取登录状态

```java
void QRCodeLogin(String countryCode, String token, ILoginCallback callback);
```

**参数说明**

| 参数        | 说明                                    |
| :---------- | :-------------------------------------- |
| countryCode | 国家区号，例如：86                      |
| token       | token:  用户获取 token 接口返回的 token |
| callback    | 回调                                    |

**示例代码**

```java
TuyaHomeSdk.getUserInstance().QRCodeLogin("86", "-------token------", new ILoginCallback() {
    @Override
    public void onSuccess(User user) {
        if (user != null && !TextUtils.isEmpty(user.getSid())){
            // 登录成功 存储用户信息
            TuyaHomeSdk.getUserInstance().loginSuccess(user);
            //获取 homeId
            Object homeId = user.getExtras().get("homeId");
            // 登录成功后可以跳转到主页
            gotoHomePage();
        }
    }

    @Override
    public void onError(String code, String error) {
			if("USER_QR_LOGIN_TOKEN_EXPIRE".equals(code)){
        // 如果二维码过期，重新获取一下 token，更新二维码
        getToken();
      }
    }
});
```

在登录的用户信息中，可以获取到手机 app 端授权后的 homeId ，保存该 homeId, 在后面章节中有用到该 homeId。

> [!NOTE]  
>
> 二维码过期时间是5分钟，如果二维码过期，重新调用获取 token 接口，更新二维码

### 授权接口

```java
void QRcodeAuth(String countryCode, long homeId, String token, IBooleanCallback callback);
```

**参数说明**

| 参数        | 说明                                                         |
| :---------- | :----------------------------------------------------------- |
| countryCode | 国家区号，例如：86                                           |
| homeId      | 家庭 ID。请参考家庭相关章节获取                              |
| token       | token: 解析后的 token <br />例如二维码的原始信息为：tuyaSmart--qrLogin?token=AZc72de000-ec00-4000-9e51-b610fc300000<br />则 token 为：AZc72de000-ec00-4000-9e51-b610fc300000 |
| callback    | 回调                                                         |

**示例代码**

```java
TuyaHomeSdk.getUserInstance().QRcodeAuth("86", mHomeId, token, new IBooleanCallback() {
    @Override
    public void onSuccess() {

    }

    @Override
    public void onError(String code, String error) {

    }
});
```