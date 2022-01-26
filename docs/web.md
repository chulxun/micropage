# 微页 web 端介绍

技术栈：[Vue 3.2](https://v3.cn.vuejs.org/) + Typescript + [Vite](https://www.vitejs.net/)

编辑器使用的框架：[element-plus](https://element-plus.gitee.io/zh-CN/)

作品使用的框架：[vant](https://vant-contrib.gitee.io/vant/v3/#/zh-CN)

注意：

编辑器中所使用的图标库：element-plus 自带、阿里巴巴图标库

作品中图标库：vant 自带

# H5 文件目录

```
├── public //静态资源存放
├── src
│   ├── api    //http请求都在这里
│   ├── comopnents //页面组件
│   │  ├── common     //其他页面需要的公共组件
│   │  ├── editor     //编辑器所有组件
│   │  └── plugins    //所有可用的页面元素插件在这里
│   │       ├── commonProps     //多次复用的插件属性编辑器
│   │       ├── mixins     //混淆js
│   │       │   └── importPlugs.ts  //引入所有组件文件
│   │       │   └── qiniuUpload.ts  //七牛云获取token、上传base64图片方法
│   │       └── plug-*     //插件详情（除了plugin-page，必须包含以下2个文件）
│   │       │   ├── editor.vue  //插件属性编辑器
│   │       │   └── index.vue  //插件UI、逻辑
│   │       ├── editor.vue  //插件编辑器使用前封装
│   │       └── element.vue  //插件使用前封装
│   ├── css
│   │   └── reset.less  //公用css
│   ├── data     //所有静态数据
│   │
│   ├──router    //路由
│   │   └── index.ts
│   ├──store          //状态管理
│   │  ├── model     //作品、组件元素模型
│   │  ├── modules     //分模块管理所有状态
│   │  ├── plugins     //插件，现有操作历史插件
│   │  └── index.ts
│   ├──utils          //状态管理
│   │  ├── animate.ts     //所有可使用动画列表
│   │  ├── element.ts     //每个组件的公用封装方法
│   │  ├── gVerify.ts     //生成验证码
│   │  ├── htmlToSvg.ts     //html转为图片的方法
│   │  └── index.ts   //常用方法
│   ├──views    //页面
│   ├──viewer          //作品预览
│   │  ├── app.vue     //渲染页面
│   │  ├── index.html     //html模板
│   │  └── entry.ts    //入口文件
│   ├──app.vue    //主页面
│   └──main.ts    //入口文件
│
│
├── package-lock.json
├── package.json
└── index.html         //html模版文件
```

## 项目本地运行

```
1、npm install
2、npm run dev
   预览：http://localhost:9001
```

## 项目部署

```
1、npm run build
2、将dist中打包好的文件上传到服务器
3、nginx配置（省略）
```