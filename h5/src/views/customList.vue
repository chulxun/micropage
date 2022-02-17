<template>
  <master defaultActive="/custom">
    <div class="work_list">
      <div class="item" v-for="(work, index) in customTemplates" :key="index">
        <div class="bg work">
          <div class="img" :style="'background-image:url(' + work.info.preview_img_url + ')'"></div>
          <div class="desc">
            <div class="title" :title="work.info.title">{{ work.info.title }}</div>
            <div class="date">作者：{{ work.info.author }}</div>
            <div class="icon_list">
              <div class="icon" @click="onUse(work)">
                <el-tooltip effect="dark" content="使用" placement="top">
                  <el-icon>
                    <circle-plus />
                  </el-icon>
                </el-tooltip>
              </div>
              <div class="icon" @click="onPreview(work)">
                <el-tooltip effect="dark" content="预览" placement="top">
                  <el-icon>
                    <View />
                  </el-icon>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-empty v-if="customTemplates.length == 0" description="暂时没有定制模板，敬请期待"></el-empty>
    <el-dialog title="定制模板预览" v-model="previewVisible" custom-class="preview_dialog" width="700px">
      <div class="preview_content" v-if="work">
        <div class="preview">
          <iframe :src="previewUrl" frameborder="0" width="375px" height="667px"></iframe>
        </div>
        <div class="note">
          <div class="title">作品信息</div>
          <div class="share" v-if="curTemplate?.info?.title">
            <div class="tt">{{ curTemplate?.info?.title }}</div>
            <div class="flex">
              <img :src="work?.info?.share_img_url" />
              <p>{{ work?.info?.description }}</p>
            </div>
          </div>
          <el-button type="primary" @click="onUse">立即使用</el-button>
        </div>
      </div>
    </el-dialog>
  </master>
</template>
<script setup lang="ts">
import { ElMenu, ElMenuItem, ElTag, ElTooltip, ElPagination, ElLoading, ElMessage, ElMessageBox, ElEmpty, ElIcon, } from 'element-plus'
import master from '@/components/common/master.vue'
import { onMounted, ref, reactive, computed, nextTick } from 'vue'
import { useTemplate } from '@/api/works'
import { useRouter } from 'vue-router'
import preview from '@/components/editor/preview/index.vue'
import { useStore } from '@/store/index'
import { CirclePlus, Delete, View, Edit } from '@element-plus/icons-vue'
import { customTemplates } from '@/custom/list'
import Work from '@/store/model/work';

const router = useRouter()
const store = useStore()
const createWorkAction = (work: any) => store.dispatch("editor/createWork", work);
const previewVisible = ref(false) //预览
const previewUrl = ref('') //预览url
const curTemplate = ref(null) // 预览的模板信息
//使用模板
async function onUse(template: any) {
  let loading = ElLoading.service({ fullscreen: true })
  const work = new Work({
    title: template.info.title,
    description: template.info.description,
    preview_img_url: template.info.preview_img_url,
    share_img_url: template.info.share_img_url,
    page_type: 4,
    config: template.config,
  })
  await createWorkAction(work);
  loading.close()
}
//预览
function onPreview(template) {
  previewVisible.value = true
  curTemplate.value = template
  previewUrl.value = `${template.config.enter}?type=preview`
}


</script>
<style lang="less" scoped>
.work_list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  .item {
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
</style>
