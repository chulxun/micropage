const { WorksProxy, UsersProxy } = require('../proxy')
const { creatWorkId } = require('../utils/index')
const { Works } = require('../models')
const fs = require('fs')
const request = require('request')
module.exports = class WorksController {
  /**
   * admin 获取所有works
   */
  static async getAllWorksList(ctx) {
    const { pageSize = 10, pageIndex = 1, pageType = '', searchTitle = '' } = ctx.request.query
    try {
      const list = await WorksProxy.getAllList({ searchTitle, pageType, pageIndex, pageSize })
      list.map(item => {
        if (item.pages) {
          item.pages = JSON.parse(decodeURIComponent(item.pages))
        }
      })
      const count = await WorksProxy.getAllCount(pageType)
      const today_count = await WorksProxy.getAllCount('today')
      const publish_count = await WorksProxy.getAllCount('publish')
      const data = {
        page: {
          total_count: count,
          today_count,
          publish_count,
          currentPage: parseInt(pageIndex),
        },
        list,
      }
      ctx.body = ctx.util.resuccess('操作成功', { data })
    } catch (err) {
      throw err
    }
  }
  /**
   * 获取当前用户的works列表
   */
  static async getWorksList(ctx) {
    const { pageSize = 10, pageIndex = 1, page_type = 0 } = ctx.request.query
    const user_id = ctx.state.user.id
    try {
      const list = await WorksProxy.getList({ user_id, page_type, pageIndex, pageSize })
      const count = await WorksProxy.getCount(user_id)
      const count1 = await WorksProxy.getCount(user_id, 1)
      const count2 = await WorksProxy.getCount(user_id, 2)
      const data = {
        page: {
          totalCount: count,
          count1,
          count2,
          totalPage: Math.ceil(count / pageSize),
          currentPage: parseInt(pageIndex),
        },
        data: list,
      }
      ctx.body = ctx.util.resuccess('操作成功', data)
    } catch (err) {
      throw err
    }
  }
  /**
   * 获取编辑详情
   */
  static async getWorkById(ctx) {
    const work_id = ctx.checkQuery('work_id').notEmpty('作品ID不能为空').value
    const userId = ctx.state.user.id
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    try {
      let works = await WorksProxy.getDetail(work_id).lean()
      if (works.length > 0) {
        let work = works[0]
        work.pages = JSON.parse(decodeURIComponent(work.pages))
        const userInfo = await UsersProxy.getByUserId(userId)
        // 管理员和作品所有者 有编辑权限
        if (work.user_id == userId || userInfo.role == 1) {
          ctx.body = ctx.util.resuccess('操作成功', { property: work })
        } else {
          ctx.body = ctx.util.refail('没有该作品编辑权限', -1)
        }
      } else {
        ctx.body = ctx.util.refail('作品不存在')
      }
    } catch (e) {
      throw e
    }
  }
  /**
   * 预览作品
   */
  static async getWorkPreview(ctx) {
    const work_id = ctx.checkQuery('work_id').notEmpty('作品ID不能为空').value
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    try {
      let works = await WorksProxy.getDetail(work_id).lean()
      if (works.length > 0) {
        let work = works[0]
        work.pages = JSON.parse(decodeURIComponent(work.pages))
        ctx.body = ctx.util.resuccess('操作成功', { property: work })
      } else {
        ctx.body = ctx.util.refail('作品不存在')
      }
    } catch (e) {
      throw e
    }
  }
  /**
   * 预览发布后的作品
   */
  static async getWorkDetail(ctx) {
    const work_id = ctx.checkQuery('work_id').notEmpty('作品ID不能为空').value
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    try {
      let works = await WorksProxy.getDetail(work_id).lean()
      if (works.length > 0) {
        let work = works[0]
        if (work.publish_pages) {
          let res = await Works.updateMany({ work_id }, { $inc: { hits: 1 } })
          console.log(res)
          work.pages = JSON.parse(decodeURIComponent(work.publish_pages))
          ctx.body = ctx.util.resuccess('操作成功', { property: work })
        } else {
          ctx.body = ctx.util.refail('作品还未发布')
        }
      } else {
        ctx.body = ctx.util.refail('作品不存在')
      }
    } catch (e) {
      throw e
    }
  }

  /**添加作品
   */
  static async createWork(ctx) {
    const params = ctx.request.body
    const userId = ctx.state.user.id
    const work_id = creatWorkId()
    const title = ctx.checkBody('title').notEmpty('作品标题不能为空').value
    const description = ctx.checkBody('description').notEmpty('作品标题不能为空').value
    const share_img_url = ctx.checkBody('share_img_url').notEmpty('作品分享图不能为空').value
    const page_type = ctx.checkBody('page_type').notEmpty('作品类型不能为空').value
    const pages = ctx.checkBody('pages').notEmpty('作品内容不能为空').value
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    params.user_id = userId
    params.work_id = work_id
    try {
      let work = await WorksProxy.createWork(params)
      ctx.body = ctx.util.resuccess('操作成功', { property: { work_id: work.work_id } })
    } catch (e) {
      throw e
    }
  }

  /**
   * 获取模板列表
   */
  static async getTemplateWorksList(ctx) {
    const { pageSize = 10, pageIndex = 1 } = ctx.request.query
    let params = { is_template: true, is_delete: false }
    if (ctx._isAdmin) delete params['is_delete']
    Object.entries(ctx.request.query).forEach(([key, value]) => {
      switch (key) {
        case 'work_id':
        case 'page_type':
          return (params[key] = value)
        default:
          return
      }
    })
    const list = await WorksProxy.getTemplateList({
      pageIndex,
      pageSize,
      params,
    })
    const count = await WorksProxy.getTemplateCount(params)
    const data = {
      page: {
        totalCount: count,
        totalPage: Math.ceil(count / pageSize),
        currentPage: parseInt(pageIndex),
      },
      data: list,
    }
    ctx.body = ctx.util.resuccess('操作成功', data)
  }

  /**
   * 删除作品 admin/h5
   */
  static async deleteWork(ctx) {
    const work_id = ctx.checkBody('work_id').notEmpty('作品ID不能为空').value
    const user_id = ctx.state.user.id
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    try {
      let [work] = await WorksProxy.getDetail(work_id).lean()
      if (work && work.is_delete === false) {
        const userInfo = await UsersProxy.getByUserId(user_id)
        // 管理员和作品所有者 有编辑权限
        if (work.user_id == user_id || userInfo.role == 1) {
          await WorksProxy.deleteWork(work_id)
          ctx.body = ctx.util.resuccess('操作成功')
        } else {
          ctx.body = ctx.util.refail('没有该作品删除权限', -1)
        }
      } else {
        ctx.body = ctx.util.refail('该作品不存在或已被删除', -1)
      }
    } catch (e) {
      throw e
    }
  }

  /**
   * 恢复删除作品 admin
   */
  static async recoveryWork(ctx) {
    const work_id = ctx.checkBody('work_id').notEmpty('作品ID不能为空').value
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    try {
      await WorksProxy.recoveryWork(work_id)
      ctx.body = ctx.util.resuccess('操作成功')
    } catch (e) {
      throw e
    }
  }

  /**
   * 修改作品
   */
  static async updateWork(ctx) {
    const work_id = ctx.checkBody('work_id').notEmpty('作品ID不能为空').value
    const user_id = ctx.state.user.id
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    const params = ctx.request.body
    try {
      let [work] = await WorksProxy.getDetail(work_id).lean()
      if (work && work.is_delete === false) {
        const userInfo = await UsersProxy.getByUserId(user_id)
        // 管理员和作品所有者 有编辑权限
        if (work.user_id == user_id || userInfo.role == 1) {
          await WorksProxy.updateWork(params)
          ctx.body = ctx.util.resuccess('操作成功')
        } else {
          ctx.body = ctx.util.refail('没有该作品编辑权限', -1)
        }
      } else {
        ctx.body = ctx.util.refail('该作品不存在或已被删除', -1)
      }
    } catch (e) {
      throw e
    }
  }
  /**
   * 设置作品为模版
   */
  static async createTemplate(ctx) {
    const work_id = ctx.checkBody('work_id').notEmpty('作品ID不能为空').value

    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    try {
      let works = await WorksProxy.getDetail(work_id).lean()
      const params = works[0]
      delete params['_id']
      delete params['id']
      delete params['created_at']
      delete params['updated_at']
      params.is_publish = false
      params.is_template = true
      params.work_id = creatWorkId()
      await WorksProxy.createWork(params)
      ctx.body = ctx.util.resuccess('操作成功')
    } catch (e) {
      throw e
    }
  }
  /**
   * 发布作品
   */
  static async publishWork(ctx) {
    const work_id = ctx.checkBody('work_id').notEmpty('作品ID不能为空').value
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    try {
      let works = await WorksProxy.getDetail(work_id).lean()
      if (works.length > 0) {
        let work = works[0]
        let params = {
          work_id: work.work_id,
          publish_pages: work.pages,
        }
        await WorksProxy.publishWork(params)
        ctx.body = ctx.util.resuccess('操作成功')
      } else {
        ctx.body = ctx.util.refail('作品不存在')
      }
    } catch (e) {
      throw e
    }
  }
  /**
   * 使用模版
   */
  static async useTemplate(ctx) {
    const work_id = ctx.checkBody('work_id').notEmpty('作品ID不能为空').value
    const userId = ctx.state.user.id
    if (ctx.errors) {
      let tip = ''
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key]
      }
      ctx.body = ctx.util.refail(tip)
      return
    }
    try {
      let works = await WorksProxy.getDetail(work_id).lean()
      const params = works[0]
      delete params['_id']
      delete params['id']
      delete params['created_at']
      delete params['updated_at']
      params.is_publish = false
      params.is_template = false
      params.work_id = creatWorkId()
      params.user_id = userId
      let work = await WorksProxy.createWork(params)
      ctx.body = ctx.util.resuccess('操作成功', { property: { work_id: work.work_id } })
    } catch (e) {
      throw e
    }
  }
}
