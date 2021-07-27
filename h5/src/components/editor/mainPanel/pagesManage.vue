<template>
  <div class="pages" v-if="work.page_type == 2">
    <ul>
      <li
        :class="{ current: editingPage.ukey == item.ukey }"
        v-for="(item, index) in work.pages"
        :key="index"
        @click="choosePage(item)"
      >
        {{ index + 1 }}
        <el-popconfirm
          v-if="work.pages.length > 1"
          title="确定删除该页面吗？"
          confirmButtonType="danger"
          cancelButtonText="取消"
          confirmButtonText="删除"
          @confirm="deletePage(item, index)"
        >
          <template #reference>
            <span class="el-icon-close close"></span>
          </template>
        </el-popconfirm>
      </li>
    </ul>
    <el-tooltip content="新增页面" placement="top">
      <i class="fa fa-plus" @click="addPage"></i>
    </el-tooltip>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed } from "vue";
import { ElTooltip, ElPopconfirm } from "element-plus";
import { useStore } from "@/store/index";
import Work from "@/store/model/work";
export default defineComponent({
  components: {
    ElTooltip,
    ElPopconfirm,
  },
  setup() {
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
    function deletePage(item, index) {
      if (editingPage.value.ukey == item.ukey) {
        setEditingElement(null);
        if (index < work.value.pages.length - 1) {
          setEditingPage(work.value.pages[index + 1]);
          setEditingPageProps(work.value.pages[index + 1].elements[0].props);
        } else {
          setEditingPage(work.value.pages[0]);
          setEditingPageProps(work.value.pages[0].elements[0].props);
        }
      }
      work.value.pages.splice(index, 1);
    }
    return { work, editingPage, addPage, choosePage, deletePage };
  },
});
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
    span {
      position: absolute;
      top: -15px;
      right: -15px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      border-radius: 50%;
      padding: 5px;
      display: none;
    }
    &:hover span {
      display: inline-block;
    }
  }
  li,
  i {
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
</style>