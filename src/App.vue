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
    <div class="theme-switch">
      <icon-font :type="state.themeClass ? 'icon-taiyang' : 'icon-yueliang'" style="font-size: 40px;" />
    </div>

    <!-- 主界面 -->
    <top-bar></top-bar>


    <!-- 组件逻辑测试 -->
    <typewriter></typewriter>
  </div>
</template>

<script lang='ts' setup>
import { reactive } from 'vue';
import { useStore } from './stores/index';
import { UpOutlined, createFromIconfontCN } from '@ant-design/icons-vue';
import TopBar from './components/layout/TopBar.vue';
import Typewriter from './components/others/Typewriter.vue';
import config from './config/config';

const IconFont = createFromIconfontCN({
  scriptUrl: config.ICON_FONT_URL,
})

const store = useStore();
// 选择什么样的图片，太阳 or 月亮
const state = reactive({
  themeClass: true
})
</script>

<style scoped>
.theme-switch {
  position: fixed;
  right: 24px;
  bottom: 124px;
  z-index: 999;
}
</style>