<template>
  <div>
    <el-divider content-position="left">样式</el-divider>
    <el-form label-width="80px">
      <el-form-item label="背景颜色:">
        <el-color-picker
          v-model="element.style.backgroundColor"
          show-alpha
          size="small"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="文字颜色:">
        <el-color-picker
          v-model="element.style.color"
          show-alpha
          size="small"
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
          size="small"
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
          size="small"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="文字粗细:">
        <el-radio-group v-model="element.style.fontWeight" size="small">
          <el-radio-button label="normal">正常</el-radio-button>
          <el-radio-button label="bold">加粗</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文字对齐:">
        <el-radio-group v-model="element.style.textAlign" size="small">
          <el-radio-button label="left"
            ><i class="fa fa-align-left"></i
          ></el-radio-button>
          <el-radio-button label="center"
            ><i class="fa fa-align-center"></i
          ></el-radio-button>
          <el-radio-button label="right"
            ><i class="fa fa-align-right"></i
          ></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="边框颜色:">
        <el-color-picker
          v-model="element.style.borderColor"
          show-alpha
          size="small"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="边框宽度:">
        <el-input-number
          v-model.number="element.style.borderWidth"
          :min="0"
          :max="100"
          :step="1"
          label="px"
          size="small"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-divider content-position="left">属性</el-divider>
      <el-form-item label="选择项:">
        <el-select
          style="width: 100%"
          v-model="element.props.columnsNum"
          placeholder="请选择"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题:" required>
        <el-input v-model="element.props.name" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="显示标题:">
        <el-switch v-model="element.props.showTitle"></el-switch>
      </el-form-item>
      <el-form-item label="左文本宽:">
        <el-input-number
          v-model.number="element.props.labelWidth"
          :min="1"
          :max="10000"
          :step="1"
          label="px"
          controls-position="right"
          size="small"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="必填:">
        <el-switch v-model="element.props.required"></el-switch>
      </el-form-item>
      <el-form-item label="picker标题:">
        <el-input v-model="element.props.title" maxlength="100"></el-input>
      </el-form-item>
    </el-form>
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
  ElSelect,
  ElOption,
  ElSwitch,
} from "element-plus";

export default defineComponent({
  components: {
    ElForm,
    ElColorPicker,
    ElInputNumber,
    ElFormItem,
    ElInput,
    ElButton,
    ElDivider,
    ElRadioGroup,
    ElRadioButton,
    ElSelect,
    ElOption,
    ElSwitch,
  },
  props: ["element"],
  setup(props, ctx) {
    const typeOptions = [
      {
        label: "选择省市区",
        value: 3,
      },
      {
        label: "选择省市",
        value: 2,
      },
      {
        label: "选择省",
        value: 1,
      },
    ];
    return { typeOptions };
  },
});
</script>
<style lang='less' scoped>
</style>