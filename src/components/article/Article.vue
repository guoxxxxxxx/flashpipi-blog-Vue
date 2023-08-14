<template>
    <div class="article">
        <!-- 封面 -->
        <header-cover>
            <div class="article-info">
                <h1 class="article-title">
                    {{ data.title }}
                </h1>
                <div class="article-meta-data-wrap">
                    <span class="article-meta-data">
                        <CalendarOutlined />&nbsp;发表于
                        {{ data.publishTime }}
                    </span>
                    <span class="article-meta-data-divider">|</span>
                    <span class="article-meta-data">
                        <SyncOutlined /> &nbsp;更新于
                        {{ data.updateTime }}
                    </span>
                    <span class="article-meta-data-divider">|</span>
                    <span class="article-meta-data">
                        <ProfileOutlined /> &nbsp;分类
                        {{ data.category }}
                    </span>
                </div>
                <div class="article-meta-data-wrap">
                    <span class="article-meta-data">
                        <EyeOutlined />&nbsp;阅读量
                        {{ data.viewsCount }}
                    </span>
                    <span class="article-meta-data-divider">|</span>
                    <span class="article-meta-data">
                        <FontSizeOutlined /> &nbsp;字数
                        {{ data.content.length > 1000 ? data.content.length > 10000 ? (data.content.length /
                            10000).toFixed(1) + 'w' : (data.content.length / 1000).toFixed(1) + 'K' : data.content.length
                        }}
                    </span>
                    <span class="article-meta-data-divider">|</span>
                    <span class="article-meta-data">
                        <FieldTimeOutlined /> &nbsp;预计阅读时间
                        {{ getTimeUsed }}
                    </span>
                </div>
            </div>
        </header-cover>
        <div class="container">
            <div class="main">
                <a-card class="article-card">
                    <div class="article-content">
                        <!-- @vue-ignore -->
                        <MdPreview :editorId="id" :modelValue="data.content" :theme="store.themeName"
                            :showCodeRowNumber="true" />
                    </div>

                    <hr>

                    <!-- 版权声明 -->
                    <div class="article-signature">
                        <img :src="store.authorInfo.avatar" alt="头像">
                        <div class="copyright">
                            <div class="copyright-item">
                                <span class="copyright-title">文章作者: ✨{{ store.authorInfo.name }}✨</span>
                            </div>
                            <div class="copyright-item">
                                <span class="copyright-title">本文链接: 🔗http://flashpipi.com/article?id={{ route.query.id }}</span>
                            </div>
                            <div class="copyright-item">
                                <span class="copyright-title">版权说明: 💿</span>
                                <span class="copyright-content">本博客所有文章除特别声明外，均采用
                                    <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">《BY-NC-SA》</a>许可协议，转载请注明出处！
                                </span>
                            </div>
                            <div class="copyright-item">
                                <span class="copyright-title">联系作者: </span>
                                <span class="copyright-content"><a href="mailto:guo_x0315@163.com">✉️</a>文章若有错误或疑惑的地方欢迎<a
                                        href="mailto:guo_x0315@163.com">联系</a>我！</span>
                            </div>
                        </div>
                    </div>

                    <!-- 分类 -->
                    <div class="article-tags">
                        🏷️分类：
                        <el-button type="primary" @click="toCategoryDetail(data.category)">{{ data.category }}</el-button>
                    </div>

                </a-card>
            </div>

            <!-- 侧边框 -->
            <div class="side">
                <!-- 固定位置 -->
                <div class="sticky-layout">
                    <!-- 文章目录 -->
                    <div class="catalog-card">
                        <div class="catalog-card-header">
                            🔍目录 
                            <el-button v-if="store.userInfo.rankLevel == 2" type="primary" @click="change">编辑</el-button>
                        </div>
                        <div class="catalog-content">
                            <MdCatalog :editorId="id" :scrollElement="scrollElement"></MdCatalog>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script lang='ts' setup>
