
//通用样式编辑器编辑器
<template>
  <div>
    <el-divider content-position="left">样式</el-divider>
    <el-form label-width="50px" size="small">
      <el-row :gutter="10">
        <el-col :span="14">
          <el-form-item label="字号:">
            <el-input-number
              v-model.number="element.style.fontSize"
              :min="8"
              :max="100"
              :step="1"
              label="px"
              controls-position="right"
              class="small_input_number"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="文字色:">
            <el-color-picker v-model="element.style.color" show-alpha></el-color-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="圆角:">
            <el-input-number
              v-model.number="element.style.borderRadius"
              :min="0"
              :max="100"
              :step="1"
              label="px"
              controls-position="right"
              class="small_input_number"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="背景色:">
            <el-color-picker v-model="element.style.backgroundColor" show-alpha></el-color-picker>
          </el-form-item>
        </el-col>

        <el-col :span="14">
          <el-form-item label="边框宽:">
            <el-input-number
              v-model.number="element.style.borderWidth"
              :min="0"
              :max="100"
              :step="1"
              label="px"
              controls-position="right"
              class="small_input_number"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="边框色:">
            <el-color-picker v-model="element.style.borderColor" show-alpha></el-color-picker>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="字粗细:">
            <el-radio-group v-model="element.style.fontWeight">
              <el-radio-button label="normal">正常</el-radio-button>
              <el-radio-button label="bold">加粗</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="对齐:">
            <el-radio-group v-model="element.style.textAlign">
              <el-radio-button label="left">
                <i class="iconfont icon-align-left"></i>
              </el-radio-button>
              <el-radio-button label="center">
                <i class="iconfont icon-align-center"></i>
              </el-radio-button>
              <el-radio-button label="right">
                <i class="iconfont icon-align-right"></i>
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup lang='ts'>
import {
  ElForm, ElFormItem, ElColorPicker, ElInputNumber, ElRadioGroup, ElRadioButton,
  ElDivider, ElRow, ElCol
} from "element-plus";
const props = defineProps<{
  element: H5.Element
}>()
</script>
<style lang='less' scoped>
</style>