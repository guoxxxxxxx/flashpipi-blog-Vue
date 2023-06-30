<template>
<div class="unuse">

</div>
<div class="footer-wrap">
    <div class="web-info">
        @ {{ startYear === currentYear ? currentYear : startYear + ' - ' + currentYear }}
    </div>
</div>
</template>

<script lang='ts' setup>
import { useStore } from '@/stores'

const store = useStore();
const startYear:Number = 2023;
const currentYear:Number = new Date().getFullYear();
</script>

<style scoped lang="less">
.unuse {
  background-color: var(--theme-background);
  height: 40px;
}
.footer-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  line-height: 2;
  padding: 24px 24px;
  color: #eee;
  font-size: 0.9rem;
  text-align: center;
  background: linear-gradient(-45deg,var(--theme-footer-left),var(--theme-footer-right));

  .web-info {
    display: flex;
    flex-direction: column;
    margin: auto;
    p:hover {
      color: #49b1f5;
    }
  }

  img {
    width: 100px;
    height: 100px;
  }
}

.footer-wrap a {
  color: #eee !important;
}

@keyframes Gradient {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>