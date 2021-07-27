const xlsx = require('node-xlsx');
const { Forms, Works } = require("../models");

module.exports = class Index {
  static async addForm(params, isImport) {
    let { user_id, work_id, work_title, wx_info, wx_openid, form_data } = params;
    let data = {
      createTime: isImport ? params.createTime : Date.now(),
      user_id,
      work_title,
      work_id,
      wx_info,
      wx_openid,
      form_data
    }
    return Forms.create(data);
  }
  static async getList({ user_id, pageIndex, pageSize }) {
    return Forms.aggregate([
      { $match: { user_id } },
      {
        $lookup: {
          from: "works",
          localField: "work_id",
          foreignField: "work_id",
          as: "work"
        },
      },
      { $unwind: "$work" },
      { $group: { _id: "$work.work_id", work_id: { $first: "$work.work_id" }, work_title: { $first: "$work.title" }, work_img: { $first: "$work.preview_img_url" }, page_type: { $first: "$work.page_type" }, hits: { $first: "$work.hits" }, count: { $sum: 1 } } },
    ]).sort({ "_id": -1 })
      .skip((pageIndex * 1 - 1) * pageSize)
      .limit(pageSize * 1);
  }

  static async getCount(user_id) {
    let res = await Forms.aggregate([
      { $match: { user_id } },
      {
        $lookup: {
          from: "works",
          localField: "work_id",
          foreignField: "work_id",
          as: "work"
        },
      },
      { $unwind: "$work" },
      { $group: { _id: "$work.work_id" } },
      { $group: { _id: null, count: { $sum: 1 } } }
    ])
    return Promise.resolve(res[0].count)
  }

  static async getFormDataByWork({ user_id, work_id, pageIndex, pageSize }) {
    //获取表单数量
    const count = await Forms.countDocuments({ work_id, user_id });
    //分页获取表单列表
    let formDataList = await Forms.find({ work_id, user_id }, { form_data: 1, create_at: 1 })
      .sort({ "create_at": -1 })
      .limit(pageSize * 1)
      .skip(pageSize * (pageIndex - 1));
    //获取作品信息
    const work = await Works.findOne({ work_id, user_id }, { title: 1, user_id: 1, publish_pages: 1 });
    let { ukeyName, form_data } = await this.comData(formDataList, work, work_id, user_id);
    return Promise.resolve({
      ukeyName,
      data: form_data,
      work: { title: work.title },
      page: {
        totalCount: count,
        totalPage: Math.ceil(count / (pageSize * 1)),
        currentPage: parseInt(pageIndex),
      }
    })
  }

  static async exportFormByWork({ work_id, user_id }) {
    //获取作品信息
    const work = await Works.findOne({ work_id, user_id }, { title: 1, user_id: 1, publish_pages: 1 });
    const formDataList = await Forms.find({ work_id, user_id }).sort({ "create_at": -1 });
    let res = await this.comData(formDataList, work, work_id, user_id);
    res.ukeyName.create_at = '提交时间';
    const excel = []; //写入excel  第一个数组 表明表头 其余数组对应每一行的值
    const excelHead = Object.values(res.ukeyName);
    excel.push(excelHead);
    const excelRows = res.form_data.map(item => {
      let obj = {};
      for (const key in res.ukeyName) {
        obj[res.ukeyName[key]] = item[key] || "";
        if (key == 'create_at') {
          obj[res.ukeyName[key]] = new Date(item.create_at).toLocaleString();
        }
      }
      return obj
    });
    excelRows.forEach(item => {
      let arrInner = [];
      excelHead.forEach(t => {
        arrInner.push(item[t])
      });
      excel.push(arrInner);
    });
    let buffer = xlsx.build([
      {
        name: 'sheet1',
        data: excel
      }
    ]);
    return Promise.resolve({
      buffer: buffer,
      title: work.title
    })
  }

  static async comData(formDataList, work, work_id, user_id) {
    formDataList = formDataList.map(item => {
      item.form_data = JSON.parse(decodeURIComponent(item.form_data));
      return item
    });
    let pages = JSON.parse(decodeURIComponent(work.publish_pages));
    //获取该作品所有page中的element
    let elements = pages.reduce((pre, next) => {
      return [...pre, ...next.elements]
    }, []);
    //获取所有表单的表头， 处理分页引起的表头对不上问题
    let docs = await Forms.find({ work_id, user_id }).sort({ "create_at": -1 });
    docs = docs.map(item => {
      item.form_data = JSON.parse(decodeURIComponent(item.form_data));
      return item.form_data
    });
    let recordKeys = docs.reduce((pre, next) => {
      return [...pre, ...Object.keys(next)]
    }, []);
    recordKeys = [...new Set(recordKeys)];
    const ukeyName = {};
    recordKeys.forEach(item => {
      let cur = elements.find(t => t.ukey == item)
      if (cur) {
        ukeyName[item] = cur.props.name || cur.props.placeholder || '未设置标题';
      }
    });
    const form_data = formDataList.map(item => {
      let newdata = item.form_data;
      newdata.create_at = item.create_at
      //add weixin userinfo todo
      if (item.wxInfo) {
        newdata.wxInfo = item.wxInfo
      }
      return newdata
    })
    return { ukeyName, form_data }
  }

}
