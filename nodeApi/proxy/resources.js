
const { Resources } = require("../models")

module.exports = class ResourcesProxy {
  // 获取所有资源 admin
  static getAllList({ params, pageSize, pageIndex }) {
    console.log(params)
    return Resources.aggregate([
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
  // 获取资源列表
  static getList({ params, pageIndex, pageSize }) {
    return Resources.find(params)
      .skip((pageIndex * 1 - 1) * pageSize)
      .limit(pageSize * 1)
      .sort({ "id": -1 })
  }
  // 获取数据总条数
  static getCount(params) {
    return Resources.countDocuments(params)
  }
  static delete(id) {
    return Resources.remove({ id })
  }

  static add(params) {
    const resource = new Resources();
    resource.user_id = params.user_id;
    resource.url = params.url;
    resource.size = params.size;
    resource.type = params.type;
    resource.preview_url = params.preview_url;
    return resource.save()
  }



}
