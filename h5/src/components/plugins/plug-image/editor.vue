<template>
  <div v-if="element">
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px">
      <el-form-item label="上传图片:" required>
        <div>
          <imgEditor v-model:imgUrl="element.props.imgUrl"></imgEditor>
          <el-button type="primary" @click="resetWH" style="margin-top:10px">重置图片宽高</el-button>
        </div>
      </el-form-item>

      <el-form-item label="填充方式:" required>
        <el-select style="width: 100%" v-model="element.props.objectFit" placeholder="请选择填充方式">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <clickEditor :element="element"></clickEditor>
  </div>
</template>
<script setup lang="ts">
import { ElForm, ElFormItem, ElButton, ElDivider, ElSelect, ElOption, } from "element-plus";
import imgEditor from "../commonProps/imgEditor.vue";
import clickEditor from "../commonProps/clickEditor.vue";
import { loadImg } from "@/utils/index";
const props = defineProps<{
  element: H5.Element
}>()
const typeOptions = [{
  value: 'fill',
  label: '拉伸填充，可能变形 (fill)',
},
{
  value: 'contain',
  label: '原尺寸比例，自动缩放 (contain)',
},
{
  value: 'cover',
  label: '原尺寸比例，自动裁剪 (cover)',
},
{
  value: 'none',
  label: '原尺寸比例，不缩放裁剪 (none)',
},
{
  value: 'scale-down',
  label: '弹性缩放 (scale-down)',
}];
async function resetWH() {
  let width = 0,
    height = 0;
  var img: any = await loadImg(props.element.props.imgUrl);
  if (img) {
    width = parseInt(img.width / 2 + "");
    height = parseInt(img.height / 2 + "");
  }
  if (props.element) {
    props.element.style.width = width;
    props.element.style.height = height;
  }
}

</script>
<style lang='less' scoped>
</style>