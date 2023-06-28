<template>
  <div :class="store.themeName">
    
  </div>
</template>

<script lang='ts' setup>
import { useStore } from './stores/index'

const store = useStore();
</script>

<style scoped>
.theme-switch {
  position: fixed;
  right: 24px;
  bottom: 124px;
  z-index: 999;
}
</style>