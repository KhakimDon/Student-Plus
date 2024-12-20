<template>
  <div class="py-5 flex-shrink-0 bg-white rounded-xl relative">
    <h4 class="text-xl text-dark font-semibold mb-5 px-6">
      {{ t("by_verification") }}
    </h4>
    <div
      v-if="checkChartData"
      class="flex justify-center overflow-hidden w-full !max-h-[140px] pb-4"
    >
      <div class="relative">
        <div class="relative gender-chart mb-5">
          <ApexCharts :options="options" :series="series" type="radialBar" />
        </div>
        <div
          class="absolute z-100 bottom-1 left-1/2 -translate-x-1/2 text-center"
        >
          <h3 class="text-sm text-[#667779] text-center mb-1">
            {{ t("by_all_users") }}
          </h3>
          <p class="font-medium text-base text-dark text-center">
            {{ formatMoneyDecimal(totalCount) }}
          </p>
        </div>
      </div>
    </div>
    <CommonNodata
      v-else
      :title="t('there_is_no_responses_for_your_request')"
      class="mt-8 px-6"
    />
    <div v-if="checkChartData" class="bg-[#EDF0F2] h-[1px] w-full mt-4" />
    <div v-if="checkChartData" class="px-6 mt-6">
      <div
        v-for="(el, i) of content"
        :key="i"
        class="custom-border flex items-center space-x-3 py-3 last:pb-0 first:pt-0"
      >
        <div :class="el?.color" class="w-3 h-3 rounded" />
        <div>
          <p class="text-[#667779] text-sm font-normal leading-normal">
            {{ t(el?.type) }}
          </p>
          <p class="text-base text-dark font-medium leading-130">
            <span>{{ Math.floor(el?.percentage) }}% </span>
            <span>({{ formatMoneyDecimal(el?.count) }})</span>
          </p>
        </div>
      </div>
    </div>
    <BaseSpinner
      v-if="loading"
      class="rounded-xl bg-white absolute inset-0 flex-center z-10 w-full h-full"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import ApexCharts from "vue3-apexcharts";

import BaseSpinner from "@/components/Base/Loader/BaseSpinner.vue";
import CommonNodata from "@/components/Common/NoData/CommonNodata.vue";
import { verificationData } from "@/mock-data/dashboard";
import { formatMoneyDecimal } from "@/utils";

const loading = ref(false);

const data = computed(() => [
  verificationData?.verified,
  verificationData?.not_verified,
]);

const { t } = useI18n();

const options = reactive({
  chart: {
    animations: {
      enabled: true,
    },
    background: "#fff",
    foreColor: "#373D3F",
    fontFamily: "Roboto, sans-serif",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  colors: ["#FF493D"],
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: {
        margin: 15,
        size: "55%",
        imageWidth: 64,
        imageHeight: 64,
        imageClipped: false,
      },
      track: {
        background: "#49B97D",
        strokeWidth: "100%",
        margin: 10, // margin is in pixels
        borderRadius: "100%",
      },
      dataLabels: {
        name: {
          show: false,
          fontSize: "14px",
          fontFamily: "Roboto, sans-serif",
          fontWeight: 400,
          color: "#828897",
          offsetY: 5,
        },
        value: {
          show: false,
          color: "#121C25",
          fontFamily: "Roboto, sans-serif",
          fontWeight: 500,
          offsetY: -30,
          fontSize: "16px",
          formatter: function () {
            return formatMoneyDecimal(totalCount.value);
          },
        },
      },
    },
  },
  dataLabels: {
    style: {
      fontWeight: 700,
    },
  },
  fill: {
    type: "solid",
    opacity: 1,
  },
  stroke: {
    lineCap: "round",
  },
  grid: {
    padding: {
      top: -40,
      right: 0,
      bottom: 0,
      left: -5,
    },
  },
  labels: [t("by_all_users")],
  legend: {
    show: false,
    position: "left",
    fontSize: 14,
    offsetX: -16,
    offsetY: -1,
    markers: {
      width: 17,
    },
    itemMargin: {
      vertical: 0,
    },
  },
  xaxis: {
    labels: {
      trim: true,
      style: {},
    },
    title: {
      style: {
        fontWeight: 700,
      },
    },
  },
  yaxis: {
    labels: {
      title: "Foo",
      style: {},
    },
    title: {
      style: {
        fontWeight: 700,
      },
    },
  },
});

const series = computed(() => [30]);

const content = computed(() => [
  {
    type: "verified",
    color: "bg-green-2",
    count: data.value[0]?.count,
    percentage: data.value[0]?.percentage,
  },
  {
    type: "unverified",
    color: "bg-red-3",
    count: data.value[1]?.count,
    percentage: data.value[1]?.percentage,
  },
]);

const totalCount = computed(() => {
  return data.value[0]?.count + data.value[1]?.count;
});

const checkChartData = computed(() => {
  return data.value[0]?.count > 0 || data.value[1]?.count > 0;
});
</script>
<style>
.custom-border:not(:last-child) {
  border-bottom: 1px solid #f3f0fe;
}

.gender-chart > * {
  width: 350px !important;
}
</style>
