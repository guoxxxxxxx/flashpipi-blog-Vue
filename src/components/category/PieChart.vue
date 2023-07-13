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
        legend: {
            top: 'bottom',
            textStyle: {
                color: "grey",
            }
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [50, 250],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: data
            }
        ]
    };
    option && myChart.setOption(option);
}

// 请求数据
const getPieChartData = () => {
    axios({
        method: "GET",
        url: "/blog/getBlogsCategoryList",
        params: { page: -1 }
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