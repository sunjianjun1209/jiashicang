import { listSimpleDictDatas } from '@/api/system/dict'

const state = {
  /**
   * 数据字典 MAP
   * key：数据字典大类枚举值 dictType
   * dictValue：数据字典小类数值 {dictValue: '', dictLabel: ''} 的数组
   */
  dictDatas: {}
}

const mutations = {
  SET_DICT_DATAS: (state, dictDatas) => {
    state.dictDatas = dictDatas
  }
}

const actions = {
  loadDictDatas({ commit }) {
    listSimpleDictDatas().then(response => {
      // 设置数据
      const dictDataMap = {}
      response.data.data.forEach(dictData => {
        // 获得 dictType 层级
        const enumValueObj = dictDataMap[dictData.dictCode]
        if (!enumValueObj) {
          dictDataMap[dictData.dictCode] = []
        }
        // 处理 dictValue 层级
        dictDataMap[dictData.dictCode].push({
          value: dictData.itemValue,
          label: dictData.itemText,
          description: dictData.description
        })
        // console.log(dictDataMap)
      })
      // 存储到 Store 中
      commit('SET_DICT_DATAS', dictDataMap)
      // console.log(dictDataMap)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
