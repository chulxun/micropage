"use strict"
const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment-fix');
const Schema = mongoose.Schema

const worksSchema = new Schema({
  id: Number,
  work_id: String, //作品编码，唯一标识
  user_id: Number,  //用户Id
  title: String, //标题
  description: String,  //描述
  preview_img_url: String,  //预览图
  share_img_url: String,//分享缩略图
  page_type: Number,  //页面类型
  pages: String,  //页面数据
  publish_pages: String,  //发布的页面数据
  html_code: String, //html脚本
  css_code: String, //css脚本
  js_code: String, //js脚本
  is_delete: {  //是否逻辑删除
    type: Boolean,
    default: false
  },
  is_publish: {  //是否发布
    type: Boolean,
    default: false
  },
  is_template: {  //是否模板
    type: Boolean,
    default: false
  },
  created_at: {  //创建时间
    type: Number,
    default: Date.now(),
  },
  updated_at: {  //更新时间
    type: Number,
    default: Date.now(),
  },
  hits: {  //点击率
    type: Number,
    default: 0,
  },
}, {
  //去掉版本  否则新增的时候会多一个__v字段来记录版本
  versionKey: false
})

worksSchema.plugin(autoIncrement.plugin, {
  model: 'Work',
  field: 'id',
  startAt: 1,
  unique: true,
  incrementBy: 1
});


module.exports = mongoose.model('Works', worksSchema, 'works')
