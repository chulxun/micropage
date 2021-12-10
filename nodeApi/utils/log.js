const path = require('path')
const log4js = require('koa-log4')
const config = require('config')

const logType = config.get('logType')
const logPath = config.get('logPath')

const pattern = '[%d{yyyy-MM-dd hh:mm:ss.SSS}][%z][weiye_node_api][%p][%c][traceId=%X{traceId}][SpanId=%X{spanId}] %m'

log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
      pattern: '.yyyy-MM-dd.log',
      filename: `${logPath}/access.log`, //生成文件名
      alwaysIncludePattern: true, // 输出的日志文件名是都始终包含 pattern 日期结尾
      layout: {
        type: 'pattern',
        pattern: pattern,
      },
    },
    application: {
      type: 'dateFile',
      pattern: '.yyyy-MM-dd.log',
      filename: `${logPath}/application.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: pattern,
      },
    },
    out: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: pattern,
      },
    },
  },
  categories: {
    default: { appenders: ['out'], level: 'ALL' },
    access: { appenders: ['access'], level: 'INFO' },
    application: { appenders: ['application'], level: 'INFO' },
  },
})

exports.logger = log4js.getLogger(logType) //应用级别的日志
exports.accessLogger = log4js.getLogger(logType == 'application' ? 'access' : 'out') //访问级别的日志
