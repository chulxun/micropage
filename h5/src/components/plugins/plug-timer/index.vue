<template>
  <div class="countdown" v-if="!hide">
    <van-count-down
      :time="countTime"
      :format="props.format"
      @finish="onFinish"
    />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { CountDown, Toast } from "vant";
export default defineComponent({
  props: ["props", "workMode"],
  components: {
    [CountDown.name]: CountDown,
  },
  name: "plug-timer",
  //默认组件 参数
  defaultElement: {
    style: {
      width: 120,
      height: 40,
      backgroundColor: "#fff",
      borderRadius: 3,
      textAlign: "center",
      color: "#333",
      fontSize: 14,
      borderColor: "#fff",
      borderWidth: 0,
      fontWeight: "normal",
      padding: 10,
    },
    props: {
      time: new Date().setDate(new Date().getDate() + 1),
      format: "HH:mm:ss",
      finishType: 0,
      finishContent: "",
    },
  },
  setup(props) {
    const countTime = computed(() => {
      return new Date(props.props.time).getTime() - new Date().getTime();
    });
    const hide = ref(false);
    function onFinish() {
      let eventType = props.props.eventType;
      if (eventType) {
        let eventContent = props.props.clickContent;
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
    return { countTime, onFinish, hide };
  },
});
</script>
<style lang='less' scoped>
.countdown {
  display: flex;
  align-items: center;
  .van-count-down {
    flex: 1;
  }
}
</style>