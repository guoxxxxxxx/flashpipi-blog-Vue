<template>
    <div class="main">
        <header-cover>
            <div class="article-info">
                <h1 class="article-title">
                    🚫 无权访问！
                </h1>
            </div>
        </header-cover>
        <div class="container">
            <el-result icon="error" title="无权访问" sub-title="请用管理员账户登录" style="color: var(--theme-font-color);">
                <template #extra>
                    <el-button type="primary" @click="backHome">返回主页</el-button>
                </template>
            </el-result>
        </div>
    </div>
</template>

<script lang='ts' setup>
import router from '@/router';

const backHome = ()=>{
    router.push("/")
}
</script>

<style scoped lang='less'>
.container {
    min-height: 600px;
    background-color: var(--theme-background);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>