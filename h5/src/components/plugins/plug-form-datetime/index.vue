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
      @click="onShowDate"
    />
    <van-popup v-model:show="state.showPicker" position="bottom">
      <van-datetime-picker
        :type="props.type"
        :title="props.title"
        :formatter="formatter"
        @confirm="onConfirm"
        @cancel="state.showPicker = false"
        :min-date="props.minDate"
        :max-date="props.maxDate"
        v-model="defaultDate"
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
import { Field, DatetimePicker, Popup } from "vant";
import { pxToRem } from "@/utils/element";
import { formatDate } from "@/utils/index";

export default defineComponent({
  props: ["props", "dataUkey", "workMode"],
  components: {
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
  },
  name: "plug-form-datetime",
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
  },
  setup(props) {
    const state = reactive({
      value: "",
      showPicker: false,
    });
    const defaultDate = ref(new Date());
    if (props.props.type == "time") {
      defaultDate.value = "";
    }
    if (props.workMode == "formal") {
      props.props.minDate = new Date(props.props.minDate);
      props.props.maxDate = new Date(props.props.maxDate);
    }

    const formatter = (type, val) => {
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
    const onConfirm = (date) => {
      state.showPicker = false;
      let _type = props.props.type;
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
    return {
      state,
      formatter,
      onConfirm,
      onShowDate,
      pxToRem,
      defaultDate,
    };
  },
});
</script>
<style lang='less' scoped>
</style>