import HeaderCover from '../header/HeaderCover.vue';
import { reactive, computed, onMounted } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import {
    CalendarOutlined, SyncOutlined, ProfileOutlined, EyeOutlined,
    FontSizeOutlined, FieldTimeOutlined
} from '@ant-design/icons-vue'
import { useStore } from '@/stores';
import { useRoute } from 'vue-router';
const route = useRoute();
import router from '@/router';
import request from '@/api/request';
import { errTips } from '@/utils';

const id = 'preview-only';
const scrollElement = document.documentElement;

const store = useStore();


let data = reactive({
    title: '',
    publishTime: '',
    updateTime: '',
    category: '',
    viewsCount: '',
    content: '',
})

// 进入分类详情界面
const toCategoryDetail = (category:string)=>{
    router.push({path: 'categoryDetail', query:{category: category}});
}

// 计算预计阅读时间
const getTimeUsed = computed(() => {
    if (data.content.length < 1200) {
        return (data.content.length / 20).toFixed(0) + 's';
    }
    else if (data.content.length < 72000) {
        return (data.content.length / 1200).toFixed(0) + 'min'
    }
    else {
        return (data.content.length / 72000).toFixed(0) + 'h ' + (data.content.length % 72000 / 1200).toFixed(0) + 'min';
    }
});

/**
 * 根据id向后端请求文章详细信息
 */
function queryArticle(){
    request({
        method: 'GET',
        url: '/blog/getBlogById',
        params: {id: route.query.id}
    }).then((resp) => {
        data.title = resp.data.title;
        data.publishTime = resp.data.publishTime;
        data.updateTime = resp.data.updateTime;
        data.category = resp.data.category;
        data.viewsCount = resp.data.viewsCount;
        data.content = resp.data.content;
    }).catch((err)=>{
        errTips("获取信息失败!");        
    })
}

// 修改文章信息
const change = ()=>{
    router.push({name: 'change', query: {id: route.query.id}});
}

onMounted(()=>{
    // 页面回到最上方
    window.scroll(0,0);
    queryArticle();    
})
</script>

<style lang="less" scoped>
.catalog-content {
    font-size: 1em;
    font-family: 'Courier New', Courier, monospace;
    font-weight: normal;
}

.catalog-card {
    background: var(--theme-card-color);
    border-radius: 8px;
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
    padding: 20px 24px;
    width: 100%;
    box-sizing: border-box;
    color: var(--theme-font-color);
}

.catalog-card-header {
    text-align: left !important;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 2em;
    width: 100%;
    text-align: center;
}

