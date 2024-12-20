<template>
  <div class="flex-shrink-0 p-6 bg-white rounded-xl relative">
    <div class="mb-5">
      <h4 class="text-xl text-dark font-semibold mb-1">
        {{
          $t("total_operations", { sum: `${formatMoneyDecimal(total)} UZS` })
        }}
      </h4>
      <p class="text-sm leading-130 font-normal text-gray-11">
        {{ $t("graphic_total_operations") }}
      </p>
    </div>
    <div v-if="!loading">
      <div class="h-[280px]">
        <ApexChart :options="options" :series="series" height="280px" />
      </div>
    </div>
    <div v-if="loading && !series[0]?.data?.length">
      <CommonNodata
        :title="$t('empty_data')"
        class="mt-8"
        image="/svg/empty-state.svg"
      />
    </div>
    <BaseSpinner
      v-if="loading"
      class="rounded-xl bg-white absolute inset-0 flex-center z-10 w-full h-full"
    />
  </div>
</template>

<script lang="ts" setup>
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn.js";

import dayjs from "dayjs";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import ApexChart from "vue3-apexcharts";

import BaseSpinner from "@/components/Base/Loader/BaseSpinner.vue";
import CommonNodata from "@/components/Common/NoData/CommonNodata.vue";
import { operationsData } from "@/mock-data/dashboard";
import { dateFormats } from "@/modules/dashboard/components/Charts/dashboardCharts";
import { formatMoneyDecimal } from "@/utils";

const { t, locale } = useI18n();
dayjs.locale(locale.value === "uz" ? "uz-latn" : locale.value);

const options = computed(() => ({
  chart: {
    type: "area",
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
    },
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: "gradient",
    colors: "#F7E869",
    gradient: {
      opacityFrom: 0.8,
      opacityTo: 0.2,
    },
  },
  grid: {
    borderColor: "#F2F2F2",
    strokeDashArray: 5,
  },
  markers: {
    colors: "#DFBD40",
    hover: {
      size: 6,
      strokeColors: "#fff",
      strokeWidth: 1.5,
    },
  },
  stroke: {
    curve: "smooth",
    colors: ["#F7E869", "#F7E869"],
  },
  yaxis: {
    tickAmount: 5,
    labels: {
      formatter: (el) => `${formatMoneyDecimal(el, 0, true)} UZS`,
      style: {
        colors: ["#111014"],
        fontSize: "12px",
        fontFamily: "Roboto",
        fontWeight: 500,
      },
    },
  },
  tooltip: {
    enabled: true,
    custom: function ({ dataPointIndex }) {
      return `<div class="flex flex-col gap-1 rounded-2lg p-2.5 bg-white shadow-[0_3px_33px_0_rgba(0,0,0,0.10)]">
        <p class="text-xs font-normal leading-130 text-dark-black">${dayjs(
          data.value[dataPointIndex].period
        ).format(dateFormats[data.value[dataPointIndex].type])}</p>
        <hr class="border-none h-px w-full bg-gray-3">
        <p class="text-xs font-medium leading-130 text-dark-black">${formatMoneyDecimal(
          data.value[dataPointIndex].total_combined_amount
        )} UZS</p>
      </div>
`;
    },
  },
  xaxis: {
    categories: data.value?.map((el) =>
      dayjs(el.period).format(dateFormats[el.type])
    ),
    tooltip: {
      enabled: false,
    },
  },
}));

const series = computed(() => {
  return [
    {
      name: t("graphic_total_operations"),
      data: data.value?.map((el) => el.total_combined_amount),
    },
  ];
});

const data = ref(operationsData);
const loading = ref(false);

const total = computed(() => {
  return data.value?.reduce((acc, item) => acc + item.total_combined_amount, 0);
});
</script>

<style>
.apexcharts-canvas {
  width: 100% !important;
  height: 100% !important;
}

.apexcharts-legend-series {
  display: flex !important;
  align-items: center !important;
}

.apexcharts-legend-marker {
  font-weight: 500 !important;
  font-size: 12px !important;
  line-height: 14px !important;
  margin-right: 6px !important;
}

.apexcharts-legend-text {
  font-family: Roboto, sans-serif !important;
  font-weight: 500 !important;
  font-size: 12px !important;
  line-height: 14px !important;
  color: #8e9ba8 !important;
}

.apexcharts-legend-series:nth-child(1) ~ .apexcharts-legend-marker {
  background: red !important;
}
.apexcharts-xaxis-label {
  width: 100% !important;
}
</style>
