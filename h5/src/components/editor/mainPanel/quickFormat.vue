<template>
  <el-tooltip content="一键排版" placement="right">
    <div class="icon" @click="visible = true">
      <i class="iconfont icon-yijianpaiban" />
    </div>
  </el-tooltip>
  <el-dialog width="500px" v-model="visible" :append-to-body="true" title="欢迎使用一键排版功能">
    <div>
      <p style="padding-bottom:18px;">可设置元素间隔距离，默认0。</p>
      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item label="居左">
              <el-input-number
                v-model.number="params.pLeft"
                :min="0"
                :max="375"
                :step="1"
                label="px"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="居上">
              <el-input-number
                v-model.number="params.pTop"
                :min="0"
                :max="375"
                :step="1"
                label="px"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p style="color:#999">注：隐藏图层、固定定位图层不参与排版。</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="onQuickFormat">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useStore } from "@/store/index";
import { ElMessage } from 'element-plus'

const visible = ref(false)
const params = reactive({
  pLeft: 0, pTop: 0
})
const store = useStore();
const editingPage: any = computed(() => store.state.editor.editingPage);
const quickFormat = (formatParams: { pLeft: number, pTop: number }) => store.commit('editor/quickFormat', formatParams)
const onQuickFormat = () => {
  if (editingPage.value.elements.length < 2) {
    ElMessage.warning('现在没有元素可排版哦，去添加组件吧')
  } else {
    quickFormat(params)
    ElMessage.success('一键排版成功')
    visible.value = false
  }
}
</script>

<style lang="less" scoped>
</style>