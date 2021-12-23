"use strict"

const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment-fix');

const FormSchema = new mongoose.Schema({
  id: Number,
  user_id: Number,//用户Id
  work_id: String, //作品编码，唯一标识
  wx_info: String,
  wx_openid: String,
  form_data: {
    type: Object,
    default: {}
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
  updated_at: {
    type: Number,
    default: Date.now(),
  },
})

FormSchema.plugin(autoIncrement.plugin, { //?这种自增id 只识别 create
  model: 'Form',
  field: 'id',
  startAt: 1,
  unique: true,
  incrementBy: 1
});

FormSchema.index({ work_id: 1 }); //?添加索引

module.exports = mongoose.model("Forms", FormSchema, "forms")
