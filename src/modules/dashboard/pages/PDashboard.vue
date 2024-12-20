<template>
  <div class="bg-white rounded-xl p-5 mb-6 flex">
    <FilterDateRange />
  </div>
  <div class="relative">
    <div class="grid grid-cols-4 gap-5 relative mb-5">
      <DashboardAttendanceChart class="col-span-2 row-span-2" />
      <DashboardVerificationChart class="row-span-2" />
      <DashboardMembersChart class="row-span-2" />
    </div>
    <div class="grid grid-cols-2 gap-5 relative">
      <div>
        <DashboardStockOrder />
      </div>

      <DashboardOperationsChart />
    </div>
    <teleport v-if="mounted" to="#header-breadcrumbs">
      <BaseBreadcrumb :breadcrumb-routes="[{ name: $t('dashboard') }]" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { useMounted } from "@vueuse/core";

import { BaseBreadcrumb } from "@/components/Base";
import FilterDateRange from "@/components/Base/Form/DatePicker/FilterDateRange.vue";
import DashboardAttendanceChart from "@/modules/dashboard/components/Charts/DashboardAttendanceChart.vue";
import DashboardMembersChart from "@/modules/dashboard/components/Charts/DashboardMembersChart.vue";
import DashboardOperationsChart from "@/modules/dashboard/components/Charts/DashboardOperationsChart.vue";
import DashboardStockOrder from "@/modules/dashboard/components/Charts/DashboardStockOrder.vue";
import DashboardVerificationChart from "@/modules/dashboard/components/Charts/DashboardVerificationChart.vue";

const mounted = useMounted();
</script>
