<template>
  <div>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px" size="small">
      <el-form-item label="快捷样式:">
        <el-button
          :type="item.name"
          v-for="(item, index) in themeList"
          :key="index"
          @click="useThisStyle(item)"
          style="margin: 0 10px 10px 0"
          >{{ item.name }}</el-button
        >
      </el-form-item>
      <el-form-item label="按钮文字:" required>
        <el-input v-model="element.props.text" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="背景颜色:">
        <el-color-picker
          v-model="element.style.backgroundColor"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="文字颜色:">
        <el-color-picker
          v-model="element.style.color"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="圆角:">
        <el-input-number
          v-model.number="element.style.borderRadius"
          :min="0"
          :max="100"
          :step="1"
          label="px"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="字号:">
        <el-input-number
          v-model.number="element.style.fontSize"
          :min="8"
          :max="100"
          :step="1"
          label="px"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="文字粗细:">
        <el-radio-group v-model="element.style.fontWeight">
          <el-radio-button label="normal">正常</el-radio-button>
          <el-radio-button label="bold">加粗</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文字对齐:">
        <el-radio-group v-model="element.style.textAlign">
          <el-radio-button label="left"
            ><i class="iconfont icon-align-left"></i
          ></el-radio-button>
          <el-radio-button label="center"
            ><i class="iconfont icon-align-center"></i
          ></el-radio-button>
          <el-radio-button label="right"
            ><i class="iconfont icon-align-right"></i
          ></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="左右内边距:">
        <el-input-number
          v-model.number="element.style.padding"
          :min="0"
          :max="100"
          :step="1"
          label="px"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="边框颜色:">
        <el-color-picker
          v-model="element.style.borderColor"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="边框宽度:">
        <el-input-number
          v-model.number="element.style.borderWidth"
          :min="0"
          :max="100"
          :step="1"
          label="px"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <clickEditor :element="element"></clickEditor>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  ElForm,
  ElFormItem,
  ElColorPicker,
  ElInputNumber,
  ElInput,
  ElButton,
  ElDivider,
  ElRadioGroup,
  ElRadioButton,
} from "element-plus";
import clickEditor from "../commonProps/clickEditor.vue";

export default defineComponent({
  components: {
    ElForm,
    ElColorPicker,
    ElInputNumber,
    ElFormItem,
    ElInput,
    ElButton,
    ElDivider,
    clickEditor,
    ElRadioGroup,
    ElRadioButton,
  },
  props: ["element"],
  setup(props, ctx) {
    const themeList = [
      {
        name: "default",
        backgroundColor: "#fff",
        color: "rgba(0,0,0,.65)",
        fontSize: 14,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#d9d9d9",
      },
      {
        name: "primary",
        backgroundColor: "#1890ff",
        color: "#fff",
        fontSize: 14,
        borderWidth: 0,
        borderRadius: 4,
      },

      {
        name: "success",
        backgroundColor: "#67C23A",
        color: "#fff",
        fontSize: 14,
        borderWidth: 0,
        borderRadius: 4,
      },
      {
        name: "warning",
        backgroundColor: "#E6A23C",
        color: "#fff",
        fontSize: 14,
        borderWidth: 0,
        borderRadius: 4,
      },
      {
        name: "danger",
        backgroundColor: "#ff4d4f",
        color: "#fff",
        fontSize: 14,
        borderWidth: 0,
        borderRadius: 4,
      },
      {
        name: "info",
        backgroundColor: "#909399",
        color: "#fff",
        fontSize: 14,
        borderWidth: 0,
        borderRadius: 4,
      },
    ];
    function useThisStyle(item: any) {
      let style = JSON.parse(JSON.stringify(item));
      delete style.name;
      Object.assign(props.element.style, style);
    }
    return { themeList, useThisStyle };
  },
});
</script>
<style lang='less' scoped>
</style>