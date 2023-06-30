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
                        <div class="title text-children">{{ (emoj as any)[item.id % 13] }}  {{ item.title }}</div>
                        <div class="desc text-children">{{ (emoj as any)[item.id+3 % 13] }}  {{ item.description }}</div>
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
        title: '标题1',
        date: '2023-06-29',
        imgUrl: '/images/header-cover.jpg',
        description: '这是一段简短的描述'
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
    height: 300px;
    background-color: var(--theme-card-color);
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
    border-radius: 18px;
    margin-bottom: 16px;
    border: 1px solid gray;
}

.box {
    width: 100%;
    height: 100%;
    border-radius: 18px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.img-container {
    height: 90%;
    width: 40%;
    border-radius: 18px;
}

.text-container {
    width: 50%;
    height: 90%;
    border-radius: 18px;
    color: var(--theme-font-color);


    .date {
        width: 70%;
        font-size: 20px;
        margin-top: 5%;
    }

    .title {
        width: 70%;
        font-size: 30px;
        font-weight: bold;
        margin-top: 5%;
    }

    .desc {
        width: 70%;
        font-size: 20px;
        font-style: italic;
        margin-top: 2%;
    }

    .text-children {
        margin-left: 5%;
    }
}
</style>