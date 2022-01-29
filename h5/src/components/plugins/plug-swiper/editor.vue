<template>
  <div>
    <el-divider content-position="left">属性</el-divider>

    <el-form label-width="80px" size="small">
      <el-form-item label="滑动方向:">
        <el-radio-group v-model="element.props.direction">
          <el-radio-button label="horizontal">水平</el-radio-button>
          <el-radio-button label="vertical">垂直</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="自动切换:">
        <el-switch v-model="element.props.autoplay"></el-switch>
      </el-form-item>
      <el-form-item label="时间间隔:">
        <el-input-number v-model.number="element.props.delay" :min="1000" :max="10000" :step="100"></el-input-number>
      </el-form-item>
      <el-form-item label="显示指示器:">
        <el-switch v-model="element.props.showPage"></el-switch>
      </el-form-item>
      <el-form-item label="指示器样式:">
        <el-radio-group v-model="element.props.pagType">
          <el-radio-button label="bullets">圆点</el-radio-button>
          <el-radio-button label="fraction">分式</el-radio-button>
          <el-radio-button label="progressbar">进度条</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="指示器颜色:">
        <el-color-picker v-model="element.props.indicatorColor"></el-color-picker>
      </el-form-item>
      <el-divider content-position="left">图片管理</el-divider>
      <div class="swiper_btns">
        <div :class="{ btn: true, disabled: element.props.swiper.length < 2 }" @click="onMinus">
          <el-icon>
            <minus />
          </el-icon>
        </div>
        <el-pagination
          background
          layout="pager"
          v-model:currentPage="curIndex"
          :page-count="element.props.swiper.length"
          :pager-count="5"
        ></el-pagination>
        <div
          class="btn"
          :class="{ btn: true, disabled: element.props.swiper.length > 9 }"
          @click="onPlus"
        >
          <el-icon>
            <plus />
          </el-icon>
        </div>
      </div>
      <el-form-item label="上传图片:" required>
        <imgEditor v-model:imgUrl="element.props.swiper[curIndex - 1]"></imgEditor>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  ElForm,
  ElFormItem,
  ElDivider,
  ElColorPicker,
  ElRadioGroup,
  ElRadioButton,
  ElSwitch,
  ElInputNumber,
  ElPagination, ElIcon,
} from "element-plus";
import imgEditor from "../commonProps/imgEditor.vue";
import { Plus, Minus } from '@element-plus/icons-vue'
const props = defineProps<{
  element: H5.Element
}>()

const curIndex = ref(1);
function onMinus() {
  props.element.props.swiper.splice(-1, 1);
}
function onPlus() {
  props.element.props.swiper.push("");
}

</script>
<style lang='less' scoped>
.swiper_btns {
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  .btn {
    background-color: #f4f4f5;
    min-width: 30px;
    border-radius: 2px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.disabled {
      pointer-events: none;
      color: #999;
    }
  }
}
</style>