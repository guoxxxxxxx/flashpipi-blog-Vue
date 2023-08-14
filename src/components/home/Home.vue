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
          <ArticleCard v-for="item in data.articles" :data="item" :key="item.id"></ArticleCard>
          <!-- 此行代码解决了最后一行剩偶数个卡片时分布显示的Bug -->
          <div class="none-card" v-if="data.articles.length % 3 == 2"></div>
        </div>
        <!-- 分页按钮 -->
        <div class="pagination">
          <el-pagination background layout="prev, pager, next" :total="store.websiteInfo.blogsCount"
            v-model:current-page="data.currentPage" :page-size="12" />
        </div>
      </div>

      <!-- 侧边组件懒着拆开了,反正就home里用一次,不拆了 -->
      <div class="sider-card">
        <!-- 用户个人信息 -->
        <a-card class="card-style">
          <template #cover>
            <div class="blog-avatar">
              <a-avatar :src="store.authorInfo.avatar" :size="110" />
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
                  <a-col :span="8"><span>合集</span></a-col>
                  <a-col :span="8"><span>分类</span></a-col>
                </a-row>
                <a-row style="margin-top: 10px; font-style:italic; font-family: sans-serif;">
                  <a-col :span="8"><span>{{ store.websiteInfo.blogsCount }}</span></a-col>
                  <a-col :span="8"><span>{{ store.websiteInfo.collectionCount }}</span></a-col>
                  <a-col :span="8"><span>{{ store.websiteInfo.categoryCount }}</span></a-col>
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

        <!-- 站内欢迎栏 -->
        <a-card class="card-style" v-if="!(store.userInfo.id == -1 || store.userInfo.id == 945855456)">
          <div class="notice-card">
            <div class="notice-title">
              🎉 Welcome 🎉
              <span class="exit" @click="exitConfirm">
                <ExportOutlined />
              </span>
            </div>
            <hr />
            <div class="blog-avatar">
              <a-avatar :src="store.userInfo.avatar" :size="110" />
            </div>
            <div class="author-info">
              {{ store.userInfo.name }}
            </div>
            <div class="changeInfo" style="width: 100%; text-align: center; margin-top: 10px;">
              <a @click="showChangeInfo">修改信息</a>
            </div>
            <ChangeInfo></ChangeInfo>
          </div>
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
                  本站图片📷托管在Github上, 采用第三方CDN进行分发, 由于是免费💰的, 故稳定性较差, 除图片外所有资源部署在腾讯云☁️, 国内访问速度尚可。经测试,
                  采用科学上网🚀会极大程度提高图片🖼️访问速度, 建议可以实现科学上网🚀的用户采用开启代理🌐后访问该网站🌏, 给您带来不便敬请谅解🥹！学科上网
                  <a href="https://muguacloud.baby/auth/register?code=QBac" target="_blank">🔗链接</a>。
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
                🔗本网站域名:<br> <a :href="data.webInfo.url" style="font-weight: bold;">{{ data.webInfo.url }}</a>
              </div>
              <hr>
              <div class="notice-content-text">
                <div v-html=data.webInfo.notice></div>                
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
                  {{ store.websiteInfo.blogsCount }}
                </div>
              </div>
              <div class="info-child">
                <div class="info-label">
                  已运行时间:
                </div>
                <div class="info-value">
                  {{ data.webInfo.runningTime }} day
                </div>
              </div>
              <div class="info-child">
                <div class="info-label">
                  本站总访客量:
                </div>
                <div class="info-value">
                  {{ data.webInfo.viewsCount }}
                </div>
              </div>
              <div class="info-child">
                <div class="info-label">
                  最后更新时间:
                </div>
                <div class="info-value">
                  {{ data.webInfo.lastUpdate }}
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
import { Modal } from 'ant-design-vue';
import { useStore } from '@/stores/index';
import { GithubOutlined, QqOutlined, WechatOutlined, MailOutlined, LineChartOutlined, ExportOutlined, ExclamationCircleOutlined }
  from '@ant-design/icons-vue';
