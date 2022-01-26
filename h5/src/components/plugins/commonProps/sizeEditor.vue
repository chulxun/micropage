
//公用编辑器--编辑位置，宽高，唯一标识
<template>
  <div>
    <el-divider content-position="left">位置</el-divider>
    <el-form :inline="true" :model="element" size="small" label-width="50px">
      <!-- <el-form-item label="标识:">
        <el-input v-model="element.ukey" disabled></el-input>
      </el-form-item>-->
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="宽度:">
            <el-input-number
              v-model.number="element.style.width"
              :min="1"
              :max="1000"
              label="px"
              controls-position="right"
              class="small_input_number"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="高度:">
            <el-input-number
              v-model.number="element.style.height"
              :min="1"
              :max="10000"
              label="px"
              controls-position="right"
              class="small_input_number"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="居左:">
            <el-input-number
              v-model.number="element.style.left"
              :min="-1000"
              :max="100000"
              label="px"
              controls-position="right"
              class="small_input_number"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="居上:">
            <el-input-number
              v-model.number="element.style.top"
              :min="-1000"
              :max="100000"
              label="px"
              controls-position="right"
              class="small_input_number"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="定位:">
        <el-radio-group v-model="element.style.position">
          <el-radio-button label="absolute">默认</el-radio-button>
          <el-radio-button label="fixed">固定</el-radio-button>
        </el-radio-group>
        <p class="tips">默认绝对定位，选择固定定位 = 相对于浏览器窗口进行定位；bottom自动计算。</p>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang='ts'>
import {
  ElForm, ElFormItem,
  ElInput, ElInputNumber, ElDivider,
  ElButton, ElRadioGroup, ElRadioButton,
  ElRow, ElCol
} from "element-plus";
import { defineComponent } from "vue";
const props = defineProps({
  element: Object
})
</script>
<style lang='less' scoped>
</style>