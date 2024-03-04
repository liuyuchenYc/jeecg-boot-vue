<template>
    <div>
        <Description  @register="registerDesc"  class="px-3"/> 
        <BasicTable @register="registerTable">
            <template #tableTitle>
                <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls">导出</a-button>
            </template>
        </BasicTable>
    </div>
</template>

<script lang="ts" name="monitor-clue-list" setup>

import { ref,reactive,unref } from 'vue';
import { Description, DescItem, useDescription} from '/@/components/Description/index';
import { ActionItem, BasicColumn, BasicTable, FormSchema, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { getClueList, getTaskById, getExportUrl } from './task.api';
import { columnsClueList } from './task.data';
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
    ];

    searchFormClue.value = searchForm;
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



</script>