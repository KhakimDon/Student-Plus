<template>
  <div>
    <BaseDropdown
      ref="profileDropdown"
      :show="show"
      body-class="overflow-visible !border-gray-9"
      head-class="cursor-pointer"
      @toggle="handleToggle"
    >
      <template #head>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-3">
            <div class="h-max flex flex-col justify-center">
              <span
                v-if="user?.first_name"
                class="text-base font-semibold text-dark-black text-right leading-130 !break-all max-w-[400px] line-clamp-1"
              >
                {{ getFullName(user) }}
              </span>
              <span
                v-else
                class="text-base font-semibold text-dark-black text-right leading-130 !break-all max-w-[400px] line-clamp-1"
              >
                {{ $t("name") }}
              </span>
              <span class="text-sm text-gray-1 text-right">
                {{ $t("user") }}
              </span>
            </div>
            <BaseAvatar
              :image="user?.avatar?.[EImageSize.SMALL]"
              avatar-class="w-9 h-9 rounded-full object-cover"
            />
          </div>
          <span
            :class="{ '!rotate-180': show }"
            class="icon-chevron-down text-2xl text-gray-1 transition-300"
          />
        </div>
      </template>
      <template #body>
        <div class="bg-white rounded-md profile-dropdown">
          <div class="flex items-center gap-3 p-5 pt-6">
            <router-link class="flex items-center gap-3 group" to="/profile">
              <BaseAvatar
                :image="user?.avatar || '@/assets/images/noAvatar.svg'"
                avatar-class="!w-[50px] !h-[50px] object-cover"
              />
              <div class="h-max flex flex-col justify-center">
                <span
                  v-if="user?.first_name || user?.last_name"
                  class="text-sm font-medium text-dark text-right leading-20 !break-all max-w-[400px] line-clamp-1 group-hover:underline duration-300"
                >
                  {{ getFullName(user) }}
                </span>
                <span
                  v-else
                  class="text-base font-semibold text-dark-black text-right leading-130 !break-all max-w-[400px] line-clamp-1"
                >
                  {{ $t("name") }}
                </span>
                <span class="text-sm text-gray text-right">
                  {{ $t("user") }}
                </span>
              </div>
            </router-link>
          </div>
          <div
            class="text-sm !px-4 py-2 w-full transition-all duration-300 cursor-pointer text-gray-700 hover:bg-red-50 hover:text-red-500 flex flex-col gap-1 border-t border-[#E5EAEE]"
            @click="toggle"
          >
            <span class="mx-4">{{ $t("logout") }}</span>
          </div>
        </div>
      </template>
    </BaseDropdown>

    <LogoutConfirm v-model="isOpen" @submit="logout" />
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { defineComponent, ref } from "vue";

import BaseAvatar from "@/components/Base/Avatar/BaseAvatar.vue";
import BaseDropdown from "@/components/Base/Dropdown/BaseDropdown.vue";
import LogoutConfirm from "@/components/Common/Modal/LogoutConfirm.vue";
import useToggle from "@/composables/useToggle";
import { useAuthStore } from "@/modules/auth/store";
import { IAuthUser } from "@/types/auth";
import { EImageSize } from "@/types/common";
import { getFullName } from "@/utils/functions/common";

defineComponent({
  name: "HeaderProfile",
});

interface Props {
  user?: IAuthUser;
  isAuth?: boolean;
  profileItems?: {
    title: string;
    class?: string;
    icon?: string;
    event?: string;
  }[];
}

defineProps<Props>();

const { toggle, isOpen } = useToggle();

const show = ref(false);

function handleToggle(val: boolean, e: MouseEvent) {
  if (e?.relatedTarget?.id === "lang-switcher") {
    return;
  }
  show.value = val;
}

const profileDropdown = ref<HTMLElement | null>(null);
onClickOutside(profileDropdown, () => {
  show.value = false;
});

function logout() {
  useAuthStore().logout();
  window.location.reload();
}
</script>

<style scoped>
.profile-dropdown {
  box-shadow: 0 0 50px rgba(82, 63, 105, 0.15);
}
</style>
