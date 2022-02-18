//默认组件参数
const defaultElement= {
  style: {
    width: 335,
    height: 44,
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
    type: "text",
    placeholder: "请输入",
    name: "标题",
    showTitle: true,
    required: true,
    maxlength: 50,
    showWordLimit: false,
    labelWidth: 80,
  },
}

export default { defaultElement }