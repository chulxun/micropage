<template>
  <div class="countdown" v-if="!hide">
    <Icon v-if="element.props.icon" :name="element.props.icon" />
    <CountDown
      :time="countTime"
      :format="element.props.format"
      :auto-start="element.props.autostart"
      @finish="onFinish"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { CountDown, Toast, Icon } from "vant";
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()

const countTime = computed(() => {
  return new Date(props.element.props.time).getTime() - new Date().getTime();
});
const hide = ref(false);
function onFinish() {
  let eventType = props.element.props.eventType;
  if (eventType) {
    let eventContent = props.element.props.clickContent;
    switch (eventType) {
      case 1:
        hide.value = true;
        break;
      case 2:
        window.location.href = eventContent;
        break;
      case 3:
        Toast(eventContent);
        break;
      default:
        break;
    }
  }
}
</script>
<style lang='less' scoped>
.countdown {
  display: flex;
  align-items: center;
  .van-icon {
    margin-right: 8px;
  }
  .van-count-down {
    font-size: inherit;
  }
}
</style>