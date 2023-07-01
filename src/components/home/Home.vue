<template>
  <div class="home">
    <!-- 网站封面 -->
    <home-cover></home-cover>
    <!-- 首页主体 -->
    <div class="container">
      <div class="main-card">
        <!-- 轮播图 -->
        <Carousel></Carousel>
        <!-- 分类模块 -->
        <CategoryCard></CategoryCard>
        <!-- 文章模块 -->
        <div class="article-container">
          <ArticleCard v-for="item in 11" :data="data.articles[0]"></ArticleCard>
          <!-- 此行代码解决了最后一行剩偶数个卡片时分布显示的Bug -->
          <div class="none-card" v-if="11 % 3 == 2"></div>
        </div>
      </div>

      <!-- 侧边组件懒着拆开了,反正就home里用一次,不拆了 -->
      <div class="sider-card">
        <!-- 用户个人信息 -->
        <a-card class="card-style">
          <template #cover>
            <div class="blog-avatar">
              <a-avatar :src="store.authorInfo.avator" :size="110" />
            </div>
            <div class="author-info">
              ✨{{ store.authorInfo.name }}✨
            </div>
          </template>
          <a-card-meta>
            <template #description>
              <div class="blog-info">
                <a-row style="font-size: 16px;">
                  <a-col :span="8"><span>文章</span></a-col>
                  <a-col :span="8"><span>标签</span></a-col>
                  <a-col :span="8"><span>分类</span></a-col>
                </a-row>
                <a-row style="margin-top: 10px; font-style:italic; font-family: sans-serif;">
                  <a-col :span="8"><span>{{ store.articlesInfo.articleCount }}</span></a-col>
                  <a-col :span="8"><span>{{ store.articlesInfo.tagsCount }}</span></a-col>
                  <a-col :span="8"><span>{{ store.articlesInfo.categoryCount }}</span></a-col>
                </a-row>
                <!-- go to github button -->
                <el-button type="primary" :round="true" size="large" :icon="GithubOutlined"
                  style="margin-top: 20px; width: 90%; font-size: 17px;" @click="toGitHub" :color="gitHubBtnStyle">
                  Go to GitHub
                </el-button>

                <!-- icon-link -->
                <a-row type="flex" justify="space-around">
                  <a-col :span="4" class="icon-link">
                    <el-popover placement="top" trigger="hover" :effect="getCurrentThemeClass">
                      <el-image style="width: 125px; height: 125px" src="/images/qq.jpg" fit="fill" />
                      <template #reference>
                        <QqOutlined />
                      </template>
                    </el-popover>
                  </a-col>
                  <a-col :span="4" class="icon-link">
                    <el-popover placement="top" trigger="hover" :effect="getCurrentThemeClass">
                      <el-image style="width: 125px; height: 125px" src="/images/wechat.jpg" fit="fill" />
                      <template #reference>
                        <WechatOutlined />
                      </template>
                    </el-popover>
                  </a-col>
                  <a-col :span="4" class="icon-link">
                    <MailOutlined @click="mailto" />
                  </a-col>
                </a-row>

              </div>
            </template>
          </a-card-meta>
        </a-card>

        <!-- 站内小提示 -->
        <a-card class="card-style">
          <div class="notice-card">
            <div class="notice-title">
              🔍 Tips 🔍
            </div>
            <hr />
            <div class="notice-text-container" style="color: var(--theme-font-color);">
              <div style="margin-top: 10px;">
                <span style="text-indent:2em; display: block; font-weight: lighter;
                 font-size: 1.1em; padding-top: 10px;">
                  本站图片📷托管在Github上, 国内🌏有时可能访问不到且访问速度可能会比较慢🐢。此时需要您进行科学上网🚀，
                  科学上网🚀相关技术小站💻暂不提供任何技术支持，给您带来不便尽情谅解🥹！
                </span>
              </div>
            </div>
          </div>
        </a-card>

        <!-- 公告栏 -->
        <a-card class="card-style">
          <div class="notice-card">
            <div class="notice-title">
              ❗公告栏❗
            </div>
            <hr />
            <div class="notice-text-container" style="color: var(--theme-font-color);">
              <div class="notice-text">
                🔗本网站域名:<br> <a href="https://www.baidu.com" style="font-weight: bold;">还没申请域名</a>
              </div>
            </div>
          </div>
        </a-card>

        <!-- 小站资讯 -->
        <a-card class="card-style">
          <div class="notice-card">
            <div class="notice-title">
              <LineChartOutlined :style="'color: grey'" /> 小站资讯
            </div>
            <hr />
            <div class="information-container">
              <div class="info-child">
                <div class="info-label">
                  文章数目:
                </div>
                <div class="info-value">
                  12346
                </div>
              </div>
              <div class="info-child">
                <div class="info-label">
                  已运行时间:
                </div>
                <div class="info-value">
                  888天
                </div>
              </div>
              <div class="info-child">
                <div class="info-label">
                  本站总访客量:
                </div>
                <div class="info-value">
                  99999999
                </div>
              </div>
              <div class="info-child">
                <div class="info-label">
                  最后更新时间:
                </div>
                <div class="info-value">
                  2065-03-15
                </div>
              </div>
            </div>
          </div>
        </a-card>



      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import HomeCover from './HomeCover.vue';
