Teambition 图灵机器人
============

## 创建 teambition 应用

1、访问 [Teambition 开发者中心](https://developer.teambition.com)，创建应用后，选择「`Webhook 配置`」，填入地址`http://{host}/robotapp/tuling`(本服务的地址)
2、复制应用的信息到配置文件`config/release.json`

## 注册 图灵机器人 账号
- 图灵接口地址
- 图灵接口调用key

(补充到配置文件)

## 配置
- port: 服务端口
- client_id: teambition 应用 client_id
- client_secret: teambition 应用 client_secret
- route: 服务路由, 默认`/robotapp/tuling`
- tu_url: 图灵消息接口
- tu_key: 图灵接口调用 key
- tu_error_text: 图灵接口默认错误信息(to tb)
- tb_developer_api: teambition 消息接口
- tb_key: teambition 消息机器人 key(用于调用消息接口)
- hook_expired: webhook 有效时间验证, 默认5分钟

## 运行

补充`config/release.json`中缺失了配置后，运行`NODE_ENV=release node app`

## 其他
- [teambition 消息能力介绍](http://help.teambition.net/开发者中心/消息能力)
