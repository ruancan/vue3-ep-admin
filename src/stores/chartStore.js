import { defineStore } from 'pinia'

export const chartUseStore = defineStore('chartStore', {
  state: () => {
    return {
      chart1option: {
        title: { text: 'login接口' },
        tooltip: {},
        legend: {
          data: ['优化前平均值', '优化后平均值']
        },
        xAxis: {
          data: ['5并发', '10并发', '15并发']
        },
        yAxis: {},
        series: [{
          name: '优化前平均值',
          type: 'line',
          stack: 'Total',
          data: [3.958, 5.885, 10.334]
        }, {
          name: '优化后平均值',
          type: 'line',
          stack: 'Total',
          data: [1.263, 1.045, 1.923]
        }]
      },
      chart2option: {
        title: { text: 'userInfo接口' },
        tooltip: {},
        legend: {
          data: ['优化前平均值', '优化后平均值']
        },
        xAxis: {
          data: ['5并发', '10并发', '15并发']
        },
        yAxis: {},
        series: [{
          name: '优化前平均值',
          type: 'line',
          stack: 'Total',
          data: [2.58, 2.85, 3.34]
        }, {
          name: '优化后平均值',
          type: 'line',
          stack: 'Total',
          data: [1.23, 1.45, 1.93]
        }]
      }
    }
  }
})
