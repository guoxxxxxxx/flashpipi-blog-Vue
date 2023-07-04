<!-- 
    说明:
    此组件为华而不实的跑马灯组件,说有用呢?还有用,说没用呢.不要其实也行. 美观至上,还是要着吧.
 -->
<template>
    <div class="carousel-container">
        <el-carousel height="300px" direction="vertical" :autoplay="true">
            <el-carousel-item v-for="item in data" :key="item.id">
                <div class="box">
                    <div class="img-container">
                        <el-image style="width: 100%; height: 100%; border-radius: 18px;" :src="item.imgUrl" fit="cover">
                            <template #error>
                                <div class="image-slot">
                                    <FrownOutlined />
                                    Image Loading Failed!
                                </div>
                            </template>
                        </el-image>
                    </div>
                    <div class="text-container">
                        <div class="date text-children">
                            📅<span style="font-style: italic;">{{ item.date }}</span>
                        </div>
                        <div class="title text-children">{{ (emoj as any)[item.id % 13] }} {{ item.title }}</div>
                        <div class="desc text-children">{{ (emoj as any)[item.id + 3 % 13] }} {{ item.description }}</div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script lang='ts' setup>
import { reactive } from 'vue';
import { FrownOutlined } from '@ant-design/icons-vue';

// 除了好看一无是处
const emoj = reactive(['❤️', '🔍', '🌎', '📬', '🍋', '🍾', '🥕', '🍉', '🚩', '♨️', '☀️', '❄️', '🪷']);


// 获得随机数
function getRandInt(): Number {
    return Math.floor(Math.random() * 13);
}

const data = reactive([
    {
        id: 1,
        title: '动手学深度学习',
        date: '2023-06-29',
        imgUrl: '/images/header-cover.jpg',
        description: '教你使用pytorch框架迅速完成深度学习内容。'
    },
    {
        id: 2,
        title: '标题2',
        date: '2023-07-29',
        imgUrl: '/images/header-cover.jpg',
        description: '这是一段简短的描述'
    },
    {
        id: 3,
        title: '标题3',
        date: '2023-05-29',
        imgUrl: '/images/header-cover.jpg',
        description: '这是一段简短的描述'
    }
]);
</script>

<style scoped lang='less'>
.carousel-container {
    background-color: var(--theme-card-color);
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
    border-radius: 18px;
    margin-bottom: 16px;
    border: 1px solid gray;

    @media (min-width: 860px) {
        height: 300px;
    }

    @media (max-width: 859px) {
        height: 400px;
    }

}

.box {
    width: 100%;
    border-radius: 18px;
    align-items: center;

    @media (min-width: 860px) {

        justify-content: space-around;
        display: flex;

        .img-container {
            width: 40%;
            margin: 20px;
        }

        .text-container {
            width: 50%;
        }
    }

    @media (max-width: 859px) {


        .img-container {
            width: 100%;

        }

        .text-container {
            width: 100%;
        }
    }
}

.img-container {
    height: 240px;
    border-radius: 18px;
}

.text-container {
    border-radius: 18px;
    color: var(--theme-font-color);
    width: 100%;

    .date {
        width: 70%;
        font-size: 20px;
    }

    .title {
        width: 70%;
        font-size: 30px;
        font-weight: bold;
        margin-top: 3%;
    }

    .desc {
        width: 70%;
        font-size: 20px;
        font-style: italic;
        margin-top: 2%;
    }
}
</style>