<template>
  <div>
    <el-divider content-position="left">样式</el-divider>
    <el-form label-width="80px" size="small">
      <el-form-item label="整体背景色:">
        <el-color-picker v-model="element.style.backgroundColor" show-alpha></el-color-picker>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px" size="small">
      <el-form-item label="默认选中:">
        <el-select style="width: 100%" v-model="element.props.active" placeholder="请选择类型" multiple>
          <el-option
            v-for="(item, index) in element.props.options"
            :key="index"
            :label="item.title"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手风琴模式:">
        <el-switch v-model="element.props.accordion" />
        <p class="tips">手风琴模式下，每次打开一个标签，其他关闭。</p>
      </el-form-item>

      <el-divider content-position="left">内容管理</el-divider>
      <div class="swiper_btns">
        <div :class="{ btn: true, disabled: element.props.options.length < 2 }" @click="onMinus">
          <el-icon>
            <minus />
          </el-icon>
        </div>
        <el-pagination
          background
          layout="pager"
          v-model:currentPage="curIndex"
          :page-count="element.props.options.length"
          :pager-count="5"
        ></el-pagination>
        <div
          class="btn"
          :class="{ btn: true, disabled: element.props.options.length > 9 }"
          @click="onPlus"
        >
          <el-icon>
            <plus />
          </el-icon>
        </div>
      </div>
      <template v-for="(item, index) in element.props.options">
        <div :key="index" v-if="index + 1 == curIndex">
          <el-form-item label="标题:" required>
            <el-input v-model="item.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="左图标:">
            <iconEditor v-model:iconUrl="item.icon"></iconEditor>
          </el-form-item>
          <el-form-item label="内容:">
            <el-input
              v-model="item.content"
              placeholder="请输入内容"
              maxlength="5000"
              type="textarea"
              :rows="8"
            ></el-input>
          </el-form-item>
        </div>
      </template>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
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
  ElSwitch,
  ElPagination,
  ElSelect,
  ElOption, ElIcon,
} from "element-plus";
import iconEditor from "../commonProps/iconEditor.vue";
import { Plus, Minus } from '@element-plus/icons-vue'


const props = defineProps({
  element: Object
})
const curIndex = ref(1);
function onMinus() {
  if (curIndex.value == props.element.props.options.length) {
    curIndex.value -= 1;
  }
  props.element.props.options.splice(-1, 1);
}
function onPlus() {
  let index = props.element.props.options.length + 1;
  props.element.props.options.push({
    title: "标题" + index,
    content: "内容" + index,
  });
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