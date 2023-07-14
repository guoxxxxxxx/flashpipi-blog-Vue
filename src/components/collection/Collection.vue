<template>
    <div class="category">
        <header-cover>
            <div class="article-info">
                <h1 class="article-title">
                    <book-filled /> 合集
                </h1>
            </div>
        </header-cover>
        <CollectionPieChart></CollectionPieChart>
        <CollectionList />
    </div>
</template>

<script lang='ts' setup>
import CollectionList from './CollectionList.vue';
import CollectionPieChart from './CollectionPieChart.vue';
</script>

<style scoped lang=''>

</style>