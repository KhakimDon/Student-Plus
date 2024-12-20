<template>
  <label
    :class="[
      company?.id === selectedCompany
        ? '!border-blue-150 !bg-blue-170'
        : '!bg-transparent !border-white-100',
      { 'hover:!bg-transparent cursor-not-allowed': loading },
    ]"
    class="flex items-center justify-between rounded-lg border p-3 group cursor-pointer transition-all duration-200 hover:!bg-gray-300"
  >
    <div class="flex items-center space-x-3">
      <Skeleton
        :loading="loading"
        width="40px"
        height="40px"
        border-radius="4px"
      >
        <div
          class="w-10 h-10 rounded border border-white-100 overflow-hidden flex-shrink-0"
        >
          <img
            v-cdn
            :alt="company?.name"
            :src="getCompanyImage(company?.brand_logo)"
            class="w-full h-full object-cover"
          />
        </div>
      </Skeleton>
      <div class="space-y-[3px]">
        <Skeleton
          :loading="loading"
          width="140px"
          height="19px"
          border-radius="4px"
        >
          <h5
            class="flex items-center text-base text-dark font-semibold leading-18"
          >
            {{ company?.name }}
            <span
              v-if="company?.verified"
              class="icon-filled-verified text-blue text-base ml-0.5"
            />
          </h5>
        </Skeleton>
        <Skeleton
          :loading="loading"
          width="60px"
          height="19px"
          border-radius="4px"
        >
          <span
            v-if="company?.categories"
            class="text-sm text-gray font-normal leading-16"
          >
            {{ company?.categories[0]?.title }}
          </span>
        </Skeleton>
      </div>
    </div>
    <Skeleton
      :loading="loading"
      width="24px"
      height="24px"
      border-radius="100px"
    >
      <Radio
        :value="company?.id"
        :model-value="selectedCompany"
        name="company"
        @update:model-value="handleUpdateCompany"
      />
    </Skeleton>
  </label>
</template>

<script lang="ts" setup>
import Radio from "@/components/Base/Form/Radio/FormRadio.vue";
// import Shimmer from "@/components/Common/Shimmer/Shimmer.vue";
import { IMyCompany } from "@/types/company";
import { getCompanyImage } from "@/utils/functions/common";
// import { onMounted, watch } from "vue";

interface Props {
  company?: IMyCompany;
  selectedCompany: string;
  loading?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "selectCompany", value: string): void;
}>();
const handleUpdateCompany = (value: string) => {
  emit("selectCompany", value);
};
</script>
