<template>
  <el-aside width="80px" class="editor_left"
    ><div class="menu">
      <div @click="changeOperaType(1)" :class="{ cur: operaType == 1 }">
        <i class="fa fa-bars"></i>
        <p>基础</p>
        <i class="fa fa-caret-left arrow"></i>
      </div>
      <div @click="changeOperaType(2)" :class="{ cur: operaType == 2 }">
        <i class="fa fa-file-text-o"></i>
        <p>表单</p>
        <i class="fa fa-caret-left arrow"></i>
      </div>
      <div @click="changeOperaType(3)" :class="{ cur: operaType == 3 }">
        <i class="fa fa-cubes"></i>
        <p>互动</p>
        <i class="fa fa-caret-left arrow"></i>
      </div>
    </div>
    <div class="bottom">
      <el-tooltip content="上传资源" placement="right" effect="light">
        <i
          :class="{ fa: true, 'fa-cloud-upload': true, cur: operaType == 4 }"
          @click="changeOperaType(4)"
        ></i
      ></el-tooltip>
      <el-tooltip content="使用帮助" placement="right" effect="light">
        <i
          :class="{ fa: true, 'fa-leanpub': true, cur: operaType == 5 }"
          @click="changeOperaType(5)"
        ></i
      ></el-tooltip>
      <el-tooltip content="快捷键" placement="right" effect="light">
        <i
          :class="{ fa: true, 'fa-keyboard-o': true, cur: operaType == 6 }"
          @click="changeOperaType(6)"
        ></i
      ></el-tooltip>
    </div>
    <pluginList v-if="[1, 2, 3].includes(operaType)"></pluginList>
    <sourceList v-else-if="operaType == 4"></sourceList>
    <keyList v-else-if="operaType == 6"></keyList>
    <help v-else-if="operaType == 5"></help>
  </el-aside>
</template>
<script lang="ts">
import { ElAside, ElButton, ElDrawer, ElTooltip } from "element-plus";
import pluginList from "./common/pluginList.vue";
import keyList from "./common/keyList.vue";
import sourceList from "./common/sourceList.vue";
import help from "./common/help.vue";
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
    help,
  },
  setup() {
    const store = useStore();

    const operaType = computed(() => store.state.common.operaType);
    const setOperaType = (type: any) =>
      store.commit("common/setOperaType", type);
    function changeOperaType(val: number) {
      if (val == operaType.value) {
        setOperaType(0);
      } else {
        setOperaType(val);
      }
    }
    return {
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