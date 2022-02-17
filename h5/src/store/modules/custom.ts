export interface State {
  [propName: string]: any;
}
const state = {
  curRouter: null,// 切换定制模板编辑器路由
}
const getters = {}
const actions = {}

const mutations = {
  //设置作品所处环境
  setCurRouter(state: State, curRouter: any) {
    state.curRouter = curRouter
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
