<template>
  <div>
    <Field
      v-model="inputVal"
      :readonly="workMode == 'editor'"
      :type="element.props.type"
      :required="element.props.required"
      :placeholder="element.props.placeholder"
      autocomplete="off"
      :maxlength="element.props.maxlength"
      :label-class="{
        hide: element.props.showTitle == false,
        textareaLabel: element.props.type == 'textarea',
      }"
      :label="element.props.showTitle ? element.props.name : ''"
      :border="false"
      :colon="true"
      :show-word-limit="element.props.showWordLimit"
      :label-width="
        workMode == 'formal'
          ? pxToRem(element.props.labelWidth)
          : element.props.labelWidth + 'px'
      "
    />
    <input
      type="hidden"
      :value="inputVal"
      :data-id="element.ukey"
      data-type="form-input"
      :required="element.props.required"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Field } from "vant";
import { pxToRem } from "@/utils/element";
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
const inputVal = ref("");
</script>
<style lang='less' scoped>
:deep(.van-cell) {
  .van-field__label,
  .van-cell__value {
    .van-field__body {
      flex: 1;
      textarea {
        height: 100%;
      }
    }
    .van-field__word-limit {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }

  .textareaLabel {
    align-items: flex-start;
  }
}
</style>