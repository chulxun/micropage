
//公用编辑器--编辑点击事件
<template>
  <div>
    <el-divider content-position="left">事件</el-divider>
    <el-form label-width="80px">
      <el-form-item label="点击事件:">
        <el-select
          v-model="element.props.clickType"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="触发内容:" v-if="element.props.clickType > 0">
        <el-input
          v-model="element.props.clickContent"
          :placeholder="placeHolder"
          maxlength="100"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang='ts'>
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElDivider,
} from "element-plus";
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: ["element"],
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption,
    ElDivider,
  },
  setup(props) {
    const options = [
      {
        value: 0,
        label: "无",
      },
      {
        value: 1,
        label: "跳转http链接",
      },
      {
        value: 2,
        label: "toast提示",
      },
    ];
    let placeHolder = computed(() => {
      switch (props.element.props.clickType) {
        case 1:
          return "请输入url";
        case 2:
          return "请输入toast内容";
        default:
          return "请输入内容";
      }
    });
    return { options, placeHolder };
  },
});
</script>
<style lang='less' scoped>
</style>