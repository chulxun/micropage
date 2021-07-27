
import { ActionContext } from 'vuex'
import axios from "axios";
export interface State {
  [propName: string]: any;
}
const state = {
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"), //登录用户信息

}

const getters = {}

const actions = {}

const mutations = {
  setUserInfo(state: State, userInfo: object) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
    state.userInfo = userInfo
    if (state.userInfo.token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.userInfo.token;
    }
  },
  delUserInfo(state: State) {
    localStorage.removeItem("userInfo")
    state.userInfo = {}
    axios.defaults.headers.common['Authorization'] = ""
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}