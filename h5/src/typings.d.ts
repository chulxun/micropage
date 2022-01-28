
declare namespace H5 {
   type Options = {
     [key: string]: any;
   };
  //作品详情
  type WorkInfo = {
    created_at: number;
    description: string;
    hits: number;
    id: number;
    is_delete: boolean;
    is_publish: boolean;
    is_template: boolean;
    page_type: number;
    pages: string;
    publish_pages?: string;
    preview_img_url: string;
    share_img_url: string;
    title: string;
    updated_at: number;
    user_id: number;
    work_id: string;
    _id: string;
    user_name?:string;
    showQrcode?:boolean
  };
  //作品列表
  type WorksList = WorkInfo[];
  // 组件详情
  type Element = {
    name:string,
    ukey:string,
    animations?:array[],
    style:Options,
    props:Options
  }


}
