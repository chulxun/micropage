<template>
  <!-- 素材库 -->
  <div class="source_content">
    <div class="title">
      我的素材库<i class="el-icon-close closed" @click="closedThis"></i>
    </div>
    <div class="source_title">
      <el-radio-group v-model="sourceType" size="small">
        <el-radio-button :label="1">图片</el-radio-button>
        <el-radio-button :label="2">视频</el-radio-button>
        <el-radio-button :label="3">音乐</el-radio-button>
      </el-radio-group>
    </div>
    <template v-if="dataList.length > 0">
      <div class="update_tt">
        <uploader :sourceType="sourceType" @refreshData="loadData"></uploader>
      </div>
      <div class="source_list">
        <div class="item" v-for="(item, index) in dataList" :key="index">
          <div>
            <el-image
              v-if="sourceType == 1"
              class="img"
              :src="item.url"
              fit="cover"
            ></el-image>
            <el-image
              v-else-if="sourceType == 2"
              class="img"
              :src="item.preview_url"
              fit="cover"
            ></el-image>
            <div class="audio" v-else-if="sourceType == 3">
              <i class="iconfont icon-vynil"></i>
              <p>
                {{ item.url }}
              </p>
            </div>
            <div class="abs">
              <div>
                <el-button
                  type="primary"
                  round
                  size="mini"
                  @click="onUse(item.url)"
                  >使用</el-button
                >
                <el-button
                  class="copy"
                  size="mini"
                  round
                  :data-clipboard-text="item.url"
                  >复制</el-button
                >
              </div>
              <div>
                <el-button
                  type="success"
                  size="mini"
                  round
                  @click="onPreview(item, index)"
                  >预览</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  round
                  @click="onDelete(item.id, index)"
                  >删除</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pages">
        <el-pagination
          :hide-on-single-page="true"
          background
          layout="prev, pager, next"
          :total="page.totalCount"
          :pageSize="page.pageSize"
          :current-page="page.currentPage"
          @current-change="loadData"
        >
        </el-pagination></div
    ></template>
    <el-empty v-else description="暂无数据">
      <uploader :sourceType="sourceType" @refreshData="loadData"></uploader>
    </el-empty>
    <videoPreview
      v-model:videoUrl="videoUrl"
      v-model:audioUrl="audioUrl"
      v-model:previewVisible="previewVisible"
      v-if="previewVisible"
    ></videoPreview>
    <el-image-viewer
      v-if="showImgViewer"
      @close="closeImgViewer"
      :initial-index="imgIndex"
      :url-list="imgList"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  reactive,
  onMounted,
  nextTick,
  watch,
} from "vue";
import {
  ElRadioGroup,
  ElRadioButton,
  ElImage,
  ElMessageBox,
  ElEmpty,
  ElButton,
  ElPagination,
  ElMessage,
  ElImageViewer,
} from "element-plus";
import uploader from "./uploader.vue";
import { useStore } from "@/store/index";
import { getList, deleteResources } from "@/api/resources";
import videoPreview from "@/components/common/videoPreview.vue";
import Clipboard from "clipboard";
export default defineComponent({
  props: ["pluginType"],
  components: {
    ElRadioGroup,
    ElRadioButton,
    ElImage,
    ElEmpty,
    ElButton,
    uploader,
    ElPagination,
    videoPreview,
    ElImageViewer,
  },
  setup(props, ctx) {
    const store = useStore();
    const sourceStack = computed(() => store.state.common.sourceStack);
    const changeSourceType = computed(
      () => store.state.common.changeSourceType
    );
    const setOperaType = (type: any) =>
      store.commit("common/setOperaType", type);

    const setChangeSourceType = (type: any) =>
      store.commit("common/setChangeSourceType", type);
    function closedThis() {
      setOperaType(0);
      setChangeSourceType(1);
    }
    const editingElement: any = computed(
      () => store.state.editor.editingElement
    );
    const editingPageProps: any = computed(
      () => store.state.editor.editingPageProps
    );
    const setEditingElement = (preload: any) =>
      store.commit("editor/setEditingElement", preload);
    const sourceType = ref(changeSourceType.value);
    const page = reactive({
      totalCount: 0,
      count1: 0,
      count2: 0,
      totalPage: 1,
      pageSize: 12,
      currentPage: 0,
    }); //分页数据
    const dataList = reactive([]);
    const imgList = computed(() =>
      dataList.map((item) => {
        return item.url;
      })
    );
    //删除
    function onDelete(id: number, index: number) {
      ElMessageBox.confirm("确定要删除该资源吗？", "删除提醒", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          const res = await deleteResources({ id });
          if (res && res.code == 0) {
            ElMessage.success("删除成功");
            dataList.splice(index, 1);
          } else {
            ElMessage.error(res.message);
          }
        })
        .catch((action) => {});
    }
    //使用
    function onUse(item: any) {
      if (
        sourceType.value == 1 &&
        sourceStack.value.stack &&
        (editingElement.value || editingPageProps.value)
      ) {
        sourceStack.value.stack[sourceStack.value.key] = item;
      } else if (
        sourceType.value == 1 &&
        editingElement.value &&
        editingElement.value.props.hasOwnProperty("imgUrl") == true
      ) {
        editingElement.value.props.imgUrl = item;
        setEditingElement(editingElement.value);
      } else if (
        sourceType.value == 2 &&
        editingElement.value &&
        editingElement.value.props.hasOwnProperty("videoUrl") == true
      ) {
        editingElement.value.props.videoUrl = item;
        setEditingElement(editingElement.value);
      } else if (
        sourceType.value == 3 &&
        editingElement.value &&
        editingElement.value.props.hasOwnProperty("audioUrl") == true
      ) {
        editingElement.value.props.audioUrl = item;
        setEditingElement(editingElement.value);
      } else {
        ElMessage.warning("选中一个元素才能使用成功");
      }
    }
    //预览图片、视频、音乐
    const showImgViewer = ref(false);
    const imgIndex = ref(0);
    const videoUrl = ref("");
    const audioUrl = ref("");
    const previewVisible = ref(false);
    function onPreview(item, index) {
      if (sourceType.value == 1) {
        imgIndex.value = index;
        showImgViewer.value = true;
      } else if (sourceType.value == 2) {
        previewVisible.value = true;
        audioUrl.value = "";
        videoUrl.value = item.url;
      } else if (sourceType.value == 3) {
        previewVisible.value = true;
        videoUrl.value = "";
        audioUrl.value = item.url;
      }
    }
    //关闭图片预览
    function closeImgViewer() {
      showImgViewer.value = false;
    }

    //获取资源列表
    async function loadData(pageIndex?: number) {
      let params = {
        type: sourceType.value,
        pageSize: page.pageSize,
        pageIndex: 1,
      };
      if (pageIndex) params.pageIndex = pageIndex;
      const res = await getList(params);
      if (res && res.code == 0) {
        dataList.length = 0;
        dataList.push(...res.data);
        Object.assign(page, res.page); //重置页码信息
      }
    }

    onMounted(async () => {
      loadData();
      await nextTick();
      var clipboard = new Clipboard(".copy");
      clipboard.on("success", (e) => {
        ElMessage.success("复制成功");
      });

      clipboard.on("error", (e) => {
        ElMessage.error("复制失败");
      });
    });
    watch(sourceType, (newval, oldval) => {
      if (newval != oldval) {
        loadData();
      }
    });
    return {
      sourceType,
      editingElement,
      editingPageProps,
      closedThis,
      dataList,
      onDelete,
      onUse,
      loadData,
      page,

      videoUrl,
      audioUrl,
      previewVisible,
      closeImgViewer,
      imgIndex,
      showImgViewer,
      imgList,
      onPreview,
    };
  },
});
</script>
<style lang='less' scoped>
.source_content {
  position: fixed;
  left: 80px;
  top: 60px;
  z-index: 1000;
  width: 400px;
  height: calc(100% - 60px);
  background: #fff;
  border-right: 1px solid var(--borderColor);
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.07);
  color: #333;
  border-top-right-radius: 5px;
  display: flex;
  flex-direction: column;
  .title {
    font-weight: bold;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 16px;
    padding: 14px 0;
    border-bottom: 1px solid var(--borderColor);
    .closed {
      cursor: pointer;
    }
  }
  .source_title {
    display: flex;
    justify-content: center;
    padding: 16px;
  }
}
.update_tt {
  text-align: center;
  padding: 0 10px 8px;
}
.source_list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 8px;
  overflow-y: auto;
  flex: 1;
  .item {
    > div {
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      height: 110px;
    }
    width: 33.33%;
    padding: 8px;
    .img,
    .audio {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
      background: #f1f1f1;
      position: absolute;
      top: 0;
      left: 0;
    }
    .audio {
      flex-direction: column;
      font-size: 26px;
      padding: 0 10px;
      i {
        margin-bottom: 10px;
        font-size: 26px;
      }
      p {
        word-break: break-all;
        font-size: 10px;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
    .abs {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      opacity: 0;
      //加transform动画会引起：弹出视频、音乐预览后关闭，该条item不显示
      // transform: translateY(100%);
      transition: all 0.3s ease-out;
      padding: 0 5px;
      > div {
        display: flex;
        align-items: center;
        padding: 5px;
        justify-content: center;
        button {
          padding: 0 5px;
        }
      }
    }
    &:hover .abs {
      opacity: 1;
      // transform: translateY(0);
    }
  }
}
.pages {
  padding: 25px 20px;
  display: flex;
  justify-content: center;
  :deep(.el-pager li) {
    background-color: #fff;
  }
}
</style>