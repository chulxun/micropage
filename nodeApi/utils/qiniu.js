const qiniu = require("qiniu");
const config = require("config")
const accessKey = config.get("qiniu.accessKey")
const secretKey = config.get("qiniu.secretKey")
const bucket = config.get("qiniu.bucket")
/**
 * 获取七牛上传Token
 */
function getQiniuToken() {
  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  let options = {
    scope: bucket,
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken = putPolicy.uploadToken(mac);
  return uploadToken;
}



module.exports = {
  getQiniuToken
};
