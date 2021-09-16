"use strict"

const mongoose = require("mongoose")
const autoIncrement = require('mongoose-auto-increment-fix');

const Schema = mongoose.Schema
const userSchema = new Schema({
  id: Number,
  user_name: String,
  password: String,
  email: String,
  mobile: String,
  role: {
    type: Number,
    default: 1,
  },
  is_delete: {  //是否注销
    type: Boolean,
    default: false
  },
  create_at: {
    type: Number,
    default: Date.now,
  },
  updated_at: {
    type: Number,
    default: Date.now,
  },
})

userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'id',
  startAt: 1,
  unique: true,
  incrementBy: 1
});

module.exports = mongoose.model("Users", userSchema, "users")
