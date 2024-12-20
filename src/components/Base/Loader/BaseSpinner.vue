f
<template>
  <div class="flex items-center justify-center h-16">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  loading?: boolean;
}
defineProps<Props>();
</script>

<style scoped>
.spinner {
  width: 8px;
  height: 8px;
  animation: spinner-z355kx 1.2s infinite linear;
  border-radius: 8px;
  box-shadow: 20px 0px 0 0 #fae74d, 12.4px 15.6px 0 0 #fae74d,
    -4.4px 19.4px 0 0 #fae74d, -18px 8.6px 0 0 #fae74d, -18px -8.6px 0 0 #fae74d,
    -4.4px -19.4px 0 0 #fae74d, 12.4px -15.6px 0 0 #fae74d;
}

@keyframes spinner-z355kx {
  to {
    transform: rotate(360deg);
  }
}
</style>
