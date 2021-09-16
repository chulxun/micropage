const { UsersProxy } = require('../proxy')
const md5 = require('md5-node')
const config = require('config')
const jwt = require('jsonwebtoken')
const jwtSecret = config.get('jwt.secret')
const jwtExpire = config.get('jwt.expire')
module.exports = class UserController {
  /**
   * 用户登录
   * @param {*} ctx
   */
  static async login(ctx) {
    const user_name = ctx.checkBody('user_name').notEmpty().value
    const password = ctx.checkBody('password').notEmpty().value
    const {is_admin} = ctx.request.body
    if (ctx.errors) {
      ctx.body = ctx.util.refail('用户名或密码错误')
      return
    }
    try {
      let user = await UsersProxy.getByUsername(user_name)
      if (!user) {
        ctx.body = ctx.util.refail('用户不存在')
        return
      }
      if (user.is_delete) {
        ctx.body = ctx.util.refail('用户已被注销')
        return
      }
      if(is_admin && user.role!=1){
         ctx.body = ctx.util.refail('只允许管理员登录')
        return
      }
     
      const verifyPwd = md5(password) == user.password
      if (!verifyPwd) {
        ctx.body = ctx.util.refail('用户名或密码错误')
        return
      }
      const token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: jwtExpire,
      })
      let { mobile, email, id, role } = user
      let data = { token, user_name: user.user_name, mobile, email, id, role }
      ctx.body = ctx.util.resuccess('登录成功', { property: data })
    } catch (err) {
      throw err
    }
  }
  /**
   * 修改密码
   * @param {*} ctx
   */
  static async changePwd(ctx) {
    const userId = ctx.state.user.id
    const old_pwd = ctx.checkBody('old_pwd').notEmpty('旧密码不能为空').len(6, 18, '密码长度超出范围(6-18)').value
    const password = ctx.checkBody('password').notEmpty('新密码不能为空').len(6, 18, '密码长度超出范围(6-18)').value
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    try {
      let user = await UsersProxy.getByUserId(userId)
      if (!user) {
        ctx.body = ctx.util.refail('用户不存在')
        return
      }
      const verifyPwd = md5(old_pwd) == user.password
      if (!verifyPwd) {
        ctx.body = ctx.util.refail('旧密码错误')
        return
      }
      const verifyPwd2 = old_pwd == password
      if (verifyPwd2) {
        ctx.body = ctx.util.refail('新密码和旧密码不能相同')
        return
      }
      await UsersProxy.updatePwd({
        id: userId,
        password: md5(password),
      })
      ctx.body = ctx.util.resuccess('操作成功')
    } catch (e) {
      throw e
    }
  }
  /**
   * 修改信息
   * @param {*} ctx
   */
  static async editUserInfo(ctx) {
    const userId = ctx.state.user.id
    const user_name = ctx.checkBody('user_name').notEmpty('用户名不能为空').len(4, 20, '用户名长度超出范围(4-20)').value
    const email = ctx.checkBody('email').notEmpty('邮箱不能为空').isEmail('邮箱格式不正确').value
    const mobile = ctx.checkBody('mobile').notEmpty('手机号不能为空').isLength(11, '手机号格式不正确').toInt().value
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    try {
      let user = await UsersProxy.getByUsername(user_name)
      if (user && user.id != userId) {
        ctx.body = ctx.util.refail('该用户名已存在')
        return
      }
      await UsersProxy.updateUser({
        id: userId,
        user_name,
        email,
        mobile,
      })
      ctx.body = ctx.util.resuccess('操作成功')
    } catch (e) {
      throw e
    }
  }
  /**
   * 后台 用户列表
   * @param {*} ctx
   */
  static async list(ctx) {
    try {
      const {
        pageSize = 10,
        current: { pageIndex = 1 },
        ...otherQuery
      } = ctx.request.query
      let params = {}
      //过滤掉参数中的空值
      for (let key in otherQuery) {
        if (otherQuery[key]) {
          if (key == 'startTime' || key == 'endTime') {
            params.create_at = { $gte: otherQuery['startTime'], $lte:otherQuery['endTime'] }
          } else {
            params[key] = otherQuery[key]
          }
        }
      }
      const list = await UsersProxy.getList({ params, pageIndex, pageSize })
      const count = await UsersProxy.getCount(params)
      const data = {
        total: count,
        data: list,
      }
      ctx.body = ctx.util.resuccess(null, data)
    } catch (err) {
      throw err
    }
  }

  /**
   * 后台 用户注册
   * @param {*} ctx
   */
  static async register(ctx) {
    const user_name = ctx.checkBody('user_name').notEmpty('用户名不能为空').len(4, 20, '用户名长度超出范围(4-20)').value
    const password = ctx.checkBody('password').notEmpty('密码不能为空').len(6, 18, '密码长度超出范围(6-18)').value
    const role = ctx.checkBody('role').notEmpty('身份不能为空').value
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    try {
      let user = await UsersProxy.getByUsername(user_name)
      if (user) {
        ctx.body = ctx.util.refail('用户名已被使用', 2)
        return
      } else {
        await UsersProxy.addUser(user_name, md5(password), role, ctx.request.body.email, ctx.request.body.mobile)
        ctx.body = ctx.util.resuccess('注册成功')
      }
    } catch (err) {
      throw err
    }
  }
  /**
   * 后台 修改密码
   * @param {*} ctx
   */
  static async changePwdAdmin(ctx) {
    const userId = ctx.checkBody('user_id').notEmpty('用户id不能为空').value
    const password = ctx.checkBody('password').notEmpty('新密码不能为空').len(6, 18, '密码长度超出范围(6-18)').value
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    try {
      let user = await UsersProxy.getByUserId(userId)
      if (!user) {
        ctx.body = ctx.util.refail('用户不存在')
        return
      }
      const verifyPwd2 = user.password == md5(password)
      if (verifyPwd2) {
        ctx.body = ctx.util.refail('新密码和旧密码不能相同')
        return
      }
      await UsersProxy.updatePwd({
        id: userId,
        password: md5(password),
      })
      ctx.body = ctx.util.resuccess('操作成功')
    } catch (e) {
      throw e
    }
  }
  /**
   * 后台 注销用户
   * @param {*} ctx
   */
  static async writeOffUserAdmin(ctx) {
    const userId = ctx.checkBody('user_id').notEmpty('用户id不能为空').value
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    try {
      let user = await UsersProxy.getByUserId(userId)
      if (!user) {
        ctx.body = ctx.util.refail('用户不存在')
        return
      }
      await UsersProxy.writeOff({
        id: userId,
      })
      ctx.body = ctx.util.resuccess('操作成功')
    } catch (e) {
      throw e
    }
  }
  /**
   * 后台 恢复用户
   * @param {*} ctx
   */
  static async recoveryUserAdmin(ctx){
 const userId = ctx.checkBody('user_id').notEmpty('用户id不能为空').value
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    try {
      let user = await UsersProxy.getByUserId(userId)
      if (!user) {
        ctx.body = ctx.util.refail('用户不存在')
        return
      }
      await UsersProxy.recovery({
        id: userId,
      })
      ctx.body = ctx.util.resuccess('操作成功')
    } catch (e) {
      throw e
    }
  }
}
