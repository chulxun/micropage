<template>
  <div>
    <Field
      v-model="state.value"
      readonly
      clickable
      :required="element.props.required"
      :placeholder="element.props.placeholder"
      :label-class="{
        hide: element.props.showTitle == false,
      }"
      :label="element.props.showTitle ? element.props.name : ''"
      :border="false"
      colon
      :label-width="
        workMode == 'formal'
          ? pxToRem(element.props.labelWidth)
          : element.props.labelWidth + 'px'
      "
      @click="onShowArea"
    />
    <Popup v-model:show="state.showPicker" position="bottom" teleport="body">
      <Area
        :title="element.props.title"
        @confirm="onConfirm"
        @cancel="state.showPicker = false"
        :area-list="areaList"
        :columns-num="element.props.columnsNum"
      />
    </Popup>
    <input
      type="hidden"
      :value="state.value"
      :data-id="element.ukey"
      data-type="form-input"
      :required="element.props.required"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { Field, Area, Popup } from "vant";
import { pxToRem } from "@/utils/element";
import { areaList } from "@vant/area-data";

const props = defineProps<{
  element: H5.Element,
  workMode: String
}>()
const state = reactive({
  value: "",
  showPicker: false,
});

const onConfirm = (val: any) => {
  state.showPicker = false;
  state.value = val.map((item: any) => item.name).join("");
};
const onShowArea = () => {
  if (props.workMode == "editor") return;
  state.showPicker = true;
};

</script>
<style lang='less' scoped>
</style>