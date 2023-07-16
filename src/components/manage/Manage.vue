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
                   <el-button @click="exit" type="danger">退出登录</el-button>
                </div>
                <Table></Table>
            </a-card>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { SettingFilled, ExclamationCircleOutlined} from "@ant-design/icons-vue";
import Table from "./Table.vue";
import router from "@/router";
import { useStore } from "@/stores";
import { Modal } from "ant-design-vue";
import { createVNode } from "vue";
const upload = () => {
    router.push({name: "upload"});
}
// 退出操作
const exit = ()=>{
    Modal.confirm({
        title: '警告',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确定退出吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
            useStore().exit();
        }
    });
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