import Carousel from '@/components/article/Carousel.vue'
import CategoryCard from './CategoryCard.vue';
import ArticleCard from '../article/ArticleCard.vue';
import { useStore } from '@/stores/index';
import { GithubOutlined, QqOutlined, WechatOutlined, MailOutlined, LineChartOutlined } from '@ant-design/icons-vue';
import { computed, reactive } from 'vue';

const store = useStore();

// mailto 跳转到发送邮件界面
const mailto = () => {
  window.location.href = "mailto: guo_x0315@163.com";
}

// 跳转到我的GitHub主页
const toGitHub = () => {
  const newWindow = window.open("about:blank");
  if (newWindow != null) {
    newWindow.location.href = "https://github.com/guoxxxxxxx";
  }
  else {
    window.location.href = "https://github.com/guoxxxxxxx";
  }
}

// 通过计算属性获得当前主题并修改github-btn的css
const gitHubBtnStyle = computed(() => {
  return store.themeName === 'dark' ? '#000080' : '';
})

// 通过计算属性获取当前主题
const getCurrentThemeClass = computed(() => {
  return store.themeName;
})

/**
 * 待删除测试数据
 */
const data = reactive({
  count: 11,
  articles: [{
    id: 1,
    title: '动手学习深度学习',
    detail: '教你使用pytorch框架迅速完成深度学习内容',
    // imgUrl: '/images/header-cover.jpg',
    imgUrl: 'https://cdn.jsdelivr.net/gh/guoxxxxxxx/Pic-Go@main/img/image-20230701153250507.png',
    date: '2023-07-04',
    update: '2023-08-09',
    tags: ['vue'],
    category: '深度学习'
  }]
});

</script>

<style scoped lang="less">
// 用于占位
.none-card {

  // 当屏幕小于449像素时,卡片充满一行
  @media (max-width: 449px) {
    width: 100%;
  }

  @media (min-width: 450px) and (max-width: 649px) {
    width: 49%;
  }

  @media (min-width: 650px) and (max-width: 1099px) {
    width: 32%;
  }

  @media (min-width: 1100px) {
    width: 32%;
  }
}

.information-container {
  margin-top: 20px;
  font-size: 1.1em;
  font-weight: lighter;
  color: var(--theme-font-color);

  .info-child {
    display: flex;
    width: 100%;
    margin-top: 10px;
  }

  .info-label {
    width: 50%;
  }

  .info-value {
    width: 50%;
    text-align: right;
  }
}

.notice-card {
  width: 100%;

  .notice-title {
    color: var(--theme-font-color);
    font-size: 1.5em;
    // font-weight: lighter;
    margin-bottom: 5%;
    text-align: center;
  }

  .notice-text {
    color: var(--theme-font-color);
    font-size: 1.3em;
    font-weight: lighter;
    width: 100%;
    text-align: center;
    margin-top: 5%;
  }
}

.article-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-grow: 1;
}

.icon-link {
  font-size: 20px;
  margin-top: 15px;
}

