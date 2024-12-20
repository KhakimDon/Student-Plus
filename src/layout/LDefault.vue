<template>
  <div class="bg-gray-3 w-full flex fixed top-0">
    <BaseSidebar :menu-items="menu" />
    <div class="w-full h-screen grid grid-rows-[min-content_1fr]">
      <BaseHeader
        v-bind="{ activeRoute }"
        :user="authStore.user"
        v-on="{ logout }"
      />
      <div class="h-full w-full px-7 py-5 relative z-10 overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";

import BaseHeader from "@/components/Base/Header/BaseHeader.vue";
import BaseSidebar from "@/components/Base/Sidebar/BaseSidebar.vue";
import { menu } from "@/config/MainMenuConfig";
import { useAuthStore } from "@/modules/auth/store";

const router = useRouter();
const authStore = useAuthStore();

const activeRoute = "/";

const logout = () => {
  authStore.logout();
};
</script>
