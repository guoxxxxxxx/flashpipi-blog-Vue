<template>
    <div class="carousel-container">
        <el-carousel class="el-container" direction="vertical" :autoplay="false">
            <el-carousel-item class="item-container" v-for="item in data" :key="item.id">
                <div class="item">
                    <div class="img-container">
                        <img :src="item.imgUrl">
                    </div>
                    <div class="text-container">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        <div class="article-meta-data-wrap">
                            <span class="article-meta-data">
                                <CalendarOutlined />&nbsp;发表于:
                                {{ item.date }}
                            </span>
                            <span class="article-meta-data-divider">&nbsp;|&nbsp;</span>
                            <span class="article-meta-data">
                                <SyncOutlined /> &nbsp;更新于:
                                {{ item.update }}
                            </span>
                            <span class="article-meta-data-divider">&nbsp;|&nbsp;</span>
                            <span class="article-meta-data">
                                <ProfileOutlined /> &nbsp;分类:
                                {{ item.category }}
                            </span>
                        </div>
                        <div class="content">
                            {{ item.description }}
                        </div>
                    </div>
                </div>

            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script lang='ts' setup>
import { reactive } from 'vue';
import {
    CalendarOutlined, SyncOutlined, ProfileOutlined
} from '@ant-design/icons-vue'
const data = reactive([
    {
        id: 1,
        title: '动手学深度学习',
        date: '2023-06-29',
        update: '2023-07-06',
        imgUrl: '/images/header-cover.jpg',
        description: '教你使用pytorch框架迅速完成深度学习内容。',
        category: '深度学习',
    },
    {
        id: 2,
        title: '标题2',
        date: '2023-07-29',
        update: '2023-07-06',
        imgUrl: '/images/header-cover.jpg',
        category: '深度学习',
        description: '这是一段简短的描述',
    },
    {
        id: 3,
        title: '标题3',
        update: '2023-07-06',
        date: '2023-05-29',
        imgUrl: '/images/header-cover.jpg',
        category: '深度学习',
        description: '这是一段这是一段简短的描这是一段简短的描述这这是一段简\
        短的描述这这是一段简短的描述这述这这是一段简短的描述这一段简短的描述这\
        这是一段简短的描述这这是一段简短的描述这是一段简短的描述这是一段简短的\
        描述这是一段简短的描述这是一段简短的描述这是一段简短的描述这是一段简短的描述',
    }
]);
</script>

<style scoped lang='less'>
.carousel-container {
    width: 100%;
    color: var(--theme-font-color);
    background-color: var(--theme-card-color);
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
    border-radius: 18px;
    margin-bottom: 20px;
    border: 1px solid gray;

    // 当屏幕小于649像素之间时 中部卡片开始合并
    @media (max-width: 649px) {
        height: 500px;

        .img-container {
            width: 100%;
        }

        .text-container {
            width: 100%;
            height: 80%;
        }

        .item-container {
            height: 520px;
        }

        .el-container {
            height: 520px;
        }
    }

    // 当像素值大于1100px时，界面显示全部东西
    @media (min-width: 650px) {

        height: 260px;


        .item {
            display: flex;
        }

        .img-container {
            width: 50%;
        }

        .text-container {
            width: 50%;
        }

        .item-container {
            height: 260px;
        }
    }
}

.el-container {
    width: 100%;
    padding: 8px;
}

.img-container {

    height: 240px;

    img {
        height: 100%;
        width: 100%;
        border-radius: 18px;
    }
}

.text-container {
    padding: 20px;
}


.title {
    font-size: 1.5em;
    width: 100%;
    text-align: center;
    padding: 8px;
    font-weight: bold;
    color: var(--theme-font-color);
}

.content {
    margin-top: 10px;
    text-indent: 2em;
    font-size: 1.2em;
    overflow: hidden;
    -webkit-line-clamp: 5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.article-meta-data-wrap {
    display: flex;
    justify-content: center;

    .article-meta-data {
        font-size: 14px;
        color: var(--theme-font-color);
        box-sizing: border-box;
        line-height: 24px;
        overflow: hidden;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }
}
</style>