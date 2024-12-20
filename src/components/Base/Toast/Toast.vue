<template>
  <div class="relative flex-center-between min-w-[355px]">
    <div class="flex-y-center pl-3 py-4 mr-5">
      <img
        :src="images[type]"
        alt="toast icon svg"
        class="size-5 object-center object-cover aspect-square"
      />
      <div class="ml-2">
        <h2 class="text-white font-normal text-xs leading-130">
          {{ title }}
        </h2>
      </div>
    </div>

    <span
      class="icon-x-mark mr-3 my-4 text-lg text-gray hover:text-gray-100 cursor-pointer transition-300"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  type: "success" | "error" | "warning" | "info";
  title: string;
}

defineProps<Props>();
const images = computed(() => {
  return {
    success: "/images/toast/success.svg",
    error: "/images/toast/error.svg",
    warning: "/images/toast/warning.svg",
  };
});
</script>
<style>
.toast {
  box-shadow: 0px 8px 20px rgba(18, 28, 37, 0.16);
}
</style>
