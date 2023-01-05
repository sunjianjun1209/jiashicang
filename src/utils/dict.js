/**
 * 数据字典工具类
 */
import store from '@/store'

export const DICT_TYPE = {
  USER_TYPE: 'user_type',

  SYS_COMMON_STATUS: 'sys_common_status',
  SYS_MENU_TYPE: 'sys_menu_type',
  SYS_ROLE_TYPE: 'sys_role_type',
  SYS_DATA_SCOPE: 'sys_data_scope',
  SYS_USER_SEX: 'sys_user_sex',
  SYS_NOTICE_TYPE: 'sys_notice_type',
  SYS_OPERATE_TYPE: 'sys_operate_type',
  SYS_LOGIN_RESULT: 'sys_login_result',
  SYS_CONFIG_TYPE: 'sys_config_type',
  SYS_SMS_CHANNEL_CODE: 'sys_sms_channel_code',
  SYS_SMS_TEMPLATE_TYPE: 'sys_sms_template_type',
  SYS_SMS_SEND_STATUS: 'sys_sms_send_status',
  SYS_SMS_RECEIVE_STATUS: 'sys_sms_receive_status',
  SYS_ERROR_CODE_TYPE: 'sys_error_code_type',
  HANHUA_SJ_APPROVE_STATUS: 'hanhua_sj_approve_status',
  HANHUA_SJ_STATUS: 'hanhua_sj_status',
  FINANCIAL_ID: 'financial_id',
  KRONOS_MENU_TYPE: 'kronos_menu_type',

  AD_TYPE: 'ad_type',
  CONTRACT_TEMP_UNIONKEY: 'contract_temp_unionkey',
  ENT_TYPE: 'ent_type',
}

/**
 * 获取 dictType 对应的数据字典数组
 *
 * @param dictType 数据类型
 * @returns {*|Array} 数据字典数组
 */
export function getDictDatas(dictType) {
  return store.getters.dict_datas[dictType] || []
}

export function getDictDataLabel(dictType, value) {
  // 获取 dictType 对应的数据字典数组
  const dictDatas = getDictDatas(dictType)
  if (!dictDatas || dictDatas.length === 0) {
    return ''
  }
  // 获取 value 对应的展示名
  value = value + '' // 强制转换成字符串，因为 DictData 小类数值，是字符串
  for (const dictData of dictDatas) {
    if (dictData.value === value) {
      return dictData.label
    }
  }
  return ''
}