.home {
  height: 100%;
  width: 100%;
  background-color: var(--theme-background);

  .theme-switch {
    position: fixed;
    right: 24px;
    bottom: 124px;
  }

  .loading-text {
    margin: 10px;
    text-align: center;

    span:hover {
      color: #49b1f5;
    }

    .dotting {
      color: var(--theme-color);
      /*点点的颜色*/
      display: inline-block;
      width: 3px;
      height: 3px;
      /*点点的高度和宽度*/
      box-shadow: 7px 0 currentColor, 21px 0 currentColor, 35px 0 currentColor,
        49px 0 currentColor, 63px 0 currentColor, 77px 0 currentColor,
        91px 0 currentColor, 105px 0 currentColor, 119px 0 currentColor,
        133px 0 currentColor;
      /* for IE9+, ..., 3个点 */
      animation: dot 4s infinite step-start both;
      /* for IE10+, ... */
    }

    .dotting::before {
      content: "";
    }

    /* for IE9+ 覆盖 IE8 */

    :root .dotting {
      margin-right: 132px;
    }

    /* for IE9+,FF,CH,OP,SF 占据空间*/
    @keyframes dot {
      0% {
        box-shadow: none;
      }

      /* 0个点 */
      33% {
        box-shadow: 7px 0 currentColor;
      }

      /* 1个点 */
      66% {
        box-shadow: 7px 0 currentColor, 21px 0 currentColor;
        /* 2个点 */
      }

      100% {
        box-shadow: 7px 0 currentColor, 21px 0 currentColor, 35px 0 currentColor;
        /* 3个点 */
      }
    }

  }

  .container {
    display: flex;
    margin: calc(100vh - 10px) auto auto 0px;
    animation: fadeInUp 1s;
    // animation: 3s ease-in 1s infinite reverse both running slidein;

    @media (min-width: 1100px) {
      // changed 15% -> 12%
      padding: 40px 12% 0px 12%;

      .main-card {
        flex: 0.8;
      }
    }

    @media (max-width: 1099px) {
      padding: 40px 2% 0px 2%;

      .sider-card {
        display: none;
      }

      .main-card {
        flex: 1;
      }
    }

    .main-card {

      .post-article-list {
        width: 100%;
        position: relative;

        .post-article-card {
          margin-top: 20px;
        }

        .post-article-card:nth-child(1) {
          margin-top: 0;
        }
      }

    }

    .sider-card {
      flex: 0.23;
      padding: 0 16px;
      height: 100vh;
      // position: sticky;
      top: 24px;
      margin-bottom: 20px;

      .web-info {
        padding: 0.25rem;
        font-size: 0.875rem;
        color: var(--theme-color);
      }

      .card-style {
        border-radius: 18px;
        margin-bottom: 16px;
        box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
        border: 1px solid var(--theme-card-color);
        background: var(--theme-card-color);
        border: 1px solid gray;

      }

      .card-title {
        color: var(--theme-color);
      }

      .blog-avatar {
        padding: 20px;
        text-align: center;
        transition: all 0.5s;
      }

      .author-info {
        font-size: 1.375rem;
        font-weight: bold;
        margin-top: 0.625rem;
        text-align: center;
        color: var(--theme-color);
      }

      .blog-avatar:hover {
        transform: rotate(360deg);
      }

      .blog-notice {
        font-size: 0.875rem;
        color: var(--theme-color);
      }

      .blog-info {
        text-align: center;
        color: var(--theme-color);
        font-weight: bold;
      }

      .blog-intro {
        font-size: 0.875rem;
        color: var(--theme-color);
        text-align: center;
      }

    }

    .img__upload {
      position: fixed;
      right: 24px;
      bottom: 24px;
      z-index: 999999;
    }


  }

}


@keyframes header-effect {
  0% {
    opacity: 0;
    filter: alpha(opacity=0);
    transform: translateY(-50px);
  }

  100% {
    opacity: 1;
    filter: none;
    transform: translateY(0);
  }
}

@keyframes scroll-down-effect {
  0% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }

  50% {
    top: -5px;
    opacity: 1;
    filter: none;
  }

  100% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
}
</style>
