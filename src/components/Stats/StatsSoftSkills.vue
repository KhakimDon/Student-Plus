<template>
  <div class="relative">
    <BaseTab
      v-model="currentTab"
      variant="full"
      :list="tabs"
      class="mb-7 !max-w-[292px]"
    />
    <h2 class="text-xl text-gray-200 font-medium">{{ t("soft_skills") }}</h2>
    <span class="text-sm text-gray-300">
      {{ t("test_count", { count: data.total_tests_taken }) }}
    </span>
    <Component :is="activeTab.component" v-bind="activeTab.props" />
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

import BaseSpinner from "@/components/Base/Loader/BaseSpinner.vue";
import { BaseTab } from "@/components/Common/Base";
import Detail from "@/modules/profile/components/HardSkills/Detail.vue";
import RadarChart from "@/modules/profile/components/HardSkills/RadarChart.vue";
import { ISoftSkill } from "@/modules/profile/types";

type Props = {
  data: ISoftSkill;
  pending?: boolean;
};
const props = defineProps<Props>();

const { t } = useI18n();

const diagramData = computed(() =>
  props.data.results?.map((el) => ({ name: el.title, point: el.score } ?? []))
);
const currentTab = ref("diagram");

const activeTab = computed(() => {
  if (currentTab.value === "diagram") {
    return { component: RadarChart, props: chart.value };
  }

  return { component: Detail, props: { details: props.data.results } };
});

const tabs = [
  {
    value: "diagram",
    label: t("diagram"),
    iconName: "icon-activity !text-3xl !text-blue-500",
  },
  {
    value: "detail",
    label: t("details"),
    iconName: "icon-align-left !text-3xl !text-blue-500",
  },
];

const chart = computed(() => ({
  chart: {
    series: [
      {
        data: diagramData.value?.map((i) => i.point),
      },
    ],
    chartOptions: {
      chart: {
        type: "radar",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },

      fill: {
        colors: ["#5084DE"],
      },

      stroke: {
        colors: ["#5084DE"],
        curve: "smooth",
      },

      markers: {
        size: 0,
      },

      legend: {
        show: true,
        floating: true,
      },

      colors: ["#FF4560"],

      xaxis: {
        labels: {
          show: true,
          style: {
            fontSize: 16,
            fontWeight: 500,
            colors: [
              "#333D44",
              "#333D44",
              "#333D44",
              "#333D44",
              "#333D44",
              "#333D44",
              "#333D44",
              "#333D44",
              "#333D44",
              "#333D44",
              "#333D44",
            ],
            cssClass: "!text-gray-100",
          },
          formatter: function (value: any) {
            return value.name + " " + value.point + "%";
          },
        },
        categories: diagramData.value,
      },

      yaxis: {
        show: false,
      },
    },
  },
}));
</script>
