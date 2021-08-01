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
        <el-input-number
          v-model.number="element.props.delay"
          :min="1000"
          :max="10000"
          :step="100"
          controls-position="right"
        ></el-input-number>
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
        <el-color-picker
          v-model="element.props.indicatorColor"
        ></el-color-picker>
      </el-form-item>
      <el-divider content-position="left">图片管理</el-divider>
      <div class="swiper_btns">
        <div
          :class="{ btn: true, disabled: element.props.swiper.length < 2 }"
          @click="onMinus"
        >
          <i class="el-icon-minus"></i>
        </div>
        <el-pagination
          background
          layout="pager"
          v-model:currentPage="curIndex"
          :page-count="element.props.swiper.length"
          :pager-count="5"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
        <div
          class="btn"
          :class="{ btn: true, disabled: element.props.swiper.length > 9 }"
          @click="onPlus"
        >
          <i class="el-icon-plus"></i>
        </div>
      </div>
      <el-form-item label="上传图片:" required>
        <imgEditor
          v-model:imgUrl="element.props.swiper[curIndex - 1]"
        ></imgEditor>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElDivider,
  ElColorPicker,
  ElRadioGroup,
  ElRadioButton,
  ElSelect,
  ElOption,
  ElSwitch,
  ElInputNumber,
  ElPagination,
} from "element-plus";
import imgEditor from "../commonProps/imgEditor.vue";
import { useStore } from "@/store/index";
export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElDivider,
    imgEditor,
    ElRadioGroup,
    ElColorPicker,
    ElRadioButton,
    ElSelect,
    ElOption,
    ElSwitch,
    ElInputNumber,
    ElPagination,
  },
  props: ["element"],
  setup(props, ctx) {
    const store = useStore();
    const setSourceStack = (preload: any) =>
      store.commit("common/setSourceStack", preload);
    const curIndex = ref(1);

    onMounted(() => {
      setSourceStack({ stack: props.element.props.swiper, key: 0 });
    });
    function handleCurrentChange(val) {
      setSourceStack({ stack: props.element.props.swiper, key: val - 1 });
    }
    function onMinus() {
      props.element.props.swiper.splice(-1, 1);
    }
    function onPlus() {
      props.element.props.swiper.push("");
    }
    //组件销毁时
    onUnmounted(() => {
      setSourceStack({ stack: null, key: "" });
    });
    return { curIndex, handleCurrentChange, onMinus, onPlus };
  },
  methods: {},
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