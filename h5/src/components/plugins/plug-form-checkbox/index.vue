<template>
  <div>
    <div class="input_title" v-if="props.showTitle">
      <span class="red" v-if="props.required">*</span>{{ props.name }}
    </div>
    <van-checkbox-group
      v-model="checked"
      :checked-color="props.checkedColor"
      :direction="props.direction"
      :max="props.max"
      :readonly="workMode == 'editor'"
      :style="{color:props.color}"
    >
      <van-checkbox
        :name="item.val"
        v-for="(item, index) in props.options"
        :key="index"
        :shape="props.shape"
        >{{ item.val }}</van-checkbox
      >
    </van-checkbox-group>
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
import { CheckboxGroup, Checkbox } from "vant";
export default defineComponent({
  props: ["props", "workMode", "dataUkey"],
  name: "plug-form-checkbox",
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
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
      name: "复选标题",
      showTitle: true,
      required: true,
      options: [{ val: "复选框 1" }, { val: "复选框 2" }],
      shape: "round",
      color: "#333",
      checkedColor: "#1989fa",
      direction: "vertical",
      max: 0,
    },
  },
  setup(props) {
    const checked = ref([]);
    return { checked };
  },
});
</script>
<style lang='less' scoped>
:deep(.van-checkbox) {
  margin-bottom: 0.3em;
}
</style>