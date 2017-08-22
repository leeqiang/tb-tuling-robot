const config = require('config')
const request = require('request')
const _ = require('lodash')

/**
 * 发送消息到图灵
 */
const requestToTuling = function (_userId, text, callback) {
  request({
    url: config.tu_url,
    method: 'POST',
    json: true,
    body: {
      key: config.tu_key,
      info: text,
      userid: _userId
    }
  }, function (err, res, body) {
    if (!body) return callback(err, body)
    let message = ''
    switch (body.code) {
      case 100000:
        message = body.text
        break
      case 200000:
        message = `${body.text}: ${body.url}`
        break
      default:
        message = '[该消息不支持渲染]'
    }
    return callback(err, message)
  })
}

/**
 * 发送消息到 teambition
 */
const requestToTb = function (_userId, text, callback = _.noop) {
  request({
    url: config.tb_developer_api,
    method: 'POST',
    headers: {
      'x-api-key': config.tb_key,
      'content-type': 'application/json'
    },
    json: true,
    body: {
      users: [_userId],
      messageType: 'text',
      text: text
    }
  }, callback)
}

module.exports = function (_userId, message, callback) {
  requestToTuling(_userId, message, function (err, tuText) {
    // handle error
    if (err || !tuText) tuText = config.tu_error_text
    requestToTb(_userId, tuText)
  })
}
