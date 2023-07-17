<template>
    <div id="main">
    </div>
</template>

<script lang='ts' setup>
import * as echarts from 'echarts';
import { useStore } from '@/stores';
import { onMounted, onBeforeMount } from 'vue';
import request from '@/api/request';
import { errTips } from '@/utils';
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
                radius: ['30%', '50%'],
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
    request({
        method: "GET",
        url: "/blog/getCollectionCount",
    }).then((resp) => {
        drawGraph(resp.data)
    }).catch((err)=>{
        errTips("获取信息失败!");
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