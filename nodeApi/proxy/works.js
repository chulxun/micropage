const moment = require('moment');
const { Works } = require('../models')
module.exports = class WorksProxy {
  static findOne(query, opt) {
    return Works.findOne(query, opt)
  }
  // 获取所有作品列表 admin
  static getAllList({ searchTitle, pageType, pageSize, pageIndex }) {
    let params = {}
    if (pageType !== '') {
      params.page_type = Number(pageType)
    }
    return Works.aggregate([
      {
        $match: params,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: 'id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      { $addFields: { user_name: '$user.user_name' } },
      { $project: { user: 0 } },
    ])
      .sort({ id: -1 })
      .skip((pageIndex * 1 - 1) * pageSize)
      .limit(pageSize * 1)
  }
  //获取用户作品列表 时间倒序
  static getList({ user_id, page_type, pageSize, pageIndex }) {
    let params = { user_id, is_template: false, is_delete: false }
    if (parseInt(page_type)) {
      params = { ...params, page_type }
    }
    return Works.find(params)
      .skip((pageIndex * 1 - 1) * pageSize)
      .limit(pageSize * 1)
      .sort({ id: -1 })
  }
  // 获取数据总条数
  static getCount(user_id, page_type) {
    if (page_type) {
      return Works.countDocuments({ user_id, page_type, is_template: false, is_delete: false })
    }
    return Works.countDocuments({ user_id, is_template: false, is_delete: false })
  }
  // 获取数据总条数 admin
  static getAllCount(type) {
    if (type == 'today') {
      return Works.countDocuments({ created_at: { $gte: moment().unix()*1000 } })
    }else if (type == 'publish') {
      return Works.countDocuments({ is_publish: true })
    }else if (type) {
      return Works.countDocuments({ page_type: Number(type) })
    }
    return Works.countDocuments()
  }
  //获取模板列表 时间倒序
  static getTemplateList({ pageSize, pageIndex, params }) {
    if (parseInt(params.page_type) == 0) {
      delete params.page_type
    }
    return Works.aggregate([
      { $match: params },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: 'id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      { $addFields: { user_name: '$user.user_name' } },
      { $project: { user: 0 } },
    ])
      .sort({ updated_at: -1 })
      .skip((pageIndex * 1 - 1) * pageSize)
      .limit(pageSize * 1)
  }

  // 获取模版数据总条数
  static getTemplateCount(params) {
    return Works.countDocuments(params)
  }
  static deleteWork(work_id) {
    return Works.updateMany({ work_id }, { is_delete: true })
  }
  static recoveryWork(work_id) {
    return Works.updateMany({ work_id }, { is_delete: false })
  }
  //创建作品
  static createWork(params) {
    //测试证明如果在这里encodeURIComponent(JSON.stringify(params.pages))，number还是会变成string，所以编码放在前端
    const work = new Works()
    work.work_id = params.work_id
    work.user_id = params.user_id
    work.title = params.title
    work.description = params.description
    work.preview_img_url = params.preview_img_url
    work.share_img_url = params.share_img_url
    work.page_type = params.page_type
    work.pages = params.pages
    work.is_template = params.is_template || false
    return work.save()
  }
  //根据work_id查询作品
  static getDetail(work_id) {
    return Works.find({ work_id: work_id })
  }

  //修改作品
  static updateWork(params) {
    const { work_id } = params
    const updated_at = +Date.now()
    return Works.updateMany({ work_id: work_id }, { ...params, updated_at })
  }
  //发布作品
  static publishWork(params) {
    const { work_id, publish_pages } = params
    const updated_at = +Date.now()
    return Works.updateMany({ work_id: work_id }, { is_publish: true, publish_pages, updated_at })
  }
}
