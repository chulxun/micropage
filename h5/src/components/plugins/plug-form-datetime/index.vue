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
      @click="onShowDate"
    />
    <Popup v-model:show="state.showPicker" position="bottom" teleport="body">
      <DatetimePicker
        :type="element.props.type"
        :title="element.props.title"
        :formatter="formatter"
        @confirm="onConfirm"
        @cancel="state.showPicker = false"
        :min-date="element.props.minDate"
        :max-date="element.props.maxDate"
        v-model="defaultDate"
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
import { ref, reactive, onMounted } from "vue";
import { Field, DatetimePicker, Popup } from "vant";
import { pxToRem } from "@/utils/element";
import { formatDate } from "@/utils/index";
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
const state = reactive({
  value: "",
  showPicker: false,
});
const defaultDate: any = ref(new Date());

onMounted(() => {
  // if (props.element.props.type == "time") {
  //   defaultDate.value = "";
  // }
  // if (props.workMode == "formal") {
  //   props.element.props.minDate = new Date(props.element.props.minDate);
  //   props.element.props.maxDate = new Date(props.element.props.maxDate);
  // }
})

const formatter = (type: string, val: string) => {
  if (type === "year") {
    return val + "年";
  }
  if (type === "month") {
    return val + "月";
  }
  if (type === "day") {
    return val + "日";
  }
  if (type === "hour") {
    return val + "时";
  }
  if (type === "minute") {
    return val + "分";
  }
  return val;
};
const onConfirm = (date: any) => {
  state.showPicker = false;
  let _type = props.element.props.type;
  if (_type == "datetime") {
    state.value = formatDate(date, "yyyy-MM-dd hh:mm");
  } else if (_type == "date") {
    state.value = formatDate(date, "yyyy-MM-dd");
  } else if (_type == "time") {
    state.value = date;
  } else if (_type == "year-month") {
    state.value = formatDate(date, "yyyy年MM月");
  } else if (_type == "month-day") {
    state.value = formatDate(date, "MM月dd日");
  } else if (_type == "datehour") {
    state.value = formatDate(date, "yyyy-MM-dd hh") + ":00";
  } else {
    state.value = date;
  }
};
const onShowDate = () => {
  if (props.workMode == "editor") return;
  state.showPicker = true;
};
</script>
<style lang='less' scoped>
</style>