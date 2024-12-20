<template>
  <div
    :class="[sizeClasses, avatarClass]"
    class="rounded-full relative overflow-hidden after:absolute after:inset-0 after:rounded-full after:border after:border-solid after:border-white/16 shrink-0"
  >
    <BaseImage
      :src="image"
      default-src="/images/default/avatar.svg"
      class="w-full h-full"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import BaseImage from "@/components/Base/BaseImage.vue";
import { TClassName } from "@/types/common";

interface Props {
  image: string;
  size?: "xs" | "sm" | "md" | "lg";
  avatarClass?: TClassName;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "sm",
  avatarClass: undefined,
});

const sizeClasses = computed(() => {
  const size = props.size;
  return {
    "size-8": size === "sm",
    "size-9": size === "md",
    "size-24": size === "lg",
  };
});
</script>
