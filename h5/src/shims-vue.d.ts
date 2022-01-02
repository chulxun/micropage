declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module "qrcode";
declare module 'qs';

declare interface Window {
  getWorkInfo:any
}
