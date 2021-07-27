/* history 撤销重做
*  作为vuex的plugin引入，store的每一步操作都计入历史
*/
import { cloneDeep } from "lodash";
import unReHistory from './history'
export interface State {
  [propName: string]: any;
}
const recordHistoryMutationTypes = [
  'editor/setEditingElement',
  'editor/operateElement',
  'editor/setEditingPageProps'
]
const historyPlugin = (store: any) => {
  unReHistory.initHistory(store)
  // 当 store 初始化后调用 符合条件的commit 被计入history
  store.subscribe((mutation: any, state: State) => {
    const { type } = mutation
    // console.log(type)
    if (!recordHistoryMutationTypes.includes(type)) return
    unReHistory.addState(cloneDeep(state.editor))
  })
}
export default historyPlugin