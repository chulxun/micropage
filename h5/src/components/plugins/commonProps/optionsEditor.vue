
//公用编辑器--添加option
<template>
  <div>
    <el-divider content-position="left">编辑选项</el-divider>
    <el-form label-width="80px">
      <el-form-item
        v-for="(option, index) in element.props.options"
        :label="'选项' + (index + 1)"
        :key="index"
        class="button_option"
      >
        <el-input v-model="option.val"></el-input
        ><el-button v-if="index > 1" @click.prevent="removeOption(index)"
          >删除</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button @click="addOption" type="primary" plain>新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang='ts'>
import { ElForm, ElFormItem, ElInput, ElButton, ElDivider } from "element-plus";
import { defineComponent } from "vue";
export default defineComponent({
  props: ["element"],
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElDivider,
  },
  setup(props) {
    function addOption() {
      props.element.props.options.push({
        val: "新选项" + (props.element.props.options.length + 1),
      });
    }
    function removeOption(index) {
      props.element.props.options.splice(index, 1);
    }
    return { addOption, removeOption };
  },
});
</script>
<style lang='less' scoped>
.button_option {
  :deep(.el-form-item__content) {
    display: flex;
    button {
      margin-left: 10px;
    }
  }
}
</style>