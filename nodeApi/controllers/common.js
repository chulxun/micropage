const { qiniu } = require("../utils");
module.exports = class CommonController {
  //获取七牛Token
  static getQiniuToken(ctx) {
    const token = qiniu.getQiniuToken();
    ctx.body = ctx.util.resuccess("获取成功", { property: { token } });
  }

};
