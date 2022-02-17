// 定制模板分享配置，每个活动都会有，单出提出来
import SharePage from './index.vue'
import shareEditor from './editor.vue'
import {shallowRef} from 'vue'
// 将 component包装成 响应式对象 ，vue会警告可能存在的性能消耗，我们这里用shallowRef包裹可解决这个问题

export const shareRouter = {
  // title 是展示在编辑器左侧菜单的名字
  title: '分享配置',
  component: shallowRef(SharePage),
  // 不展示在路由中
  hide: true,
  editor: [{ tabName: '分享配置', key: 'share', component: shallowRef(shareEditor) }],
}
