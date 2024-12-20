<template>
  <div
    class="absolute md:!top-3 !w-full transition-200 bg-white shadow-search border border-white-100 rounded-xl w-auto h-auto max-h-[403px] overflow-y-auto z-50"
    :class="{ 'shadow-search border-white-100': searchContent?.length }"
  >
    <template v-if="searchContent?.length || loading">
      <ul class="list">
        <slot name="value" />
      </ul>
      <button
        v-if="seeAll"
        class="pl-4 py-[6px] group flex items-center"
        @click="seeAllAction"
      >
        <span
          class="text-xs text-gray font-normal leading-130 transition-all duration-200 group-hover:text-blue"
        >
          {{ $t("review_business_see_all") }}
        </span>
        <span
          class="icon-arrow-sm text-sm text-gray -rotate-90 transition-all duration-200 group-hover:translate-x-2 group-hover:text-blue"
        />
      </button>
    </template>
    <template v-else>
      <slot name="empty" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";

import { TCompany } from "@/types/common";

interface Props {
  seeAll?: boolean;
  loading?: boolean;
  searchContent?: TCompany;
}
defineProps<Props>();

const emit = defineEmits<{
  (e: "seeAll"): void;
}>();

const seeAllAction = () => {
  emit("seeAll");
};

defineComponent({
  name: "SearchWrapperContent",
});
</script>

<style scoped></style>
