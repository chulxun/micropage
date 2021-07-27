<template>
  <div class="top_panel">
    <div class="icon_list">
      <el-popover placement="bottom" :width="350" trigger="click">
        <template #reference>
          <div :class="{ icon_btn: true, disabled: !editingElement }">
            <p>对齐</p>
            <i class="fa fa-dedent"></i>
          </div>
        </template>
        <alignment></alignment>
      </el-popover>
      <div
        :class="{ icon_btn: true, disabled: !editingElement }"
        @click.stop="hideElement"
      >
        <p>隐藏</p>
        <i class="fa fa-eye-slash"></i>
      </div>
      <div
        :class="{ icon_btn: true, disabled: !editingElement }"
        @click="deleteElement"
      >
        <p>删除</p>
        <i class="fa fa-trash-o"></i>
      </div>
      <div :class="{ icon_btn: true, disabled: !canUndo }" @click="onUndo">
        <p>撤销</p>
        <i class="fa fa-reply"></i>
      </div>
      <div :class="{ icon_btn: true, disabled: !canRedo }" @click="onRedo">
        <p>重做</p>
        <i class="fa fa-share"></i>
      </div>
      <div class="icon_btn" @click="saveWork">
        <p>保存</p>
        <i class="fa fa-save"></i>
      </div>
    </div>
    <div class="precent_div">
      <el-button
        icon="el-icon-minus"
        circle
        size="mini"
        @click="changeScale(-1)"
      ></el-button>
      <div class="text">{{ parseInt(scaleValue * 100) }}%</div>
      <el-button
        icon="el-icon-plus"
        circle
        size="mini"
        @click="changeScale(1)"
      ></el-button>
    </div>
    <div>
      <el-button
        round
        size="small"
        icon="el-icon-finished"
        @click="createWorkAsTemplate"
        >设为模版</el-button
      >
      <el-button type="primary" round size="small" @click="onPreview"
        >预览</el-button
      >
      <el-button
        type="success"
        round
        size="small"
        icon="el-icon-receiving"
        @click="onPublish"
        >发布</el-button
      >
    </div>
    <preview
      :workId="workId"
      v-model="previewVisible"
      v-if="previewVisible"
    ></preview>
    <publishUrl
      :workId="workId"
      v-model="publishVisible"
      v-if="publishVisible"
    ></publishUrl>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref, nextTick, computed } from "vue";
import {
  ElButton,
  ElDialog,
  ElLoading,
  ElMessage,
  ElPopover,
} from "element-plus";
import preview from "../preview/index.vue";
import { useStore } from "@/store/index";
import { createTemplate, publishWork } from "@/api/works";
import undoRedoHistory from "@/store/plugins/history";
import publishUrl from "./publishUrl.vue";
import { onCreateImgBySvg } from "@/utils/htmlToSvg";
import alignment from "./alignment.vue";
import qiniuUpload from "@/mixins/qiniuUpload";
export default defineComponent({
  props: ["workId"],
  components: {
    ElButton,
    ElDialog,
    preview,
    publishUrl,
    alignment,
    ElPopover,
  },
  setup(props) {
    const store = useStore();
    const saveWork = () => store.dispatch("editor/saveWork"); //保存作品方法
    const work = computed(() => store.state.editor.work);
    const scaleValue = computed(() => store.state.common.scaleValue); //当前画布缩放值
    const editingElement: any = computed(
      () => store.state.editor.editingElement
    ); //当前正在被编辑的元素
    const setScaleValue = (val: number) =>
      store.commit("common/setScaleValue", val); //设置画布缩放值
    const operateElement = (preload: any) =>
      store.commit("editor/operateElement", preload); //操作元素方法
    const previewVisible = ref(false); //预览
    const publishVisible = ref(false); //发布作品弹框
    const canUndo = computed(() => store.state.common.canUndo);
    const canRedo = computed(() => store.state.common.canRedo);
    const { token, getQiniuToken, uploadBase64Img } = qiniuUpload();
    // 生成预览图，并上传到云
    async function getPreviewImg() {
      await getQiniuToken();
      let url = await onCreateImgBySvg();
      let preview_url = await uploadBase64Img(
        url,
        props.workId + "---preview.jpg"
      );
      if (preview_url) {
        work.value.preview_img_url = preview_url;
      }
    }
    //设置为模版
    async function createWorkAsTemplate() {
      let loading = ElLoading.service({ fullscreen: true });
      await saveWork(); //先保存
      const res = await createTemplate({
        work_id: props.workId,
      });
      loading.close();
      if (res && res.code == 0) {
        ElMessage.success("设置为模版成功");
      } else {
        ElMessage.error(res.message);
      }
    }
    //预览
    async function onPreview() {
      await saveWork(); //先保存再预览
      await nextTick();
      previewVisible.value = true;
    }
    //发布
    async function onPublish() {
      let loading = ElLoading.service({ fullscreen: true });
      await getPreviewImg();
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
    //缩放画布
    function changeScale(type: number) {
      var curVal = scaleValue.value;
      if (type == 1) {
        curVal = Math.round(Math.fround(curVal + 0.1) * 1000) / 1000;
      } else {
        curVal = Math.round(Math.fround(curVal - 0.1) * 1000) / 1000;
      }
      if (curVal < 0.5 || curVal > 2)
        return ElMessage.error("可缩放尺寸在50%-200%之间");
      setScaleValue(curVal);
    }
    //删除当前元素
    function deleteElement() {
      if (editingElement.value) {
        operateElement({
          type: "delete",
          value: {},
        });
      } else {
        ElMessage.error("请选择一个元素进行操作");
      }
    }
    //隐藏当前元素
    function hideElement() {
      if (editingElement.value) {
        if (editingElement.value.props.hide) {
          editingElement.value.props.hide = false;
        } else {
          editingElement.value.props.hide = true;
        }
      } else {
        ElMessage.error("请选择一个元素进行操作");
      }
    }
    //撤销
    function onUndo() {
      undoRedoHistory.undo();
    }
    //重做
    function onRedo() {
      undoRedoHistory.redo();
    }
    return {
      previewVisible,
      publishVisible,
      scaleValue,
      editingElement,
      changeScale,
      deleteElement,
      hideElement,
      onPreview,
      saveWork,
      onPublish,
      createWorkAsTemplate,
      canUndo,
      canRedo,
      onUndo,
      onRedo,
    };
  },
});
</script>
<style lang='less' scoped>
.top_panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}
.icon_btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
  p {
    padding-bottom: 4px;
    font-size: 12px;
  }
  i {
    font-size: 16px;
  }
  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
.precent_div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  .text {
    font-weight: bold;
    padding: 0 14px;
  }
  :deep(button) {
    padding: 9px;
    i {
      font-weight: bold;
    }
  }
}

.icon_list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
