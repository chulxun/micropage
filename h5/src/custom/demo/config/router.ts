/**
 * 模版 路由配置
* */
import Home from '../views/home.vue'
import Rule from '../views/rule.vue'
import { shareRouter } from '../../common/share/config'
import basicEditor from '../editor/basic.vue'
import homeEditor from '../editor/home.vue'
import ruleEditor from '../editor/rule.vue'
import {shallowRef} from 'vue'
// 将 component包装成 响应式对象 ，vue会警告可能存在的性能消耗，我们这里用shallowRef包裹可解决这个问题

const routers = [{
  // title 是展示在编辑器左侧菜单的名字
  title: '活动首页',
  path: '/home',
  component: shallowRef(Home),
  editor: [
    { tabName: '基础配置', key: 'basic', component: shallowRef(basicEditor) },
    { tabName: '首页配置', key: 'home', component:shallowRef(homeEditor) },
  ],
},
{
  title: '活动规则',
  path: '/rule',
  component:  shallowRef(Rule),
  editor: [{ tabName: '规则页配置', key: 'rule', component: shallowRef(ruleEditor) }],
},
// 分享配置页
shareRouter,
]

export default routers