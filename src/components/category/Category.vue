<template>
    <div class="category">
        <header-cover>
            <div class="article-info">
                <h1 class="article-title">
                    <book-filled /> 分类
                </h1>
            </div>
        </header-cover>
        <PieChart></PieChart>
        <CategoryList></CategoryList>
    </div>
</template>

<script lang='ts' setup>
import { BookFilled, } from "@ant-design/icons-vue";
import CategoryList from "./CategoryList.vue";
import PieChart from './PieChart.vue';
</script>

<style scoped lang='less'></style>