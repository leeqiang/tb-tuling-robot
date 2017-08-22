'use strict'
const Koa = require('koa')
const body = require('koa-body')
const config = require('config')
const _ = require('lodash')
const router = require('koa-router')()
const utils = require('./utils')
const chat = require('./chat')

const app = new Koa()

/*
 * 图灵机器人
 * - 接收来自 tb 的聊天事件
 * - 将聊天内容推送到图灵
 * - 使用消息能力将图灵返回推送给用户
*/
router.post(config.route, function * () {
  if (!utils.checkWebhookSign(this.query)) throw new Error('invalidWebhook')
  let { message, uid } = this.request.body
  chat(uid, message.comment, _.noop)
  this.body = {}
})

app.use(body())
app.use(router.routes())

module.exports = app
