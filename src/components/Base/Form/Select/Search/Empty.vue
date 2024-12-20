<template>
  <div class="flex items-center justify-center flex-col pt-6 pb-9 w-full">
    <img :src="icon" alt="empty" :class="iconsSize" />
    <div class="space-y-1 mt-[10px] mb-3 text-center">
      <p
        v-if="title"
        class="text-sm text-blue-800 transition-200 font-semibold leading-130"
        :class="titleClass"
      >
        {{ title }}
      </p>
      <p
        v-if="subTitle"
        class="text-sm text-gray-700 transition-200 font-medium leading-130"
        :class="subTitleClass"
      >
        {{ subTitle }}
      </p>
    </div>
    <slot name="action" />
  </div>
</template>
<script setup lang="ts">
import { defineComponent } from "vue";

import { TClassName } from "@/types/common";

interface Props {
  title?: string;
  subTitle?: string;
  icon?: string;
  iconsSize?: TClassName;
  titleClass?: TClassName;
  subTitleClass?: TClassName;
}
defineProps<Props>();

defineComponent({
  name: "SearchEmpty",
});
</script>
