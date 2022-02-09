<template>
  <!-- 素材库 -->
  <div class="source_content">
    <div class="title">
      我的素材库
      <el-icon class="closed" @click="closedThis">
        <Close />
      </el-icon>
    </div>
    <div class="source_title">
      <el-radio-group v-model="type" size="default">
        <el-radio-button :label="1">图片</el-radio-button>
        <el-radio-button :label="2">视频</el-radio-button>
        <el-radio-button :label="3">音乐</el-radio-button>
      </el-radio-group>
    </div>
    <list :type="1" v-if="type === 1" :can-use="false" />
    <list :type="2" v-else-if="type === 2" :can-use="false" />
    <list :type="3" v-else-if="type === 3" :can-use="false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElRadioGroup, ElRadioButton, ElIcon } from "element-plus";
import list from "@/components/support/resource/list.vue";
import { useStore } from "@/store/index";
import { Close } from '@element-plus/icons-vue'
const store = useStore();
const setOperaType = (type: any) =>
  store.commit("common/setOperaType", type);

function closedThis() {
  setOperaType(0);
}
const type = ref(1);

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
// .update_tt {
//   text-align: center;
//   padding: 0 10px 8px;
// }
// .source_list {
//   padding: 0 8px;
//   overflow-y: auto;
//   flex: 1;
//   .item {
//     float: left;
//     > div {
//       position: relative;
//       border-radius: 5px;
//       overflow: hidden;
//       height: 110px;
//     }
//     width: 33.33%;
//     padding: 8px;
//     .img,
//     .audio {
//       width: 100%;
//       height: 100%;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       font-size: 40px;
//       background: #f1f1f1;
//       position: absolute;
//       top: 0;
//       left: 0;
//     }
//     .audio {
//       flex-direction: column;
//       font-size: 26px;
//       padding: 0 10px;
//       i {
//         margin-bottom: 10px;
//         font-size: 26px;
//       }
//       p {
//         word-break: break-all;
//         font-size: 10px;
//         -webkit-line-clamp: 3;
//         display: -webkit-box;
//         -webkit-box-orient: vertical;
//         overflow: hidden;
//       }
//     }
//     .abs {
//       position: absolute;
//       bottom: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background: rgba(0, 0, 0, 0.6);
//       color: #fff;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-direction: column;
//       opacity: 0;
//       //加transform动画会引起：弹出视频、音乐预览后关闭，该条item不显示
//       // transform: translateY(100%);
//       transition: all 0.3s ease-out;
//       padding: 0 5px;
//       > div {
//         display: flex;
//         align-items: center;
//         padding: 5px;
//         justify-content: center;
//         button {
//           padding: 0 5px;
//         }
//       }
//     }
//     &:hover .abs {
//       opacity: 1;
//       // transform: translateY(0);
//     }
//   }
// }
// .pages {
//   padding: 25px 20px;
//   display: flex;
//   justify-content: center;
//   :deep(.el-pager li) {
//     background-color: #fff;
//   }
// }
</style>