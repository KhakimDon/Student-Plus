<template>
  <div class="relative w-full h-screen flex justify-between">
    <div class="container flex flex-col items-center justify-between py-12">
      <div></div>

      <Transition mode="out-in" name="fade">
        <div :key="$route.name" class="w-[335px]">
          <slot />
        </div>
      </Transition>

      <!--TODO: dont forget to remove this div when you want to show version-->
      <div />

      <div v-if="false" class="flex flex-col text-center gap-2">
        <p
          class="text-xs font-normal leading-normal text-gray-0 underline hover:text-yellow-dark transition-300"
        >
          {{ $t("privacy_policy") }}
        </p>
        <p class="text-xs font-normal leading-normal text-gray-0">
          {{ $t("version") }} 1.0.0
        </p>
      </div>
    </div>
    <div
      class="max-w-[597px] h-full aspect-[597/900] bg-[url('/images/pattern/auth-pattern.webp')] bg-no-repeat bg-center bg-cover flex flex-col items-center gap-7 pt-[220px]"
    >
      <img
        alt="Auth coins"
        class="max-w-[278px] w-full"
        src="/images/pattern/auth-coins.svg"
      />
      <p class="text-base text-white leading-130 font-normal">
        {{ $t("invest_to_your_future") }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

import { useAuthStore } from "@/modules/auth/store";

const { access } = useAuthStore().getTokens;
const router = useRouter();
if (access) {
  router.push({ name: "Dashboard" });
}
</script>
