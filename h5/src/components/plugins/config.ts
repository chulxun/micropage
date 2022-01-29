// 基础
import plugImage from "./plug-image/model";
import plugSwiper from "./plug-swiper/model";
import plugButton from "./plug-button/model";
import plugText from "./plug-text/model";
import plugVideo from "./plug-video/model";
import plugBgAudio from "./plug-bg-audio/model";
import plugTimer from "./plug-timer/model";
import plugNoticebar from "./plug-noticebar/model";
import plugTabs from "./plug-tabs/model";
import plugCollapse from "./plug-collapse/model";
// 表单
import plugFormInput from "./plug-form-input/model";
import plugFormButton from "./plug-form-button/model";
import plugFormCheckbox from "./plug-form-checkbox/model";
import plugFormRadio from "./plug-form-radio/model";
import plugFormRate from "./plug-form-rate/model";
import plugFormDatetime from "./plug-form-datetime/model";
import plugFormArea from "./plug-form-area/model";
import plugFormPicker from "./plug-form-picker/model";

// 初始化组件数据
export const pluginDefaultElements :any= {
  // 基础组件
  'plug-image': plugImage.defaultElement,
  'plug-button': plugButton.defaultElement,
  'plug-swiper': plugSwiper.defaultElement,
  'plug-text': plugText.defaultElement,
  'plug-video': plugVideo.defaultElement,
  'plug-bg-audio': plugBgAudio.defaultElement,
  'plug-timer': plugTimer.defaultElement,
  'plug-noticebar': plugNoticebar.defaultElement,
  'plug-tabs': plugTabs.defaultElement,
  'plug-collapse': plugCollapse.defaultElement,
  // 表单组件
  'plug-form-button': plugFormButton.defaultElement,
  'plug-form-input': plugFormInput.defaultElement,
  'plug-form-rate': plugFormRate.defaultElement,
  'plug-form-radio': plugFormRadio.defaultElement,
  'plug-form-checkbox': plugFormCheckbox.defaultElement,
  'plug-form-area': plugFormArea.defaultElement,
  'plug-form-datetime': plugFormDatetime.defaultElement,
  'plug-form-picker':plugFormPicker.defaultElement,
}

