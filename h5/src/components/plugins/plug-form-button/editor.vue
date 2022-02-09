<template>
  <div>
    <cellEditor :element="element"></cellEditor>
    <el-form label-width="80px" size="default">
      <el-form-item label="左右内边距:">
        <el-input-number
          v-model.number="element.style.padding"
          :min="0"
          :max="100"
          :step="1"
          label="px"
        ></el-input-number>
      </el-form-item>
      <el-divider content-position="left">属性</el-divider>
      <el-form-item label="按钮文字:" required>
        <el-input v-model="element.props.text" maxlength="100"></el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">提交后</el-divider>
    <el-form label-width="100px">
      <el-form-item label="成功toast:">
        <el-input v-model="element.props.successToast" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="成功图片:">
        <imgEditor v-model:imgUrl="element.props.imgUrl"></imgEditor>
        <p class="tips">
          <el-icon>
            <warning />
          </el-icon>表单成功提交后弹框展示图，尺寸请控制在一屏内
        </p>
      </el-form-item>
      <el-form-item label="成功后跳转:">
        <el-input v-model="element.props.successHref" maxlength="100"></el-input>
        <p class="tips">
          <el-icon>
            <warning />
          </el-icon>成功提交表单后跳转外链
        </p>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ElForm, ElFormItem, ElInputNumber, ElInput, ElDivider, ElIcon } from "element-plus";
import imgEditor from "../commonProps/imgEditor.vue";
import cellEditor from "../commonProps/cellEditor.vue";
import { Warning } from '@element-plus/icons-vue'
const props = defineProps<{
  element: H5.Element
}>()

</script>
<style lang='less' scoped>
</style>