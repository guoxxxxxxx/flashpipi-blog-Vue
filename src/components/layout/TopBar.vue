<template>
  <div>
    <header>
      <router-link class="header-title" to="/">{{ store.websiteInfo.websiteName }}</router-link>
      <div class="header-menu">
        <a class="header-menu-item" @click="openSearch">
          <search-outlined/> 搜索
        </a>
        <router-link to="/" class="header-menu-item">
          <home-filled /> 首页
        </router-link>
        <router-link to="/archive" class="header-menu-item">
          <container-filled /> 时间轴
        </router-link>
        <router-link to="/category" class="header-menu-item">
          <book-filled /> 分类
        </router-link>
        <router-link to="/collection" class="header-menu-item">
          <tags-filled /> 合集
        </router-link>
        <a class="header-menu-item" v-if="store.userInfo.id === -1" @click="showLogin">
          <api-filled /> 登录
        </a>
        <router-link to="/manage" class="header-menu-item" v-if="store.userInfo.id === 945855456">
          <setting-filled /> 管理
        </router-link>
      </div>

      <!-- 适配手机端 -->
      <div class="header-menu-mobile">
        <a class="header-menu-item">
          <search-outlined style="font-size: 24px;" />
        </a>
        <a class="header-menu-item" @click="showDrawer">
          <menu-outlined style="font-size: 24px;" />
        </a>
        <a-drawer :placement="state.placement" :closable="false" :visible="state.visible" @close="onClose" :width="240"
          :zIndex="99">
          <div>
            <div class="blog-avatar">
              <a-avatar :src="store.authorInfo.avatar" :size="110" />
            </div>
            <div style="font-size: 1.375rem;margin-top: 0.625rem;text-align: center;">
              ✨{{ store.authorInfo.name }}✨
            </div>
            <div style="font-size: 0.875rem; text-align: center">
              个人博客
            </div>
            <div class="blog-info">
              <a-row>
                <a-col :span="8">文章</a-col>
                <a-col :span="8">合集</a-col>
                <a-col :span="8">分类</a-col>
              </a-row>
              <a-row>
                <a-col :span="8">{{ store.websiteInfo.blogsCount }}</a-col>
                <a-col :span="8">{{ store.websiteInfo.collectionCount }}</a-col>
                <a-col :span="8">{{ store.websiteInfo.categoryCount }}</a-col>
              </a-row>
            </div>
            <hr />
            <div class="drawer-menu">
              <router-link to="/" class="header-menu-item">
                <home-filled /> <i>首页</i>
              </router-link>
              <router-link to="/archive" class="header-menu-item">
                <container-filled /> <i>归档</i>
              </router-link>
              <router-link to="/category" class="header-menu-item">
                <book-filled /> <i>分类</i>
              </router-link>
              <router-link to="/collection" class="header-menu-item">
                <tags-filled /> <i>合集</i>
              </router-link>
              <a class="header-menu-item" v-if="store.userInfo.id === -1" @click="showLogin">
                <api-filled /> <i>登录</i>
              </a>
              <router-link to="/manage" class="header-menu-item" v-if="store.userInfo.id === 945855456">
                <setting-filled /> <i>管理</i>
              </router-link>
            </div>
          </div>
        </a-drawer>
      </div>
    </header>
    <search></search>
  </div>
</template>

<script lang='ts' setup>
import { useStore } from '../../stores/index';
import Search from '../others/Search.vue';
import {
  HomeFilled,
  BookFilled,
  TagsFilled,
  ContainerFilled,
  SettingFilled,
  ApiFilled,
  MenuOutlined,
  SearchOutlined
} from "@ant-design/icons-vue";
import { reactive } from 'vue';
const store = useStore();

const state = reactive({
  visible: false,
  placement: 'right'
})

const showDrawer = () => {
  state.visible = true;
};

const onClose = () => {
  state.visible = false;
};

// 打开搜索框
const openSearch = ()=>{
  store.showSearch = true;
}

// 显示登录框
const showLogin = () => {
  store.showLoginBox(true);
}

</script>

<style scoped lang="less">
header {
  position: absolute;
  top: 0;
  height: 60px;
  width: 100%;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3%;
  box-sizing: border-box;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  --text-color: #eeeeee;
  --text-hover-color: white;
  animation: fadeUpIn 1s;
}

.blog-avatar {
  padding: 20px;
  text-align: center;
  transition: all 0.5s;
}

.blog-avatar:hover {
  transform: rotate(360deg);
}

.blog-info {
  margin-top: 16px;
  text-align: center;
  color: #222222;
}

hr {
  position: relative;
  margin: 16px auto;
  border: 2px dashed #d2ebfd;
  width: calc(100% - 4px);
}


.header-title {
  color: var(--text-color);
  font-size: 23px;
  font-family: "Kanit";
  text-decoration: none;
  transition: all 0.2s;
}

.header-title:hover {
  color: var(--text-hover-color);
}

.header-icon {
  margin-right: 7px;
}

.drawer-menu {
  display: flex;
  position: relative;
  flex-direction: column;
}

.header-menu {
  display: flex;

  @media (max-width: 759px) {
    flex-direction: column;
  }

  position: relative;
}

.header-menu-mobile {
  display: none;
  position: relative;
}

.header-menu-item {
  color: var(--text-color);
  text-decoration: none;
  position: relative;
  padding-bottom: 5px;
  margin-left: 25px;

  @media (min-width: 760px) {
    font-size: 14px;
    transition: color 0.4s ease-in-out;
  }

  @media (max-width: 759px) {
    font-size: 18px;

    i {
      margin-left: 25px;
    }
  }
}


@media (min-width: 760px) {
  .header-menu-item:after {
    content: "";
    width: 0;
    height: 3px;
    background: #80c8f8;
    position: absolute;
    bottom: 0;
    left: 50%;
    transition: all 0.4s ease-in-out;
    border-radius: 2px;
  }

  .header-menu-item:hover:after {
    left: 0%;
    width: 100%;
  }

  .header-menu-item:hover {
    color: var(--text-hover-color);
  }
}

@media (max-width:759px) {
  .header-menu {
    display: none;
  }

  .header-menu-mobile {
    display: flex;
  }

  .header-menu-item:hover {
    color: #80c8f8;
  }

}

@keyframes fadeUpIn {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
    opacity: 0%;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 100%;
  }
}

.header-menu-item:hover .menus-submenu {
  display: block;
}

.menus-submenu {
  position: absolute;
  display: none;
  right: 0;
  width: max-content;
  margin-top: 8px;
  box-shadow: 0 5px 20px -4px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  animation: submenu 0.3s 0.1s ease both;
}

.menus-submenu ul,
li {
  list-style: none;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.menus-submenu:before {
  position: absolute;
  top: -8px;
  left: 0;
  width: 100%;
  height: 20px;
  content: "";
}

.menus-submenu a {
  text-align: center;
  line-height: 2;
  color: #4c4948 !important;
  text-shadow: none;
  display: block;
  padding: 6px 14px;
}

.menus-submenu a:hover {
  background: #4ab1f4;
}

@keyframes submenu {
  0% {
    opacity: 0;
    filter: alpha(opacity=0);
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    filter: none;
    transform: translateY(0);
  }
}
</style>