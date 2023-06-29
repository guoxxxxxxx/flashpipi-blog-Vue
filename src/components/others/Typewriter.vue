<!-- 
    打字插件文档： https://github.com/pengqiangsheng/easy-typer-js
 -->
<template>
  {{ typerOption.output }} <span class="typed-cursor">|</span>
</template>

<script lang='ts' setup>
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import EasyTyper from 'easy-typer-js'

const typerOption = reactive({
  output: '',
  isEnd: false,
  speed: 300,
  singleBack: false,
  sleep: 1000,
  type: "rollback",
  backSpeed: 30,
  sentencePause: false,
});

// 请求接口获取新的诗句
const init = () => {
  axios({
    method: 'get',
    url: "https://v1.hitokoto.cn?c=i",
  }).then((resp)=>{
    // 执行回调，每次执行完之后再次调用该函数，实现诗句的循环往复
    new EasyTyper(typerOption, resp.data.hitokoto, ()=>{init()}, ()=>{});
  }).catch((err)=>{
    console.log(err);    
  })
};

// 钩子函数
onMounted(() => {
  init();
});
</script>

<style lang="stylus" scoped>
.typed-cursor
  opacity: 1
  animation: blink 0.7s infinite
@keyframes blink
  0%
    opacity: 1
  50%
    opacity: 0
  100%
    opacity: 1
</style>