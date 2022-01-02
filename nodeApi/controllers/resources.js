const { ResourcesProxy } = require("../proxy");

module.exports = class ResourcesController {

  /**
   * 接口: 获取所有资源列表
   * 应用: admin
   */
  static async getAllList(ctx) {
    const { pageSize = 10, pageIndex = 1, type = 1 } = ctx.request.query
    try {
      let params = {}
      params.type = Number(type)
      const list = await ResourcesProxy.getAllList({ params, pageIndex, pageSize })
      const count = await ResourcesProxy.getCount(params)
      const data = {
        page: {
          total_count: count,
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
   * 接口: 获取当前登录用户的资源列表
   * 应用: H5
   */
  static async getList(ctx) {
    const queryParams = ctx.request.query;
    const user_id = ctx.state.user.id;
    const { pageIndex = 1, pageSize = 10, type } = queryParams;
    const params = ctx._isAdmin ? {} : { user_id }
    params.type = type;
    const list = await ResourcesProxy.getList({ params, pageIndex, pageSize })
    const count = await ResourcesProxy.getCount(params)
    const data = {
      page: {
        totalCount: count,
        totalPage: Math.ceil(count / pageSize),
        currentPage: parseInt(pageIndex)
      },
      data: list
    }
    ctx.body = ctx.util.resuccess("操作成功", data)
  }

  /**
   * 接口: 删除资源
   * 应用: admin/H5
   */
  static async delete(ctx) {
    const id = ctx.checkBody("id").notEmpty("ID不能为空").value;
    if (ctx.errors) {
      let tip = "";
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key];
      }
      ctx.body = ctx.util.refail(tip);
      return;
    }
    await ResourcesProxy.delete(id);
    ctx.body = ctx.util.resuccess("操作成功")
  }

  /**
   * 接口: 新增资源
   * 应用: H5
   */
  static async add(ctx) {
    const url = ctx.checkBody("url").notEmpty("url不能为空").value;
    const size = ctx.checkBody("size").notEmpty("size不能为空").value;
    const type = ctx.checkBody("type").notEmpty("type不能为空").value;
    const preview_url = ctx.request.body.preview_url;
    const user_id = ctx.state.user.id;
    if (ctx.errors) {
      let tip = "";
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key];
      }
      ctx.body = ctx.util.refail(tip);
      return;
    }
    await ResourcesProxy.add({ url, size, user_id, type, preview_url });
    ctx.body = ctx.util.resuccess("操作成功")
  }



};
