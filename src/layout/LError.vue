<template>
  <div class="h-full bg-white rounded-xl flex-center gap-8 flex-col">
    <img src="/images/svg/404.svg" alt="" />
    <div class="flex-center flex-col gap-1">
      <h1
        class="text-center text-xl text-dark-black w-full leading-130 font-semibold"
      >
        {{ $t("page_not_found") }}
      </h1>
      <p
        class="leading-130 text-gray-11 font-normal text-sm max-w-[373px] text-center"
      >
        {{ $t("page_not_found_description") }}
      </p>
    </div>
    <div class="flex justify-center md:justify-start space-x-3">
      <RouterLink :to="{ name: 'Dashboard' }">
        <BaseButton
          :text="$t('main_page')"
          icon-position="left"
          icon="icon-home !text-xl !leading-5"
        />
      </RouterLink>
      <a :href="`tel:${CONFIG.CALL_CENTER}`">
        <BaseButton
          :text="$t('support')"
          icon-position="left"
          variant="gray"
          icon="icon-call-calling !text-xl !leading-5"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/Base/Button/BaseButton.vue";
import { CONFIG } from "@/config";

function reload() {
  window.location.reload();
}
</script>

<style scoped>
.particle {
  opacity: 0.06;
}
</style>
