<template>
  <header
      class="w-full bg-white py-4 px-7 z-20 flex items-center justify-between sticky top-0 shadow-header"
  >
    <div id="header-breadcrumbs" class="shrink-0"></div>
    <nav class="flex w-full h-full items-center gap-5 justify-end">
      <slot name="before-links"/>
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
        <!--        <LanguageSwitche class="pr-4" variant="transparent"/>-->
        <!--        <Notifications v-if="authStore.hasUser" class="px-4" />-->

        <BaseHeaderProfile
            :is-auth="false"
            class="pl-4"
            v-bind="{ user }"
            @logout="$emit('logout')"
        />
      </div>
    </nav>
  </header>
</template>
<script lang="ts" setup>
import type {IAuthUser} from "@/types/auth";
import BaseHeaderProfile from "@/components/Base/Header/details/BaseHeaderProfile.vue";

interface Props {
  links?: { title: string; to: string }[];
  user?: IAuthUser;
  activeRoute?: string;
}

defineProps<Props>();

interface Emits {
  (event: "logout"): void;
}

defineEmits<Emits>();
</script>
