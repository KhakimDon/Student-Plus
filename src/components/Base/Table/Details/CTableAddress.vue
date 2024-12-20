<template>
  <div class="flex flex-col gap-0.5">
    <BaseSkeleton
      width="160px"
      height="16px"
      border-radius="8px"
      v-bind="{ loading }"
    >
      <h4 class="font-medium text-dark text-xs line-clamp-1">
        {{ title }}
      </h4>
    </BaseSkeleton>
    <BaseSkeleton
      width="110px"
      height="16px"
      border-radius="8px"
      v-bind="{ loading }"
    >
      <p class="text-xs font-normal leading-130 text-gray">
        {{ subtitle }}
      </p>
    </BaseSkeleton>
  </div>
</template>

<script setup lang="ts">
import BaseSkeleton from "@/components/Base/Shimmer/BaseShimmer.vue";

interface Props {
  title: string;
  subtitle: string;
  loading?: boolean;
}
defineProps<Props>();
</script>
