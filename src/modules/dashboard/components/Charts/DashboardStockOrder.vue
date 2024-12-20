<script setup lang="ts">
import { ref } from "vue";

import BaseImage from "@/components/Base/BaseImage.vue";
import BaseSpinner from "@/components/Base/Loader/BaseSpinner.vue";
import { stockOrderData } from "@/mock-data/dashboard";
import { EImageSize } from "@/types/common";
import { formatMoneyDecimal } from "@/utils";

const list = [
  { type: "buy", subtitle: "count_of_bought_shares", text: "best_buying" },
  { type: "sell", subtitle: "count_of_sold_shares", text: "best_selling" },
];

const data = ref(stockOrderData);
const loading = ref(false);
</script>

<template>
  <div class="grid grid-cols-2 gap-5 relative">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="bg-white rounded-xl p-5 flex flex-col justify-between gap-4"
    >
      <div>
        <p class="text-xl font-semibold text-dark leading-130">
          {{ formatMoneyDecimal(data?.[item.type]?.total_amount) }}
          UZS
        </p>
        <i18n-t
          :keypath="item?.subtitle"
          tag="p"
          class="text-xs font-normal leading-130 text-gray-neutral"
        >
          <template #count>
            <span class="text-dark">
              {{ formatMoneyDecimal(data?.[item.type]?.count) }}
            </span>
          </template>
        </i18n-t>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-xs font-normal leading-130 text-dark-black">
          {{ $t(item.text) }}
        </p>
        <div class="flex">
          <div
            v-for="(i, idx) in data?.[item.type]?.stocks"
            :key="idx"
            class="w-10 h-10 rounded-full border border-gray-6 overflow-hidden first:ml-0 -ml-4"
          >
            <BaseImage
              :src="i.logo?.[EImageSize.SMALL]"
              class="w-full h-full"
            />
          </div>
          <div
            class="rounded-full h-10 px-1.5 text-base font-semibold leading-130 text-gray-11 border border-gray-6 min-w-10 -ml-4 bg-gray-3 flex-y-center"
          >
            +{{ data?.[item.type]?.count - 5 }}
          </div>
        </div>
      </div>
    </div>

    <BaseSpinner
      v-if="loading"
      class="rounded-xl bg-white absolute inset-0 flex-center z-10 w-full h-full"
    />
  </div>
</template>
