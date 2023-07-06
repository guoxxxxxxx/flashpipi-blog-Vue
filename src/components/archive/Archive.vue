<template>
    <div class="archive">
        <header-cover>
            <div class="article-info">
                <h1 class="article-title">
                    📑归档
                </h1>
            </div>
        </header-cover>
        <div class="container">
            <a-card class="archive-card">
                <el-timeline>
                    <el-timeline-item center timestamp="2018/4/12" placement="top">
                        <el-card class="el-card">
                            <h4>Update Github template</h4>
                            <p>Tom committed 2018/4/12 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/3" placement="top">
                        <el-card class="el-card">
                            <h4>Update Github template</h4>
                            <p>Tom committed 2018/4/3 20:46</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>

                <!-- 分页按钮 -->
                <div class="pagination">
                    <el-pagination background layout="prev, pager, next" :total="1000" />
                </div>
            </a-card>
        </div>
    </div>
</template>

<script lang='ts' setup>
// @ts-ignore
import HeaderCover from '../header/HeaderCover.vue';

</script>

<style scoped lang="less">
.el-card {
    color: var(--theme-font-color);
    background-color: var(--theme-card-color);

    h4 {
        color: var(--theme-font-color);
    }
}
.archive {
    width: 100%;
    height: 100%;
    background-color: var(--theme-background);
    color: var(--theme-color);

    .pagination {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }

    .time {
        font-size: 0.75rem;
        color: var(--theme-color);
        margin-right: 1rem;
    }

    .container {
        padding: 5% 10%;
    }

    .archive-card {
        background: var(--theme-card-color);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
        border: 1px solid var(--theme-card-color);
    }

    a {
        color: var(--theme-color);
        text-decoration: none;
        font-size: 1.2rem;
    }

    a:hover {
        font-size: 1.2rem;
        color: #03a9f4 !important;
        transform: scale(1.1);
    }
}
</style>
