<template>
    <div class="main">
        <el-table
            :data="filterTableData.slice(state.pageSize * (state.currentPage - 1), state.pageSize * state.currentPage)"
            style="width: 100%; color: var(--theme-font-color);" class="table"
            :row-style="{ 'background-color': 'var(--theme-card-color)' }"
            :header-cell-style="{ 'background': 'var(--theme-card-color)' }">
            <el-table-column label="标题" prop="title" width="180" />
            <el-table-column label="更新时间" prop="updateTime" width="160" />
            <el-table-column label="阅读数" prop="viewsCount" width="160" />
            <el-table-column label="分类" prop="category" width="160">
                <template #default="scope">
                    <el-tag>
                        {{ scope.row.category }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="描述" prop="description" />
            <el-table-column align="right" width="200">
                <template #header>
                    <el-input v-model="state.search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="filterTableData.length" :page-size="state.pageSize"
                v-model:current-page="state.currentPage" />
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { computed, reactive, onMounted, createVNode } from 'vue';
import {ExclamationCircleOutlined} from '@ant-design/icons-vue';
import { useStore } from '@/stores';
import axios from 'axios';
import { baseUrl } from "@/main"
import { errTips, successTips } from '@/utils';
import { Modal } from 'ant-design-vue';
import router from '@/router';
axios.defaults.baseURL = baseUrl;
const store = useStore();
const state = reactive({
    currentPage: 1,
    search: '',
    pageSize: 12
})

interface Blog {
    id: number,
    title: string,
    viewsCount: number,
    category: string,
    updateTime: string,
    description: string,
}
// 搜索框过滤
const filterTableData = computed(() =>
    tableData.data.filter(
        (data) =>
            !state.search ||
            data.title.toLowerCase().includes(state.search.toLowerCase()) ||
            data.description.toLocaleLowerCase().includes(state.search.toLocaleLowerCase())
    )
)
// 点击编辑按钮
const handleEdit = (index: number, row: Blog) => {
    router.push({name: 'change', query: {id: row.id}});
}
// 点击删除按钮
const handleDelete = (index: number, row: Blog) => {
    Modal.confirm({
        title: '警告',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确定删除吗？(此操作不可逆)',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
            axios({
                method: "GET",
                url: "/blog/deleteById",
                params: {
                    id: row.id
                }
            }).then((resp) => {
                if (resp.data == 1) {
                    successTips("删除成功");
                    getData();
                }
                else {
                    errTips("删除失败");
                }
            })
        }
    });

}

const tableData = reactive(
    {
        data: [
            {
                id: 0,
                title: '',
                viewsCount: 0,
                category: '',
                updateTime: '',
                description: '',
            }
        ]
    }
)

// 从后端获取数据
const getData = () => {
    axios({
        method: "GET",
        url: "/blog/getShortBlogsList",
        params: {
            currentPage: -1,
            pageSize: state.pageSize
        }
    }).then((resp) => {
        tableData.data = resp.data;
        console.log(tableData);
    })
}

onMounted(() => {
    getData();
})
</script>

<style lang="less" scoped>
.pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.main {
    background-color: var(--theme-card-color);
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
</style>
  