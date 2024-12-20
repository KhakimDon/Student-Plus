<script setup lang="ts">
import dayjs from "dayjs";
import { computed } from "vue";
import ApexChart from "vue3-apexcharts";

import BaseSpinner from "@/components/Base/Loader/BaseSpinner.vue";
import { dateFormats } from "@/modules/dashboard/components/Charts/dashboardCharts";
import { formatMoneyDecimal } from "@/utils";

interface Props {
  title: string;
  data: {
    statistics: {
      period: string;
      withdrawal_total_amount: number;
      type: string;
    }[];
    total_amount: number;
  };
  loading: boolean;
}
const props = defineProps<Props>();

const options = computed(() => ({
  chart: {
    type: "area",
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
    },
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
    curve: "smooth",
    colors: ["#828897"],
    width: 3,
  },
  yaxis: {
    show: false,
  },
  tooltip: {
    enabled: true,
    strokeWidth: 0,
    custom: function ({ dataPointIndex }) {
      return `<div class="flex flex-col gap-1 rounded-2lg p-2.5 bg-white shadow-[0_3px_33px_0_rgba(0,0,0,0.10)]">
        <p class="text-xs font-normal leading-130 text-dark-black">${dayjs(
          props.data.statistics[dataPointIndex].period
        ).format(dateFormats[props.data.statistics[dataPointIndex].type])}</p>
        <hr class="border-none h-px w-full bg-gray-3">
        <p class="text-xs font-normal leading-130 text-gray-11 mb-0.5">${
          props.title
        }:</p>
        <p class="text-xs font-medium leading-130 text-dark-black">${formatMoneyDecimal(
          props.data.statistics[dataPointIndex].total_amount
        )} UZS</p>
      </div>
`;
    },
  },
  xaxis: {
    labels: {
      show: false,
    },
    categories: props.data?.statistics?.map((el) =>
      dayjs(el.period).format(dateFormats[el.type])
    ),
    tooltip: {
      enabled: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
}));

const series = computed(() => {
  return [
    {
      name: props.title,
      data: props.data?.statistics?.map((el) => el.total_amount || 0),
    },
  ];
});
</script>

<template>
  <div class="bg-white rounded-xl flex flex-col justify-between relative">
    <div class="pt-5 px-5">
      <p class="text-xl font-semibold text-dark leading-130">
        {{ formatMoneyDecimal(data?.total_amount) }} UZS
      </p>
      <p class="text-xs font-normal leading-130 text-gray-neutral">
        {{ title }}
      </p>
    </div>
    <div>
      <ApexChart :options :series height="130px" />
    </div>

    <BaseSpinner
      v-if="loading"
      class="rounded-xl bg-white absolute inset-0 flex-center z-10 w-full h-full"
    />
  </div>
</template>
