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
      <van-area
        :title="props.title"
        @confirm="onConfirm"
        @cancel="state.showPicker = false"
        :area-list="areaList"
        :columns-num="props.columnsNum"
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
import { defineComponent, ref, reactive } from "vue";
import { Field, Area, Popup } from "vant";
import { pxToRem } from "@/utils/element";
import { areaList } from "@vant/area-data";
export default defineComponent({
  props: ["props", "dataUkey", "workMode"],
  components: {
    [Field.name]: Field,
    [Area.name]: Area,
    [Popup.name]: Popup,
  },
  name: "plug-form-area",
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
      name: "地区",
      placeholder: "点击选择省市区",
      showTitle: true,
      required: true,
      labelWidth: 80,
      title: "选择省市区",
      columnsNum: 3,
    },
  },
  setup(props) {
    const state = reactive({
      value: "",
      showPicker: false,
    });

    const onConfirm = (val) => {
      state.showPicker = false;
      state.value = val.map((item) => item.name).join("");
    };
    const onShowArea = () => {
      if (props.workMode == "editor") return;
      state.showPicker = true;
    };
    return {
      state,
      areaList,
      onConfirm,
      onShowArea,
      pxToRem,
    };
  },
});
</script>
<style lang='less' scoped>
</style>