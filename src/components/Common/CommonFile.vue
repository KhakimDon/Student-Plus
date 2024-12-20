<template>
  <div class="flex items-center gap-3">
    <div class="flex items-center gap-2">
      <img
        class="w-[58px] h-10 rounded-lg border border-gray-3 object-cover"
        :src="file.cover_image"
        :alt="getFileNameFromUrl(file.file)"
      />
      <div class="flex flex-col gap-0.5">
        <p class="text-sm font-medium leading-130 text-dark-black">
          {{ getFileNameFromUrl(file.file) }}
        </p>
        <p class="text-xs font-normal leading-130 text-gray-11">
          {{ convertBytes(file.size) }}
        </p>
      </div>
    </div>
    <button
      class="w-9 h-9 rounded-lg bg-gray-3 hover:bg-gray-2 icon-document-download text-gray-11 text-xl leading-5 transition-300"
      @click="downloadFile(file.file, getFileNameFromUrl(file.file))"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { convertBytes, downloadFile, getFileNameFromUrl } from "@/utils";

interface Props {
  file: {
    cover_image: string;
    file: string;
    size: string | number;
  };
}
defineProps<Props>();
</script>
