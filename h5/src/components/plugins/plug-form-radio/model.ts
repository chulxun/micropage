//默认组件参数
const defaultElement={
  style: {
    width: 335,
    height: 90,
    left: 20,
    color: "#333",
    fontSize: 14,
    fontWeight: "normal",
  },
  props: {
    name: "单选标题",
    showTitle: true,
    required: true,
    options: [{ val: "单选框 1" }, { val: "单选框 2" }],
    shape: "round",
    color:'#333',
    checkedColor: "#1989fa",
    direction: "vertical",
  },
}

export default { defaultElement }