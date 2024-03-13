<template>
    <div>
        <Description  @register="registerDesc"  class="px-3"/> 
        <BasicTable @register="registerTable">
            <template #tableTitle>
                <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls">导出</a-button>
            </template>
            <template #action="{ record }">
                <TableAction :actions="getActions(record)"/>
            </template>
        </BasicTable>
    </div>
</template>

<script lang="ts" name="monitor-clue-list" setup>

import { ref,reactive,unref } from 'vue';
import { Description, DescItem, useDescription} from '/@/components/Description/index';
import { ActionItem, BasicColumn, BasicTable, FormSchema, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { getClueList, getTaskById, getExportUrl, isMark } from './task.api';
// import { columnsClueList, columnsClueList1 } from './task.data';
import { render } from '/@/utils/common/renderUtils';
import { useMessage } from '/@/hooks/web/useMessage';
import { useRoute } from 'vue-router';

const { createMessage } = useMessage();

const channel1 = [
  { label: '抖音', value: '8' },
  { label: '快手', value: '9' },
//   { label: '小红书', value: '9' },
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
const schema: DescItem[] = [
    {
        field: 'id',
        label: '任务ID',
    },
    {
        field: 'taskName',
        label: '任务名称',
    },
    {
        field: 'keyWord',
        label: '检索关键词',
    },
];

let recordData: Recordable = reactive({
    id: '',
    taskName: '',
    keyWord: '',
});

let searchFormClue = ref([]);
let columnsClueList = ref([]);

const route = useRoute();
const index = route.query?.id ?? -1;

getDetails(index)


async function getDetails(index){
    const data = await getTaskById({id: index})

    recordData.taskName = data.taskName
    recordData.id = data.id
    recordData.keyWord = data.keyWord

    let channel = data.channel.split(',')

    // 线索列表 搜索项
    const searchForm: FormSchema[] = [
         {
            show: false,
            field: 'taskId',
            label: '-',
            component: 'Input',
            defaultValue: data.id
        },
        {
            field: 'searchDomain',
            label: '检索域',
            component: 'Select',
            colProps: { span: 8 },
            defaultValue: Number(data.searchDomain),
            componentProps: {
            disabled: true,
            options: [
                { label: '内容', value: 1 },
                { label: '商品', value: 2 },
            ],
            },
        },
        {
            show: ({ values }) => values.searchDomain === 1,
            field: 'channel',
            label: '内容',
            component: 'CheckboxGroup',
            defaultValue: channel,
            componentProps: {
                options: channel1,
            },
        },
        {
            show: ({ values }) => values.searchDomain === 2,
            field: 'channel',
            label: '商品',
            component: 'CheckboxGroup',
            colProps: { span: 16 },
            defaultValue: channel,
            componentProps: {
                options: channel2,
            },
        },
        {
            field: 'productTitle',
            label: '商品标题',
            component: 'Input',
            colProps: { span: 8 },
        },
        {
            field: 'productSummary',
            label: '商品简介',
            component: 'Input',
            colProps: { span: 8 },
        },
        {
            field: 'marks',
            label: '是否被标记',
            component: 'RadioGroup',
            colProps: { span: 8 },
            defaultValue: null,
            componentProps: {
                options: [
                    { label: '是', value: 1 },
                    { label: '否', value: 0 },
                ],
            },
        },
    ];

    searchFormClue.value = searchForm;

    // 线索列表 内容
    const columnsList1: BasicColumn[] = [
    {
        title: '内容标题',
        dataIndex: 'content',
        width: 200,
        ellipsis: false,
        resizable: true,
    },
    {
        title: '内容ID',
        dataIndex: 'contentId',
        width: 100,
        resizable: true,
    },
    {
        title: '内容链接',
        dataIndex: 'contentUrl',
        width: 120,
        resizable: true,
        customRender: ({ text }) => {
            if(!text){
                return text;
            }
            return render.renderHref({text});
        },
    },
    {
        title: '作者',
        dataIndex: 'contentAuthor',
        width: 100,
        resizable: true,
    },
    {
        title: '作者ID',
        dataIndex: 'contentAuthorId',
        width: 100,
        resizable: true,
    },
    {
        title: '用户签名',
        dataIndex: 'userSign',
        width: 100,
        resizable: true,
    },
    {
        title: '地区',
        dataIndex: 'area',
        width: 100,
        resizable: true,
    },
    {
        title: '标记',
        dataIndex: 'marks',
        width: 80,
        resizable: true,
        customRender: ({ text }) => {
            return ['否','是'][text]
        },
    },
    ];

    // 线索列表 商品
    const columnsList2: BasicColumn[] = [
    // {
    //   title: '线索ID',
    //   dataIndex: 'id',
    //   width: 120,
    // },
    // {
    //   title: '检索域',
    //   dataIndex: 'searchDomain',
    //   width: 200,
    // },
    {
        title: '商品标题',
        dataIndex: 'productTitle',
        width: 200,
        ellipsis: false,
        resizable: true,
    },
    {
        title: '商品封面',
        dataIndex: 'productCover',
        width: 100,
        resizable: true,
        customRender: ({ text }) => {
            if(!text){
                return text;
            }
            return render.renderImage({text}, 100, 100);
        },
    },
    {
        title: '商品链接',
        dataIndex: 'productLink',
        width: 120,
        resizable: true,
        customRender: ({ text }) => {
            if(!text){
                return text;
            }
            return render.renderHref({text});
        },
    },
    {
        title: '商品简介',
        dataIndex: 'productSummary',
        width: 100,
        ellipsis: false,
        resizable: true,
    },
    {
        title: '店铺名称',
        dataIndex: 'shopName',
        width: 100,
        ellipsis: false,
        resizable: true,
    },
    {
        title: '商品价格',
        dataIndex: 'commodityPrice',
        width: 80,
        resizable: true,
        sorter: true,
    },
    {
        title: '商品销量',
        dataIndex: 'salesVolume',
        width: 80,
        resizable: true,
        sorter: true,
    },
    {
        title: '销售额',
        dataIndex: 'totalSale',
        width: 80,
        resizable: true,
        sorter: true,
    },
    {
        title: '标记',
        dataIndex: 'marks',
        width: 80,
        resizable: true,
        customRender: ({ text }) => {
            return ['否','是'][text]
        },
    },
    ];

    columnsClueList.value = Number(data.searchDomain) === 1 ? columnsList1 : columnsList2;

}

const [registerDesc] = useDescription({
    title: '任务详情',
    bordered: false,
    data: recordData,
    schema: schema,
});


// 列表页面公共参数、方法
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
        title: '任务详情',
        api: getClueList,
        columns: columnsClueList,
        actionColumn: false,
        useSearchForm: true,
        showIndexColumn: true,
        actionColumn: {
            width: 80,
        },
        formConfig: {
            labelWidth: 120,
            schemas: searchFormClue,
        },
        beforeFetch: (params) => {
            return Object.assign(params, { taskId: route.query?.id });
        },
    },
    exportConfig: {
        name: '任务详情-线索列表',
        url: getExportUrl,
    },
});

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;


/**
 * 操作列定义
 * @param record
 */
function getActions(record) {
    return [
        {
        label: '标记',
        popConfirm: {
            title: '是否标记选中项?',
            confirm: handlerIsMark.bind(null,  {
            id: record.id,
            marks: 1,
            }),
        },
        ifShow: (_action) => {
            return record.marks === 0;
        },
        },
        {
        label: '取消标记',
        popConfirm: {
            title: '是否取消标记选中项?',
            confirm: handlerIsMark.bind(null, {
            id: record.id,
            marks: 0,
            }),
        },
        ifShow: (_action) => {
            return record.marks === 1;
        },
        },
    ];
}

// 标记、取消标记
async function handlerIsMark(record) {
    await isMark(record, reload);
}

</script>