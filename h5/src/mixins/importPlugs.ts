

import plugPage from "@/components/plugins/plug-page/index.vue";
import plugImage from "@/components/plugins/plug-image/index.vue";
import plugButton from "@/components/plugins/plug-button/index.vue";
import plugVideo from "@/components/plugins/plug-video/index.vue";
import plugBgAudio from "@/components/plugins/plug-bg-audio/index.vue";
import plugFormInput from "@/components/plugins/plug-form-input/index.vue";
import plugFormButton from "@/components/plugins/plug-form-button/index.vue";
export default {
  components: {
    plugPage, plugImage, plugButton, plugVideo, plugBgAudio, plugFormInput, plugFormButton
  },
  data() {
    return {
      pluginList: [
        {
          title: '基础',
          children: [
            {
              name: 'plug-image',
              title: '图片',
              img: 'https://public.fanjinyan.com/weiye_default_img.png',
              component: plugImage
            },
            {
              name: 'plug-button',
              title: '按钮',
              icon: 'el-icon-thumb',
              component: plugButton
            },
            {
              name: 'plug-video',
              title: '视频',
              icon: 'el-icon-video-camera',
              component: plugVideo
            },
            {
              name: 'plug-bg-audio',
              title: '音乐',
              icon: 'el-icon-headset',
              component: plugBgAudio
            }
          ]
        },
        {
          title: '表单',
          children: [
            {
              name: 'plug-form-button',
              title: '提交按钮',
              icon: 'fa fa-hand-o-up',
              component: plugFormButton
            }, {
              name: 'plug-form-input',
              title: '单行文本框',
              icon: 'el-icon-edit',
              component: plugFormInput
            }
          ]
        },
        {
          title: '互动',
          children: [

          ]
        },
      ]
    }


  }
}