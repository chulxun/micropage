<template>
  <div class="custom_top_panel">
    <div>
      <el-button round size="default" :icon="Finished" @click="saveWork">保存</el-button>
      <el-button type="primary" round size="default" @click="onPreview">预览</el-button>
      <el-button type="success" round size="default" :icon="MessageBox" @click="onPublish">发布</el-button>
    </div>
  </div>
  <preview :workId="workId" v-model="previewVisible" v-if="previewVisible"></preview>
  <publishUrl :workId="workId" v-model="publishVisible" v-if="publishVisible"></publishUrl>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from "vue";
import { ElButton, ElLoading, ElMessage, ElPopover, ElIcon } from "element-plus";
import { Finished, MessageBox } from '@element-plus/icons-vue'
import preview from "@/components/editor/preview/index.vue";
import { useStore } from "@/store/index";
import { createTemplate, publishWork } from "@/api/works";
import publishUrl from "@/components/editor/topPanel/publishUrl.vue";

const props = defineProps({
  workId: String
})
const store = useStore();
const saveWork = () => store.dispatch("editor/saveWork"); //保存作品方法
const work = computed(() => store.state.editor.work);
const config = computed(() => store.state.editor.config);
const previewVisible = ref(false); //预览
const publishVisible = ref(false); //发布作品弹框
const workUrl = `${window.location.origin}${config.value.enter}?workId=${props.workId}`
//预览
async function onPreview() {
  await saveWork(); //先保存再预览
  await nextTick();
  previewVisible.value = true;
}
//发布
async function onPublish() {
  let loading = ElLoading.service({ fullscreen: true });
  await saveWork(); //先保存
  const res = await publishWork({
    work_id: props.workId,
  });
  loading.close();
  if (res && res.code == 0) {
    publishVisible.value = true;
    ElMessage.success("作品发布成功");
  } else {
    ElMessage.error(res.message);
  }
}
</script>

<style lang="less" scoped>
.custom_top_panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 10px;
  color: #fff;
}
</style>