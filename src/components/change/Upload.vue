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
                                <el-option v-for="item in state.categoryList" :key="item.name" :label="item.name"
                                    :value="item.name" />
                            </el-select>
                            <!-- <el-input v-model="state.data.category" placeholder="category" /> -->
                        </el-form-item>
                        <el-form-item label="合集">
                            <el-select v-model="state.data.collection" filterable allow-create default-first-option
                                :reserve-keyword="false" placeholder="请输入合集">
                                <el-option v-for="item in state.collectionList" :key="item" :label="item"
                                    :value="item" />
                            </el-select>
                            <!-- <el-input v-model="state.data.collection" placeholder="collection"/> -->
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="state.data.description" placeholder="长度小于20字符效果最佳" />
                        </el-form-item>
                        <!-- <el-form-item label="序号">
                            <el-input v-model="state.data.sortId" />
                        </el-form-item> -->
                        <el-form-item label="日期">
                            <div class="block">
                                <el-date-picker v-model="state.data.publishTime" type="date" placeholder="请选择发布日期"
                                    size="default" />
                            </div>
                        </el-form-item>
                        <el-form-item label="图片地址">
                            <el-input v-model="state.data.imagePath" placeholder="填入地址后,请点击右侧按钮检查是否可以顺利加载" />
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="state.imgShow = true">点击查看图片</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="triggerFileUpload">解析文件</el-button>
                            <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;"
                                accept=".md,.txt">
                        </el-form-item>
                    </el-form>

                    <a-modal v-model:visible="state.imgShow" title="当前图片"
                        style="display: flex; justify-content: center;">
                        <template #footer>
                            <a-button type="primary" @click="handleOk">确认</a-button>
                            <a-button type="default" @click="randomChange">换一张</a-button>
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
    <div>
        <el-dialog v-model="dialogVisible" title="警告" width="500">
            <span>本篇文章在数据库内已经存在，点击确认进行更新操作！</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="update">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang='ts' setup>
import { SettingFilled, ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { reactive, createVNode, watch, onMounted, ref } from 'vue';
import { MdEditor, type ChangeEvent } from 'md-editor-v3';
import { useStore } from '../../stores';
import { Modal } from 'ant-design-vue';
import 'md-editor-v3/lib/style.css';
import router from "@/router";
import { errTips, successTips, warningTips } from "@/utils";
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
        publishTime: Date
    },
    imgShow: false,
    collectionList: [] as any,
    categoryList: [] as any,
});
const fileInput = ref();
// 解析文件
const triggerFileUpload = () => {
    fileInput.value.click();
}

const dialogVisible = ref(false)

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        const formData = new FormData();
        formData.append("textFile", file);
        formData.append("lastUpdateTime", file.lastModified.toString())
        request({
            method: 'POST',
            data: formData,
            url: '/blog/parseFile',
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((resp => {
            state.data = resp.data.data;
            request({
                method: "GET",
                params: { "title": state.data.title },
                url: '/blog/checkBlogExistByTitle'
            }).then((resp) => {
                if (resp.data.data == true) {
                    warningTips("本篇文章在数据库内已经存在！", 10)
                }
            })
        }))
    }
    else {
        errTips("文件解析失败")
    }
}

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
        state.collectionList = resp.data.data;
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
    }).then(resp => {
        state.categoryList = resp.data;
    })
}

// 根据合集查询合集数量
// const getCollectionCount = (collection: string)=>{
//     request({
//         method:"GET",
//         url: "/blog/getCollectionCountByName",
//         params: {
//             "collection": collection
//         }
//     }).then(resp=>{
//         state.data.sortId = resp.data + 1;
//     })
// }

// 上传按钮逻辑
const upload = () => {
    request({
        method: "GET",
        params: { "title": state.data.title },
        url: '/blog/checkBlogExistByTitle'
    }).then((resp) => {
        if (resp.data.data == true) {
            dialogVisible.value = true;
        }
        else {
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
    })
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


// 随机换一张图
const randomChange = () => {
    request({
        method: "GET",
        url: "/blog/getRandomImgUrl"
    }).then((resp) => {
        state.data.imagePath = resp.data.data;
    })
}

const update = () => {
    request({
        method: "POST",
        url: "/blog/updateBlogByTitle",
        headers: {
            "content-type": "application/json",
            "satoken": store.userInfo.tokenValue
        },
        data: state.data
    }).then((resp) => {
        if (resp.data.data == true) {
            successTips("更新成功");
            router.back();
        }
        else {
            errTips("更新失败")
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
    () => state.data.collection,
    (newVal, oldVal) => {
        // getCollectionCount(newVal);
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