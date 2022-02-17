import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import common from './modules/common'
import editor from './modules/editor'
import custom from './modules/custom'
import user from './modules/user'
import historyPlugin from './plugins/index'
export interface State {
  [propName: string]: any;
}
// define injection key
export const key: InjectionKey<Store<State>> = Symbol()
export const store = createStore<State>({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    common, editor, user,custom
  },
  plugins: [historyPlugin]
})
// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key)
}


