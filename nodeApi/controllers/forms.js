const { FormsProxy } = require("../proxy")
const { Forms, Works } = require("../models");
module.exports = class WorksController {
  //获取有表单的作品列表
  static async getList(ctx) {
    const { pageSize = 10, pageIndex = 1 } = ctx.request.query;
    const user_id = ctx.state.user.id;
    try {
      const docs = await FormsProxy.getList({ user_id, pageIndex, pageSize });
      const count = await FormsProxy.getCount(user_id);
      const data = {
        page: {
          totalCount: count,
          totalPage: Math.ceil(count / pageSize),
          currentPage: parseInt(pageIndex),
        },
        data: docs,
      };
      ctx.body = ctx.util.resuccess("操作成功", data);
    } catch (e) {
      throw e
    }
  }
  //提交一条表单数据
  static async submitData(ctx) {
    const { work_id, wx_info, wx_openid, form_data } = ctx.request.body;
    const workDoc = await Works.findOne({ work_id });
    if (workDoc.is_template) {
      ctx.body = ctx.util.refail('模板不支持提交！');
      return;
    }
    if (wx_info && wx_openid) {
      const curFormDoc = await Forms.findOne({ work_id, wx_openid });
      if (curFormDoc) {
        ctx.body = ctx.util.refail('一个微信用户只能提交一次表单');
        return;
      }
    }
    try {
      await FormsProxy.addForm({
        user_id: workDoc.user_id,
        work_title: workDoc.title,
        work_id,
        wx_info,
        wx_openid,
        form_data: form_data
      })
      ctx.body = ctx.util.resuccess("操作成功");
    } catch (e) {
      throw e
    }
  }
  //获取作品下的表单
  static async getFormDataByWork(ctx) {
    const { pageSize = 10, pageIndex = 1 } = ctx.request.query;
    const work_id = ctx.checkQuery("work_id").notEmpty("作品ID不能为空").value;
    if (ctx.errors) {
      let tip = "";
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key];
      }
      ctx.body = ctx.util.refail(tip);
      return;
    }
    try {
      const form = await FormsProxy.getFormDataByWork({
        user_id: ctx.state.user.id,
        work_id, pageIndex, pageSize
      })
      ctx.body = ctx.util.resuccess("操作成功", form)
    } catch (e) {
      throw e
    }
  }
  //按作品导出表单
  static async exportFormByWork(ctx) {
    const work_id = ctx.checkBody("work_id").notEmpty("作品ID不能为空").value;
    if (ctx.errors) {
      let tip = "";
      for (let key in ctx.errors[0]) {
        tip = ctx.errors[0][key];
      }
      ctx.body = ctx.util.refail(tip);
      return;
    }
    try {
      let options = await FormsProxy.exportFormByWork({ work_id, user_id: ctx.state.user.id, });
      ctx.set('Content-Type', 'application/octet-stream');
      ctx.type = "xlsx";
      ctx.body = options.buffer;
      ctx.status = 200;
    } catch (e) {
      throw e
    }
  }

}