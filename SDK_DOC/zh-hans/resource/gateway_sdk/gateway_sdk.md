# 功能概述

Android 设备 SDK 是一套融合了网关、日志系统、语音功能以及 ota 升级等功能的开发套件，开发者可以基于该 sdk 实现入网、语音控制、固件和 apk 升级等操作。

**应用场景**

本方案适用于 对 **传统带屏的 Android 设备** 的智能化改造。在传统的带屏 Android 设备基础上，通过在原有 ROM 内集成 Tuya 的开发包，并增加 Tuya 的硬件通信模块，实现对网关、设备、语音等的控制能力。

**目标领域**

如 带屏场景面板、可视对讲、带屏音箱、电视等；

**适用范围**

1. 产品基于 Android 系统
2. 带屏的 Android 设备
3. 需要在屏上显示设备、操作设备
4. 有一定底层驱动开发能力及上层交互开发能力

# 集成SDK

1. 配置 build.gradle 文件 app 的 build.gradle 文件dependencies 里添加依赖库。

	```groovy
	implementation 'com.tuya.smart:tuyasmart-libgateway:1.0.8-hrs'
	implementation 'com.tuya.smart:tuyasmart-libtestsuit:1.0.1'
	```
