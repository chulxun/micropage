//默认组件参数
const defaultElement= {
  style: {
    width: 335,
    height: 40,
    left: 20,
    backgroundColor: "#fff",
    borderRadius: 3,
    textAlign: "left",
    color: "#333",
    fontSize: 14,
    borderColor: "#fff",
    borderWidth: 0,
    fontWeight: "normal",
  },
  props: {
    name: "标题",
    placeholder: "点击选择",
    showTitle: true,
    required: true,
    labelWidth: 80,
    title: "请选择",
    options: [{ val: "选项 1" }, { val: "选项 2" }],
  },
}

export default { defaultElement }