<template>
    <div class="manamge">
        <header-cover>
            <div class="article-info">
                <h1 class="article-title">
                    <setting-filled /> 管理
                </h1>
            </div>
        </header-cover>
        <div class="container">
            <a-card class="archive-card">
                <div class="button">
                    <el-button class="btn" @click="changeInfo">更改网站信息</el-button>
                    <el-button class="btn" @click="upload">上传</el-button>
                    <el-button @click="exit" type="danger">退出登录</el-button>
                </div>
                <Table></Table>
            </a-card>
        </div>

        <!-- 修改网站信息对话框 -->
        <el-dialog v-model="data.visible" title="修改网站信息" width="30%" draggable>
            <div class="inpt">
                <el-row :gutter="20">
                    <el-col :span="4">
                        网站域名:
                    </el-col>
                    <el-col :span="20">
                        <el-input v-model="data.webInfo.url"></el-input>
                    </el-col>
                    <el-col :span="24">
                        <div style="height: 20px;"></div>
                    </el-col>
                    <el-col :span="4">
                        公告:
                    </el-col>
                    <el-col :span="20">
                        <el-input type="textarea" v-model="data.webInfo.notice" :rows='5'></el-input>
                    </el-col>
                </el-row>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="data.visible = false">取消</el-button>
                    <el-button type="primary" @click="submit">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script lang='ts' setup>
import { SettingFilled, ExclamationCircleOutlined } from "@ant-design/icons-vue";
import Table from "./Table.vue";
import router from "@/router";
import { useStore } from "@/stores";
import { Modal } from "ant-design-vue";
import { createVNode, reactive } from "vue";
import request from "@/api/request";
import { errTips, successTips } from "@/utils";
const store = useStore();
const data = reactive({
    webInfo: {
        notice: '',
        url: '',
    },
    visible: false,
});

// 修改网站基础信息
const changeInfo = () => {
    // 获取小站信息
    request({
        method: "GET",
        url: "/info/getInfo"
    }).then((resp) => {
        data.webInfo.notice = resp.data.notice;
        data.webInfo.url = resp.data.website;
    }).catch((err) => {
        errTips("获取信息失败")
    })
    data.visible = true;
}
// 上传操作
const upload = () => {
    router.push({ name: "upload" });
}
// 退出操作
const exit = () => {
    Modal.confirm({
        title: '警告',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确定退出吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
            useStore().exit();
            request({
                method: "GET",
                url: "/user/exit",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "satoken": store.userInfo.tokenValue
                },
            })
            successTips("退出成功!")
        }
    });
}

// 确定
const submit = () => {
    data.visible = false;
    Modal.confirm({
        title: '警告',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确定更新吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
            request({
                method: "GET",
                url: "/info/updateInfo",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "satoken": store.userInfo.tokenValue
                },
                params: {
                    url: data.webInfo.url,
                    notice: data.webInfo.notice
                }
            }).then((resp) => {
                if(resp.data.status != 443)
                    successTips("修改成功!");
            })
        }
    });
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
    justify-content: right;
}

.btn {
    background-color: var(--theme-category-btn-color);
    color: white;
}

.btn:hover {
    background-color: var(--theme-category-btn-hover-color);
}
</style>