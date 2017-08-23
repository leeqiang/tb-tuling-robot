'use strict'
const Koa = require('koa')
const body = require('koa-body')
const config = require('config')
const _ = require('lodash')
const router = require('koa-router')()
const utils = require('./utils')
const Chat = require('./chat')

const app = new Koa()

/*
 * 图灵机器人
 * - 聊天
 *  - 接收来自 tb 的聊天事件
 *  - 将聊天内容推送到图灵
 *  - 使用消息能力将图灵返回推送给用户
 * - 安装应用事件
 *  - 企业安装应用时，将会接收到来自 tb 应用中心的 install 事件
*/
router.post(config.route, function * () {
  if (!utils.checkWebhookSign(this.query)) throw new Error('invalidWebhook')
  let { message, uid, eventType } = this.request.body
  if (eventType === 'message') {
    Chat.tu(uid, message.comment, _.noop)
  } else if (eventType === 'install') {
    let { user } = this.request.body.data
    Chat.tb(user._id, `${user.name} 你好，现在你可以和我开始聊天了。`)
  }
  this.body = {}
})

app.use(body())
app.use(router.routes())

module.exports = app
