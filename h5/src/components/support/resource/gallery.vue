// 资源列表弹框
<template>
  <el-dialog
    :title="title"
    v-model="visible"
    :before-close="onClose"
    width="740px"
    destroy-on-close
    append-to-body
    custom-class="gallery_dialog"
  >
    <list :type="type" @onChange="onChange" />
  </el-dialog>
</template>
<script setup lang='ts'>
import { computed, watch } from "vue";
import { ElDialog } from "element-plus";
import list from './list.vue'
const props = defineProps({
  type: Number,
  visible: Boolean
})
const title = computed(() => {
  if (props.type === 1) {
    return '图片库'
  } else if (props.type === 2) {
    return '视频库'
  } else if (props.type === 3) {
    return '音频库'
  }
})
const emit = defineEmits(['onChange', 'update:visible'])
const onChange = (val: string) => {
  emit('onChange', val)
  emit('update:visible', false)
}
const onClose = () => {
  emit('update:visible', false)
}
</script>
<style lang='less'>
.gallery_dialog {
  .el-dialog__header {
    border-bottom: 1px solid var(--borderColor);
    padding-left: 0;
    padding-right: 0;
    margin: 0 20px;
    padding-bottom: 15px;
  }
}
</style>
