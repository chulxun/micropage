<template>
  <div>
    <div class="input_title" v-if="element.props.showTitle">
      <span class="red" v-if="element.props.required">*</span>
      {{ element.props.name }}
    </div>
    <Rate
      v-model="rateVal"
      :count="element.props.count"
      :size="element.props.size"
      :color="element.props.color"
      :void-color="element.props.voidColor"
      :icon="element.props.icon"
      :void-icon="element.props.voidIcon"
      :allow-half="element.props.allowHalf"
      :readonly="workMode == 'editor'"
    />
    <input
      type="hidden"
      :value="rateVal || ''"
      :data-id="element.ukey"
      data-type="form-input"
      :required="element.props.required"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Rate } from "vant";
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
const rateVal = ref(0);

</script>
<style lang='less' scoped>
</style>