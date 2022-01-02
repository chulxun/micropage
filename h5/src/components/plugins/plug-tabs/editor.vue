<template>
  <div>
    <el-divider content-position="left">样式</el-divider>
    <el-form label-width="80px" size="small">
      <el-form-item label="整体背景色:">
        <el-color-picker v-model="element.style.backgroundColor" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="标签选中色:">
        <el-color-picker v-model="element.props.color" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="标签背景色:">
        <el-color-picker v-model="element.props.background" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="标题默认色:">
        <el-color-picker v-model="element.props.titleInactiveColor" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="标题选中色:">
        <el-color-picker v-model="element.props.titleActiveColor" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="内边距:">
        <el-input-number
          v-model.number="element.props.padding"
          :min="0"
          :max="100"
          :step="1"
          label="px"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px" size="small">
      <el-form-item label="风格类型:">
        <el-radio-group v-model="element.props.type">
          <el-radio-button label="line">line</el-radio-button>
          <el-radio-button label="card">card</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="默认选中:">
        <el-select style="width: 100%" v-model="element.props.active" placeholder="请选择类型">
          <el-option
            v-for="(item, index) in element.props.options"
            :key="index"
            :label="item.title"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转场动画:">
        <el-switch v-model="element.props.animated" />
      </el-form-item>
      <el-form-item label="粘性定位:">
        <el-switch v-model="element.props.sticky" />
      </el-form-item>
      <el-divider content-position="left">标签管理</el-divider>
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
          <el-form-item label="标签名称:" required>
            <el-input v-model="item.title" placeholder="请输入标签名称"></el-input>
          </el-form-item>
          <textEditor v-model:text="item.content"></textEditor>
        </div>
      </template>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, defineAsyncComponent } from "vue";
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
import { Plus, Minus } from '@element-plus/icons-vue'

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
    ElSwitch,
    ElPagination,
    ElSelect,
    ElOption, ElIcon, Plus, Minus,
    textEditor: defineAsyncComponent(
      () => import("../commonProps/textEditor.vue")
    ),
  },
  props: ["element"],
  setup(props, ctx) {
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
        title: "标签" + index,
        content: "内容" + index,
      });
    }
    return { curIndex, onMinus, onPlus };
  },
});
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