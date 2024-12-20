<template>
  <div class="grid gap-7 grid-cols-2 relative">
    <div class="col-span-1">
      <BaseTab
        v-model="currentTab"
        variant="full"
        :list="tabs"
        class="mb-7 max-w-[134px]"
      />
      <div class="flex flex-col gap-1 mb-4">
        <h2 class="text-xl font-medium">{{ t("hard_skills") }}</h2>
        <span class="text-gray-300 text-sm">
          {{ t("test_count", { count: data.total_tests_taken }) }}
        </span>
      </div>
      <StatsHardSkillsBarChart :data />
    </div>

    <div class="col-span-1">
      <div class="w-full flex items-end h-full">
        <ApexCharts
          height="350"
          :options="linearChart.chartOptions"
          :series="linearChartSeries"
          class="w-full"
        />
      </div>
    </div>
    <div
      v-if="pending"
      class="absolute inset-0 z-10 backdrop-blur-sm bg-white/[0.5] flex-center"
    >
      <BaseSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import ApexCharts from "vue3-apexcharts";

import BaseSpinner from "@/components/Base/Loader/BaseSpinner.vue";
import { BaseTab } from "@/components/Common/Base";
import StatsHardSkillsBarChart from "@/components/Stats/StatsHardSkillsBarChart.vue";
import { IHardSkill } from "@/modules/profile/types";

const { t } = useI18n();

type Props = {
  data: IHardSkill;
  pending: boolean;
};
const props = defineProps<Props>();

const tabs = [
  {
    value: "diagram",
    label: t("diagram"),
    iconName: "icon-activity !text-3xl !text-blue-500",
  },
];

const currentTab = ref("diagram");

const linearChartSeries = computed(() => [
  {
    data:
      props.data?.last_six_months?.map((el) => [
        new Date(el?.date).getTime(),
        el.score,
      ]) ?? [],
  },
]);

const linearChart = {
  series: [
    {
      data: [
        [1327359600000, 31],
        [1327446000000, 40],
        [1327532400000, 28],
        [1327618800000, 51],
        [1327878000000, 42],
        [1327964400000, 92],
        [1328050800000, 99],
      ],
    },
  ],

  chartOptions: {
    chart: {
      height: 350,
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

    markers: {
      colors: "#7DBA28",
      strokeColors: "#ffffff",
      strokeWidth: 2,
      strokeOpacity: 1,
      strokeDashArray: 0,
      fillOpacity: 1,
      showNullDataPoints: true,
      hover: {
        sizeOffset: 8,
      },
    },

    stroke: {
      width: 2,
      curve: "smooth",
      colors: "#7DBA28",
    },

    yaxis: {
      labels: {
        style: {
          colors: "#B5B5C3",
        },
      },
    },

    xaxis: {
      type: "datetime",
      labels: {
        format: "dd.MM.yyyy",
        style: {
          colors: "#B5B5C3",
        },
      },

      axisBorder: {
        show: false,
      },

      tooltip: {
        enabled: false,
      },
    },

    tooltip: {
      style: {
        fontSize: "16px",
      },

      x: {
        show: false,
      },

      y: {
        formatter: (val: string) => val + "%",
        title: {
          formatter: () => null,
        },
      },

      marker: {
        show: false,
      },
    },

    grid: {
      borderColor: "#EAEAEA",
      strokeDashArray: 2,

      xaxis: {
        lines: {
          show: true,
        },
      },

      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  },
};
</script>
