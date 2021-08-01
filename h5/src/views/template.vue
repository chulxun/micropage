<template>
  <master defaultActive="/template">
    <el-menu
      :default-active="page_type.toString()"
      class="el-menu-nav"
      mode="horizontal"
      @select="getWorksByType"
    >
      <el-menu-item index="0">全部 ({{ page.totalCount }})</el-menu-item>
      <el-menu-item index="1">长页 ({{ page.count1 }})</el-menu-item>
      <el-menu-item index="2">多页 ({{ page.count2 }})</el-menu-item>
    </el-menu>
    <div class="line"></div>
    <div class="work_list">
      <div
        class="item"
        v-for="(work, index) in templatesList"
        :key="work.work_id"
      >
        <div class="bg work">
          <div
            class="img"
            :style="'background-image:url(' + work.preview_img_url + ')'"
          >
            <div class="abs right" @mouseenter="work.showQrcode = true">
              <i class="iconfont icon-erweima"></i>
            </div>
            <transition name="el-zoom-in-center">
              <div
                v-show="work.showQrcode"
                class="qrcode"
                @mouseleave="work.showQrcode = false"
              >
                <canvas :ref="setWorkRef"></canvas>
              </div>
            </transition>
          </div>
          <div class="desc">
            <div class="title" :title="work.title">
              <el-tag size="mini" v-if="work.page_type == 1">长页</el-tag>
              <el-tag size="mini" type="success" v-else-if="work.page_type == 2"
                >多页</el-tag
              >
              {{ work.title }}
            </div>
            <div class="date">作者：{{ work.user_name }}</div>
            <div class="icon_list">
              <div class="icon" @click="onUse(work.work_id)">
                <el-tooltip effect="dark" content="使用" placement="top">
                  <i class="el-icon-circle-plus-outline"></i
                ></el-tooltip>
              </div>
              <div
                :class="{ icon: true, disabled: work.user_id != userInfo.id }"
                @click="onDelete(work.work_id, index)"
              >
                <el-tooltip effect="dark" content="删除" placement="top">
                  <i class="el-icon-delete"></i>
                </el-tooltip>
              </div>
              <div class="icon" @click="onPreview(work.work_id)">
                <el-tooltip effect="dark" content="预览" placement="top">
                  <i class="el-icon-view"></i
                ></el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pages">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.totalCount"
        :pageSize="page.pageSize"
        :current-page="page.currentPage"
        @current-change="fetchTemplateList"
        :hide-on-single-page="true"
      >
      </el-pagination>
    </div>
    <preview
      :workId="workId"
      v-model="previewVisible"
      v-if="previewVisible"
    ></preview>
  </master>
