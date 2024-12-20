<template>
  <div class="flex w-max px-2 py-0.5 bg-gray-3 rounded-xl items-center gap-1">
    <i class="icon-eye text-yellow-dark text-lg"></i>
    <span v-if="count" class="font-medium text-sm">{{ count }}</span>
    <span v-else class="font-medium text-sm">{{ count }}</span>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  count: string;
}

defineProps<Props>();
</script>
