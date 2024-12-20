<template>
  <div class="flex flex-col gap-7">
    <p>
      {{ data.test_result_conclusion }}
    </p>
    <ApexCharts
      height="307px"
      :class="chartClass"
      :options="chartOptions"
      :series="[data?.total_score ?? 0]"
      class="max-w-[350px] shrink-0"
    />
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import ApexCharts from "vue3-apexcharts";

import { IHardSkill } from "@/modules/profile/types";

type Props = {
  data: IHardSkill;
  chartClass?: string;
};
defineProps<Props>();

const { t } = useI18n();

const chartOptions = {
  chart: {
    height: 210,
    type: "radialBar",
    toolbar: {
      show: false,
    },
  },

  plotOptions: {
    radialBar: {
      startAngle: -115,
      endAngle: 115,
      hollow: {
        margin: 0,
        size: "70%",
      },

      track: {
        margin: 5,
        background: "#e7e7e7",
        strokeWidth: "100%",
      },

      dataLabels: {
        position: "center",

        name: {
          show: true,
          offsetY: 25,
          color: "#A2ABBE",
          fontSize: "14px",
          fontWeight: 400,
        },

        value: {
          offsetY: -20,
          fontWeight: 800,
          color: "#333D44",
          fontSize: "52px",
          formatter: function (val: any) {
            return parseInt(val) + "%";
          },
        },
      },
    },
  },

  stroke: {
    lineCap: "round",
  },

  labels: [t("total_results")],
};
</script>
