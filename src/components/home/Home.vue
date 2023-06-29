<template>
  <div class="home">
    <!-- 网站封面 -->
    <home-cover></home-cover>
    <!-- 首页主体 -->
    <div class="container">
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
                    <MailOutlined @click="mailto"/>
                  </a-col>
                </a-row>

              </div>
            </template>
          </a-card-meta>
        </a-card>

        <!-- 公告栏 -->
        <a-card class="card-style">
          <a-card-meta>
            <template #title>
              <bell-filled style="color: rgb(240, 17, 17)" />&nbsp;<span class="card-title">公告</span>
            </template>
            <template #description>
              <div class="blog-notice">
                ????????
              </div>
            </template>
          </a-card-meta>
        </a-card>


      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import HomeCover from './HomeCover.vue';
import { useStore } from '@/stores/index';
import { GithubOutlined, QqOutlined, WechatOutlined, MailOutlined } from '@ant-design/icons-vue';
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

</script>

<style scoped lang="less">
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

    @media (min-width: 760px) {
      padding: 40px 15% 0px 15%;
    }

    @media (max-width: 759px) {
      padding: 40px 8px 0px 8px;

      .sider-card {
        display: none;
      }
    }

    .main-card {
      flex: 0.8;

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
      flex: 0.25;
      padding: 0 16px;
      height: 100vh;
      position: sticky;
      top: 24px;
      margin-bottom: 20px;

      .web-info {
        padding: 0.25rem;
        font-size: 0.875rem;
        color: var(--theme-color);
      }

      .card-style {
        border-radius: 8px;
        margin-bottom: 16px;
        box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
        border: 1px solid var(--theme-card-color);
        background: var(--theme-card-color);
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
