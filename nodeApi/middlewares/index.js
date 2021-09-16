const { logger, accessLogger } = require("../utils/log")
const { typeOf } = require("../utils/index")
const { UsersProxy } = require("../proxy")

const codeMap = {
  "-1": "操作失败",
  "200": "操作成功",
  "401": "权限不足",
  "500": "服务器错误",
  "10001": "参数错误",
}

const utilFn = {
  resuccess(message, data) {
    let res = {
      code: 0,
      message: message || codeMap["200"],
    }
    if (typeOf(data) == 'array') {
      res.data = data
    } else {
      res = Object.assign(res, data)
    }
    return res
  },
  refail(message, code) {
    let res = {
      code: code || -1,
      message: message || codeMap[code],
    }
    return res
  },
  log: logger
}

module.exports = class Middleware {
  static util(ctx, next) {
    ctx.util = utilFn
    return next()
  }

  static unauthorized(ctx, next) {
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = utilFn.refail(err.message, 401)
      } else {
        logger.error(ctx.request.url, ctx.request.body, err)
        ctx.body = utilFn.refail(err.message, 500)
      }
    })
  }

  static hasAdminRole(role) {
    return async function (ctx, next) {
      if(ctx.request.url=="/admin/user/login"){
        return next()
      }
      try {
        const id = ctx.state.user.id
        const userInfo = await UsersProxy.getByUserId(id)
        if (userInfo.role === role) {
          ctx._isAdmin = true // 管理员
          return next()
        } else {
          return ctx.body = utilFn.refail('权限不足', 401)
        }
      } catch (err) {
        return ctx.body = utilFn.refail(err.message, 500)
      }
    }
  }
  /**
     * log 处理
     * @param {*} ctx 
     * @param {*} next 
     */
  static async logHandle(ctx, next) {
    try {
      const traceId = ctx.request.header.traceId || Date.now()
      const spanId = ctx.request.header.spanId || Date.now()
      accessLogger.addContext("traceId", traceId)
      accessLogger.addContext("spanId", spanId)
      logger.addContext("traceId", traceId)
      logger.addContext("spanId", spanId)
      await next()
    } catch (e) {
      console.error("err", e)
    } finally {
      logger.clearContext()
    }
  }

}