.article {
    height: 100%;
    width: 100%;
    background-color: var(--theme-background);

    .article-meta-data-wrap {
        display: flex;
        justify-content: center;
    }

    .article-meta-data {
        font-size: 14px;
        color: white;
        box-sizing: border-box;
        line-height: 24px;
        overflow: hidden;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    .article-meta-data-divider {
        color: white;
        margin: 3px 8px;
        font-size: 14px;
    }

    .container {
        display: flex;

        .comment-card {
            margin-top: 24px;
            background: var(--theme-card-color);
            border: 1px solid var(--theme-card-color);
            border-radius: 8px;
            box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
        }

        .article-card {
            background: var(--theme-card-color);
            border: 1px solid var(--theme-card-color);
            border-radius: 8px;
            box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
        }

        @media (min-width: 760px) {
            padding: 16px 12% 16px 12%;

            .main {
                width: 75%;
            }

            .side {
                width: 25%;
            }
        }

        @media (max-width: 759px) {
            padding: 16px 8px 16px 8px;

            .main {
                width: 100%;
            }

            .side {
                display: none;
            }
        }

        .article-like {
            text-align: center;
            color: var(--theme-color);

            .like-active {
                background-color: #ff4d4f;
                color: white;
            }

            .like {
                color: white;
                background-color: #1890ff;
            }
        }

        hr {
            position: relative;
            margin: 40px auto;
            border: 2px dashed #d2ebfd;
            width: calc(100% - 4px);
        }

        .theme-card {
            margin-left: 20px;

            .theme-body {
                position: relative;
                text-align: center;

                p {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #19b1f5;
                }

                .left {
                    position: absolute;
                    left: 0;
                    font-size: 35px;
                }

                .right {
                    position: absolute;
                    right: 0;
                    font-size: 35px;
                }
            }
        }

        .sticky-layout {
            position: sticky;
            top: 20px;
            margin-left: 20px;
        }

        .article-signature {
            border: 1px solid #ddd;
            position: relative;
            overflow: hidden;
            margin: 30px 5px 10px 5px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            padding: 12px;
            transition: all 0.4s;

            &:hover {
                box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
                transform: translateY(-1px);
            }

            img {
                margin-left: 10px;
                width: 90px;
                height: 90px;
                border-radius: 50%;
                transition: all 0.6s;

                &:hover {
                    transform: rotate(-360deg);
                }
            }

            .copyright {
                padding-left: 20px;

                .copyright-item {
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    line-height: 28px;
                    font-size: 15px;
                    color: var(--theme-color);

                    a {
                        color: #99a9bf;
                        transition: all 0.4s;
                        cursor: pointer;

                        &:hover {
                            color: #19b1f5;
                        }
                    }

                    .copyright-title {
                        font-weight: bold;
                        color: #19b1f5;
                    }
                }
            }
        }

        .article-tags {
            padding-left: 3px;
            margin-top: 20px;
            color: var(--theme-color);
            font-size: 15px;

            a {
                border-radius: 4px;
                font-size: 13px;
                padding: 3px 12px;
                text-decoration: none;
                transition: all 0.4s;
                background: #49b1f5;
                margin-right: 8px;
                color: white;
                display: inline-block;
            }
        }

        .previous-next-article {
            width: 100%;
            margin-top: 50px;
            overflow: hidden;
            background: black;
            display: flex;
            border-radius: 9px;

            .previous-article,
            .next-article {
                width: 50%;

                a {
                    height: 150px;
                    overflow: hidden;
                    display: block;
                    position: relative;

                    img {
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        object-fit: cover;
                        opacity: 0.5;
                        transition: all 0.6s ease-in-out;

                        &:hover {
                            transform: scale(1.1);
                            opacity: 0.8;
                        }
                    }

                    .previous-article-info,
                    .next-article-info {
                        pointer-events: none;
                        position: absolute;
                        top: 50%;
                        width: 100%;
                        padding: 20px 40px;
                        transform: translate(0, -50%);
                        color: white;
                        line-height: 28px;
                        box-sizing: border-box;

                        .label {
                            font-size: 13px;
                        }

                        .title {
                            font-weight: 500;
                            font-size: 14px;
                            display: -webkit-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }
                    }

                    .next-article-info {
                        text-align: right;
                    }
                }
            }
        }

        .copyright {
            padding-left: 20px;

            .copyright-item {
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                line-height: 28px;
                font-size: 15px;
                color: var(--text-color);

                a {
                    color: #99a9bf;
                    transition: all 0.4s;
                    cursor: pointer;

                    &:hover {
                        color: #19b1f5;
                    }
                }

                .copyright-title {
                    font-weight: bold;
                    color: #19b1f5;
                }
            }
        }

        .hot-article-item {
            display: flex;
            justify-content: center;
            align-content: center;
            padding: 8px 0;
        }

        .hot-article-thumbail-link {
            height: 58px;
            width: 58px;
            overflow: hidden;
        }

        .hot-article-thumbnail {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.4s ease;
        }

        .hot-article-thumbnail:hover {
            transform: scale(1.1);
        }

        .hot-article-info {
            flex: 1;
            padding-left: 10px;
            word-break: break-all;
            display: inline-block;
            align-self: center;
            color: var(--theme-color);
        }

        .hot-article-title {
            color: var(--text-color);
            font-size: 13.5px;
            text-decoration: none;
            transition: color 0.4s;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            line-height: 1.5;
            -webkit-line-clamp: 2;
        }

        .hot-article-title:hover {
            color: var(--theme-color);
        }

        .hot-article-meta-data {
            font-size: 12px;
            color: rgb(133, 133, 133);
            box-sizing: border-box;
            line-height: 24px;
            overflow: hidden;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }

        .hot-article-meta-data span {
            margin-left: 4%;
        }
    }

}
</style>
