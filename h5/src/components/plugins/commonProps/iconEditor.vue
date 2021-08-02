
//选择图标
<template>
  <div class="flex">
    <van-icon :name="iconUrl" size="25" :color="color" />
    <ElButton v-if="removeBtn" type="primary" plain size="mini" @click="onShow"
      >更换</ElButton
    >
    <ElButton plain size="mini" @click="onRemove">移除</ElButton>
    <el-dialog title="更换图标" v-model="visible" width="740px" append-to-body>
      <div class="dialog_content" v-if="visible">
        <el-tabs type="card" v-model="tabIndex">
          <el-tab-pane label="线框风格" name="1">
            <div class="icon_list">
              <van-icon
                :name="item"
                size="20"
                v-for="(item, index) in wireIconList"
                :key="index"
                @click="useThis(item)"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="实底风格" name="2">
            <div class="icon_list">
              <van-icon
                :name="item"
                size="20"
                v-for="(item, index) in solidIconList"
                :key="index"
                @click="useThis(item)"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="基础风格" name="3">
            <div class="icon_list">
              <van-icon
                :name="item"
                size="20"
                v-for="(item, index) in baseIconList"
                :key="index"
                @click="useThis(item)"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>
<script lang='ts'>
import { ElImage, ElButton, ElDialog, ElTabs, ElTabPane } from "element-plus";
import { Icon } from "vant";
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { wireIconList, solidIconList, baseIconList } from "@/data/iconList";
export default defineComponent({
  props: {
    iconUrl: {
      default: "",
      type: String,
    },
    color: {
      default: "",
      type: String,
    },
    removeBtn: {
      default: true,
      type: Boolean,
    },
  },
  components: {
    ElImage,
    ElButton,
    ElDialog,
    ElTabs,
    ElTabPane,
    [Icon.name]: Icon,
  },
  setup(props, ctx) {
    const tabIndex = ref("1");
    const visible = ref(false);
    function onShow() {
      visible.value = true;
    }
    function onRemove() {
      ctx.emit("update:iconUrl", "");
    }
    function useThis(item) {
      visible.value = false;
      ctx.emit("update:iconUrl", item);
    }
    return {
      tabIndex,
      wireIconList,
      solidIconList,
      baseIconList,
      onShow,
      onRemove,
      visible,
      useThis,
    };
  },
});
</script>
<style lang='less' scoped>
.flex {
  display: flex;
  align-items: center;
  > * {
    margin-right: 10px;
  }
}
.dialog_content {
  .icon_list {
    display: flex;
    flex-wrap: wrap;
    height: 360px;
    overflow-y: auto;
    i {
      border: 1px solid var(--borderColor);
      border-radius: 5px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      margin: 5px;
      cursor: pointer;
    }
  }
}
:deep(.el-dialog__body) {
  padding-top: 0;
}
</style>