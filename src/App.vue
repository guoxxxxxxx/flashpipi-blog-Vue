<template>
  <div :class="store.themeName">
    <!-- 回到顶部 -->
    <a-back-top style="right: 24px;bottom: 72px;">
      <a-button shape="circle" size="large">
        <template #icon>
          <up-outlined />
        </template>
      </a-button>
    </a-back-top>

    <!-- 主题切换按钮 -->
    <div class="theme-switch" @click="changeTheme">
      <icon-font :type="state.themeClass ? 'icon-taiyang' : 'icon-yueliang'" style="font-size: 40px;" />
    </div>

    <div>
      <!-- 导航栏 -->
      <top-bar></top-bar>
      <!-- 主体 -->
      <router-view :key="route.fullPath"></router-view>
      <!-- 下部 -->
      <foot-bar></foot-bar>
    </div>
    <!-- 登录界面 -->
    <login></login>
    <!-- 组件逻辑测试 -->
    <!-- <button @click="test">测试按钮</button> -->
  </div>
</template>

<script lang='ts' setup>
import Login from './components/home/Login.vue';
import { reactive, onMounted } from 'vue';
import { useStore } from './stores/index';
import { UpOutlined, createFromIconfontCN } from '@ant-design/icons-vue';
import TopBar from './components/layout/TopBar.vue';
import FootBar from './components/layout/FootBar.vue';
import config from './config/config';
import { useRoute } from 'vue-router';

const route = useRoute();
const IconFont = createFromIconfontCN({
  scriptUrl: config.ICON_FONT_URL,
})

const store = useStore();

// 选择什么样的图片，太阳 or 月亮
const state = reactive({
  themeClass: true
})
// 修改主题
const changeTheme = () => {
  state.themeClass = !state.themeClass;
  store.switchTheme(state.themeClass);
}

onMounted(()=>{

})
</script>

<style>
.theme-switch {
  position: fixed;
  right: 24px;
  bottom: 124px;
  z-index: 999;
}

@media (max-width: 649px) {
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>