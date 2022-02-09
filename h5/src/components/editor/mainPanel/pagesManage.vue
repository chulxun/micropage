<template>
  <div class="pages" v-if="work.page_type == 2">
    <ul>
      <el-tooltip placement="top" v-for="(item, index) in work.pages" :key="index">
        <template #content>
          <div class="icons">
            <el-icon @click="copyPage(item, index)">
              <copy-document />
            </el-icon>
            <el-icon class="close" @click="deletePage(item, index)">
              <delete />
            </el-icon>
          </div>
        </template>
        <li
          :class="{ current: editingPage.ukey == item.ukey }"
          @click="choosePage(item)"
        >{{ index + 1 }}</li>
      </el-tooltip>
    </ul>
    <el-tooltip content="新增页面" placement="top">
      <div class="add_icon">
        <el-icon @click="addPage">
          <plus />
        </el-icon>
      </div>
    </el-tooltip>
  </div>
</template>
<script setup lang='ts'>
import { computed } from "vue";
import { ElTooltip, ElMessageBox, ElMessage, ElIcon } from "element-plus";
import { Delete, CopyDocument, Plus } from '@element-plus/icons-vue'
import { useStore } from "@/store/index";
import Work from "@/store/model/work";

const store = useStore();
const work = computed(() => store.state.editor.work);
const editingPage: any = computed(() => store.state.editor.editingPage);
const setEditingPage = (page: any) =>
  store.commit("editor/setEditingPage", page);
const setEditingPageProps = (pageProps: any) =>
  store.commit("editor/setEditingPageProps", pageProps);
const setEditingElement = (ele: any) =>
  store.commit("editor/setEditingElement", ele);

//新增页面
function addPage() {
  Work.addPage(work.value.pages);
}
//选择当前page
function choosePage(item: any) {
  if (editingPage.value.ukey == item.ukey) return;
  setEditingPage(item);
  setEditingPageProps(item.elements[0].props);
  setEditingElement(null);
}
//删除page
function deletePage(item: any, index: number) {
  ElMessageBox.confirm("确定删除该页面吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  })
    .then(() => {
      if (editingPage.value.ukey == item.ukey) {
        setEditingElement(null);
        if (index < work.value.pages.length - 1) {
          setEditingPage(work.value.pages[index + 1]);
          setEditingPageProps(
            work.value.pages[index + 1].elements[0].props
          );
        } else {
          setEditingPage(work.value.pages[0]);
          setEditingPageProps(work.value.pages[0].elements[0].props);
        }
      }
      work.value.pages.splice(index, 1);
      ElMessage.success("删除成功");
    })
    .catch(() => { });
}
//复制page
function copyPage(item: any, index: number) {
  Work.copyPage(work.value.pages, item);
  ElMessage.success("复制页面成功");
}

</script>
<style lang='less' scoped>
.pages {
  background: #fff;
  border-top: 1px solid var(--borderColor);
  position: fixed;
  left: 80px;
  bottom: 0;
  right: 360px;
  display: flex;
  align-items: center;
  height: 55px;
  padding: 0 20px;
  ul {
    display: flex;
    justify-content: center;
    flex: 1;
  }
  li {
    position: relative;
  }

  li,
  .add_icon {
    user-select: none;
    border: 1px solid var(--borderColor);
    padding: 7px 12px;
    border-radius: 3px;
    margin: 0 7px;
    font-weight: bold;
    cursor: pointer;
    &.current,
    &:hover {
      color: var(--primaryColor);
      border-color: var(--primaryColor);
    }
  }
}
.icons {
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 4px 0;
  > * {
    font-size: 16px;
    cursor: pointer;
  }
}
</style>