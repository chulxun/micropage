# 微页 admin 端 后台管理系统介绍

技术栈：[React 17.X](https://zh-hans.reactjs.org/docs/getting-started.html) + TypeScript + [Ant Design Pro](https://pro.ant.design)

# admin 文件目录

```
├── config                   # umi 配置，包含路由，构建等配置
├── mock                     # 本地模拟数据
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── global.less          # 全局样式
│   └── global.ts            # 全局 JS
├── tests                    # 测试工具
├── README.md
└── package.json
```

## 项目本地运行

```
1、npm install
2、npm run dev
   预览：http://localhost:8000


```

## 项目部署

```
1、npm run build
2、将dist中打包好的文件上传到服务器
3、nginx配置（省略）


```
