<template>
  <div class="flex-center flex-col">
    <img src="/images/svg/blocked.svg" alt="" />
    <h3 class="text-2xl text-dark-black font-bold mt-3 text-center">
      {{ $t("too_many_requests") }}
    </h3>
    <p class="text-gray-0 text-sm mt-1 text-center">
      {{ $t("too_many_requests_subtitle") }}
    </p>
    <a
      :href="`tel:${CONFIG.CALL_CENTER}`"
      class="bg-yellow/30 text-yellow-dark text-sm font-medium leading-130 bg-gray py-2 px-4 rounded-full mt-20 flex-y-center gap-2 hover:bg-yellow-dark/30 transition-300"
    >
      <i class="icon-call text-xl leading-5 text-yellow-dark"></i>
      {{ formatPhoneNumber(CONFIG.CALL_CENTER) }}
    </a>
    <p class="text-gray-0 text-xs mt-2.5">
      {{ $t("support_phone") }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { CONFIG } from "@/config";
import { formatPhoneNumber } from "@/utils/functions/common";
</script>
