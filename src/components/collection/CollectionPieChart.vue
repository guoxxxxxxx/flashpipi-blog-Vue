<template>
    <div id="main">
    </div>
</template>

<script lang='ts' setup>
import * as echarts from 'echarts';
import { useStore } from '@/stores';
import { onMounted, onBeforeMount } from 'vue';
import axios from 'axios';
import { baseUrl } from '@/main';
axios.defaults.baseURL = baseUrl;
const store = useStore();

// 根据数据绘制数据图
// @ts-ignore
const drawGraph = (data) => {
    type EChartsOption = echarts.EChartsOption;
    var option: EChartsOption;
    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);
    option = {
        tooltip: {
    trigger: 'item'
  },
        legend: {
            top: 'bottom',
            textStyle: {
                color: "#008B8B",
            }
        },
        toolbox: {
            show: false,
        },
        series: [
            {
                name: '合集数据统计',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                labelLine: {
                    show: true,
                },
                data: data,
                label: {
                    show: true,
                    formatter: function (data) {
                        // @ts-ignore
                        return `${data.name} ${data.value} (${data.percent.toFixed(1)}%)`
                    },
                    color: '#008B8B',
                }
            }
        ]
    };
    option && myChart.setOption(option);
}

// 请求数据
const getPieChartData = () => {
    axios({
        method: "GET",
        url: "/blog/getCollectionCount",
    }).then((resp) => {
        drawGraph(resp.data)
    })
}
onMounted(() => {
    getPieChartData();
})
</script>

<style scoped lang='css'>
#main {
    height: 800px;
    width: 100%;
    background-color: var(--theme-background);
    color: var(--theme-font-color);
}
</style> 