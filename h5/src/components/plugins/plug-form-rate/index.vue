<template>
  <div>
    <div class="input_title" v-if="props.showTitle">
      <span class="red" v-if="props.required">*</span>{{ props.name }}
    </div>
    <van-rate
      v-model="rateVal"
      :count="props.count"
      :size="props.size"
      :color="props.color"
      :void-color="props.voidColor"
      :icon="props.icon"
      :void-icon="props.voidIcon"
      :allow-half="props.allowHalf"
      :readonly="workMode == 'editor'"
    />
    <input
      type="hidden"
      :value="rateVal || ''"
      :data-id="dataUkey"
      data-type="form-input"
      :required="props.required"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Rate } from "vant";
export default defineComponent({
  props: ["props", "dataUkey", "workMode"],
  name: "plug-form-rate",
  components: {
    [Rate.name]: Rate,
  },
  //默认组件 参数
  defaultElement: {
    style: {
      width: 335,
      height: 60,
      left: 20,
      color: "#333",
      fontSize: 14,
      fontWeight: "normal",
    },
    props: {
      name: "评分",
      showTitle: true,
      required: true,
      count: 5,
      size: 20,
      color: "#ee0a24",
      voidColor: "#c8c9cc",
      icon: "star",
      voidIcon: "star-o",
      allowHalf: false,
    },
  },
  setup(props) {
    const rateVal = ref(0);
    return { rateVal };
  },
});
</script>
<style lang='less' scoped>
</style>