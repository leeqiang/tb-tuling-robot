'use strict'
const crypto = require('crypto')
const config = require('config')

/**
 * 加密生成 webhook 签名
 */
let webhookEncode = function () {
  let keys = []
  for (let i = 0; i < arguments.length; i++) {
    let key = arguments[i]
    keys.push(key)
  }
  keys.sort()
  let val = keys.join('')
  return crypto.createHash('sha1').update(val).digest('hex')
}

/**
 * 检测 webhook 签名是否合法
 * - 参数
 *  - query
 *    - timestamp
 *    - nonce
 *    - sign
 * - 返回
 *  - 合法: true
 *  - 不合法: false
 */
exports.checkWebhookSign = function (query) {
  let hookExpired = config.hook_expired || 5 * 60 * 1000
  if (new Date().getTime() - parseInt(query.timestamp) < hookExpired) {
    return webhookEncode(config.client_secret, query.timestamp, query.nonce) === query.sign
  } else {
    return false
  }
}
