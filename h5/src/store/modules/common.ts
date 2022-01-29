
import { ActionContext } from 'vuex'
export interface State {
  [propName: string]: any;
}
const state = {
  operaType: 0, //编辑器左边功能 type
  scaleValue: 1,//画布缩放值  0.5-2之间
  canUndo: false,//可以撤销
  canRedo: false,//可以重做
  rulerVisible: false,//显示标尺
}


const getters = {}


const actions = {

}

const mutations = {
  //设置编辑器左边功能 type
  setOperaType(state: State, payload: number) {
    state.operaType = payload
  },
  //设置画布缩放值
  setScaleValue(state: State, payload: number) {
    state.scaleValue = payload
  },
  //设置是否可撤销
  setCanUndo(state: State, payload: any) {
    state.canUndo = payload
  },
  //设置是否可重做
  setCanRedo(state: State, payload: any) {
    state.canRedo = payload
  },
  //设置显示隐藏标尺
  setRulerVisible(state: State, payload: any) {
    state.rulerVisible = payload
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
