<template>
    <div class="container">
        <header-cover>
            <div class="article-info">
                <h1 class="article-title">
                    <book-filled /> 分类
                </h1>
            </div>
        </header-cover>
        <div class="list">
            <a-list item-layout="vertical" size="large" v-for="item in listData">
                <div class="card">
                    <a-list-item key="item.title">
                        <template #actions>
                            <span class="content">This is Container</span>
                        </template>
                        <template #extra>
                            <img width="272" alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
                        </template>
                        <a-list-item-meta>
                            <template #title>
                                <span class="content"><a>{{ item.title }}</a></span>
                                <div class="description-label">
                                    {{  item.description }}
                                </div>
                            </template>
                        </a-list-item-meta>
                        <span class="content">{{ item.content }}</span>
                    </a-list-item>
                </div>

            </a-list>
        </div>
    </div>
</template>

<script lang='ts' setup>
const listData: Record<string, string>[] = [];

for (let i = 0; i < 5; i++) {
    listData.push({
        title: `ant design vue part ${i}`,
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const pagination = {
    onChange: (page: number) => {
        console.log(page);
    },
    pageSize: 3,
};
</script>

<style scoped lang='less'>
.description-label {
    color: var(--theme-font-color);
    font-weight: 500;
    font-style: italic;
    font-size: 0.9em;
}
.content {
    color: var(--theme-font-color);
}

.container {
    background-color: var(--theme-background);
}

.list {
    padding: 5% 10%;
    // color: var(--theme-font-color);
}

.card {
    background-color: var(--theme-card-color);
    margin-top: 20px;
}

.card:hover {
    background-color: rgb(137, 137, 137);
}

.card:active {
    background-color: rgb(196, 196, 196);
}
</style>