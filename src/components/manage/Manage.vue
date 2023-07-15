<template>
    <div class="manamge">
        <header-cover>
            <div class="article-info">
                <h1 class="article-title">
                    <setting-filled /> 管理
                </h1>
            </div>
        </header-cover>
        <div class="container">
            <a-card class="archive-card">
                <div class="button">
                   <el-button class="btn" @click="upload">上传</el-button>
                </div>
                <Table></Table>
            </a-card>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { SettingFilled, } from "@ant-design/icons-vue";
import Table from "./Table.vue";
import router from "@/router";
const upload = () => {
    router.push({name: "upload"});
}
</script>

<style scoped lang='less'>
.container {
    min-height: 800px;
    padding: 5% 10%;
    background-color: var(--theme-background);
}

.archive-card {
    background: var(--theme-card-color);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
    border: 1px solid var(--theme-card-color);
}

.button {
    width: 100%;
    display: flex;
    justify-content: right;
}

.btn {
    background-color: var(--theme-category-btn-color);
    color: white;
}

.btn:hover {
    background-color: var(--theme-category-btn-hover-color);
}
</style>