<template>
  <div class="flex flex-col gap-2 items-start">
    <p class="text-13 leading-normal text-gray-1">{{ title }}</p>
    <slot name="subtitle">
      <p class="text-sm leading-normal font-bold text-dark-black">
        {{ subtitle }}
      </p>
    </slot>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string;
  subtitle?: string;
};
defineProps<Props>();
</script>
