<template>
  <div class="flex items-center text-black">
    <div
      v-for="(route, index) in breadcrumbRoutes"
      :key="index"
      class="flex items-center text-13 text-dark-black font-medium hover:text-yellow-dark last:text-gray-1 last:pointer-events-none"
    >
      <div v-if="route.loading" class="shimmer w-40 h-4 rounded shrink-0"></div>
      <p v-else-if="index === breadcrumbRoutes.length - 1" class="w-max">
        {{ route.name }}
      </p>
      <RouterLink
        v-else
        :to="route.route || ''"
        class="transition duration-500 w-max"
      >
        {{ route.name }}
      </RouterLink>
      <span
        v-if="index !== breadcrumbRoutes.length - 1"
        class="mx-2 w-1 h-1 bg-yellow rounded-full"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IRoute } from "./BaseBreadcrumb.types";

export interface Props {
  breadcrumbRoutes: IRoute[];
}

defineProps<Props>();
</script>
