<template>
    <!-- 分类列表 -->
    <div class="container">
        <a-card class="category-card">
            <div class="category-title">分类 - {{ state.categoryList.length }}</div>
            <div class="category-list">
                <a-row class="link-container">
                    <a-col class="link-wrapper" v-for="item of state.categoryList" :xl="8" :xs="12" :key="item.name">
                        <router-link to="/">
                            <div style="width:100%;z-index:10;">
                                <div class="link-name">{{ item.name }}</div>
                                <div class="link-intro">已发布-{{ item.value }}篇</div>
                            </div>
                        </router-link>
                    </a-col>
                </a-row>
            </div>

        </a-card>
    </div>
</template>

<script lang='ts' setup>
import { onMounted, reactive } from "vue";
import axios from "axios";
import { baseUrl } from "@/main";
axios.defaults.baseURL = baseUrl;
const state = reactive({
  categoryList: [{
    name: "",
    value: 0,
  }],
})

// 请求数据
const getData = () => {
    axios({
        method: "GET",
        url: "/blog/getBlogsCategoryList",
        params: { page: -1 }
    }).then((resp) => {
        state.categoryList = resp.data;
    })
}

onMounted(()=>{
    getData();
})
</script>

<style scoped lang="less">
.category {
  width: 100%;
  height: 100%;
  background-color: var(--theme-background);

  .container {
    padding: 5% 10%;
    background-color: var(--theme-background);
  }

  .category-card {
    background: var(--theme-card-color);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
    border: 1px solid var(--theme-card-color);
  }

  .link-wrapper {
    position: relative;
    transition: all 0.3s;
    border-radius: 8px;
  }

  .link-name {
    text-align: center;
    font-size: 1.25rem;
    font-weight: bold;
    z-index: 9000;
    color: var(--theme-color);
  }

  .link-intro {
    text-align: center;
    padding: 16px 10px;
    height: 50px;
    font-size: 13px;
    color: var(--theme-color);
    width: 100%;
    z-index: 9000;
  }

  .link-wrapper:hover a {
    color: #fff;
  }

  .link-wrapper:hover .link-intro {
    color: #fff;
  }

  .link-wrapper a {
    color: #333;
    text-decoration: none;
    display: flex;
    height: 100%;
    width: 100%;
  }

  .link-wrapper:hover {
    box-shadow: 0 2px 20px #49b1f5;
  }

  .link-wrapper:hover:before {
    transform: scale(1);
  }

  .link-wrapper:before {
    position: absolute;
    border-radius: 8px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #49b1f5 !important;
    content: "";
    transition-timing-function: ease-out;
    transition-duration: 0.3s;
    transition-property: transform;
    transform: scale(0);
  }

  .category-title {
    text-align: center;
    font-size: 36px;
    line-height: 2;
    color: var(--theme-color);
  }

  .category-list {
    padding: 20px 30px;
  }

  .collection-btn {
    text-align: center;
    z-index: 1;
    font-size: 14px;
    position: relative;
    display: block;
    height: 64px;
    color: #222222;
    line-height: 64px;
    border-radius: 16px;
    padding: 0 10px;
    transition-duration: 1s;
    transition-property: color;

    &:before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      background-color: #49b1f5;
      color: #fff !important;
      content: "";
      transition-timing-function: ease-out;
      transition-duration: 0.5s;
      transition-property: transform;
      transform: scaleX(0);
      border-radius: 16px;
      //transform-origin: 0 10%;
    }

    &:hover:before {
      transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
      transform: scaleX(1);
    }
  }
}
</style>
