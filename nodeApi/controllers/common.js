const qiniu = require("../utils/qiniu");
module.exports = class CommonController {
  /**
   * 接口: 获取七牛云Token
   * 应用: H5
   */
  static getQiniuToken(ctx) {
    const token = qiniu.getQiniuToken();
    ctx.body = ctx.util.resuccess("获取成功", { property: { token } });
  }

};
