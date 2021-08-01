<template>
  <div class="list">
    <div
      class="li"
      v-for="item in alignTypes"
      :key="item.type"
      @click="onChangeAlign(item.type)"
    >
      <i :class="'iconfont ' + item.icon"></i> <strong>{{ item.title }}</strong>
      <p>{{ item.keycode }}</p>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed } from "vue";
import { useStore } from "@/store/index";
export default defineComponent({
  setup() {
    const alignTypes = [
      {
        title: "左对齐",
        keycode: "Shift + L",
        type: 0,
        icon: "icon-duiqi",
      },
      {
        title: "右对齐",
        keycode: "Shift + R",
        type: 1,
        icon: "icon-youduiqi",
      },
      {
        title: "垂直居中",
        keycode: "Shift + M",
        type: 2,
        icon: "icon-chuizhijuzhongduiqi",
      },
      {
        title: "水平居中",
        keycode: "Shift + C",
        type: 3,
        icon: "icon-shuipingjuzhongduiqi",
      },
      {
        title: "顶对齐",
        keycode: "Shift + T",
        type: 4,
        icon: "icon-dingduanduiqi",
      },
      {
        title: "底对齐",
        keycode: "Shift + B",
        type: 5,
        icon: "icon-xiaduiqi",
      },
    ];
    const store = useStore();
    const editingElement: any = computed(
      () => store.state.editor.editingElement
    );
    const setEditingElement = (element: any) =>
      store.commit("editor/setEditingElement", element);
    const changeElementAlign = (type: any) =>
      store.commit("editor/changeElementAlign", type);
    function onChangeAlign(type: number) {
      changeElementAlign(type);
      // //重置编辑元素 加这一句是为了触发存入history，然后进行撤销、重做
      setEditingElement(editingElement.value);
    }
    return { alignTypes, onChangeAlign };
  },
});
</script>
<style lang='less' scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  .li {
    width: 50%;
    display: flex;
    padding: 10px;
    cursor: pointer;
    align-items: center;
    p {
      font-size: 0.8rem;
      color: #aaa;
    }
    strong {
      font-weight: normal;
      padding: 0 10px;
    }
    &:hover {
      background: var(--lightBgColor);
    }
  }
}
</style>