const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Customer',
  path: '/customer',
  component: Layout,
  redirect: '/customer/createOrder',
  isHidden: true,
  meta: {
    title: '用户',
    customIcon: 'logo',
    role: ['admin'],
    requireAuth: true,
    order: 3,
  },
  children: [
    {
      name: 'createOrder',
      path: 'createOrder',
      component: () => import('./CreateOrder.vue'),
      meta: {
        title: '创建工单',
        icon: 'ic:baseline-table-view',
        role: ['admin'],
        requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'orderDetail',
      path: '/orderDetail',
      component: () => import('./OrderDetail.vue'),
      isHidden: true,
      content: '工单详情',
    },
    {
      name: 'recordTable',
      path: 'record-table',
      component: () => import('./table/record-list.vue'),
      meta: {
        title: '我的服务记录',
        icon: 'ic:baseline-table-view',
        role: ['admin'],
        requireAuth: true,
        keepAlive: true,
      },
    },
  ],
}
