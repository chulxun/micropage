
const { Resources } = require("../models")

module.exports = class ResourcesProxy {

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
