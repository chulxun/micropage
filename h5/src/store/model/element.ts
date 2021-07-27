import { cloneDeep } from "lodash";
interface elementInitnal {
  ukey: string; //唯一标识
  name: string; //组件名称
  style: object; //样式
  props: object; //组件需要的属性
  animations: object[];//组件动画
  [propName: string]: any;//其他
}
//简单深拷贝
const cloneObj = (value: object) => JSON.parse(JSON.stringify(value))
const defaultStyle = {
  top: 140,
  left: 127,
  width: 100,
  height: 40,
  color: '#000000',
  fontSize: 14
}
class Element {
  ukey: string;
  name: string;
  style: object;
  props: object;
  animations: object[];
  constructor(element: elementInitnal) {
    // 通用属性
    this.ukey = element.ukey || new Date().getTime() + ""
    this.name = element.name || ""
    if (element.style && typeof element.style == 'object') {
      this.style = Object.assign({}, defaultStyle, element.style)
    } else {
      this.style = cloneObj(defaultStyle)
    }
    if (element.props && typeof element.props == 'object') {
      this.props = Object.assign({}, element.props)
    } else {
      this.props = {}
    }
    if (element.animations && typeof element.animations == 'object') {
      this.animations = element.animations
    } else {
      this.animations = []
    }
  }
  static copyEle(element: elementInitnal) {
    const copy_element = cloneDeep(element)
    copy_element.ukey = new Date().getTime() + ""
    copy_element.style.top += 20;
    copy_element.style.left += 20;
    return new Element(copy_element)
  }

}

export default Element
