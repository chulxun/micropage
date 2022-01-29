import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { store } from "@/store/index";
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/:pathMatch(.*)',
  //   name: 'NotFound',
  //   component: () => import('@/views/notFound.vue'),
  //   meta: {
  //     title: '404，页面未找到'
  //   }
  // },
  {
    path: '/',
    name: 'Works',
    alias: '/works',
    component: () => import('@/views/works.vue'),
    meta: {
      requireAuth: true,
      title: '我的作品',
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '用户登录'
    }
  },
  {
    path: '/userEdit',
    name: 'UserEdit',
    component: () => import('@/views/userEdit.vue'),
    meta: {
      requireAuth: true,
      title: '用户中心'
    }
  },
  {
    path: '/template',
    name: 'Template',
    component: () => import('@/views/template.vue'),
    meta: {
      requireAuth: true,
      title: '模板中心'
    }
  },
  {
    path: '/formdata',
    name: 'FormData',
    component: () => import('@/views/formData.vue'),
    meta: {
      requireAuth: true,
      title: '我的数据'
    }
  },
  {
    path: '/formdata/:workId',
    name: 'FormDetail',
    component: () => import('@/views/formDetail.vue'),
    props: true,
    meta: {
      requireAuth: true,
      title: '数据详情'
    }
  },
  {
    path: '/editor/:workId',
    name: 'Editor',
    component: () => import('@/views/editor.vue'),
    props: true,
    meta: {
      requireAuth: true,
      title: '作品编辑'
    }
  },
  {
    path: '/pcviewer/:workId/:mode?',
    name: 'PcViewer',
    component: () => import('@/views/pcViewer.vue'),
    props: true,
    meta: {
      title: '作品详情'
    }
  },
]

const router = createRouter({
  // 采用hash 模式
  // history: createWebHashHistory(),
  // 采用 history 模式
  history: createWebHistory(),
  routes
})
router.beforeEach((to:any, from, next) => {
  if (to.matched.some((res:any) => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (store.state.user.userInfo.token) {
      next()
    }
    else {
      window.location.href = '/login';
      next()
    }
  } else {
    next()
  }
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
})
export default router