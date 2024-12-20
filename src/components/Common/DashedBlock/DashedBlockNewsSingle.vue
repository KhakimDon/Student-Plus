<template>
  <div
    class="flex !flex-col w-max rounded-md p-2 border-dashed border-[#D3D5DC] border"
  >
    <div
      class="text-dark-black flex gap-1 items-center font-bold leading-130 text-sm"
    >
      <span><slot name="top"></slot></span>
      <div v-if="hasTitle" class="flex items-center gap-1">
        <div class="h-1 w-1 bg-yellow-dark rounded-full"></div>
        <span class="font-normal">
          <slot name="top-title"> </slot>
        </span>
      </div>
    </div>
    <span class="text-gray-11 font-medium leading-130 text-xs">
      <slot name="bottom"></slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  hasTitle?: boolean;
}

defineProps<Props>();
</script>
