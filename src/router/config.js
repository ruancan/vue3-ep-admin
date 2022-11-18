import LoginView from '@/views/LoginView.vue'
import LayoutView from '@/components/LayoutView.vue'

const defaultConfig = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'main',
    component: LayoutView,
    redirect: '/home',
    children: [{
      path: 'home',
      name: '首页',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        componentName: 'HomeView',
        keepAlive: true
      }
    }]
  },
  {
    path: '/performance-chart',
    name: '报表',
    component: LayoutView,
    children: [{
      path: 'loginApi',
      name: 'login接口',
      component: () => import('@/views/chart/ChartView1.vue'),
      meta: {
        componentName: 'ChartView1',
        keepAlive: true
      }
    }, {
      path: 'userinfo',
      name: 'userInfo接口',
      component: () => import('@/views/chart/ChartView2.vue'),
      meta: {
        componentName: 'ChartView2',
        keepAlive: true
      }
    }]
  },
  {
    path: '/table',
    name: '表格',
    component: LayoutView,
    children: [{
      path: 'sample',
      name: '表格示例',
      component: () => import('@/views/table/SampleTable.vue'),
      meta: {
        componentName: 'SampleTable',
        keepAlive: true
      }
    }]
  },
  {
    path: '/blank',
    name: 'blank',
    component: LayoutView,
    children: [{
      path: 'blank',
      name: '空白页',
      component: () => import('@/views/BlankView.vue'),
      meta: {
        componentName: 'BlankView',
        keepAlive: false
      }
    }]
  },
  {
    path: '/:catchAll(.*)',
    hidden: true,
    name: '/404',
    component: () => import('@/views/404View.vue')
  }

]
export default defaultConfig
