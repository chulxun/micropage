<template>
  <div>
    <div class="input_title" v-if="element.props.showTitle">
      <span class="red" v-if="element.props.required">*</span>
      {{ element.props.name }}
    </div>
    <CheckboxGroup
      v-model="checked"
      :checked-color="element.props.checkedColor"
      :direction="element.props.direction"
      :max="element.props.max"
      :readonly="workMode == 'editor'"
      :style="{ color: element.props.color }"
    >
      <Checkbox
        :name="item.val"
        v-for="(item, index) in element.props.options"
        :key="index"
        :shape="element.props.shape"
      >{{ item.val }}</Checkbox>
    </CheckboxGroup>
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
import { CheckboxGroup, Checkbox } from "vant";
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
const checked = ref([]);
</script>
<style lang='less' scoped>
:deep(.van-checkbox) {
  margin-bottom: 0.3em;
}
</style>