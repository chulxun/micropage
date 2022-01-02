"use strict"
const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment-fix');
const Schema = mongoose.Schema
const schema = new Schema({
  id: Number,
  size: String,
  url: String,
  preview_url: String,
  user_id: Number,
  type: Number,
  created_at: {
    type: Number,
    default: Date.now(),
  },
  updated_at: {
    type: Number,
    default: Date.now(),
  },
}, {
  versionKey: false
})

schema.plugin(autoIncrement.plugin, {
  model: 'Resource',
  field: 'id',
  startAt: 1,
  unique: true,
  incrementBy: 1
});

module.exports = mongoose.model("Resources", schema, "resources")
