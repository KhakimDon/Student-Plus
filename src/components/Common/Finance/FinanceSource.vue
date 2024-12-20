<template>
  <div class="flex-y-center gap-2 max-w-[200px]">
    <div class="rounded-lg h-11 w-11 overflow-hidden shrink-0">
      <BaseImage :src="props.src" class="w-full h-full" :alt="title" />
    </div>
    <div class="flex flex-col justify-start gap-0.5">
      <p class="text-sm uppercase font-medium leading-130">
        {{ abrTitle }}: {{ stk }}
      </p>
      <div class="text-gray-1 flex gap-1 items-center">
        <span class="text-xs capitalize leading-130 line-clamp-1">{{
          title
        }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseImage from "@/components/Base/BaseImage.vue";

interface Props {
  src?: string | null;
  title?: string;
  stk?: string;
  source?: string;
  abrTitle: string;
}

const props = defineProps<Props>();
</script>
