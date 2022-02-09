//默认组件参数
const defaultElement= {
  style: {
    width: 375,
    height: 200,
    left: 0,
    top: 0,
  },
  props: {
    swiper: [
      "https://public.fanjinyan.com/weiye/weiye_default_img_width.png",
      "https://public.fanjinyan.com/weiye/weiye_default_img_width.png",
    ],
    direction: "horizontal",
    autoplay: true,
    delay: 4000,
    showPage: true,
    pagType: "bullets",
    indicatorColor: "#3981EB",
  },
}

export default { defaultElement }