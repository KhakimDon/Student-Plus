<script setup lang="ts">
import { TableStatusIndicator } from "@/components/Base/Table/BaseTable";

interface Props {
  colors: TableStatusIndicator["colors"];
}
defineProps<Props>();
</script>

<template>
  <div class="flex gap-4">
    <div
      v-for="(item, index) in colors"
      :key="index"
      class="flex items-center gap-2"
    >
      <div
        class="h-4 w-4 border-[3px] rounded-full indicator"
        :class="item.color"
      ></div>
      <span class="text-xs font-medium">
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<style>
.indicator.green {
  border-color: #49b97d;
}

.indicator.red {
  border-color: #ee5253;
}

.indicator.gray {
  border-color: #d3d5dc;
}

.indicator.yellow {
  border-color: #ff8c01;
}
</style>
