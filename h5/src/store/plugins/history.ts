/* history 撤销重做
*  作为vuex的plugin引入，store editor命名空间的每一步操作都计入历史
*/
import { cloneDeep } from "lodash";

class History {
  store: any;
  historyList: any;
  curIndex: number;
  constructor() {
    this.historyList = [];//历史记录
    this.curIndex = -1;//当前所在记录的index
  }
  get canUndo() {
    return this.curIndex > 0;
  }

  get canRedo() {
    return this.historyList.length > this.curIndex + 1;
  }

  initHistory(store: any) {
    this.store = store;
  }

  addState(state: any) {
    if (this.curIndex + 1 < this.historyList.length) {
      this.historyList.splice(this.curIndex + 1);
    }
    this.historyList.push(state);
    this.curIndex++;
    this.store.commit('common/setCanUndo', this.canUndo)
    this.store.commit('common/setCanRedo', this.canRedo)
  }
  undo() {
    if (!this.canUndo) return;
    const prevState = this.historyList[this.curIndex - 1];
    this.store.state.editor = cloneDeep(prevState)
    this.curIndex--;

    this.store.commit('common/setCanUndo', this.canUndo)
    this.store.commit('common/setCanRedo', this.canRedo)
  }

  redo() {
    if (!this.canRedo) return;
    const nextState = this.historyList[this.curIndex + 1];
    this.store.state.editor = cloneDeep(nextState)
    this.curIndex++;
    this.store.commit('common/setCanUndo', this.canUndo)
    this.store.commit('common/setCanRedo', this.canRedo)
  }
}

const unReHistory = new History();
export default unReHistory;