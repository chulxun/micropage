import { creatUkey } from '../../utils/index'
import { cloneDeep } from "lodash";
import Element from './element';
interface workInitnal {
  title: string;
  description: string;
  preview_img_url: string;
  share_img_url: string;
  page_type: number;
  pages?: Array<object>;
  config?:object;
}
class Work {
  title: string;
  description: string;
  preview_img_url: string;
  share_img_url: string;
  page_type: number;
  pages: Array<object>;
  config:object;
  constructor(work: workInitnal) {
    // 通用属性
    this.title = work.title || '标题'
    this.description = work.description || '描述'
    this.preview_img_url = work.preview_img_url || 'https://public.fanjinyan.com/weiye/weiye_default_img_squre.png'
    this.share_img_url = work.share_img_url || 'https://public.fanjinyan.com/weiye/weiye_default_img_squre.png'
    // 页面类型 1 长页； 2 翻页；  3 多路由；  4 定制模板
    this.page_type = work.page_type || 1
    let pages = [{
      ukey: creatUkey(),
      elements: [Element.createPageEle()]
    }]
    if (work.page_type == 2) {
      pages.push({
        ukey: creatUkey(),
        elements: [Element.createPageEle()]
      })
    }
    this.pages = work.pages || pages
    // 作品初始化配置信息
    const defaultConfig = work.page_type === 2 ? {
      swiper_pag_color: '#1890ff',
      swiper_direction: 'vertical',
      swiper_pag: false,
      swiper_loop: false,
      swiper_arrow: true,
    } : {}
    this.config = work.config ? cloneDeep(work.config) : defaultConfig
  }
  //添加一个空页面
  static addPage(pages: any) {
    pages.push({
      ukey: creatUkey(),
      elements: [Element.createPageEle()]
    })
  }
  //复制页面
  static copyPage(pages: any, page: any) {
    let eles = cloneDeep(page.elements).map((item: any) => {
      item.ukey = creatUkey()
      return item
    })
    pages.push({
      ukey: creatUkey(),
      elements: eles
    })
  }
}

export default Work
