import Work from '../model/work';
import Element from '../model/element';
import { createWork, getWorkInfo, updateWork } from '@/api/works';
import { ActionContext } from 'vuex';
import { ElMessage, ElMessageBox } from "element-plus";
export interface State {
  [propName: string]: any;
}
const state = {
  workMode: 'formal', //当前作品所处环境 editor formal
  work: {},//作品model
  editingPage: { elements: [] },//当前正在被编辑的页面
  editingPageProps: {},//当前页面的page属性
  editingElement: null, //当前正在编辑元素
  copyingElement: null,//copy中的元素


}


const getters = {}


const actions = {
  //创建作品
  async createWork({ commit }: ActionContext<State, any>, payload: any) {
    let work: any = new Work(payload);
    work.pages = encodeURIComponent(JSON.stringify(work.pages))
    work.config = encodeURIComponent(JSON.stringify(work.config))
    let res = await createWork(work)
    if (res && res.code == 0) {
      ElMessageBox.confirm("作品已经创建成功，是否去编辑作品?", "成功提醒", {
        confirmButtonText: "去编辑",
        cancelButtonText: "留在原地",
      })
        .then(() => {
          let url = "/editor/" + res.property.work_id;
          window.open(url, '_blank')
        })
        .catch(() => {
          //留在原地
        });
    } else {
      ElMessage.error(res.message)
    }
  },
  //获取作品详情
  async setWorkInfo({ commit }: ActionContext<State, any>, payload: any) {
    const res = await getWorkInfo({ work_id: payload.workId });
    if (res && res.code == 0) {
      let work = res.property;
      commit('setWorkInfo', work);
      commit('setWorkMode', 'editor')
      if (work && work.pages && work.pages.length > 0) {
        let editingPage: any = work?.pages[0];
        //设置当前编辑page
        commit('setEditingPage', editingPage);
        //设置当前page 背景相关属性
        let editPageEle: any = editingPage?.elements.find(
          (e: any) => e.name === "plug-page"
        );
        commit('setEditingPageProps', editPageEle.props);
      }
    } else {
      ElMessage.error(res.message);
    }
  },
  //保存作品
  async saveWork({ commit }: ActionContext<State, any>) {
    let work: any = JSON.parse(JSON.stringify(state.work));
    work.pages = encodeURIComponent(JSON.stringify(work.pages))
    work.config = encodeURIComponent(JSON.stringify(work.config))
    delete work._id;
    let res = await updateWork(work)
    if (res && res.code == 0) {
      ElMessage.success("保存成功")
    } else {
      return ElMessage.error(res.message)
    }
  }

}

const mutations = {
  //设置作品所处环境
  setWorkMode(state: State, mode: string) {
    state.workMode = mode
  },
  //设置作品详情
  setWorkInfo(state: State, payload: any) {
    state.work = payload
  },
  //设置当前正在编辑元素
  setEditingElement(state: State, payload: any) {
    state.editingElement = payload
  },
  //设置当前正在编辑页面
  setEditingPage(state: State, payload: any) {
    state.editingPage = payload
  },
  //设置当前正在编辑的页面属性
  setEditingPageProps(state: State, payload: any) {
    state.editingPageProps = payload
  },

  //组件操作 添加、复制、删除、排序
  operateElement(state: State, payload: any) {
    const { type, value } = payload;
    const { editingPage, editingElement } = state
    const elements = editingPage.elements
    const len = elements.length
    switch (type) {
      case 'add'://新增一个元素
        const element = new Element(value);
        elements.push(element);
        break
      case 'swap'://调换2个元素位置
        const { startIndex, endIndex } = value;
        let startEle = elements[startIndex]
        elements[startIndex] = elements[endIndex]
        elements[endIndex] = startEle
        break
      case 'copy'://复制元素
        if (!editingElement) return
        const copy_element = Element.copyEle(editingElement);
        elements.push(copy_element);
        state.editingElement = null;
        break;
      case 'paste'://粘贴元素
        if (state.copyingElement)
          elements.push(Element.copyEle(state.copyingElement));
        break
      case 'delete'://删除
      case 'moveup': //上移
      case 'movedown'://下移
      case 'cut'://剪切元素
        if (!editingElement) return
        let index = elements.findIndex((e: any) => e.ukey === editingElement.ukey);
        if (index != -1) {
          if (type == 'delete') {
            elements.splice(index, 1);
            state.editingElement = null;
          } else if (type == 'moveup') {
            if (index > 1) { //排除背景元素
              let curEle = elements[index]
              elements[index] = elements[index - 1]
              elements[index - 1] = curEle
            } else {
              ElMessage.warning("已经是第一个元素");
            }
          } else if (type == 'movedown') {
            if (index < (len - 1)) {//排除背景元素
              let curEle = elements[index]
              elements[index] = elements[index + 1]
              elements[index + 1] = curEle
            } else {
              ElMessage.warning("已经是最后一个元素");
            }
          } else if (type == 'cut') {
            state.copyingElement = Element.copyEle(editingElement);
            elements.splice(index, 1);
            state.editingElement = null;
          }

        } else {
          ElMessage.error("请选择一个元素进行操作");
        }
        break
      default:
    }
  },
  //元素对齐方式
  changeElementAlign(state: State, type: number) {
    if (!state.editingElement) return
    let pageHeight = state.editingPageProps.pageHeight;
    let w = state.editingElement.style.width;
    let h = state.editingElement.style.height;
    switch (type) {
      case 0:
        state.editingElement.style.left = 0;
        break;
      case 1:
        state.editingElement.style.left = 375 - w;
        break;
      case 2:
        state.editingElement.style.top = (pageHeight - h) / 2;
        break;
      case 3:
        state.editingElement.style.left = (375 - w) / 2;
        break;
      case 4:
        state.editingElement.style.top = 0;
        break;
      case 5:
        state.editingElement.style.top = pageHeight - h;
        break;
    }

  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
