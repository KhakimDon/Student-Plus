<template>
  <div class="flex-shrink-0 h-auto bg-white rounded-xl relative">
    <h4 class="text-xl text-dark font-semibold px-6 pt-6 mb-1">
      {{ $t("count_of_new_members", { count: formatMoneyDecimal(total) }) }}
    </h4>
    <p class="mb-2 text-sm leading-130 font-normal text-gray-11 px-6">
      {{ $t("by_age") }}
    </p>
    <div v-if="total">
      <div class="flex px-6 w-full">
        <div
          v-for="(item, index) in data"
          :key="index"
          :class="{ 'mr-[3px]': item?.amount && index !== data.length - 1 }"
          :style="{
            backgroundColor: item?.color,
            width: getPercent(Number(item?.amount)) + '%',
          }"
          class="h-10 rounded-sm mb-4"
        ></div>
      </div>
      <div
        v-for="(item, index) in data"
        :key="index"
        :class="{ 'border-b border-b-gray': index !== data.length - 1 }"
        class="h-[56px] grid items-center relative mx-6"
      >
        <div class="grid grid-cols-3">
          <div class="flex items-center gap-2">
            <div
              :style="{
                backgroundColor: item?.color,
              }"
              class="w-3 h-3 rounded-[3px]"
            ></div>

            <p class="text-[#94A8AA] text-xs !leading-normal font-medium">
              {{ item?.label }}
            </p>
          </div>

          <div class="text-center">
            <span
              class="text-center text-dark text-sm font-medium leading-130 px-1 border-l border-l-gray border-r border-r-gray"
            >
              {{ !total ? 0 : getPercent(item?.amount) }}%
            </span>
          </div>

          <div class="ml-auto text-right">
            <h5
              class="mb-1 text-sm !leading-normal text-dark-100 font-semibold truncate"
            >
              {{ changeNumberFormat(item.amount) }}
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center h-min">
      <CommonNodata
        :title="$t('there_is_no_responses_for_your_request')"
        class="mt-8 px-6"
      />
    </div>
    <BaseSpinner
      v-if="loading"
      class="rounded-xl bg-white absolute inset-0 flex-center z-10 w-full h-full"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import BaseSpinner from "@/components/Base/Loader/BaseSpinner.vue";
import CommonNodata from "@/components/Common/NoData/CommonNodata.vue";
import { membersData } from "@/mock-data/dashboard";
import { changeNumberFormat, formatMoneyDecimal } from "@/utils";

const { t } = useI18n();

const membersStatistics = ref(membersData);
const loading = ref(false);

const data = computed(() => [
  {
    label: t("up_to_18"),
    color: "#0D9CD9",
    amount: membersStatistics.value?.["18"]?.count,
  },
  {
    label: "18-35",
    color: "#02BFDF",
    amount: membersStatistics.value?.["18_34"]?.count,
  },
  {
    label: "36-49",
    color: "#F2B33A",
    amount: membersStatistics.value?.["35_49"]?.count,
  },
  {
    label: "50-60",
    color: "#F55152",
    amount: membersStatistics.value?.["50_60"]?.count,
  },
  {
    label: t("over_60"),
    color: "#20CC65",
    amount: membersStatistics.value?.["60"]?.count,
  },
]);

const total = computed(() => {
  return data.value.reduce((acc, item) => acc + item.amount, 0);
});

function getPercent(amount: number) {
  return ((amount / total?.value) * 100).toFixed(2);
}
</script>
<style>
.grid-cols-1-max-1 {
  grid-template-columns: 1fr max-content 1fr;
}
</style>
