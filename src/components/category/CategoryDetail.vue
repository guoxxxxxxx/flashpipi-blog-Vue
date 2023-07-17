<template>
    <div class="container">
        <header-cover>
            <div class="article-info">
                <h1 class="article-title">
                    <book-filled /> {{ route.query.category }}
                </h1>
            </div>
        </header-cover>
        <div class="list">
            <a-list item-layout="vertical" size="large" v-for="item in data.listData" :key="item.id">
                <div class="card animate__animated animate__bounceIn" @click="toArticle(item.id)">
                    <a-list-item key="item.title">
                        <template #actions>
                            <span class="content">
                                <CalendarOutlined /> {{ item.publishTime }}
                            </span>
                            <span class="content">
                                <EyeOutlined /> {{ item.viewsCount }}
                            </span>
                        </template>
                        <template #extra>
                            <img height="165" width="290" alt="logo" :src="item.imagePath" @error="imgError(item.id)" v-if="!item.imgErr"/>
                            <img height="165" width="290" alt="logo" src="/images/404.png" v-if="item.imgErr"/>
                        </template>
                        <a-list-item-meta>
                            <template #title>
                                <span class="content">
                                    <router-link :to="{ path: '/article', query: { id: item.id } }">
                                        🔗{{ item.title }}
                                    </router-link>
                                </span>
                                <div class="description-label">
                                    {{ item.description }}
                                </div>
                            </template>
                        </a-list-item-meta>
                        <span class="content">{{ item.content }}</span>
                    </a-list-item>
                </div>

            </a-list>
        </div>
        <div class="page-compoment">
            <el-pagination background layout="prev, pager, next" :total="data.total" :page-size="data.pageSize"
                v-model:current-page="data.currentPage" />
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive, onMounted, watch } from 'vue';
import { CalendarOutlined, EyeOutlined } from '@ant-design/icons-vue'
import { useRoute } from 'vue-router';
import router from '@/router';
import request from '@/api/request';
import { errTips } from '@/utils';
const route = useRoute();
console.log(route.query.category);

const imgError = (id: number) =>{
    for(let i=0; i<data.listData.length; i++){
        if(data.listData[i].id == id){
            data.listData[i].imgErr = true;
        }
    }
}

const data = reactive({
    listData: [{
        id: 0,
        title: '',
        description: '',
        content: '',
        imagePath: '',
        viewsCount: 0,
        publishTime: '',
        imgErr: false
    }],
    total: 0,
    pageSize: 5,
    currentPage: 1,
})

// 从后端请求分类的数据
const getBlogsByCategory = (page_size: number, current_page: number) => {
    request({
        method: "GET",
        url: '/blog/getBlogsByCategory',
        params: { pageSize: page_size, currentPage: current_page, category: route.query.category }
    }).then((resp) => {
        data.listData = resp.data;
    }).catch((err) => {
        errTips("获取信息失败!");
    })
}

// 获取指定分类的文章数量
const getBlogsCountByCategory = () => {
    request({
        method: "GET",
        url: '/blog/getBlogsCountByCategory',
        params: { category: route.query.category }
    }).then((resp) => {
        data.total = resp.data
    }).catch((err) => {
        errTips("获取信息失败!");
    })
}

// 进入查看文章界面
const toArticle = (id: number) => {
    router.push({ name: 'article', query: { id: id } });
}

// 监听页码变化
watch(
    ()=>data.currentPage,
    (newVal, oldVal)=>{
        getBlogsByCategory(data.pageSize, data.currentPage);
    }
)

onMounted(() => {
    getBlogsByCategory(data.pageSize, data.currentPage);
    getBlogsCountByCategory();
    window.scroll(0, 0)
})
</script>

<style scoped lang='less'>
:deep(.el-pagination.is-background .el-pager li) {
    background-color: var(--theme-background) !important; //修改默认的背景色
    color: var(--theme-font-color);
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
    background-color: var(--theme-category-btn-color) !important;
}

:deep(.el-pagination.is-background .btn-prev) {
    background-color: var(--theme-background);
    color: var(--theme-font-color);
}

:deep(.el-pagination.is-background .btn-next) {
    background-color: var(--theme-background);
    color: var(--theme-font-color);
}

img {
    margin-left: -15px;
}

.page-compoment {
    width: 100%;
    justify-content: center;
    display: flex;
}

.description-label {
    color: var(--theme-font-color);
    font-weight: 500;
    font-style: italic;
    font-size: 0.9em;
    margin-top: 10px;
}

.content {
    color: var(--theme-font-color);
    overflow: hidden;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin-top: -10px;
}

.container {
    background-color: var(--theme-background);
    overflow-x: hidden;
}

.list {
    padding: 5% 10%;
    min-height: 500px;
}

.card {
    background-color: var(--theme-card-color);
    margin-top: 20px;
    border: dashed rgb(198, 198, 198);
}

.card:hover {
    background-color: rgb(137, 137, 137);
}

.card:active {
    background-color: rgb(196, 196, 196);
}
</style>