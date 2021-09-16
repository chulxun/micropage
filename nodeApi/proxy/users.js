const { Users } = require("../models")

module.exports = class UsersProxy {
  //添加用户
  static addUser(user_name, password,role, email, mobile) {
    const user = new Users()
    user.user_name = user_name
    user.password = password
    user.role = role
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
    //注销用户
  static writeOff(user) {
    return Users.update(
      {
        id: user.id,
      },
      {
        $set: {
          is_delete: 1
        },
      }
    )
  }
   //恢复用户
  static recovery(user) {
    return Users.update(
      {
        id: user.id,
      },
      {
        $set: {
          is_delete: 0
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
  //根据用户名查找用户
  static getByUsername(user_name) {
    return Users.findOne({ user_name: user_name })
  }
  //根据id查找用户
  static getByUserId(userId) {
    return Users.findOne({ id: userId })
  }
  //根据条件查找用户
  static find(query, opt) {
    return Users.find(query, { password: 0 }, opt)
  }
  //根据条件 分页获取用户列表 时间倒序
  static getList({params,  pageSize, pageIndex }) {
    console.log(params)
    return Users.find(params)
      .skip((pageIndex * 1 - 1) * pageSize)
      .limit(pageSize * 1)
      .sort({ "id": -1 })
  }
   //根据条件 获取用户数量
  static getCount (params){
     return Users.countDocuments(params)
  }
}
