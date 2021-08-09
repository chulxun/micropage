<template>
  <div>
    <van-field
      v-model="state.value"
      readonly
      clickable
      :required="props.required"
      :placeholder="props.placeholder"
      :label-class="{
        hide: props.showTitle == false,
      }"
      :label="props.showTitle ? props.name : ''"
      :border="false"
      colon
      :label-width="
        workMode == 'formal'
          ? pxToRem(props.labelWidth)
          : props.labelWidth + 'px'
      "
      @click="onShowArea"
    />
    <van-popup v-model:show="state.showPicker" position="bottom" teleport="body">
      <van-picker
        :title="props.title"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="state.showPicker = false"
      />
    </van-popup>
    <input
      type="hidden"
      :value="state.value"
      :data-id="dataUkey"
      data-type="form-input"
      :required="props.required"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
import { Field, Picker, Popup } from "vant";
import { pxToRem } from "@/utils/element";
export default defineComponent({
  props: ["props", "dataUkey", "workMode"],
  components: {
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
  },
  name: "plug-form-picker",
  //默认组件 参数
  defaultElement: {
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
  },
  setup(props) {
    const state = reactive({
      value: "",
      showPicker: false,
    });
    const columns = computed(() => {
      return props.props.options.map((item) => item.val);
    });
    const onConfirm = (val) => {
      state.showPicker = false;
      state.value = val;
    };
    const onShowArea = () => {
      if (props.workMode == "editor") return;
      state.showPicker = true;
    };
    return {
      columns,
      state,
      onConfirm,
      onShowArea,
      pxToRem,
    };
  },
});
</script>
<style lang='less' scoped>
</style>