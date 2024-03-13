import { BasicColumn, FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
import { JCronValidator } from '/@/components/Form';
import { t } from 'vxe-table';
import { useUserStore } from '/@/store/modules/user';

const userStore = useUserStore();
let roleName = userStore.getUserInfo.roleName;
let count = -1;

if(roleName ==='基础版'){
  count = 2
}else if(roleName ==='标准版'){
  count = 4
}else if(roleName ==='标准版'){
  count = 6
}

const channel1 = [
  { label: '抖音', value: '8' },
  { label: '快手', value: '9' },
  // { label: '小红书', value: '9' },
]

const channel2 = [
  { label: '淘宝', value: '1' },
  { label: '1688', value: '2' },
  { label: '京东', value: '3' },
  // { label: '亚马逊', value: '7' },
  { label: '抖音', value: '5' },
  { label: '快手', value: '6' },
  { label: '小红书', value: '7' },
]


export const columns: BasicColumn[] = [
  {
    title: '任务ID',
    dataIndex: 'id',
    width: 100,
    resizable: true,
  },
  {
    title: '任务名称',
    dataIndex: 'taskName',
    width: 120,
    ellipsis: false,
    resizable: true,
  },
  {
    title: '检索关键词',
    dataIndex: 'keyWord',
    width: 100,
    resizable: true,
  },
  {
    title: '检索域',
    dataIndex: 'searchDomain',
    width: 100,
    resizable: true,
    customRender: ({ text }) => {
      return text == '1' ? '内容' : '商品';
    },
  },
  {
    title: '渠道',
    dataIndex: 'channel',
    width: 150,
    resizable: true,
    customRender: ({ text, record }) => {

      let arr = text.split(',');
      let arr1 = [];

      if(record.searchDomain == '1'){
       arr1 = arr.map(el => {
          const find = channel1.find(opt => opt.value === el);
          return find?.label || '--';
        })
      }else{
       arr1 = arr.map(el => {
          const find = channel2.find(opt => opt.value === el);
          return find?.label || '--';
        })
      }
      return arr1.join(',')
    }
  },
  {
    title: '线索条数',
    dataIndex: 'clueTotal',
    width: 80,
    resizable: true,
  },
  {
    title: '任务状态',
    dataIndex: 'status',
    width: 80,
    resizable: true,
    customRender: ({ text }) => {
      return ['进行中','完成','停止'][text]
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 120,
    resizable: true,
  },
  {
    title: '完成时间',
    dataIndex: 'finishTime',
    width: 120,
    resizable: true,
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
    componentProps: {
      options: [
        { label: '进行中', value: 0 },
        { label: '完成', value: 1 },
        { label: '停止', value: 2 },
      ],
    },
  },
  {
    field: 'keyWord',
    label: '关键词',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'searchDomain',
    label: '检索域',
    component: 'Select',
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
    field: 'channel',
    label: '内容',
    component: 'CheckboxGroup',
    defaultValue: null,
    componentProps: {
      options: channel1,
    },
  },
  {
    ifShow: ({ values }) => values.searchDomain === 2,
    field: 'channel',
    label: '商品',
    component: 'CheckboxGroup',
    colProps: { span: 16 },
    defaultValue: null,
    componentProps: {
      options: channel2,
    },
  },
  {
    field: 'createDate',
    label: '创建时间',
    component: 'DatePicker',
    colProps: { span: 8 },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'finishDate',
    label: '完成时间',
    component: 'DatePicker',
    colProps: { span: 8 },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      style: {
        width: '100%',
      },
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'taskName',
    label: '任务名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'keyWord',
    label: '检索关键词',
    component: 'Input',
    required: true,
  },
  {
    field: 'searchDomain',
    label: '检索域',
    component: 'Select',
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
    field: 'channel',
    label: '内容',
    component: 'CheckboxGroup',
    required: true,
    defaultValue: null,
    componentProps: {
      options: channel1,
      onChange: (value) => {
        if(value.length == count){
          channel1.map(el=>{
           if(!value.includes(el.value)){
             el.disabled = true
           }
           return el 
         })
       }else{
         channel1.map(el=>{
           delete el.disabled
           return el 
         })
       }
      },
    },
  },
  {
    ifShow: ({ values }) => values.searchDomain === 2,
    field: 'channel',
    label: '商品',
    component: 'CheckboxGroup',
    required: true,
    defaultValue: null,
    componentProps: {
      options: channel2,
      onChange: (value) => {
        if(value.length == count){
           channel2.map(el=>{
            if(!value.includes(el.value)){
              el.disabled = true
            }
            return el 
          })
        }else{
          channel2.map(el=>{
            delete el.disabled
            return el 
          })
        }
      },
    },
  },
];


