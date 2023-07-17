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
                            <el-input v-model="state.data.title" placeholder="长度小于14字符效果最佳"/>
                        </el-form-item>
                        <el-form-item label="分类">
                            <el-input v-model="state.data.category" placeholder="category"/>
                        </el-form-item>
                        <el-form-item label="合集">
                            <el-input v-model="state.data.collection" placeholder="collection"/>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="state.data.description" placeholder="长度小于20字符效果最佳"/>
                        </el-form-item>
                        <el-form-item label="图片地址">
                            <el-input v-model="state.data.imagePath" 
                            placeholder="填入地址后,请点击右侧按钮检查是否可以顺利加载"/>
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
                    <el-button type="primary" @click="upload">上传</el-button>
                    <el-button @click="back">返回</el-button>
                </div>
            </a-card>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { SettingFilled, ExclamationCircleOutlined} from "@ant-design/icons-vue";
import { reactive, createVNode, watch } from 'vue';
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
    },
    imgShow: false,
});

// 返回逻辑
const back = () => {
    router.back();
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
        method:"POST",
        url: "/blog/uploadBlog",
        data: state.data
    }).then((resp)=>{
        if(resp.data == 1){
            successTips("上传成功！");
        }
        else{
            errTips("上传失败");
        }
    }).catch((err)=>{
        errTips("获取信息失败!");
    })
}

watch(
    ()=>state.data.imagePath,
    (newVal, oldVal)=>{
        state.data.imagePath = newVal.replace("![](", "").replace(")", "");
    }
)

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