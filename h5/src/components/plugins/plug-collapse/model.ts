//默认组件参数
const defaultElement= {
  style: {
    width: 375,
    height: 180,
    left: 0,
    top: 100,
    backgroundColor: "#fff",
  },
  props: {
    accordion: false,
    active: [0],
    options: [
      { title: "标题一", icon: "", content: "内容一" },
      { title: "标题二", icon: "", content: "内容二" },
      { title: "标题三", icon: "", content: "内容三" },
    ],
  },
}

export default { defaultElement }