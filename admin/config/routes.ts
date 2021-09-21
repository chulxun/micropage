export default [
  { name: '欢迎', path: '/welcome', icon: 'smile', component: './Welcome', access: 'canAdmin' },
  {
    name: '用户管理',
    icon: 'user',
    path: '/user',
    routes: [{ name: '用户列表', path: '/user/list', component: './user/List', access: 'canAdmin' }],
  },
  {
    name: '作品管理',
    icon: 'ProfileOutlined',
    path: '/data',
    access: 'canAdmin',
    routes: [{ name: '作品列表', path: '/data/works', component: './data/Works', }],
  },
  {
    name: '资源管理',
    icon: 'HddOutlined',
    path: '/resources',
    access: 'canAdmin',
    routes: [
      { name: '图片列表', path: '/resources/images', component: './data/Resources' },
      { name: '视频列表', path: '/resources/videos', component: './data/Resources' },
      { name: '音乐列表', path: '/resources/audio', component: './data/Resources' },
    ],
  },
  { name: '登录', path: '/login', layout: false, hideInMenu: true, component: './user/Login' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
