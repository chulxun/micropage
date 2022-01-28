//默认组件参数
const defaultElement= {
  style: {
    width: 375,
    height: 400,
    left: 0,
    top: 100,
    backgroundColor: "#fff",
  },
  props: {
    color: "#ee0a24",
    background: "#fff",
    titleInactiveColor: "",
    titleActiveColor: "",
    type: "line",
    animated: false,
    sticky: false,
    active: 0,
    padding: 10,
    options: [
      { title: "标签一", content: "内容一" },
      { title: "标签二", content: "内容二" },
      { title: "标签三", content: "内容三" },
    ],
  },
}

export default { defaultElement }