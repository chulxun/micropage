<template>
  <div v-if="editingPageProps">
    <el-form label-width="80px">
      <el-form-item label="背景颜色">
        <el-color-picker
          v-model="editingPageProps.bgColor"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="页面高度" v-if="work.page_type == 1">
        <el-input-number
          v-model.number="editingPageProps.pageHeight"
          :min="667"
          :max="100000"
          :step="1"
          label="px"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="背景图片:">
        <imgEditor
          v-model:imgUrl="editingPageProps.imgUrl"
          :type="1"
        ></imgEditor>
      </el-form-item>
      <el-form-item label="背景填充:">
        <el-select v-model="editingPageProps.bgSize" placeholder="请选择">
          <el-option
            v-for="item in sizeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span
              style="
                float: right;
                color: #8492a6;
                font-size: 12px;
                margin-right: -10px;
              "
              >{{ item.value }}</span
            >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElColorPicker,
  ElInputNumber,
  ElSelect,
  ElOption,
} from "element-plus";
import imgEditor from "@/components/plugins/commonProps/imgEditor.vue";
import { defineComponent, computed } from "vue";
import { useStore } from "@/store/index";

export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElColorPicker,
    ElInputNumber,
    imgEditor,
    ElSelect,
    ElOption,
  },
  setup() {
    const store = useStore();
    const editingPageProps: any = computed(
      () => store.state.editor.editingPageProps
    );
    const work = computed(() => store.state.editor.work);
    const sizeList = [
      {
        value: "cover",
        label: "完全覆盖",
      },
      {
        value: "contain",
        label: "自动适应",
      },
      {
        value: "100% 100%",
        label: "拉伸背景",
      },
    ];
    return {
      editingPageProps,
      work,
      sizeList,
    };
  },
});
</script>
<style lang='less' scoped>
</style>