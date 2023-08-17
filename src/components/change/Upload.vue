<template>
    <div class="manamge">
        <header-cover>
            <div class="article-info">
                <h1 class="article-title">
                    <setting-filled /> 上传
                </h1>
            </div>
        </header-cover>
        <div class="container">
            <a-card class="archive-card">
                <div class="info">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="标题">
                            <el-input v-model="state.data.title" placeholder="长度小于14字符效果最佳" />
                        </el-form-item>
                        <el-form-item label="分类">
                            <el-select v-model="state.data.category" filterable allow-create default-first-option
                                :reserve-keyword="false" placeholder="请输入所属类别">
                                <el-option v-for="item in state.categoryList" :key="item.name"
                                    :label="item.name" :value="item.name" />
                            </el-select>
                            <!-- <el-input v-model="state.data.category" placeholder="category" /> -->
                        </el-form-item>
                        <el-form-item label="合集">
                            <el-select v-model="state.data.collection" filterable allow-create default-first-option
                                :reserve-keyword="false" placeholder="请输入合集">
                                <el-option v-for="item in state.collectionList" :key="item.collection"
                                    :label="item.collection" :value="item.collection" />
                            </el-select>
                            <!-- <el-input v-model="state.data.collection" placeholder="collection"/> -->
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="state.data.description" placeholder="长度小于20字符效果最佳" />
                        </el-form-item>
                        <el-form-item label="序号">
                            <el-input v-model="state.data.sortId" />
                        </el-form-item>
                        <el-form-item label="图片地址">
                            <el-input v-model="state.data.imagePath" placeholder="填入地址后,请点击右侧按钮检查是否可以顺利加载" />
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
                    <el-button type="primary" :disabled="store.userInfo.rankLevel == 1" @click="upload">上传</el-button>
                    <el-button @click="back">返回</el-button>
                </div>
            </a-card>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { SettingFilled, ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { reactive, createVNode, watch, onMounted } from 'vue';
import { MdEditor } from 'md-editor-v3';
import { useStore } from '../../stores';
import { Modal } from 'ant-design-vue';
import 'md-editor-v3/lib/style.css';
import router from "@/router";
import { errTips, successTips } from "@/utils";
import request from "@/api/request";

const store = useStore();

const state = reactive({
    data: {
        title: '',
        content: '',
        description: '',
        imagePath: '',
        collection: '',
        category: '',
        sortId: '',
    },
    imgShow: false,
    collectionList: [] as any,
    categoryList: [] as any,
});

// 返回逻辑
const back = () => {
    router.back();
}

// 查询合集
const getCollectionsName = () => {
    request({
        method: 'GET',
        url: '/blog/getCollectionsName'
    }).then((resp => {
        state.collectionList = resp.data;
    }))
}

// 查询类别
const getCategoryList = () => {
    request({
        method: "GET",
        url: "/blog/getBlogsCategoryList",
        params: {
            "page": -1
        }
    }).then(resp=>{
        state.categoryList = resp.data;
    })
}

// 根据合集查询合集数量
const getCollectionCount = (collection: string)=>{
    request({
        method:"GET",
        url: "/blog/getCollectionCountByName",
        params: {
            "collection": collection
        }
    }).then(resp=>{
        state.data.sortId = resp.data + 1;
    })
}

// 更新按钮逻辑
const upload = () => {
    Modal.confirm({
        title: '提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确定上传吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
            uploadBlog();
            router.back();
        }
    });
}

// 上传博客
const uploadBlog = () => {
    request({
        method: "POST",
        url: "/blog/uploadBlog",
        headers: {
            "content-type": "application/json",
            "satoken": store.userInfo.tokenValue
        },
        data: state.data
    }).then((resp) => {
        if (resp.data == 1) {
            successTips("上传成功！");
        }
        else {
            errTips("上传失败");
        }
    }).catch((err) => {
        errTips("获取信息失败!");
    })
}

watch(
    () => state.data.imagePath,
    (newVal, oldVal) => {
        state.data.imagePath = newVal.replace("![](", "").replace(")", "");
    }
)

watch(
    ()=> state.data.collection,
    (newVal, oldVal)=>{
        getCollectionCount(newVal);
    }
)

onMounted(() => {
    getCollectionsName(); 
    getCategoryList();
});

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

.manamge {
    overflow-x: hidden;
}
</style>