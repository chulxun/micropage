import { creatUkey } from '../../utils/index'
interface workInitnal {
  title: string;
  description: string;
  preview_img_url: string;
  share_img_url: string;
  page_type: number;
  pages: Array<object>;
}
class Work {
  title: string;
  description: string;
  preview_img_url: string;
  share_img_url: string;
  page_type: number;
  pages: Array<object>;
  constructor(work: workInitnal) {
    // 通用属性
    this.title = work.title || '标题'
    this.description = work.description || '描述'
    this.preview_img_url = work.preview_img_url || 'https://public.fanjinyan.com/weiye_default_img_squre.png'
    this.share_img_url = work.share_img_url || 'https://public.fanjinyan.com/weiye_default_img_squre.png'
    this.page_type = work.page_type || 1 //页面类型 1长页 2多页
    let pages = [{
      ukey: 1,
      elements: [
        {
          ukey: creatUkey(),
          name: 'plug-page',
          props: {
            bgColor: '#fff',
            imgUrl: '',
            pageHeight: 667,
          },
          style: {
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }
        }]
    }]
    if (work.page_type == 2) {
      pages = [{
        ukey: 1,
        elements: [
          {
            ukey: creatUkey(),
            name: 'plug-page',
            props: {
              bgColor: '#fff',
              imgUrl: '',
              pageHeight: 667
            },
            style: {
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            }
          }]
      }, {
        ukey: 2,
        elements: [
          {
            ukey: creatUkey(),
            name: 'plug-page',
            props: {
              bgColor: '#fff',
              imgUrl: '',
              pageHeight: 667
            },
            style: {
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            }
          }]
      }]
    }
    this.pages = work.pages || pages
  }
  static addPage(pages: any) {
    pages.push({
      ukey: creatUkey(),
      elements: [
        {
          ukey: creatUkey(),
          name: 'plug-page',
          props: {
            bgColor: '#fff',
            imgUrl: '',
            pageHeight: 667
          },
          style: {
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }
        }]
    })
  }
}

export default Work
