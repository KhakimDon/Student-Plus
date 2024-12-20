<template>
  <div class="flex items-center gap-2">
    <div
      class="p-1 bg-gray-3 flex items-center justify-center rounded-md h-7 w-7 overflow-hidden"
    >
      <img :src="image" alt="" class="max-h-4 max-w-4" />
    </div>
    <span class="font-medium text-dark-black text-xs"
      >**** {{ lastFourNumber }}</span
    >
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  image: string;
  number: string;
}

const props = defineProps<Props>();
const lastFourNumber = computed(() =>
  props.number
    .split("")
    .splice(props.number.split("").length - 4, 4)
    .join("")
);
</script>
