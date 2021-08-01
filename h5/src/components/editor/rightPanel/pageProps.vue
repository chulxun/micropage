<template>
  <div v-if="editingPageProps">
    <el-form label-width="80px" size="small">
      <el-form-item label="背景颜色">
        <el-color-picker
          v-model="editingPageProps.bgColor"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="页面高度" v-if="work.page_type == 1">
        <el-input-number
          v-model.number="editingPageProps.pageHeight"
          :min="667"
          :max="100000"
          :step="1"
          label="px"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="背景图片:">
        <imgEditor v-model:imgUrl="editingPageProps.imgUrl"></imgEditor>
      </el-form-item>
      <el-form-item label="背景填充:">
        <el-select
          style="width: 100%"
          v-model="editingPageProps.bgSize"
          placeholder="请选择"
        >
          <el-option
            v-for="item in sizeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span class="span_right">{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="背景重复:">
        <el-select
          style="width: 100%"
          v-model="editingPageProps.bgRepeat"
          placeholder="请选择"
        >
          <el-option
            v-for="item in repeatList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span class="span_right">{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="背景位置:">
        <el-select
          style="width: 100%"
          v-model="editingPageProps.bgPosition"
          placeholder="请选择"
        >
          <el-option
            v-for="item in positionList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span class="span_right">{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElColorPicker,
  ElInputNumber,
  ElSelect,
  ElOption,
} from "element-plus";
import imgEditor from "@/components/plugins/commonProps/imgEditor.vue";
import { defineComponent, computed } from "vue";
import { useStore } from "@/store/index";
export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElColorPicker,
    ElInputNumber,
    imgEditor,
    ElSelect,
    ElOption,
  },
  setup() {
    const store = useStore();
    const editingPageProps: any = computed(
      () => store.state.editor.editingPageProps
    );

    const work = computed(() => store.state.editor.work);
    const sizeList = [
      {
        value: "cover",
        label: "完全覆盖",
      },
      {
        value: "contain",
        label: "自动适应",
      },
      {
        value: "100% 100%",
        label: "拉伸背景",
      },
      {
        value: "100% auto",
        label: "拉伸x轴",
      },
      {
        value: "auto 100%",
        label: "拉伸y轴",
      },
    ];
    const repeatList = [
      {
        value: "no-repeat",
        label: "不重复",
      },
      {
        value: "repeat",
        label: "垂直水平重复",
      },
      {
        value: "repeat-x",
        label: "水平重复",
      },
      {
        value: "repeat-y",
        label: "垂直重复",
      },
    ];

    const positionList = [
      {
        value: "top left",
        label: "上左",
      },
      {
        value: "top center",
        label: "上中心",
      },
      {
        value: "top right",
        label: "上右",
      },
      {
        value: "center left",
        label: "中心左",
      },
      {
        value: "center center",
        label: "中心",
      },
      {
        value: "center right",
        label: "中心右",
      },
      {
        value: "bottom left",
        label: "下左",
      },
      {
        value: "bottom center",
        label: "下中心",
      },
      {
        value: "bottom right",
        label: "下右",
      },
    ];
    return {
      editingPageProps,
      work,
      sizeList,
      repeatList,
      positionList,
    };
  },
});
</script>
<style lang='less' scoped>
.span_right {
  float: right;
  color: #8492a6;
  font-size: 12px;
  margin-right: -10px;
}
</style>