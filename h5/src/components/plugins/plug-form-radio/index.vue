<template>
  <div>
    <div class="input_title" v-if="element.props.showTitle">
      <span class="red" v-if="element.props.required">*</span>
      {{ element.props.name }}
    </div>
    <RadioGroup
      v-model="checked"
      :checked-color="element.props.checkedColor"
      :direction="element.props.direction"
      :readonly="workMode == 'editor'"
      :style="{ color: element.props.color }"
    >
      <Radio
        :name="item.val"
        v-for="(item, index) in element.props.options"
        :key="index"
        :shape="element.props.shape"
      >{{ item.val }}</Radio>
    </RadioGroup>
    <input
      type="hidden"
      :value="checked"
      :data-id="element.ukey"
      data-type="form-input"
      :required="element.props.required"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { RadioGroup, Radio } from "vant";
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
const checked = ref("");
</script>
<style lang='less' scoped>
:deep(.van-radio) {
  margin-bottom: 0.3em;
}
</style>