<template>
    <div class="manamge">
        <header-cover>
            <div class="article-info">
                <h1 class="article-title">
                    <setting-filled /> 修改
                </h1>
            </div>
        </header-cover>
        <div class="container">
            <a-card class="archive-card">
                <div class="info">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="标题">
                            <el-input v-model="state.data.title" />
                        </el-form-item>
                        <el-form-item label="分类">
                            <el-input v-model="state.data.category" />
                        </el-form-item>
                        <el-form-item label="合集">
                            <el-input v-model="state.data.collection" />
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="state.data.description" />
                        </el-form-item>
                        <el-form-item label="序号">
                            <el-input v-model="state.data.sortId" />
                        </el-form-item>
                        <el-form-item label="图片地址">
                            <el-input v-model="state.data.imagePath"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="state.imgShow = true">点击查看图片</el-button>
                        </el-form-item>
                    </el-form>

                    <a-modal v-model:visible="state.imgShow" title="当前图片" style="display: flex; justify-content: center;">
                        <template #footer>
                            <a-button type="primary" @click="handleOk">确认</a-button>
                        </template>
                        <img :src="state.data.imagePath" width="500">
                    </a-modal>
                </div>
                <hr>
                <div class="content">
                    <!-- @vue-ignore -->
                    <MdEditor v-model="state.data.content" :theme="store.themeName" style="height: 600px;" />
                </div>
                <div class="button">
                    <el-button type="danger" @click="handleDelete">删除</el-button>
                    <el-button type="primary" @click="update">修改</el-button>
                    <el-button @click="back">返回</el-button>
                </div>
            </a-card>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { SettingFilled, ExclamationCircleOutlined} from "@ant-design/icons-vue";
import { useRoute } from 'vue-router';
import { reactive, onMounted, createVNode } from 'vue';
import { MdEditor } from 'md-editor-v3';
import { useStore } from '../../stores';
import { Modal } from 'ant-design-vue';
import 'md-editor-v3/lib/style.css';
import router from "@/router";
import { errTips, successTips } from "@/utils";
import request from "@/api/request";

const store = useStore();
const route = useRoute();

const state = reactive({
    data: {
        id: 0,
        title: '',
        content: '',
        description: '',
        imagePath: '',
        collection: '',
        category: '',
        sortId: '',
    },
    imgShow: false,
});

// 返回逻辑
const back = () => {
    router.back();
}

// 更新按钮逻辑
const update = () => {
    Modal.confirm({
        title: '警告',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确定更新吗？(此操作不可逆)',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
            updateBlog();
        }
    });
}

// 更新博客
const updateBlog = () => {
    request({
        method: "POST",
        url: "/blog/updateBlog",
        data: state.data
    }).then((resp) => {
        if (resp.data == 1) {
            successTips("更新成功");
            router.back();
        }
        else {
            errTips("更新失败")
        }
    }).catch((err)=>{
        errTips("获取信息失败!");
    })
}

// 根据id获取博客的全部信息
function getBlogById() {
    request({
        method: "GET",
        url: "/blog/getBlogById",
        params: {
            id: route.query.id
        }
    }).then((resp) => {
        state.data = resp.data;
    }).catch((err)=>{
        errTips("获取信息失败!")
    })
}

// 点击删除按钮
const handleDelete = () => {
    Modal.confirm({
        title: '警告',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确定删除吗？(此操作不可逆)',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
            request({
                method: "GET",
                url: "/blog/deleteById",
                params: {
                    id: route.query.id
                }
            }).then((resp) => {
                if (resp.data == 1) {
                    successTips("删除成功");
                    router.go(-2)
                }
                else {
                    errTips("删除失败");
                }
            })
        }
    });
}

// 保存修改后的信息

onMounted(() => {
    getBlogById();
})

// 
const handleOk = () => {
    state.imgShow = false;
}
</script>

<style scoped lang='less'>
.container {
    min-height: 800px;
    padding: 5% 10%;
    background-color: var(--theme-background);
}

.archive-card {
    background: var(--theme-card-color);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
    border: 1px solid var(--theme-card-color);
}

.manamge {
    overflow-x: hidden;
}
.button {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.content {
    margin-top: 20px;
}

.info {
    margin-bottom: 20px;
}
</style>