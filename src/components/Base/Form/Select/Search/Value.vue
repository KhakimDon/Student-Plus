<template>
  <li class="text-white space-y-0.5 pl-4 pr-2">
    <div
      class="w-full flex items-start flex-col space-y-1/2 border-b border-solid border-white-100"
      :class="[onlyTitle ? 'py-3' : ' py-[10px]']"
    >
      <Highlighter
        class="text-sm text-dark font-semibold leading-136 line-clamp-1"
        highlight-class-name="bg-[#FFCD55] rounded"
        :search-words="[search ?? '']"
        :text-to-highlight="title"
      />
      <span v-if="!onlyTitle" class="text-gray text-xs font-normal leading-130">
        {{ subTitle }}
      </span>
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import Highlighter from "vue-highlight-words";

interface Props {
  title: string;
  subTitle?: string;
  search?: string;
  onlyTitle?: boolean;
}
defineProps<Props>();

defineComponent({
  name: "SearchValue",
});
</script>
