<template>
  <div class="flex flex-col gap-1 text-xs font-normal leading-normal">
    <span class="text-dark-black">
      {{ dayjs(new Date(date)).format("DD.MM.YYYY") }}
    </span>
    <span class="text-gray-1">
      {{ dayjs(new Date(date)).format("HH:mm") }}
    </span>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

interface Props {
  date: string;
}
defineProps<Props>();
</script>
