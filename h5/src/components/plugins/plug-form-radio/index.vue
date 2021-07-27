<template>
  <div>
    <div class="input_title" v-if="props.showTitle">
      <span class="red" v-if="props.required">*</span>{{ props.name }}
    </div>
    <van-radio-group
      v-model="checked"
      :checked-color="props.checkedColor"
      :direction="props.direction"
      :readonly="workMode == 'editor'"
    >
      <van-radio
        :name="item.val"
        v-for="(item, index) in props.options"
        :key="index"
        :shape="props.shape"
        >{{ item.val }}</van-radio
      >
    </van-radio-group>
    <input
      type="hidden"
      :value="checked"
      :data-id="dataUkey"
      data-type="form-input"
      :required="props.required"
    />
  </div>
</template>
<script lang="ts">
import { computed, ref, defineComponent } from "vue";
import { RadioGroup, Radio } from "vant";
export default defineComponent({
  props: ["props", "workMode", "dataUkey"],
  name: "plug-form-radio",
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
  },
  //默认组件 参数
  defaultElement: {
    style: {
      width: 335,
      height: 90,
      left: 20,
      color: "#333",
      fontSize: 14,
      fontWeight: "normal",
    },
    props: {
      name: "单选标题",
      showTitle: true,
      required: true,
      options: [{ val: "单选框 1" }, { val: "单选框 2" }],
      shape: "round",
      checkedColor: "#1989fa",
      direction: "vertical",
    },
  },
  setup(props) {
    const checked = ref("");
    return { checked };
  },
});
</script>
<style lang='less' scoped>
:deep(.van-radio) {
  margin-bottom: 0.3em;
}
</style>