<template>
    <div>
        <Description @register="register1"/>
        <BasicTable @register="registerTable">
            <template #tableTitle>
                <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls">导出</a-button>
            </template>
        </BasicTable>
    </div>
</template>

<script lang="ts" name="monitor-clue-list" setup>

import { ref } from 'vue';
import { Description, DescItem, useDescription } from '/@/components/Description/index';
import { BasicTable } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { getQuartzList } from './task.api';
import { columnsClueList, searchFormClue } from './task.data';
import { useMessage } from '/@/hooks/web/useMessage';

const { createMessage } = useMessage();

const mockData: Recordable = {
    username: 'test',
    nickName: 'VB',
    age: '123',
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
};

const schema: DescItem[] = [
    {
        field: 'username',
        label: '任务ID',
    },
    {
        field: 'nickName',
        label: '任务名称',
        // render: (curVal, data) => {
        //     return `${data.username}-${curVal}`;
        // },
    },
    {
        field: 'phone',
        label: '检索关键词',
    },
    // {
    //     field: 'email',
    //     label: '邮箱',
    // },
    // {
    //     field: 'addr',
    //     label: '地址',
    // },
];

const [register1] = useDescription({
    title: '任务详情',
    bordered: false,
    data: mockData,
    schema: schema,
});

// 列表页面公共参数、方法
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
        title: '任务详情',
        api: getQuartzList,
        columns: columnsClueList,
        actionColumn: false,
        formConfig: {
            labelWidth: 120,
            schemas: searchFormClue,
        },
    },
    exportConfig: {
        name: '任务详情-线索列表',
        // url: getExportUrl,
    },
});

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;


</script>