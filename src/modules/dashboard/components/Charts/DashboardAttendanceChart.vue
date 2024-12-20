<template>
  <div class="flex-shrink-0 p-6 bg-white rounded-xl relative">
    <div class="mb-5">
      <h4 class="text-xl text-dark font-semibold mb-1">
        {{ $t("attendance") }}
      </h4>
      <p class="text-sm leading-130 font-normal text-gray-11">
        {{ $t("graphic_users_attendance") }}
      </p>
    </div>
    <div v-if="!loading">
      <div class="h-[280px]">
        <ApexChart :options="options" :series="seriesAll" height="280px" />
      </div>
    </div>
    <div v-if="loading && seriesAll[0]?.data?.length">
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
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import ApexChart from "vue3-apexcharts";

import BaseSpinner from "@/components/Base/Loader/BaseSpinner.vue";
import CommonNodata from "@/components/Common/NoData/CommonNodata.vue";
import { attendanceData } from "@/mock-data/dashboard";
import { dateFormats } from "@/modules/dashboard/components/Charts/dashboardCharts";
import { formatMoneyDecimal } from "@/utils";

const route = useRoute();

const { t, locale } = useI18n();
dayjs.locale(locale.value === "uz" ? "uz-latn" : locale.value);

const data = ref(attendanceData);
const loading = ref(false);

const end_date = computed(() => route.query.end_date);
const start_date = computed(() => route.query.start_date);

const total = computed(() => {
  return {
    DAU: data.value?.reduce((acc, curr) => acc + curr.DAU, 0),
    WAU: data.value?.reduce((acc, curr) => acc + curr.WAU, 0),
    MAU: data.value?.reduce((acc, curr) => acc + curr.MAU, 0),
  };
});

const options = computed(() => ({
  chart: {
    id: "realtime",
    type: "line",
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
    type: "solid",
    colors: "transparent",
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
    colors: ["#DFBD40", "#49B97D", "#198AFC"],
  },
  yaxis: {
    tickAmount: 5,
    labels: {
      formatter: (el) => formatMoneyDecimal(el, 0),
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
        <p class="text-xs font-medium leading-130 text-dark-black"> DAU: ${formatMoneyDecimal(
          data.value[dataPointIndex].DAU
        )}</p>
        <p class="text-xs font-medium leading-130 text-dark-black"> WAU: ${formatMoneyDecimal(
          data.value[dataPointIndex].WAU
        )}</p>
        <p class="text-xs font-medium leading-130 text-dark-black"> MAU: ${formatMoneyDecimal(
          data.value[dataPointIndex].MAU
        )}</p>
      </div>
`;
    },
  },

  legend: {
    show: true,
    position: "bottom",
    horizontalAlign: "left",
    fontSize: "12px",
    fontFamily: "Roboto",
    fontWeight: 400,
    formatter: (el) => `${total.value[el]} ${el}`,
    labels: {
      colors: "#828897",
      useSeriesColors: false,
    },
    markers: {
      size: 8,
      shape: "square",
      strokeWidth: 0,
      fillColors: ["#DFBD40", "#49B97D", "#198AFC"],
      customHTML: undefined,
      onClick: undefined,
      offsetX: 0,
      offsetY: 0,
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

const seriesAll = computed(() => {
  return [
    {
      name: "DAU",
      data: data.value?.map((el) => el.DAU),
    },
    {
      name: "WAU",
      data: data.value?.map((el) => el.WAU),
    },
    {
      name: "MAU",
      data: data.value?.map((el) => el.MAU),
    },
  ];
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
