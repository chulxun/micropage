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
      <Picker
        :title="element.props.title"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="state.showPicker = false"
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
import { computed, reactive } from "vue";
import { Field, Picker, Popup } from "vant";
import { pxToRem } from "@/utils/element";
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
const state = reactive({
  value: "",
  showPicker: false,
});
const columns = computed(() => {
  return props.element.props.options.map((item: any) => item.val);
});
const onConfirm = (val: any) => {
  state.showPicker = false;
  state.value = val;
};
const onShowArea = () => {
  if (props.workMode == "editor") return;
  state.showPicker = true;
};
</script>
<style lang='less' scoped>
</style>