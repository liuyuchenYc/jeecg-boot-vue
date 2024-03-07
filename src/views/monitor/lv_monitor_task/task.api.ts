import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/lawyer/lawyerTask/list',
  save = '/lawyer/lawyerTask/add',
  culeList = '/lawyer/lawyerTaskInfo/list',
  // edit = '/lawyer/lawyerTask/edit',
  get = '/lawyer/lawyerTask/queryById',
  pause = '/lawyer/lawyerTask/edit',
  // resume = '/sys/quartzJob/resume',
  delete = '/lawyer/lawyerTask/delete',
  exportXlsUrl = '/lawyer/lawyerTaskInfo/exportXls',
  // importExcelUrl = '/sys/quartzJob/importExcel',
  // execute = '/sys/quartzJob/execute',
  // deleteBatch = '/sys/quartzJob/deleteBatch',
}

/**
 * 导出api
 */
export const getExportUrl = Api.exportXlsUrl;
/**
 * 导入api
 */
export const getImportUrl = Api.importExcelUrl;
/**
 * 查询任务列表
 * @param params
 */
export const getQuartzList = (params) => {
  return defHttp.get({ url: Api.list, params });
};

/**
 * 查询线索列表
 * @param params
 */
export const getClueList = (params) => {
  return defHttp.get({ url: Api.culeList, params });
};

/**
 * 保存或者更新任务
 * @param params
 */
export const saveOrUpdateQuartz = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};

/**
 * 查询任务详情
 * @param params
 */
export const getTaskById = (params) => {
  return defHttp.get({ url: Api.get, params });
};

/**
 * 删除任务
 * @param params
 */
export const deleteQuartz = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.delete, data: params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 启动
 * @param params
 */
export const resumeJob = (params, handleSuccess) => {
  return defHttp.get({ url: Api.resume, params }).then(() => {
    handleSuccess();
  });
};

/**
 * 暂停
 * @param params
 */
export const pauseJob = (params, handleSuccess) => {
  return defHttp.post({ url: Api.pause, params }).then(() => {
    handleSuccess();
  });
};

/**
 * 立即执行
 * @param params
 */
export const executeImmediately = (params, handleSuccess) => {
  return defHttp.get({ url: Api.execute, params }).then(() => {
    handleSuccess();
  });
};

/**
 * 批量删除任务
 * @param params
 */
export const batchDeleteQuartz = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};


/**
 * 标记 取消标记
 * @param params
 */
export const handlerIsMark = (params, handleSuccess) => {
  return defHttp.get({ url: Api.resume, params }).then(() => {
    handleSuccess();
  });
};