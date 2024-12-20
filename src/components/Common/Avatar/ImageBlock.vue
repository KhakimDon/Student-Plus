<template>
  <div class="flex items-center gap-2">
    <div
      :class="{ '!p-0': logo }"
      class="p-2 px-2 rounded-lg flex overflow-hidden items-center justify-center border border-gray-3 h-9 w-9 shrink-0"
    >
      <i v-if="!logo" class="icon-image text-gray-11 text-xl font-bold"> </i>
      <img v-else :src="logo" alt="image" class="h-full !w-full object-cover" />
    </div>
    <span
      class="font-medium text-sm text-dark-black max-w-[300px] line-clamp-1"
    >
      {{ getFileNameFromUrl(logo) }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { getFileNameFromUrl } from "@/utils";

interface Props {
  logo: string;
}

defineProps<Props>();
</script>
