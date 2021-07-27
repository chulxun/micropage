const { ResourcesProxy } = require("../proxy");

module.exports = class ResourcesController {
  /**
   * 获取列表
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
   * 删除
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
   * 新增
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
