<template>
  <el-aside width="80px" class="editor_left"
    ><div class="menu">
      <div @click="togglePlugins(1)" :class="{ cur: pluginType == 1 }">
        <i class="fa fa-bars"></i>
        <p>基础</p>
        <i class="fa fa-caret-left arrow"></i>
      </div>
      <div @click="togglePlugins(2)" :class="{ cur: pluginType == 2 }">
        <i class="fa fa-file-text-o"></i>
        <p>表单</p>
        <i class="fa fa-caret-left arrow"></i>
      </div>
      <div @click="togglePlugins(3)" :class="{ cur: pluginType == 3 }">
        <i class="fa fa-cubes"></i>
        <p>互动</p>
        <i class="fa fa-caret-left arrow"></i>
      </div>
    </div>
    <div class="bottom">
      <el-tooltip content="上传资源" placement="right" effect="light">
        <i
          :class="{ fa: true, 'fa-cloud-upload': true, cur: operaType == 1 }"
          @click="changeOperaType(1)"
        ></i
      ></el-tooltip>
      <el-tooltip content="使用帮助" placement="right" effect="light">
        <i
          :class="{ fa: true, 'fa-leanpub': true, cur: operaType == 2 }"
          @click="changeOperaType(2)"
        ></i
      ></el-tooltip>
      <el-tooltip content="快捷键" placement="right" effect="light">
        <i
          :class="{ fa: true, 'fa-keyboard-o': true, cur: operaType == 3 }"
          @click="changeOperaType(3)"
        ></i
      ></el-tooltip>
    </div>
    <pluginList v-if="pluginType" v-model:pluginType="pluginType"></pluginList>
    <sourceList v-if="operaType == 1"></sourceList>
    <keyList v-if="operaType == 3"></keyList>
  </el-aside>
</template>
<script lang="ts">
import { ElAside, ElButton, ElDrawer, ElTooltip } from "element-plus";
import pluginList from "./common/pluginList.vue";
import keyList from "./common/keyList.vue";
import sourceList from "./common/sourceList.vue";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "@/store/index";
export default defineComponent({
  components: {
    ElAside,
    ElButton,
    ElDrawer,
    pluginList,
    keyList,
    sourceList,
    ElTooltip,
  },
  setup() {
    const store = useStore();
    const pluginType = ref(0);
    function togglePlugins(val: number) {
      if (val == pluginType.value) {
        pluginType.value = 0;
      } else {
        setOperaType(0);
        pluginType.value = val;
      }
    }
    const operaType = computed(() => store.state.common.operaType);
    const setOperaType = (type: any) =>
      store.commit("common/setOperaType", type);
    function changeOperaType(val: number) {
      if (val == operaType.value) {
        setOperaType(0);
      } else {
        pluginType.value = 0;
        setOperaType(val);
      }
    }
    return {
      pluginType,
      togglePlugins,
      operaType,
      changeOperaType,
    };
  },
});
</script>
<style lang='less' scoped>
.editor_left {
  background: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  i {
    font-size: 20px;
  }
}
.menu {
  flex: 1;
  > div {
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    .arrow {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
    }
    &:hover,
    &.cur {
      background: var(--primaryColor);
      .arrow {
        opacity: 1;
      }
    }
    i {
      margin-bottom: 8px;
    }
  }
}
.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  i {
    margin: 10px 0;
    cursor: pointer;
    &.cur {
      color: var(--primaryColor);
    }
  }
}
</style>