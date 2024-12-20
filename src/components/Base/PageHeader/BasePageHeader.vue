<template>
  <div class="bg-white pl-6 rounded-xl relative overflow-hidden">
    <div :class="{ '!pb-6': noTabs }" class="p-6 pl-0 pb-7">
      <div class="flex gap-5">
        <div
          v-if="!noImage"
          :class="[sizesClass, { 'cursor-pointer': canEdit }]"
          class="relative rounded-lg border-2 border-white-100 shrink-0 overflow-hidden group"
        >
          <div
            v-if="canEdit"
            class="w-full h-full bg-dark/30 absolute inset-0 transition-300 opacity-0 group-hover:opacity-100"
          >
            <button
              class="w-8 h-8 bg-white/20 flex-center rounded border border-white/[16%] transition-300 text-white hover:bg-white/40 absolute top-2 right-2"
              @click="$emit('remove-image')"
            >
              <span class="icon-trash text-xl" />
            </button>
          </div>
          <img
            v-if="image"
            :src="image"
            alt="header-image"
            class="w-full h-full object-cover"
          />
          <img
            v-else
            alt="header-image"
            class="w-full h-full object-cover"
            src="/images/default/avatar.svg"
          />
        </div>

        <div class="h-auto flex flex-col justify-between w-full">
          <div class="flex items-start justify-between gap-4 w-full">
            <div class="flex flex-col items-start gap-2">
              <slot name="title">
                <div class="flex-y-center">
                  <h1 class="text-2xl font-semibold text-dark leading-130">
                    {{ title }}
                  </h1>
                  <slot name="titleAside" />
                </div>
              </slot>
              <slot name="subtitle" />
            </div>
            <div class="flex-y-center gap-4">
              <slot name="actions" />
            </div>
          </div>
          <div>
            <slot name="details" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="!noTabs" class="border-t border-gray-3">
      <BaseTab
        :list="tabList"
        :model-value="activeTab"
        class="gap-5"
        variant="full"
        @update:model-value="$emit('change-tab', $event)"
      />
    </div>
    <slot name="content" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { BaseTab } from "@/components/Base";
import { TabItem } from "@/types/components";

interface Props {
  title?: string;
  image?: string;
  imageSize?: "sm" | "lg";
  tabList?: TabItem[];
  activeTab?: string | number;
  noTabs?: boolean;
  noImage?: boolean;
  loading?: boolean;
  canEdit?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  imageSize: "lg",
  image: "",
  tabList: () => [],
  activeTab: "",
});

defineEmits(["change-tab", "remove-image"]);

const sizesClass = computed(() => {
  return props.imageSize === "sm" ? "w-[94px] h-[94px]" : "w-[140px] h-[135px]";
});
</script>
