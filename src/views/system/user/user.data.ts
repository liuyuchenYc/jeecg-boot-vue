import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getAllRolesListNoByTenant, getAllTenantList } from './user.api';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
export const columns: BasicColumn[] = [
  {
    title: '账号ID',
    dataIndex: 'username',
    width: 80,
  },
  {
    title: '用户名',
    dataIndex: 'realname',
    width: 80,
  },
  {
    title: '账号权限',
    dataIndex: 'roleName',
    width: 100,
  },
  {
    title: '账号有效期',
    dataIndex: 'expirationDate',
    width: 150,
    // sorter: true,
    // customRender: ({ text }) => {
    //   return render.renderDict(text, 'sex');
    // },
  },
  {
    title: '状态',
    dataIndex: 'status_dictText',
    width: 80,
  },
];

export const recycleColumns: BasicColumn[] = [
  {
    title: '用户账号',
    dataIndex: 'username',
    width: 100,
  },
  {
    title: '用户姓名',
    dataIndex: 'realname',
    width: 100,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 80,
    customRender: render.renderAvatar,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 80,
    sorter: true,
    customRender: ({ text }) => {
      return render.renderDict(text, 'sex');
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '账号状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'user_status',
      placeholder: '请选择状态',
      stringToNumber: true,
    },
  },
  {
    label: '账号权限',
    field: 'roleId',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRolesListNoByTenant,
      labelField: 'roleName',
      valueField: 'id',
      immediate: false,
    },
  },
  {
    label: '用户名',
    field: 'username',
    component: 'JInput',
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '账号ID',
    field: 'username',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    dynamicRules: ({ model, schema }) => rules.duplicateCheckRule('sys_user', 'username', model, schema, true),
  },
  {
    label: '用户名',
    field: 'realname',
    required: true,
    component: 'Input',
  },
  {
    label: '登录密码',
    field: 'password',
    component: 'StrengthMeter',
    rules: [
      {
        required: true,
        message: '请输入登录密码',
      },
      {
        pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/,
        message: '密码由8位数字、大小写字母和特殊符号组成!',
      },
    ],
  },
  {
    label: '确认密码',
    field: 'confirmPassword',
    component: 'InputPassword',
    dynamicRules: ({ values }) => rules.confirmPassword(values, true),
  },
  {
    label: '角色',
    field: 'selectedroles',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRolesListNoByTenant,
      labelField: 'roleName',
      valueField: 'id',
      immediate: false,
    },
  },
  {
    label: '账号有效期',
    field: 'expirationDate',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      style: {
        width: '100%',
      },
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];

export const formPasswordSchema: FormSchema[] = [
  {
    label: '用户账号',
    field: 'username',
    component: 'Input',
    componentProps: { readOnly: true },
  },
  {
    label: '登录密码',
    field: 'password',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '请输入登录密码',
    },
    rules: [
      {
        required: true,
        message: '请输入登录密码',
      },
      {
        pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/,
        message: '密码由8位数字、大小写字母和特殊符号组成!',
      },
    ],
  },
  {
    label: '确认密码',
    field: 'confirmPassword',
    component: 'InputPassword',
    dynamicRules: ({ values }) => rules.confirmPassword(values, true),
  },
];

export const formAgentSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    componentProps: {
      readOnly: true,
      allowClear: false,
    },
  },
  {
    field: 'agentUserName',
    label: '代理人用户名',
    required: true,
    component: 'JSelectUser',
    componentProps: {
      rowKey: 'username',
      labelKey: 'realname',
      maxSelectCount: 10,
    },
  },
  {
    field: 'startTime',
    label: '代理开始时间',
    component: 'DatePicker',
    required: true,
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: '请选择代理开始时间',
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'endTime',
    label: '代理结束时间',
    component: 'DatePicker',
    required: true,
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: '请选择代理结束时间',
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'JDictSelectTag',
    defaultValue: '1',
    componentProps: {
      dictCode: 'valid_status',
      type: 'radioButton',
    },
  },
];

export const formQuitAgentSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    componentProps: {
      readOnly: true,
      allowClear: false,
    },
  },
  {
    field: 'agentUserName',
    label: '交接人员',
    required: true,
    component: 'JSelectUser',
    componentProps: {
      rowKey: 'username',
      labelKey: 'realname',
      maxSelectCount: 1,
    },
  },
  {
    field: 'startTime',
    label: '交接开始时间',
    component: 'DatePicker',
    required: true,
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: '请选择交接开始时间',
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'endTime',
    label: '交接结束时间',
    component: 'DatePicker',
    required: true,
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: '请选择交接结束时间',
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'JDictSelectTag',
    defaultValue: '1',
    componentProps: {
      dictCode: 'valid_status',
      type: 'radioButton',
    },
  },
];

//租户用户列表
export const userTenantColumns: BasicColumn[] = [
  {
    title: '用户账号',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '用户姓名',
    dataIndex: 'realname',
    width: 100,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 120,
    customRender: render.renderAvatar,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 100,
  },
  {
    title: '部门',
    width: 150,
    dataIndex: 'orgCodeTxt',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ text }) => {
      if (text === '1') {
        return '正常';
      } else if (text === '3') {
        return '审批中';
      } else {
        return '已拒绝';
      }
    },
  },
];

// 用户租户搜索表单
export const userTenantFormSchema: FormSchema[] = [
  {
    label: '账号',
    field: 'username',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '名字',
    field: 'realname',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '性别',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      placeholder: '请选择性别',
      stringToNumber: true,
    },
    colProps: { span: 6 },
  },
];
