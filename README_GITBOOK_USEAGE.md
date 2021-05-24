# Gitbook 使用

## 一、安装 gitbook

也可以自行百度。

```bash
npm install gitbook -g
npm install -g gitbook-cli
```

进入`SDK 文档`目录下  

如果第一次进入目录，先执行安装插件
```gitbook install```

## 二、Build book

需要构建的时候执行`gitbook build` 

```bash
➜ gitbook build
info: parsing multilingual book, with 2 languages

.....

info: found 36 pages
info: found 15 asset files
info: >> generation finished with success in 4.4s !
```





## 三、预览 Book

执行 `gitbook serve`

```java
➜  sdk_3.0_new git:(release/v2.7.5) ✗ gitbook serve
Live reload server started on port: 35729
Press CTRL+C to quit ...

.....

Starting server ...
Serving book on http://localhost:4000

```



浏览器进入http://localhost:4000 即可预览

每次保存修改的 Markdown 文件时候，预览会变。