//默认组件参数
const defaultElement=  {
  style: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 3,
    textAlign: "center",
    color: "#333",
    fontSize: 14,
    borderColor: "#fff",
    borderWidth: 0,
    fontWeight: "normal",
    padding: 10,
  },
  props: {
    time: new Date().setDate(new Date().getDate() + 1),
    format: "HH:mm:ss",
    icon: "underway-o",
    autostart: true,
    finishType: 0,
    finishContent: "",
  },
}

export default { defaultElement }