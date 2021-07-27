const { Users } = require("../models")

module.exports = class UsersProxy {
  //添加用户
  static addUser(user_name, password, email, mobile) {
    const user = new Users()
    user.user_name = user_name
    user.password = password
    user.email = email || ""
    user.mobile = mobile || ""
    return user.save()
  }
  //修改密码
  static updatePwd(user) {
    return Users.update(
      {
        id: user.id,
      },
      {
        $set: {
          password: user.password
        },
      }
    )
  }
  //修改用户信息
  static updateUser(user) {
    return Users.update(
      {
        id: user.id,
      },
      {
        $set: {
          user_name: user.user_name,
          email: user.email,
          mobile: user.mobile,
        },
      }
    )
  }
  //
  static getByUsername(user_name) {
    return Users.findOne({ user_name: user_name })
  }

  static getByUserId(userId) {
    return Users.findOne({ id: userId })
  }

  static find(query, opt) {
    return Users.find(query, { password: 0 }, opt) //.select('-password') //两种方法不返回 password 字段
  }
}
