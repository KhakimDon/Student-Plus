<template>
  <header
    class="w-full bg-white py-4 px-6 z-20 flex items-center justify-between sticky top-0 shadow-header"
  >
    <div id="header-breadcrumbs" class="shrink-0"></div>
    <nav class="flex w-full h-full items-center gap-5 justify-end">
      <slot name="before-links" />

      <ul class="flex gap-x-2">
        <li v-for="(link, index) in links" :key="index">
          <RouterLink
            :class="{ 'bg-gray-200 !text-blue-500': link.to === activeRoute }"
            :to="link.to"
            class="text-slate-700 px-3 py-2 inline-block text-sm transition-all duration-200 hover:bg-gray-200 rounded-md"
          >
            <span>{{ link.title }}</span>
          </RouterLink>
        </li>
      </ul>

      <div class="flex items-center divide-x divide-[#F6F8FA]">
        <CLanguageSwitcher class="pr-4" variant="transparent" />
        <a
          v-if="!isLoading && oneIdUrl && !user"
          :href="oneIdUrl"
          rel="noopener noreferrer"
        >
          <BaseButton
            :text="$t('login')"
            class="!px-[58px]"
            icon="icon-logout text-lg leading-[18px]"
            icon-position="left"
            size="md"
            variant="gray"
          />
        </a>
        <CHeaderProfile
          :is-auth="authStore.isAuthenticated"
          class="pl-4"
          v-bind="{ user }"
        />
      </div>
    </nav>
  </header>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";

import BaseButton from "@/components/Base/Button/BaseButton.vue";
import CHeaderProfile from "@/components/Base/Header/details/CHeaderProfile.vue";
import CLanguageSwitcher from "@/components/Common/LanguageSwitcher/CLanguageSwitcher.vue";
import { useAuthStore } from "@/modules/auth/store";

const authStore = useAuthStore();
const oneIdUrl = ref("");
const isLoading = ref(true);
const { user } = storeToRefs(useAuthStore());
</script>
