const getters = {
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  name: state => state.user.name,
  addRoutes: state => state.permission.addRoutes,

  // 数据字典
  dict_datas: state => state.dict.dictDatas
}
export default getters
