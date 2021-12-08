# 微页接口项目

koa 框架 + mongodb 数据库

## 项目结构

项目下主要文件目录介绍：

```
├── config
│   └── default.json    //开发环境配置
│   └── production.json //生产环境配置
├── controllers     //处理业务逻辑
│   ├── index.js
│   └── works.js
├── middlewares    //中间件 用于请求拦截、数据包装
│   └── index.js
├── utils          //工具类
│   ├── index.js   //常用方法
│   ├── qiniu.js   //七牛云 获取token以及其他方法写这里
│   └── log.js     //log4js 配置
├── models         //定义数据库对象关系映射
│   ├── index.js
│   └── works.js
├── package.json
├── proxy          //数据库增删改查
│   ├── index.js
│   └── works.js
├── router.js       //接口路由配置
└── app.js  //入口文件

```

## 创建 mongo 数据库

```
以下创建信息以config/default.json中的连接信息为例：
（假设mongo已安装，mongo服务器已启动）
1、打开mongo命令行：
  linux\mac: (任何目录)mongo
  windows: cmd到mongo.exe所在目录，输入命令：mongo.exe
2、创建数据库：use micropageDB
3、创建用户：
db.createUser({
  user: 'micropage',
  pwd: '123456',
  roles:[{
    role: 'readWrite',
    db: 'micropageDB'
  }]
})
```

## 项目运行

```
1、安装依赖 npm install
2、配置上传接口所需对象存储平台的密匙(目前是七牛云，其他平台代码需要自己实现)
 将config文件下文件名改为以下，并配置
  config/default.json
  config/production.json
3、配置mongodb数据库连接信息
  config/default.json
  config/production.json
4、本地运行项目：（端口：4000）预览：http://localhost:4000
   npm run dev

   生产环境运行项目：（端口：8000）预览：http://localhost:8000
   npm start
```

## 服务器部署

```
1、代码部署到服务器
2、创建数据库、创建用户，根据自己的数据库以及用户信息修改production.json 中的数据库连接
3、npm install
4、服务器安装pm2（已安装，跳过）
5、(项目根目录下)pm2负载均行模式运行项目：
   linux\mac: pm2 start -n micropage-api -i max npm -- start

   windows:pm2 start cmd.js -n micropage-api -i max
   cmd.js文件内容：
   const cmd = require('node-cmd');
   cmd.run('npm run start');

   综上，完成部署：
   预览：http://localhost:9001
```
