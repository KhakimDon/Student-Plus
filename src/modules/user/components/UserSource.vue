<template>
  <div class="flex-y-center gap-2">
    <div class="rounded-[8px] h-9 w-9 overflow-hidden">
      <BaseImage :src="props.src" class="w-full h-full" :alt="props.source" />
    </div>
    <div class="flex flex-col gap-0.5">
      <p class="text-sm capitalize font-medium leading-130">
        {{ props.source }}
      </p>
      <div class="text-gray-1 flex gap-1 items-center">
        <i v-if="props.type === 'android'" class="icon-android text-4" />
        <i v-if="props.type === 'ios'" class="icon-apple text-4" />
        <i v-if="props.type === 'web'" class="icon-web text-4" />
        <span class="text-xs capitalize leading-130">{{ props.type }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseImage from "@/components/Base/BaseImage.vue";

interface Props {
  src?: string | null;
  type?: string;
  source?: string;
}

const props = defineProps<Props>();
</script>
