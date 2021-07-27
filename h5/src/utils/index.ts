//用于生成ukey 每个元素的唯一标识
export function creatUkey(): string {
  var k = parseInt(new Date().getTime() / 1000 + '') + parseInt((Math.random() * 1000000) + '').toString(32)
  return k
}
//格式化时间
export function formatDate(timestamp: number, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (!timestamp) {
    return '-'
  }
  if (typeof timestamp == 'string') {
    timestamp = parseInt(timestamp);
  }
  var date = new Date(timestamp);
  var o: any = {
    "Y+": date.getFullYear(),                //年份
    "M+": date.getMonth() + 1,                 //月份
    "d+": date.getDate(),                    //日
    "h+": date.getHours(),                   //小时
    "m+": date.getMinutes(),                 //分
    "s+": date.getSeconds(),                 //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
/**
 * 从地址栏中获取参数  location.search
 * @param name
 * @returns {*}
 * @constructor
 */
export function getSearchQueryString(name: string) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)
    return (r[2]);
  return null;
}
//加载一张图片
export async function loadImg(url: string) {
  return new Promise((resolve, reject) => {
    // 创建图片
    var img = new Image();
    if (url.indexOf("http") == 0) {
      img.setAttribute("crossOrigin", "anonymous");
    }
    // 加载成功
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      resolve("");
      console.log(e);
    };
    img.src = url;
  });
}
