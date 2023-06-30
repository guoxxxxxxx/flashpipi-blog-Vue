<template>
    <div class="card">
        <div class="item" v-for="item in 5" :key="item">
            {{ item }}
        </div>
    </div>
</template>

<script lang='ts' setup>

</script>

<style scoped lang='less'>
.card {
    // background-color: aqua;
    width: 100%;
    height: 200px;
    border: 1px solid gray;
    border-radius: 18px;
    display: flex;
    justify-content: space-around;
    padding: 20px;
    background-color: var(--theme-card-color);
}

.item {
    background-color: rgb(229, 233, 235);
    border: 1px solid gray;
    height: 52px;
    width: 40px;
    border-radius: 8px;
}
</style>