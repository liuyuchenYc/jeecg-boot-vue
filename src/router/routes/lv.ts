import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const lv: AppRouteModule = {
  path: '/lvsys',
  name: 'lvsys',
  component: LAYOUT,
  redirect: '/lvsys/clueList',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: 'clueList',
  },
  children: [
    {
      path: 'clueList',
      name: 'clueList',
      component: () => import('/@/views/monitor/lv_monitor_task/clueList.vue'),
      meta: {
        // affix: true,
        title: '线索列表',
      },
    },
    // {
    //   path: 'workbench',
    //   name: 'Workbench',
    //   component: () => import('/@/views/dashboard/workbench/index.vue'),
    //   meta: {
    //     title: t('routes.dashboard.workbench'),
    //   },
    // },
  ],
};

export default lv;
