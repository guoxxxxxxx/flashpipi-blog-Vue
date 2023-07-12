<!-- 
    说明:
    该组件需要收到父组件传递过来的data对象,该对象中包含关键字(下述关键字都是必须要携带的,为了美观!)
    1. title: 文章的标题
    2. detail: 文章简要描述<当文字数量小于20时效果最好>
    3. date: 初次发表时间
    4. update: 最后一次更新时间
    5. category: 类别
    6. tag: 标签(only one)只存一个
    7. imgUrl: 背景图片
 -->
<template>
    <!-- 此处动画还有些许bug不过问题不大, 后续再改--debug -->

    <div class="card-style animate__animated animate__zoomIn animate__slow">
        <router-link :to="{path: '/article', query:{id: props.data.id}}">
            <div class="img-box">
                <img class="img" :src="props.data.imagePath">
                <div class="detail">
                    {{ props.data.description }}
                </div>
            </div>

            <div class="text-box">
                <div class="title">
                    {{ props.data.title.length <= 14 ? props.data.title : props.data.title.substring(0, 13) + '...' }}
                </div>
                    <div class="info">
                        📅发表于: {{ props.data.publishTime }} | 🔄️更新于: {{ props.data.updateTime }} |
                        📝类别: {{ props.data.category }} | 🔍阅读: {{ props.data.viewsCount }}
                    </div>
            </div>
        </router-link>
    </div>
</template>

<script lang='ts' setup>
const props = defineProps(['data'])
</script>

<style scoped lang='less'>
.info {
    width: 100%;
    text-align: center;
    color: var(--theme-font-color);
}

.title {
    font-size: 1.5em;
    width: 100%;
    text-align: center;
    padding: 8px;
    font-weight: bold;
    color: var(--theme-font-color);
}

.text-box {
    font-weight: lighter;
    width: 100%;
}

.img-box {
    position: relative;
    height: 70%;
}

.detail {
    width: 90%;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    padding: 10px;
    text-align: center;
    font-size: 1.5em;
    font-weight: lighter;
    z-index: 1;
}

.img {
    width: 100%;
    height: 100%;
    border-radius: 18px;
}

.card-style {
    border-radius: 18px;
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
    border: 1px solid var(--theme-card-color);
    background: var(--theme-card-color);
    border: 1px solid gray;
    margin-top: 20px;
    height: 350px;

    // 当屏幕小于449像素时,卡片充满一行
    @media (max-width: 449px) {
        width: 100%;
    }

    // 当屏幕介于450-649像素之间时 中部卡片开始合并
    @media (min-width: 450px) and (max-width: 649px) {
        width: 49%;
    }

    // 当像素值介于650-1099像素时，右侧卡片消失
    @media (min-width: 650px) and (max-width: 1099px) {
        width: 32%;
    }

    // 当像素值大于1100px时，界面显示全部东西
    @media (min-width: 1100px) {
        width: 32%;
    }
}
</style>