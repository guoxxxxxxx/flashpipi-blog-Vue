<template>
    <div class="archive">
        <header-cover>
            <div class="article-info">
                <h1 class="article-title">
                    📑归档
                </h1>
            </div>
        </header-cover>
        <div class="container">
            <a-card class="archive-card">
                <el-timeline>
                    <el-timeline-item v-for="item in data.blogList" v-show="item.id" :key="item.id" center
                        :timestamp="item.publishTime" placement="top" class="animate__animated animate__fadeInDown">
                        <el-card class="el-card">
                            <router-link :to="{ path: '/article', query: { id: item.id } }"
                                style="font-size: 1.2em; font-weight: lighter;">
                                <p style="font-weight: bold;">{{ item.title }}</p>
                                <p>{{ item.description }}</p>
                            </router-link>
                            <!-- 分类 -->
                            <div class="article-tags">
                                <span style="text-decoration: none; color: var(--theme-font-color);">🏷️分类：</span>
                                <el-button class="category-btn">
                                    {{ item.category }}
                                </el-button>
                            </div>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>

                <!-- 分页按钮 -->
                <div class="pagination">
                    <el-pagination layout="prev, pager, next" :total="data.totalItem" :page-size="5"
                        v-model:current-page="data.currentPage" background/>
                </div>
            </a-card>
        </div>
    </div>
</template>

<script lang='ts' setup>
import HeaderCover from '../header/HeaderCover.vue';
import axios from 'axios';
import { baseUrl } from '@/main';
import { reactive, onMounted, watch } from 'vue';
axios.defaults.baseURL = baseUrl;
let data = reactive({
    blogList: [
        {
            publishTime: '',
            title: '',
            description: '',
            id: 0,
            category: '',
        }
    ],
    currentPage: 1,
    totalItem: 0,
});

/**
 * 获取最近十篇文章 以及文章总数
 */
const getBlogs = () => {
    axios({
        method: "GET",
        url: "/blog/getRecentBlogs",
        params: { page: data.currentPage, size: 5 }
    }).then((resp) => {
        data.blogList = resp.data
    }).catch((err) => {
        console.log(err);
    });

    axios({
        method: "GET",
        url: "/blog/getBlogsCount"
    }).then((resp) => {
        data.totalItem = resp.data
    }).catch((err) => {
        console.log(err);
    })
    window.scroll(0 ,0);
}

// 监视页码信息的变化
watch(
    () => data.currentPage,
    (newVal, oldVal) => {
        getBlogs();
    }
)

onMounted(() => {
    getBlogs();
})
</script>

<style scoped lang="less">
:deep(.el-pagination.is-background .el-pager li) {
  background-color: var(--theme-background) !important; //修改默认的背景色
  color: var(--theme-font-color);
}
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: var(--theme-category-btn-color) !important;
}
:deep(.el-pagination.is-background .btn-prev){
    background-color: var(--theme-background);
    color: var(--theme-font-color);
}
:deep(.el-pagination.is-background .btn-next){
    background-color: var(--theme-background);
    color: var(--theme-font-color);
}

.category-btn {
    background-color: var(--theme-background);
    color: var(--theme-font-color);
}

.el-card {
    color: var(--theme-font-color);
    background-color: var(--theme-card-color);

    h4 {
        color: var(--theme-font-color);
    }
}

.el-card:hover {
    background-color: gray;
    color: black;
    text-decoration: none;
}

.category-btn:hover {
    background-color: #03a9f4;
}

.category-btn:active {
    background-color: antiquewhite;
}


.el-card:active {
    background-color: burlywood;
}

.archive {
    width: 100%;
    height: 100%;
    min-height: 1000px;
    background-color: var(--theme-background);
    color: var(--theme-color);

    .pagination {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }

    .time {
        font-size: 0.75rem;
        color: var(--theme-color);
        margin-right: 1rem;
    }

    .container {
        padding: 5% 10%;
    }

    .archive-card {
        background: var(--theme-card-color);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
        border: 1px solid var(--theme-card-color);
    }

    a {
        color: var(--theme-color);
        text-decoration: none;
        font-size: 1.2rem;
    }

    a:hover {
        font-size: 1.2rem;
        color: #03a9f4 !important;
        transform: scale(1.1);
    }
}
</style>
