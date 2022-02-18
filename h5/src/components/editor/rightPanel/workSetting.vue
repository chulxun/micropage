<template>
  <div :class="{ layer_container: true, open: show }">
    <el-tooltip content="作品设置" placement="left">
      <div class="layer_icon" v-show="!show" @click="toggleShow">
        <el-icon>
          <setting />
        </el-icon>
        <p>设置</p>
      </div>
    </el-tooltip>
    <div class="container" v-show="show">
      <div class="title">
        <p>作品设置</p>
        <el-icon @click="toggleShow">
          <arrow-right />
        </el-icon>
      </div>
      <div class="form_content">
        <el-form :model="work" label-position="top" size="default">
          <el-form-item label="作品标题:">
            <el-input v-model="work.title" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="作品描述:">
            <el-input type="textarea" v-model="work.description" maxlength="200"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="work" size="default">
          <!-- 翻页类型作品 Swiper参数配置 -->
          <template v-if="work.page_type === 2">
            <el-divider content-position="left">Swiper参数配置</el-divider>
            <el-form-item label="切换方向:" v-if="work.config">
              <el-radio-group v-model="work.config.swiper_direction">
                <el-radio-button label="horizontal">水平</el-radio-button>
                <el-radio-button label="vertical">垂直</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="显示分页:" v-if="work.config">
              <el-switch v-model="work.config.swiper_pag"></el-switch>
            </el-form-item>
            <el-form-item label="分页颜色:" v-if="work.config">
              <el-color-picker v-model="work.config.swiper_pag_color" show-alpha></el-color-picker>
            </el-form-item>
            <el-form-item label="循环模式:" v-if="work.config">
              <el-switch v-model="work.config.swiper_loop"></el-switch>
            </el-form-item>
            <el-form-item label="提示箭头:" v-if="work.config">
              <el-switch v-model="work.config.swiper_arrow"></el-switch>
            </el-form-item>
          </template>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/store/index";
import { Setting, ArrowRight } from '@element-plus/icons-vue'

const store = useStore();
const work = computed(() => store.state.editor.work)
const show = ref(false);
const toggleShow = () => {
  show.value = !show.value;
}


</script>
<style lang='less' scoped>
.layer_container {
  left: 0;
  top: 44px;
  position: absolute;
  transform: translateX(-100%);
  &.open {
    top: 0;
    z-index: 2;
  }
}
.layer_icon {
  width: 70px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid var(--borderColor);
  p {
    margin-left: 6px;
  }
}
.container {
  height: calc(100vh - 60px);
  width: 300px;
  background: #fff;
  border: 1px solid var(--borderColor);
  user-select: none;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px 0 15px;
    height: 40px;
    background-color: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    i {
      cursor: pointer;
    }
  }
}
.form_content {
  padding: 10px 16px;
  flex: 1;
  overflow-y: auto;
}
</style>