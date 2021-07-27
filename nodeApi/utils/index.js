const request = require("request");
const qiniu = require("./qiniu");

/**
 * 判断是否Object类型
 * @param {Object} obj
 */
function isObject(obj) {
  if (typeof obj == "object") {
    if (obj instanceof Object) {
      return true;
    }
    return false;
  }
  return false;
}

/**
 * 判断是否空Object
 * @param {Object} obj
 */
function isEmptyObject(obj) {
  if (isObject(obj)) {
    if (Object.keys(obj).length > 0) {
      return false;
    }
    return true;
  }
  return true;
}
/**
 * 判断类型
 * @param {Object} obj
 */
function typeOf(obj) {
  let res = Object.prototype.toString.call(obj).split(" ")[1];
  res = res.substring(0, res.length - 1).toLowerCase();
  return res;
}
//用于生成work_id
function creatWorkId() {
  var k = ""
  var h = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  ]
  for (let j = 0; j < 8; j++) {
    k += h[(parseInt((Math.random() * 100000000 % 62).toString()))]
  }
  return k
}

function getClientIP(req) {
  return (
    req.headers["x-forwarded-for"] || req.headers["x-real-ip"] // 判断是否有反向代理 IP
  );
}

/**
 * 网络请求，目前只支持get
 * @param {Object} url
 */
function serviceRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  })
}

module.exports = {
  isObject,
  isEmptyObject, typeOf, creatWorkId,
  getClientIP,
  request: serviceRequest,
  qiniu
};
