<template>
    <div class="category-card">
        <div class="category-item-container">
            <div class="category-item" v-for="item in data.categoryList" :key="item.category" @click="goCategoryDetail(item.category)">
                <div style="width: 80%;" class="content">
                    {{ item.category }}({{ item.count }})
                </div>
                <div style="width: 10%;">
                    🔜
                </div>
            </div>
        </div>
        <!-- 分页按钮 -->
        <div class="pagination">
            <el-pagination small background layout="prev, pager, next" :total="data.allCategoryCount" class="mt-4"
                v-model:current-page="data.currentPage" :page-size="4" />
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive, onMounted, watch } from 'vue';
import router from '@/router/index';
import request from '@/api/request';
import { errTips } from '@/utils';

const goCategoryDetail = (categoryName:string)=>{
    router.push({name: 'categoryDetail', query: {category: categoryName}})
}

const data = reactive({
    currentPage: 1,
    allCategoryCount: 1,
    categoryList: [
        {
            category: '',
            count: 0,
        }
    ]
});
/**
 * 获取所有种类以及文章数量 分页
 */
const getBlogCategory = (page: number) => {
    request({
        method: "GET",
        url: "/blog/getBlogsCategoryList",
        params: { page: page }
    }).then((resp) => {
        data.categoryList = resp.data;
    }).catch((err) => {
        errTips("获取信息失败");
    })
}

/**
 * 获取种类数
 */
const getCategoryCount = () => {
    request({
        method: "GET",
        url: "/blog/getBlogsCategoryCount"
    }).then((resp) => {
        data.allCategoryCount = resp.data;
    }).catch((err) => {
        errTips("获取信息失败");
    })
}

/**
 * 监听页码变化
 */
watch(
    () => data.currentPage,
    (newVal, oldVal) => {
        data.currentPage = newVal;
        getBlogCategory(data.currentPage);
    }
)

onMounted(() => {
    getBlogCategory(data.currentPage);
    getCategoryCount();
})
</script>

<style scoped lang='less'>

.content {
    overflow: hidden;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

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


.category-item-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    // justify-content: space-around;
    // margin-top: 20px;
    margin-top: 20px;
    margin-left: 4%;

    // 当屏幕小于349像素时
    @media (max-width: 449px) {
        height: 270px;
    }

    // 当屏幕介于450-649像素之间时
    @media (min-width: 450px) and (max-width: 649px) {
        height: 140px;
    }

    // 当像素值大于650像素时
    @media (min-width: 650px) {
        height: 80px;
    }

    .category-item {
        height: 45px;
        margin: 5px;
        border: 1px solid gray;
        background-color: var(--theme-category-btn-color);
        color: white;
        border-radius: 10px;
        font-size: 1.3em;
        width: 100%;
        text-align: left;
        align-items: center;
        font-family: 'Courier New', Courier, monospace;
        font-weight: bolder;
        padding-left: 20px;
        display: flex;
        user-select: none;
        cursor: pointer;

        @media (max-width: 449px) {
            width: 90%;
        }

        @media (min-width: 450px) and (max-width: 649px) {
            width: 45%;
        }

        @media (min-width: 650px) {
            width: 22%;
        }
    }

    .category-item:hover {
        background-color: var(--theme-category-btn-hover-color);
        animation: pulse;
        animation-duration: 0.5s;
        color: white;
    }

    .category-item:active {
        background-color: var(--theme-category-btn-color);
    }
}

.pagination {
    width: 100%;
    display: flex;
    justify-content: center;
}

.category-card {
    width: 100%;
    border: 1px solid gray;
    border-radius: 18px;
    background-color: var(--theme-card-color);
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);

    // 当屏幕小于349像素时,卡片充满一行
    @media (max-width: 449px) {
        height: 330px;
    }

    // 当屏幕介于450-649像素之间时 中部卡片开始合并
    @media (min-width: 450px) and (max-width: 649px) {
        height: 200px;
    }

    // 当像素值大于1100px时，界面显示全部东西
    @media (min-width: 650px) {
        height: 140px;
    }
}
</style>