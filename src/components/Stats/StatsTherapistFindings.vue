<template>
  <div class="relative">
    <div v-if="!hideHeader" class="mb-7 flex items-start justify-between">
      <div class="flex gap-2">
        <button
          class="inline-flex items-center justify-center p-2 rounded-lg active:bg-slate-100"
          @click="$emit('back')"
        >
          <i class="icon-chevron text-2xl"></i>
        </button>
        <div class="flex flex-col">
          <span class="text-xl text-gray-200 font-medium">
            {{ $t("therapist_findings") }}
          </span>
          <span class="text-sm text-gray-300">
            {{
              $t("with_count_of_principles", { count: data?.results?.length })
            }}
          </span>
        </div>
      </div>

      <div class="flex gap-10">
        <div class="flex flex-col font-medium">
          <span class="text-gray-300 text-sm">{{ $t("test_take_time") }}</span>
          <span class="inline-flex gap-2">
            <span class="text-gray-100 text-sm">
              {{ dayjs(new Date(data?.passed_date)).format("DD.MM.YYYY") }}
            </span>
            <span class="text-gray-300 text-sm">
              {{ dayjs(new Date(data?.passed_date)).format("HH:mm:ss") }}
            </span>
          </span>
        </div>

        <div class="flex flex-col font-medium">
          <span class="text-gray-300 text-sm">{{ $t("time_spent") }}</span>
          <span class="text-gray-100 text-sm">{{
            getTimeText(data?.test_duration)
          }}</span>
        </div>
        <a :href="exportLink" download target="_blank">
          <BaseButton
            variant="gray"
            button-styles="!bg-gray-150"
            :text="$t('export')"
            icon="icon-pdf text-xl text-blue-primary"
            icon-position="left"
          />
        </a>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-y-5 gap-x-6">
      <button
        v-for="(stat, key) in data?.results"
        :key="key"
        class="w-full group flex flex-col gap-2"
        @click="handleStatView(stat)"
      >
        <span class="w-full flex items-center justify-between">
          <span class="group-hover:font-medium text-sm text-[#3F4254]">{{
            stat.title
          }}</span>
          <span class="inline-flex items-center gap-1">
            <span class="group-hover:text-gray-100 text-[#757886] font-medium"
              >{{ stat.score }}%</span
            >
            <i
              class="group-hover:text-gray-100 text-[#757886] icon-chevron text-xl rotate-180"
            ></i>
          </span>
        </span>

        <span
          class="w-full block overflow-hidden bg-[#F6F6F9] h-1.5 rounded-lg"
        >
          <span
            class="w-full block h-full rounded-tr-lg rounded-br-lg"
            :style="{
              backgroundColor: detectColor(stat.score),
              width: stat.score + '%',
            }"
          ></span>
        </span>
      </button>
    </div>

    <div
      v-if="pending"
      class="absolute inset-0 z-10 backdrop-blur-sm bg-white/[0.5] flex-center"
    >
      <BaseSpinner />
    </div>
    <BaseModal
      v-model="isStatModalVisible"
      :title="$t('full_information')"
      body-class="w-full max-w-2xl"
    >
      <h2 class="mb-3 text-gray-100 text-xl font-medium">
        {{ modalContent?.title }}
      </h2>

      <div class="p-3 rounded-lg bg-[#F5F5F9]">
        <div class="mb-2 flex justify-between">
          <span class="text-gray-100">{{ modalContent?.title }}</span>
          <span class="text-gray-100 font-medium"
            >{{ modalContent?.score }}%</span
          >
        </div>

        <span
          class="w-full block overflow-hidden bg-[#E5E5EE] h-1.5 rounded-lg"
        >
          <span
            class="w-full block h-full rounded-tr-lg rounded-br-lg"
            :style="{
              backgroundColor: detectColor(modalContent!.score),
              width: modalContent?.score + '%',
            }"
          ></span>
        </span>
      </div>

      <div class="my-6 border-b border-[#E4E6EF]"></div>

      <div class="flex flex-col gap-y-1">
        <span class="text-gray-100 font-medium">
          {{ $t(detectStatus(modalContent?.score)) }}
        </span>
        <p class="text-gray-300">{{ modalContent?.description }}</p>
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref } from "vue";

import BaseButton from "@/components/Base/Button/BaseButton.vue";
import BaseSpinner from "@/components/Base/Loader/BaseSpinner.vue";
import BaseModal from "@/components/Base/Modal/BaseModal.vue";
import { getTimeText } from "@/utils";

interface Stat {
  title: string;
  description: string;
  score: number;
}

defineEmits<{
  (e: "back"): void;
}>();

type Props = {
  hideHeader?: boolean;
  data?: {
    id: number;
    passed_date: string;
    time_spent: string;
    results: Stat[];
  };
  pending?: boolean;
  exportLink?: string;
};
const props = defineProps<Props>();

const modalContent = ref<Stat>();
const isStatModalVisible = ref(false);

function handleStatView(stat: any) {
  isStatModalVisible.value = true;
  modalContent.value = stat;
}

const detectStatus = (score: number) => {
  if (score < 25) {
    return "low";
  }
  if (score < 75) {
    return "medium";
  }
  return "high";
};

const detectColor = (score: number) => {
  if (score < 25) {
    return "#EC4848";
  }
  if (score < 75) {
    return "#F49932";
  }
  return "#2ED47A";
};
</script>