</template>
<script lang="ts">
import QRCode from "qrcode";
import {
  ElButton,
  ElMenu,
  ElMenuItem,
  ElTag,
  ElTooltip,
  ElDialog,
  ElPagination,
  ElLoading,
  ElMessage,
  ElMessageBox,
} from "element-plus";
import master from "@/components/common/master.vue";
import { defineComponent, ref, reactive, computed, nextTick } from "vue";
import { getTemplateWorksList, deleteWork, useTemplate } from "@/api/works";
import { useRouter } from "vue-router";
import preview from "@/components/editor/preview/index.vue";
import { formatDate } from "@/utils/index";
import { useStore } from "@/store/index";
export default defineComponent({
  components: {
    master,
    ElButton,
    ElMenu,
    ElMenuItem,
    ElTag,
    ElTooltip,
    ElDialog,
    ElPagination,
    preview,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const page_type = ref(0); //页面类型
    const templatesList = reactive([]); //作品列表
    const workRefs = reactive([]); //作品dom
    const previewVisible = ref(false); //预览
    const workId = ref(""); //预览作品ID
    const userInfo = computed(() => store.state.user.userInfo);
    const page = reactive({
      totalCount: 0,
      count1: 0,
      count2: 0,
      totalPage: 1,
      pageSize: 10,
      currentPage: 0,
    }); //分页数据
    const setWorkRef = (el: any) => {
      workRefs.push(el);
    };
    //获取作品列表
    async function fetchTemplateList(pageIndex?: number) {
      let params = {
        page_type: page_type.value,
        pageSize: page.pageSize,
        pageIndex: 1,
      };
      if (pageIndex) params.pageIndex = pageIndex;
      const res = await getTemplateWorksList(params);
      if (res && res.code == 0) {
        templatesList.length = 0;
        let data = res.data.map((item) => {
          item.showQrcode = false;
          return item;
        });
        templatesList.push(...data);
        Object.assign(page, res.page); //重置页码信息
        await nextTick();
        drawQRcode();
      }
    }
    //根据类型获取作品列表
    function getWorksByType(index: string) {
      page_type.value = parseInt(index);
      fetchTemplateList();
    }
    //生成二维码
    function drawQRcode() {
      for (let key in workRefs) {
        QRCode.toCanvas(
          workRefs[key],
          window.location.origin + "/viewer/" + key + "/preview",
          { margin: 1, scale: 4, width: 150 },
          (err: Error) => {}
        );
      }
    }
    //使用模板
    async function onUse(work_id: string) {
      let loading = ElLoading.service({ fullscreen: true });
      const res = await useTemplate({
        work_id,
      });
      loading.close();
      if (res && res.code == 0) {
        ElMessageBox.confirm("作品已经创建成功，是否去编辑作品?", "成功提醒", {
          confirmButtonText: "去编辑",
          cancelButtonText: "看看其他",
          type: "success",
        })
          .then(() => {
            let url = "/editor/" + res.property.work_id;
            window.open(url, "_blank");
          })
          .catch(() => {});
      } else {
        ElMessage.error(res.message);
      }
    }
    //预览
    function onPreview(work_id: string) {
      previewVisible.value = true;
      workId.value = work_id;
    }
    //删除
    async function onDelete(work_id: string, index: number) {
      let loading = ElLoading.service({ fullscreen: true });
      const res = await deleteWork({
        work_id,
      });
      loading.close();
      if (res && res.code == 0) {
        templatesList.splice(index, 1);
        ElMessage.success("作品删除成功");
      } else {
        ElMessage.error(res.message);
      }
    }

    fetchTemplateList(); //进入页面先获取作品列表
    return {
      userInfo,
      templatesList,
      page_type,
      page,
      previewVisible,
      workId,
      formatDate,
      setWorkRef,
      fetchTemplateList,
      onUse,
      onPreview,
      onDelete,
      getWorksByType,
    };
  },
});
</script>
<style lang="less"  scoped>
.el-menu-nav {
  padding: 0 45px;
  .el-menu-item {
    padding: 0;
    margin: 0 20px;
    color: #303133;
  }
}
.el-menu--horizontal > .el-menu-item.is-active {
  color: var(--primaryColor);
  border-color: var(--primaryColor);
  font-weight: bold;
}
.work_list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  .item {
    // max-width: 300px;
    // max-height: 400px;
    min-width: 220px;
    min-height: 280px;
    width: 20%;
    padding: 10px;
    padding-bottom: 25%;
    position: relative;
    .bg {
      background: #fff;
      border: 1px solid var(--borderColor);
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      position: absolute;
      left: 10px;
      top: 10px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .work {
      .img {
        flex: 1;
        overflow: hidden;
        position: relative;
        background: no-repeat top center;
        background-size: cover;
        border-bottom: 1px solid var(--borderColor);
        .abs {
          position: absolute;
          bottom: 10px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 3px;
          padding: 0 8px;
          color: #fff;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .left {
          left: 10px;
          font-size: 12px;
        }
        .right {
          right: 10px;
          font-size: 24px;
        }
        .qrcode {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .desc {
        height: 100px;
        padding: 0 10px;
        flex-shrink: 0;
        .title {
          padding: 10px 0 8px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .date {
          font-size: 11px;
          color: #888;
          padding-bottom: 13px;
        }
      }
      .icon_list {
        display: flex;
        justify-content: space-around;

        .icon {
          font-size: 14px;
          cursor: pointer;
          &.disabled {
            opacity: 0.5;
            pointer-events: none;
          }
        }
      }
    }
  }
}
.pages {
  padding: 30px 20px;
  display: flex;
  justify-content: center;
  :deep(.el-pager li) {
    background-color: #fff;
  }
}
</style>