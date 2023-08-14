<template>
    <div>
        <a-modal v-model:visible="store.showChangeInfo" title="修改用户信息" @ok="handleOk">
            <div class="input-box">
                <span class="label">用户名: </span><a-input v-model:value="state.name" placeholder="用户名" />
            </div>
            <div class="input-box">
                <span class="label">头像地址: </span><a-input v-model:value="state.avatar" placeholder="url" />
            </div>
        </a-modal>
    </div>
</template>

<script lang='ts' setup>
import { useStore } from '@/stores';
import { successTips, errTips } from "@/utils/index"
const store = useStore();
import { reactive } from 'vue';
import request from '@/api/request';

const state = reactive({
    name: '',
    avatar: '',
})

// 修改用户信息
const handleOk = () => {
    request({
        method: "POST",
        url: "/user/modifyInfo",
        headers:{
            "content-type": "application/json",
            "satoken": store.userInfo.tokenValue
        },
        data: {
            name: state.name,
            avatar: state.avatar,
            email: store.userInfo.email
        }
    }).then((resp) => {
        if (resp.data == 1) {
            successTips("修改用户信息成功！");
            store.userInfo.name = state.name;
            store.userInfo.avatar = state.avatar;
            state.name = '';
            state.avatar = '';
            store.setIsShowChangeInfo(false);
        }
        else {
            errTips("修改信息失败！")
        }
    })
}

</script>

<style scoped lang='less'>
.input-box {
    display: flex;
    margin-top: 20px;

    .label {
        width: 100px;
    }
}
</style>