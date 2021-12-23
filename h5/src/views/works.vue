<template>
  <master defaultActive="/works">
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
    <div class="work_list" v-if="worksList.length > 0">
      <div class="item">
        <div class="bg add" @click="addVisible = true">
          <i class="el-icon-circle-plus"></i>
          <p>创建新作品</p>
        </div>
      </div>
      <div class="item" v-for="(work,index) in worksList" :key="work.work_id">
        <div class="bg work">
          <div class="img" :style="'background-image:url(' + work.preview_img_url + ')'">
            <div class="abs left" v-if="work.pages != work.publish_pages">未发布</div>
            <div class="abs right" @mouseenter="work.showQrcode = true">
              <i class="iconfont icon-erweima"></i>
            </div>
            <transition name="el-zoom-in-center">
              <div v-show="work.showQrcode" class="qrcode" @mouseleave="work.showQrcode = false">
                <canvas :ref="setWorkRef"></canvas>
              </div>
            </transition>
          </div>
          <div class="desc">
            <div class="title" :title="work.title">
              <el-tag size="mini" v-if="work.page_type == 1">长页</el-tag>
              <el-tag size="mini" type="success" v-else-if="work.page_type == 2">多页</el-tag>
              {{ work.title }}
            </div>
            <div class="date">更新时间：{{ formatDate(work.updated_at) }}</div>
            <div class="icon_list">
              <div class="icon" @click="onEdit(work.work_id)">
                <el-tooltip effect="dark" content="编辑" placement="top">
                  <i class="el-icon-edit-outline"></i>
                </el-tooltip>
              </div>
              <div class="icon" @click="onDelete(work.work_id, index)">
                <el-tooltip effect="dark" content="删除" placement="top">
                  <i class="el-icon-delete"></i>
                </el-tooltip>
              </div>
              <div class="icon" @click="onPreview(work.work_id)">
                <el-tooltip effect="dark" content="预览" placement="top">
                  <i class="el-icon-view"></i>
                </el-tooltip>
              </div>
              <div class="icon" @click="onViewData(work.work_id)">
                <el-tooltip effect="dark" content="数据" placement="top">
                  <i class="el-icon-s-data"></i>
                </el-tooltip>
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
        @current-change="fetchWorksList"
        :hide-on-single-page="true"
      ></el-pagination>
    </div>
    <el-empty v-if="worksList.length == 0" description="暂时没有作品">
      <el-button type="primary" @click="addVisible = true">立即创建</el-button>
    </el-empty>
    <el-dialog title="选择作品类型" v-model="addVisible" custom-class="add_dialog" width="480px">
      <createWork v-model:addVisible="addVisible" @refreshData="fetchWorksList"></createWork>
    </el-dialog>
    <preview :workId="workId" v-model="previewVisible" v-if="previewVisible"></preview>
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
  ElEmpty,
} from "element-plus";
import master from "@/components/common/master.vue";
import createWork from "@/components/common/createWork.vue";
import { defineComponent, ref, reactive, onMounted, nextTick } from "vue";
import { getWorksList, deleteWork } from "@/api/works";
import { useRouter } from "vue-router";
import preview from "@/components/editor/preview/index.vue";
import { formatDate } from "@/utils/index";
export default defineComponent({
  components: {
    master,
    ElButton,
    ElMenu,
    ElMenuItem,
    ElTag,
    ElTooltip,
    ElDialog,
    createWork,
    ElPagination,
    preview,
    ElEmpty,
  },
  setup() {
    const router = useRouter();
    const addVisible = ref(false); //显示添加作品弹框
    const page_type = ref(0); //页面类型
    const worksList: H5.WorksList = reactive([]); //作品列表
    const workRefs: Array<HTMLElement> = reactive([]); //作品dom
    const previewVisible = ref(false); //预览
    const workId = ref(""); //预览作品ID
    const page = reactive({
      totalCount: 0,
      count1: 0,
      count2: 0,
      totalPage: 1,
      pageSize: 14,
      currentPage: 0,
    }); //分页数据
    const setWorkRef = (el: any) => {
      workRefs.push(el);
    };
    //获取作品列表
    async function fetchWorksList(pageIndex?: number) {
      let params = {
        page_type: page_type.value,
        pageSize: page.pageSize,
        pageIndex: 1,
      };
      if (pageIndex) params.pageIndex = pageIndex;
      const res = await getWorksList(params);
      if (res && res.code == 0) {
        worksList.length = 0;
        let data = res.data.map((item: H5.WorkInfo) => {
          item.showQrcode = false;
          return item;
        });
        worksList.push(...data);
        Object.assign(page, res.page); //重置页码信息
        await nextTick();
        drawQRcode();
      }
    }
    //根据类型获取作品列表
    function getWorksByType(index: string) {
      page_type.value = parseInt(index);
      fetchWorksList();
    }
    //生成二维码
    function drawQRcode() {
      for (let key in workRefs) {
        QRCode.toCanvas(
          workRefs[key],
          window.location.origin + "/viewer/" + key + "/preview",
          { margin: 1, scale: 4, width: 150 },
          (err: Error) => { }
        );
      }
    }
    //去编辑作品
    function onEdit(work_id: string) {
      window.open("/editor/" + work_id, "_blank");
    }
    //预览作品
    function onPreview(work_id: string) {
      previewVisible.value = true;
      workId.value = work_id;
    }
    //删除作品
    async function onDelete(work_id: string, index: number) {
      let loading = ElLoading.service({ fullscreen: true });
      const res = await deleteWork({
        work_id,
      });
      loading.close();
      if (res && res.code == 0) {
        worksList.splice(index, 1);
        ElMessage.success("作品删除成功");
      } else {
        ElMessage.error(res.message);
      }
    }
    //查看作品数据
    function onViewData(work_id: string) {
      router.push("/formData/" + work_id);
    }
    fetchWorksList(); //进入页面先获取作品列表
    return {
      addVisible,
      worksList,
      page_type,
      page,
      previewVisible,
      workId,
      formatDate,
      setWorkRef,
      fetchWorksList,
      onEdit,
      onPreview,
      onDelete,
      onViewData,
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
.pages {
  padding: 30px 20px;
  display: flex;
  justify-content: center;
  :deep(.el-pager li) {
    background-color: #fff;
  }
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
        }
      }
    }
    .add {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      i {
        color: var(--primaryColor);
        font-size: 64px;
      }
      p {
        font-size: 18px;
        font-weight: bold;
        padding-top: 15px;
      }
    }
  }
}
</style>