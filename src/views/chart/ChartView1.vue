<template>
  <div>
    <el-button @click="click">添加</el-button>
    <p>存在pinia中的数据，只有F5刷新数据才会丢失</p>
  </div>
  <div class="chart" id="chart" style="width: 600px; height: 400px"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'

import { chartUseStore } from '@/stores/chartStore.js'
const chartStore = chartUseStore()

let chart

onMounted(() => {
  chart = echarts.init(document.getElementById('chart'))
  chart.setOption(chartStore.chart1option)
})

const click = () => {
  const length = chartStore.chart1option.xAxis.data.length
  chartStore.chart1option.xAxis.data.push(`${length * 5 + 5}并发`)
  chartStore.chart1option.series[0].data.push((Math.random() * 10) + 10)
  chartStore.chart1option.series[1].data.push((Math.random() * 10) + 10)
  chart.setOption(chartStore.chart1option)
}
</script>

<style scoped>

</style>
