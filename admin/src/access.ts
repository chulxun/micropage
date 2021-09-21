/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * 用户权限配置
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.role === 1,
  };
}
