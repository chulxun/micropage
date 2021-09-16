const Koa = require("koa");
const config = require("config");
const koaBody = require("koa-body");
const validate = require("koa-validate");
const onerror = require("koa-onerror");
const cors = require("koa2-cors");
const koaJwt = require("koa-jwt");
const pathToRegexp = require("path-to-regexp").pathToRegexp;
const views = require("koa-views");
const static = require("koa-static");
const path = require("path");
const { logger, accessLogger } = require("./utils/log");
const log4js = require("koa-log4")
const routerConfig = require("./router");
const middleware = require("./middlewares");
const jwtSecret = config.get("jwt.secret");

const app = new Koa();
app.proxy = true;
onerror(app);
validate(app);

app.on("error", function (err, ctx) {
  logger.error(err);
});

const whitePath = [
  //白名单路径 不需要校验用户登录信息
  "/api/common/only/getQiniuToken",
  "/api/user/login",
  "/api/form/submitData",
  "/api/works/getWorkDetail",
  "/admin/user/login",
];

app
  .use(log4js.koaLogger(accessLogger))
  .use(
    static(path.join(__dirname, "./public/"), {
      maxage: 7 * 24 * 60 * 60 * 1000,
    })
  )
  .use(
    views(path.join(__dirname, "./views"), {
      extension: "ejs",
    })
  )
  .use(
    cors({
      origin: "*",
      maxAge: 5, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
      allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
      exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
    })
  )
  .use(middleware.logHandle)
  .use(middleware.util)
  .use(middleware.unauthorized)
  .use(
    koaJwt({ secret: jwtSecret }).unless((ctx) => {
      return pathToRegexp(whitePath).test(ctx.path);
    })
  )
  .use(
    koaBody({
      multipart: true,
      formLimit: '1000kb'//扩容body请求体限制
    })
  )
  .use(routerConfig.routes())
  .use(routerConfig.allowedMethods());

const port = config.get("port");
const host = config.get("host");
app.listen(port, host);
logger.info(`server started at http://${host}:${port}`);
