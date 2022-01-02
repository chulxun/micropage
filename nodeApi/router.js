const Router = require("koa-router");
const {
  common,
  users,
  resources,
  works,
  forms,
} = require("./controllers");
const middleware = require("./middlewares");

const apiRouter = new Router();
apiRouter
  .post("/common/getQiniuToken", common.getQiniuToken)
  .get("/common/only/getQiniuToken", common.getQiniuToken)
  // 用户相关接口
  .get("/user", users.list)
  .post("/user/register", users.register)
  .post("/user/login", users.login)
  .post("/user/changePwd", users.changePwd)
  .post("/user/editUserInfo", users.editUserInfo)
  // 作品相关接口
  .get("/works/getWorkInfo", works.getWorkById)
  .get("/works/getWorksList", works.getWorksList)
  .post("/works/createWork", works.createWork)
  .post("/works/updateWork", works.updateWork)
  .get("/works/getWorkPreview", works.getWorkPreview)
  .get("/works/getWorkDetail", works.getWorkDetail)
  .post("/works/deleteWork", works.deleteWork)
  .post("/works/createTemplate", works.createTemplate)
  .get("/works/getTemplateWorksList", works.getTemplateWorksList)
  .post("/works/useTemplate", works.useTemplate)
  .post("/works/publish", works.publishWork)
  // 资源相关接口
  .get("/resources/getList", resources.getList)
  .post("/resources/delete", resources.delete)
  .post("/resources/add", resources.add)
  // 提交表单
  .get("/form/getList", forms.getList)
  .post("/form/submitData", forms.submitData)
  .get("/form/getFormDataByWork", forms.getFormDataByWork)
  .post("/form/exportFormByWork", forms.exportFormByWork)



const adminRouter = new Router();
adminRouter
  // 用户相关接口
  .post("/user/login", users.login)
  .get("/user/list", users.list)
  .post("/user/register", users.register)
  .post("/user/changePwd", users.changePwdAdmin)
  .post("/user/writeOffUser", users.writeOffUserAdmin)
  .post("/user/recoveryUser", users.recoveryUserAdmin)
   // 作品相关接口
  .get("/works/getAllWorksList", works.getAllWorksList)
  .post("/works/deleteWork", works.deleteWork)
  .post("/works/recoveryWork", works.recoveryWork)
  .post("/works/updateWork", works.updateWork)
   // 资源相关接口
   .get("/resources/getList", resources.getAllList)
   .post("/resources/delete", resources.delete)


const router = new Router();
router.use("/admin",middleware.hasAdminRole(1), adminRouter.routes(), adminRouter.allowedMethods());
router.use("/api", apiRouter.routes(), apiRouter.allowedMethods());

module.exports = router;
