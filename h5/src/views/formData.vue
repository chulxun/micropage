<template>
  <master defaultActive="/formdata">
    <div class="content">
      <el-table :data="dataList" style="width: 100%">
        <el-table-column label="作品封面" align="center">
          <template #default="scope">
            <img :src="scope.row.work_img" class="img" />
          </template>
        </el-table-column>
        <el-table-column label="作品名称" align="center">
          <template #default="scope">
            <div class="title">
              <el-tag size="small" v-if="scope.row.page_type == 1">长页</el-tag>
              <el-tag size="small" type="success" v-else-if="scope.row.page_type == 2">多页</el-tag>
              <p>{{ scope.row.work_title }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="hits" label="浏览数" align="center">
          <template #default="scope">
            <strong>{{ scope.row.hits || 0 }}</strong>
          </template>
        </el-table-column>
        <el-table-column prop="forms" label="表单数" align="center">
          <template #default="scope">
            <strong style="color: red">{{ scope.row.count }}</strong>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="primary" plain size="small" @click="handleOnDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.totalCount"
          :pageSize="page.pageSize"
          :current-page="page.currentPage"
          @current-change="fetchDataList"
          :hide-on-single-page="true"
        ></el-pagination>
      </div>
    </div>
  </master>
</template>
<script setup lang="ts">
import { ElButton, ElTable, ElTableColumn, ElTag, ElPagination, } from "element-plus";
import master from "@/components/common/master.vue";
import { onMounted, reactive } from "vue";
import { getList } from "@/api/form";
import { useRouter } from "vue-router";

const router = useRouter();
const dataList: any = reactive([]);
const page = reactive({
  totalCount: 0,
  totalPage: 1,
  pageSize: 10,
  currentPage: 0,
}); //分页数据

//获取数据
async function fetchDataList(pageIndex?: number) {
  let params = {
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
//查看详情
function handleOnDetail(item: any) {
  router.push("/formdata/" + item.work_id);
}

onMounted(() => {
  fetchDataList(); //进入页面先获取数据
})
</script>
<style lang="less"  scoped>
.content {
  margin: 20px;
  background: #fff;
  min-height: calc(100% - 40px);
  border-radius: 5px;
  padding: 20px;
}
.img {
  max-height: 100px;
  max-width: 100px;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    padding: 0 5px;
  }
}
.pages {
  padding: 30px 20px;
  display: flex;
  justify-content: center;
}
</style>