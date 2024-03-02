import { BasicColumn, FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
import { JCronValidator } from '/@/components/Form';
import { t } from 'vxe-table';

export const columns: BasicColumn[] = [
  {
    title: '任务ID',
    dataIndex: 'taskId',
    width: 100,
  },
  {
    title: '任务名称',
    dataIndex: 'jobClassName',
    width: 200,
  },
  {
    title: '检索关键词',
    dataIndex: 'searchKey',
    width: 200,
  },
  {
    title: '检索域',
    dataIndex: 'searchDomain',
    width: 200,
  },
  {
    title: '线索条数',
    dataIndex: 'count',
    width: 100,
  },
  {
    title: '任务状态',
    dataIndex: 'taskStatus',
    width: 100,
    customRender: ({ text }) => {
      const color = text == '0' ? 'green' : text == '-1' ? 'red' : 'gray';
      return render.renderTag(render.renderDict(text, 'quartz_status'), color);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'taskName',
    label: '任务名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '任务状态',
    component: 'Select',
    //填写组件的属性
    componentProps: {
      options: [
        { label: '进行中', value: 0 },
        { label: '完成', value: 1 },
        { label: '停止', value: 2 },
      ],
    },
  },
  {
    field: 'searchKey',
    label: '关键词',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'createDate',
    label: '创建时间',
    component: 'DatePicker',
    colProps: { span: 8 },
  },
  {
    field: 'finishDate',
    label: '完成时间',
    component: 'DatePicker',
    colProps: { span: 8 },
  },
  {
    field: 'searchDomain',
    label: '检索域',
    component: 'RadioButtonGroup',
    colProps: { span: 8 },
    defaultValue: null,
    componentProps: {
      options: [
        { label: '内容', value: 1 },
        { label: '商品', value: 2 },
      ],
    },
  },
  {
    ifShow: ({ values }) => values.searchDomain === 1,
    field: 'searchDomain1',
    label: '内容',
    component: 'CheckboxGroup',
    defaultValue: null,
    componentProps: {
      options: [
        { label: '抖音', value: 1 },
        { label: '快手', value: 2 },
        { label: '小红书', value: 3 },
      ],
    },
  },
  {
    ifShow: ({ values }) => values.searchDomain === 2,
    field: 'searchDomain1',
    label: '商品',
    component: 'CheckboxGroup',
    colProps: { span: 16 },
    defaultValue: null,
    componentProps: {
      options: [
        { label: '淘宝', value: 4 },
        { label: '1688', value: 5 },
        { label: '京东', value: 6 },
        { label: '亚马逊', value: 7 },
        { label: '抖音', value: 8 },
        { label: '快手', value: 9 },
        { label: '小红书', value: 10 },
      ],
    },
  },
  // {
  //   field: 'status',
  //   label: '任务状态',
  //   component: 'JDictSelectTag',
  //   componentProps: {
  //     dictCode: 'quartz_status',
  //     stringToNumber: true,
  //   },
  //   colProps: { span: 8 },
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'jobClassName',
    label: '任务名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'searchKey',
    label: '检索关键词',
    component: 'Input',
    required: true,
  },
  {
    field: 'searchDomain',
    label: '检索域',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: null,
    componentProps: {
      options: [
        { label: '内容', value: 1 },
        { label: '商品', value: 2 },
      ],
    },
  },
  {
    ifShow: ({ values }) => values.searchDomain === 1,
    field: 'searchDomain1',
    label: '内容',
    component: 'CheckboxGroup',
    required: true,
    defaultValue: null,
    componentProps: {
      options: [
        { label: '抖音', value: 1 },
        { label: '快手', value: 2 },
        { label: '小红书', value: 3 },
      ],
    },
  },
  {
    ifShow: ({ values }) => values.searchDomain === 2,
    field: 'searchDomain1',
    label: '商品',
    component: 'CheckboxGroup',
    required: true,
    defaultValue: null,
    componentProps: {
      options: [
        { label: '淘宝', value: 4 },
        { label: '1688', value: 5 },
        { label: '京东', value: 6 },
        { label: '亚马逊', value: 7 },
        { label: '抖音', value: 8 },
        { label: '快手', value: 9 },
        { label: '小红书', value: 10 },
      ],
    },
  },

  // {
  //   field: 'cronExpression',
  //   label: 'Cron表达式',
  //   component: 'JEasyCron',
  //   defaultValue: '* * * * * ? *',
  //   rules: [{ required: true, message: '请输入Cron表达式' }, { validator: JCronValidator }],
  // },
  // {
  //   field: 'paramterType',
  //   label: '参数类型',
  //   component: 'Select',
  //   defaultValue: 'string',
  //   componentProps: {
  //     options: [
  //       { label: '字符串', value: 'string' },
  //       { label: 'JSON对象', value: 'json' },
  //     ],
  //   },
  // },
  // {
  //   field: 'parameter',
  //   label: '参数',
  //   component: 'InputTextArea',
  //   ifShow: ({ values }) => {
  //     return values.paramterType == 'string';
  //   },
  // },
  // {
  //   field: 'parameter',
  //   label: '参数',
  //   component: 'JAddInput',
  //   helpMessage: '键值对形式填写',
  //   ifShow: ({ values }) => {
  //     return values.paramterType == 'json';
  //   },
  // },
  // {
  //   field: 'status',
  //   label: '状态',
  //   component: 'JDictSelectTag',
  //   componentProps: {
  //     dictCode: 'quartz_status',
  //     type: 'radioButton',
  //     stringToNumber: true,
  //     dropdownStyle: {
  //       maxHeight: '6vh',
  //     },
  //   },
  // },
  // {
  //   field: 'description',
  //   label: '描述',
  //   component: 'InputTextArea',
  // },
];


// 线索列表 搜索项
export const searchFormClue: FormSchema[] = [
  {
    field: 'searchDomain',
    label: '检索域',
    component: 'RadioButtonGroup',
    colProps: { span: 8 },
    defaultValue: null,
    componentProps: {
      options: [
        { label: '内容', value: 1 },
        { label: '商品', value: 2 },
      ],
    },
  },
  {
    ifShow: ({ values }) => values.searchDomain === 1,
    field: 'searchDomain1',
    label: '内容',
    component: 'CheckboxGroup',
    defaultValue: null,
    componentProps: {
      options: [
        { label: '抖音', value: 1 },
        { label: '快手', value: 2 },
        { label: '小红书', value: 3 },
      ],
    },
  },
  {
    ifShow: ({ values }) => values.searchDomain === 2,
    field: 'searchDomain1',
    label: '商品',
    component: 'CheckboxGroup',
    colProps: { span: 16 },
    defaultValue: null,
    componentProps: {
      options: [
        { label: '淘宝', value: 4 },
        { label: '1688', value: 5 },
        { label: '京东', value: 6 },
        { label: '亚马逊', value: 7 },
        { label: '抖音', value: 8 },
        { label: '快手', value: 9 },
        { label: '小红书', value: 10 },
      ],
    },
  },
  // {
  //   field: 'jobClassName1',
  //   label: '侵权方类型',
  //   component: 'Select',
  //   //填写组件的属性
  //   componentProps: {
  //     options: [
  //       { label: '男', value: 1 },
  //       { label: '女', value: 2 },
  //       { label: '未知', value: 3 },
  //     ],
  //   },
  //   //默认值
  //   defaultValue: 3,
  // },
  {
    field: 'productTitle',
    label: '商品标题',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'productDesc',
    label: '商品简介',
    component: 'Input',
    colProps: { span: 8 },
  },
  // {
  //   field: 'mainInfo',
  //   label: '主体信息',
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
  // {
  //   field: 'storeName',
  //   label: '店铺名称',
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
];


// 线索列表 
export const columnsClueList: BasicColumn[] = [
  {
    title: '线索ID',
    dataIndex: 'clueId',
    width: 100,
  },
  {
    title: '检索域',
    dataIndex: 'searchDomain',
    width: 200,
  },
  {
    title: '商品标题',
    dataIndex: 'jobClassName',
    width: 200,
  },
  {
    title: '商品简介',
    dataIndex: 'searchKey',
    width: 200,
  },
  {
    title: '商品封面',
    dataIndex: 'count',
    width: 100,
  },
  {
    title: '商品链接',
    dataIndex: 'count',
    width: 100,
  },
  // {
  //   title: '主体类型',
  //   dataIndex: 'taskStatus',
  //   width: 100,
  // },
  // {
  //   title: '主体信息',
  //   dataIndex: 'taskStatus',
  //   width: 100,
  // },
  {
    title: '店铺名称',
    dataIndex: 'taskStatus',
    width: 100,
  },
  {
    title: '商品价格',
    dataIndex: 'taskStatus',
    width: 100,
  },
  {
    title: '商品销量',
    dataIndex: 'taskStatus',
    width: 100,
  },
];