import { computed, reactive, onMounted, watch, createVNode } from 'vue';
import { errTips, getDiffDay, successTips } from "@/utils/index"
import ChangeInfo from './ChangeInfo.vue';
import request from '@/api/request';

const store = useStore();

// 显示修改信息弹出框
const showChangeInfo = () => {
  store.setIsShowChangeInfo(true);
}

// 数据
const data = reactive({
  webInfo: {
    runningTime: 0,
    viewsCount: 0,
    lastUpdate: '',
    notice: '',
    url: '',
  },
  articles: [
    {
      id: 0,
      title: ''
    }
  ],
  currentPage: 1,
});

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

// 按页获取博客列表
const getArticleList = (current_page: number) => {
  request({
    method: 'GET',
    url: '/blog/getAllBlogs',
    params: { page: current_page }
  }).then((resp) => {
    data.articles = resp.data;
  }).catch((err) => {
    errTips("获取信息失败");
  })
}

// 获取多种数量信息
const getVariousCount = () => {
  // 获取卡片信息
  request({
    method: "GET",
    url: "/blog/getCardInformation"
  }).then((resp) => {
    data.webInfo.viewsCount += parseInt(resp.data.allViews[0].sum);
    store.setWebsiteInfo(resp.data.blogCount, resp.data.collectionCount, resp.data.categoryCount)

  }).catch((err) => {
    errTips("获取信息失败!")
  });

  // 获取小站信息
  request({
    method: "GET",
    url: "/info/getInfo"
  }).then((resp) => {
    data.webInfo.notice = resp.data.notice;
    data.webInfo.url = resp.data.website;
    data.webInfo.runningTime = getDiffDay(resp.data.createTime, new Date().toLocaleDateString());
    data.webInfo.viewsCount += parseInt(resp.data.viewsCount);
  }).catch((err) => {
    errTips("获取信息失败")
  })

  // 获取网站最后更新时间
  request({
    method: "GET",
    url: '/blog/getLastUpdateTime'
  }).then((resp) => {
    data.webInfo.lastUpdate = resp.data;
  })
}

// 侦听页码变化并完成分页功能
watch(
  () => data.currentPage,
  (newVal, preVal) => {
    getArticleList(data.currentPage);
    // 回到顶部
    let h = document.getElementsByClassName("cover")[0].scrollHeight;
    window.scrollTo({ top: h, behavior: "smooth" });
  }
)

// 退出确定框
const exitConfirm = () => {
  Modal.confirm({
    title: '警告',
    icon: createVNode(ExclamationCircleOutlined),
    content: '确定退出吗？',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      store.exit();
      request({
        method: "GET",
        url: "/user/exit",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "satoken": store.userInfo.tokenValue
        },
      })
      successTips("退出成功！")
    }
  });
};

// 钩子函数
onMounted(() => {
  getArticleList(data.currentPage);
  getVariousCount();
})

</script>

<style scoped lang="less">
.exit {
  font-size: 0.8em;
}

.exit:hover {
  color: skyblue;
  cursor: pointer;
}

.exit:active {
  color: blue;
}

:deep(.el-pagination.is-background .el-pager li) {
  background-color: var(--theme-background) !important; //修改默认的背景色
  color: var(--theme-font-color);
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: var(--theme-category-btn-color) !important;
}

:deep(.el-pagination.is-background .btn-prev) {
  background-color: var(--theme-background);
  color: var(--theme-font-color);
}

:deep(.el-pagination.is-background .btn-next) {
  background-color: var(--theme-background);
  color: var(--theme-font-color);
}

.notice-content-text {
  color: var(--theme-font-color);
  font-size: 1.1em;
  margin-bottom: 5%;
  font-weight: lighter;
  text-indent: 2em;
}

.main-card {
  min-height: 1800px;
}

// 分页
.pagination {
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
}

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
  overflow-x: hidden;
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