
declare namespace H5 {
  // type Options = {
  //   [key: string]: any;
  // };
  // //分页传参
  // type PageParams = {
  //   current?: number;
  //   pageSize?: number;
  // };
  // //通用接口返回结果
  // type SubmitResult = {
  //   code: number;
  //   message: string;
  // };
  // //当前登陆用户信息
  // type CurrentUser = {
  //   token: string;
  //   email?: string;
  //   id: number;
  //   mobile?: string;
  //   role: number;
  //   user_name: string;
  //   is_delete?: boolean;
  // };
  // //登录传参
  // type LoginParams = {
  //   user_name: string;
  //   password: string;
  //   autoLogin?: boolean;
  //   is_admin: boolean;
  // };
  // //登录返回结果
  // type LoginResult = {
  //   code: number;
  //   message: string;
  //   property: {
  //     token: string;
  //     email?: string;
  //     id: number;
  //     mobile?: string;
  //     role: number;
  //     user_name: string;
  //     is_delete?: boolean;
  //   };
  // };
  // //注册传参
  // type RegisterParams = {
  //   user_name: string;
  //   password: string;
  //   email?: string;
  //   mobile?: string;
  //   role?: number;
  // };
  // //修改密码传参
  // type PwdParams = {
  //   user_id: number;
  //   password: string;
  // };
  // //注销用户传参
  // type WhiteOffParams = {
  //   user_id: number;
  // };
  // //用户列表
  // type UserList = {
  //   code: number;
  //   message: string;
  //   data?: CurrentUser[];
  //   /** 列表的内容总数 */
  //   total?: number;
  // };
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
    showQrcode?:boolean
  };
  //作品列表
  type WorksList = WorkInfo[];
    

 
}
