<template>
  <div v-if="editingElement" class="container">
    <div>
      <el-button
        type="primary"
        round
        icon="el-icon-circle-plus-outline"
        @click="animationTabVisible = true"
      >添加一个动画</el-button>
      <el-button type="success" round icon="el-icon-video-play" @click="playAllAni">预览所有动画</el-button>
    </div>
    <van-popup
      v-model:show="animationTabVisible"
      class="animation_popup"
      position="bottom"
      closeable
      :style="{ height: '100%' }"
      :overlay-style="{ position: 'absolute' }"
    >
      <el-tabs v-model="animationTab">
        <el-tab-pane
          v-for="(item, index) in animationList"
          :key="index"
          :label="item.type"
          :name="item.type"
        >
          <div class="animation_list">
            <div
              v-for="(item1, index1) in item.children"
              :key="index1"
              @mouseenter="addAnimation(item1, 'preview')"
              @mouseleave="leaveAnimation(item1)"
              @click="addAnimation(item1)"
            >
              <p>{{ item1.title }}</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </van-popup>

    <template v-if="editingElement.animations && editingElement.animations.length > 0">
      <el-divider content-position="left">已有动画</el-divider>
      <el-collapse accordion>
        <el-collapse-item v-for="(item, index) in editingElement.animations" :key="index">
          <template #title>
            <div class="ani_title">
              <span>{{ index + 1 }}</span>
              <strong>{{ item.title }}</strong>
              <el-button
                size="mini"
                type="success"
                icon="el-icon-caret-right"
                circle
                @click.stop="playAni(index)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                @click.stop="deleteAni(index)"
              ></el-button>
            </div>
          </template>
          <div>
            <el-form class="demo-form-inline" label-width="90px" size="small">
              <el-form-item label="时间：">
                <el-input-number v-model="item.duration" :min="0" :max="100" :step="0.1" label="时间"></el-input-number>&nbsp;秒
              </el-form-item>
              <el-form-item label="延迟：">
                <el-input-number v-model="item.delay" :min="0" :max="100" :step="0.1" label="延迟"></el-input-number>&nbsp;秒
              </el-form-item>
              <el-form-item label="重复次数：">
                <el-input-number v-model="item.count" :min="1" :max="100" label="重复次数"></el-input-number>&nbsp;秒
              </el-form-item>
              <el-form-item label="循环：">
                <el-switch v-model="item.infinite"></el-switch>
              </el-form-item>
              <el-form-item label="速度曲线：">
                <el-select style="width: 90%" v-model="item.timing" placeholder="请选择">
                  <el-option
                    v-for="item in timList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span class="span_right">{{ item.value }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </template>
  </div>
  <div v-else>
    <el-empty description="请选择一个元素, 才能编辑动画"></el-empty>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed, ref } from "vue";
import { useStore } from "@/store/index";
import {
  ElDivider,
  ElTabs,
  ElTabPane,
  ElEmpty,
  ElButton,
  ElCollapse,
  ElCollapseItem,
  ElInput,
  ElForm,
  ElFormItem,
  ElSwitch,
  ElInputNumber,
  ElSelect, ElOption
} from "element-plus";
import { Popup } from "vant";
import { animationList } from "@/data/animate";
export default defineComponent({
  components: {
    ElDivider,
    ElEmpty,
    ElButton,
    ElCollapse,
    ElCollapseItem,
    ElInput,
    ElForm,
    ElFormItem,
    ElSwitch,
    ElInputNumber,
    ElTabs,
    ElTabPane, ElSelect, ElOption,
    [Popup.name]: Popup,
  },
  setup() {
    const store = useStore();
    const editingElement: any = computed(
      () => store.state.editor.editingElement
    );
    const animationTab = ref(""); //动画列表的tab
    animationTab.value = animationList[0].type; //tab 默认值
    const animationTabVisible = ref(false); //显示可添加的动画列表
    const timList = [
      {
        value: "ease",
        label: "先加速后减速",
      },
      {
        value: "ease-in",
        label: "加速",
      },
      {
        value: "ease-out",
        label: "减速",
      },
      {
        value: "ease-in-out",
        label: "缓慢加速后减速",
      },
      {
        value: "linear",
        label: "匀速",
      },
    ];
    //添加一个动画
    function addAnimation(item: any, type?: string) {
      if (!editingElement.value.animations)
        editingElement.value.animations = [];
      editingElement.value.animations.push({
        title: item.title,
        classname: item.classname,
        duration: 0.6,
        delay: 0,
        count: 1,
        infinite: false,
        playing: type ? true : false,
        timing: 'ease',
      });
      if (!type) animationTabVisible.value = false;
    }
    function leaveAnimation(item: any) {
      let anis = editingElement.value.animations;
      if (
        anis &&
        anis.length > 0 &&
        anis[anis.length - 1].classname == item.classname
      ) {
        editingElement.value.animations.pop();
      }
    }
    //删除一个动画
    function deleteAni(index: number) {
      editingElement.value.animations.splice(index, 1);
    }
    //播放一个动画
    function playAni(index: number) {
      editingElement.value.animations[index].playing = true;
    }
    //播放该元素的所有动画
    function playAllAni() {
      if (
        editingElement.value.animations &&
        editingElement.value.animations.length > 0
      ) {
        editingElement.value.animations = editingElement.value.animations.map(
          (item: any) => {
            item.playing = true;
            return item;
          }
        );
      }
    }

    return {
      timList,
      animationTabVisible,
      animationTab,
      editingElement,
      animationList,
      addAnimation,
      deleteAni,
      playAni,
      playAllAni,
      leaveAnimation,
    };
  },
});
</script>
<style lang='less' scoped>
.container {
  height: calc(100vh - 130px);
}
.ani_title {
  display: flex;
  align-items: center;
  font-size: 14px;
  flex: 1;
  padding: 0 10px;
  span {
    min-width: 24px;
    height: 24px;
    text-align: center;
    background: var(--lightColor);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  strong {
    flex: 1;
    padding: 0 10px;
  }
}
.animation_list {
  display: flex;
  flex-wrap: wrap;
}
.animation_list div {
  width: 50%;
  padding: 5px;
}
.animation_list p {
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  border-radius: 5px;

  cursor: pointer;
  &:hover {
    background: var(--primaryColor);
    color: #fff;
  }
}
:deep(.el-collapse-item__header) {
  background: #f5f5f5;
}
.el-collapse {
  border: 1px solid #ebeef5;
  border-radius: 5px;
}
:deep(.el-collapse-item__content) {
  padding-top: 20px;
  padding-bottom: 0;
}
:deep(.animation_popup) {
  position: absolute;
  padding: 10px 15px;
}
:deep(.el-button.is-circle) {
  padding: 8px;
}
.span_right {
  float: right;
  color: #8492a6;
  font-size: 12px;
  margin-right: -10px;
}
</style>