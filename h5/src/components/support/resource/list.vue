<template>
  <!-- 素材库 -->
  <template v-if="dataList.length > 0">
    <div class="update_tt" v-if="canUse === false">
      <uploader :type="type" @refreshData="loadData"></uploader>
    </div>
    <div class="source_list">
      <div class="item" v-if="canUse === true">
        <uploader :type="type" @refreshData="loadData"></uploader>
      </div>
      <div class="item" v-for="(item, index) in dataList" :key="index">
        <div>
          <el-image v-if="type == 1" class="img" :src="item.url" fit="cover"></el-image>
          <el-image v-else-if="type == 2" class="img" :src="item.preview_url" fit="cover"></el-image>
          <div class="audio" v-else-if="type == 3">
            <i class="iconfont icon-vynil"></i>
            <p>{{ item.url }}</p>
          </div>
          <div class="abs">
            <div>
              <el-button v-if="canUse" type="primary" round size="small" @click="onUse(item.url)">使用</el-button>
              <el-button class="copy" size="small" round :data-clipboard-text="item.url">复制</el-button>
            </div>
            <div>
              <el-button type="success" size="small" round @click="onPreview(item, index)">预览</el-button>
              <el-button type="danger" size="small" round @click="onDelete(item.id, index)">删除</el-button>
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
      ></el-pagination>
    </div>
  </template>
  <el-empty v-else description="暂无数据">
    <uploader :type="type" @refreshData="loadData"></uploader>
  </el-empty>
  <videoPreview
    v-model:url="previewUrl"
    v-model:previewVisible="previewVisible"
    :type="type"
    v-if="previewVisible"
  ></videoPreview>
  <el-image-viewer
    v-if="showImgViewer"
    @close="closeImgViewer"
    :initial-index="imgIndex"
    :url-list="imgList"
  />
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted, nextTick, } from "vue";
import { ElImage, ElMessageBox, ElEmpty, ElButton, ElPagination, ElMessage, ElImageViewer } from "element-plus";
import uploader from "../upload/uploader.vue";
import { getList, deleteResources } from "@/api/resources";
import videoPreview from "./preview.vue";
import Clipboard from "clipboard";

const props = defineProps({
  type: Number,
  canUse: {
    type: Boolean,
    default: true,
  }
})
const emit = defineEmits(['onChange'])
//分页数据
const page = reactive({
  totalCount: 0,
  count1: 0,
  count2: 0,
  totalPage: 1,
  pageSize: 12,
  currentPage: 0,
});
// 资源列表
const dataList: any[] = reactive([]);
// 图片预览列表
const imgList = computed(() =>
  dataList.map((item: any) => {
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
    });
}
//使用
function onUse(url: string) {
  emit('onChange', url)
}
//预览图片、视频、音乐
const showImgViewer = ref(false);
const imgIndex = ref(0);
const previewUrl = ref("");
const previewVisible = ref(false);
function onPreview(item: any, index: number) {
  if (props.type == 1) {
    imgIndex.value = index;
    showImgViewer.value = true;
  } else {
    previewVisible.value = true;
    previewUrl.value = "";
    previewUrl.value = item.url;
  }
}
//关闭图片预览
function closeImgViewer() {
  showImgViewer.value = false;
}

//获取资源列表
async function loadData(pageIndex?: number) {
  let params = {
    type: props.type,
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
</script>
<style lang='less' scoped>
.update_tt {
  text-align: center;
  padding: 0 10px 8px;
}
.source_list {
  padding: 0 8px;
  overflow-y: auto;
  flex: 1;
  .item {
    float: left;
    > div,
    :deep(.el-upload) {
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      width: 110px;
      height: 110px;
      > button {
        height: 100%;
        width: 100%;
        background: #fff;
        border: 1px dashed #dcdcdc;
        font-size: 0;
        &::after {
          content: "+";
          font-size: 50px;
          line-height: 1;
          color: #dcdcdc;
        }
      }
    }
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