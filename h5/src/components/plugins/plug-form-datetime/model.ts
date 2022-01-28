//默认组件参数
const defaultElement=  {
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
    type: "datetime",
    name: "时间",
    placeholder: "点击选择时间",
    showTitle: true,
    required: true,
    labelWidth: 80,
    title: "选择时间",
    minDate: new Date().setFullYear(new Date().getFullYear() - 10),
    maxDate: new Date().setFullYear(new Date().getFullYear() + 10),
  },
}

export default { defaultElement }