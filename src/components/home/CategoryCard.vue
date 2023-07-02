<template>
    <div class="category-card">
        <div class="category-item-container">
            <div class="category-item" v-for="item in data" :key="item.id">
                <div style="width: 80%;">
                    {{ item.category }}({{ item.count }})
                </div>
                <div style="width: 10%;">
                    🔜
                </div>
            </div>
        </div>
        <!-- 分页按钮 -->
        <div class="pagination">
            <el-pagination small background layout="prev, pager, next" :total="50" class="mt-4" />
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive } from 'vue';

/**
 * 测试数据
 */
const data = reactive([
    { id: 1, category: '机器学习', count: 1 },
    { id: 2, category: '深度学习', count: 23 },
    { id: 3, category: '计算机视觉', count: 93 },
    { id: 4, category: 'Vue开发', count: 88 },
    // { id: 5, category: 'spring-boot开发' },
    // { id: 6, category: 'Linux' },
    // { id: 7, category: 'C++' },
    // { id: 8, category: 'Pytorch' }
]);
</script>

<style scoped lang='less'>
.category-item-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-around;
    margin-top: 20px;

    // 当屏幕小于349像素时,卡片充满一行
    @media (max-width: 449px) {
        height: 270px;
    }

    // 当屏幕介于450-649像素之间时 中部卡片开始合并
    @media (min-width: 450px) and (max-width: 649px) {
        height: 140px;
    }

    // 当像素值介于650-1099像素时，右侧卡片消失
    @media (min-width: 650px) {
        height: 80px;
    }

    .category-item {
        height: 50px;
        margin: 5px;
        border: 1px solid gray;
        background-color: var(--theme-category-btn-color);
        color: white;
        border-radius: 30px;
        font-size: 1.3em;
        width: 100%;
        text-align: left;
        align-items: center;
        font-family:cursive;
        font-weight: bolder;
        padding-left: 20px;
        display: flex;
        user-select: none;
        cursor: pointer;

        // 当屏幕小于349像素时,卡片充满一行
        @media (max-width: 449px) {
            width: 90%;
        }

        // 当屏幕介于450-649像素之间时 中部卡片开始合并
        @media (min-width: 450px) and (max-width: 649px) {
            width: 45%;
        }

        // 当像素值介于650-1099像素时，右侧卡片消失
        @media (min-width: 650px) and (max-width: 1099px) {
            width: 22%;
        }

        // 当像素值大于1100px时，界面显示全部东西
        @media (min-width: 1100px) {
            width: 22%;
        }
    }

    .category-item:hover{
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