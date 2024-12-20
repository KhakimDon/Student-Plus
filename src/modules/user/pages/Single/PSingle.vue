<template>
  <div>
    <teleport v-if="mounted" to="#header-breadcrumbs">
      <BaseBreadcrumb v-bind="{ breadcrumbRoutes }" />
    </teleport>
    <Transition mode="out-in" name="fade">
      <BasePageHeaderLoading v-if="loading" />
      <BasePageHeader
        v-else
        :active-tab="activeTab"
        :image="user!.avatar?.[EImageSize.MEDIUM]"
        :tab-list="anotherList"
        :title="getFullName(user)"
        @change-tab="changeTab"
      >
        <template #titleAside>
          <img
            v-if="user?.is_expert"
            alt="Merchand Verified"
            class="ml-3 w-7 h-7"
            src="/images/svg/merchand-verified.svg"
          />
        </template>
        <template #subtitle>
          <UserStatusBadge v-if="!user?.is_verified" status="unverified" />
        </template>
        <template #actions>
          <div class="flex gap-4">
            <BaseButton
              :text="$t('delete')"
              icon="icon-trash text-xl leading-5"
              icon-position="left"
              size="sm"
              variant="danger"
              @click="deleteModal = true"
            />
          </div>
        </template>
        <template #details>
          <div class="flex-between">
            <div class="flex-y-center gap-4">
              <BasePageHeaderDetail
                v-for="(item, index) in userInfo"
                :key="index"
                v-bind="item"
              />
            </div>
          </div>
        </template>
      </BasePageHeader>
    </Transition>
    <div class="mt-5">
      <RouterView :loading :user />
    </div>
    <UserDeleteModal
      v-model="deleteModal"
      :user
      @deleted="router.push({ name: 'Users' })"
    />
  </div>
</template>

<script lang="ts" setup>
import { useMounted } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

import { BaseBreadcrumb, BaseButton } from "@/components/Base";
import BasePageHeader from "@/components/Base/PageHeader/BasePageHeader.vue";
import BasePageHeaderDetail from "@/components/Base/PageHeader/BasePageHeaderDetail.vue";
import BasePageHeaderLoading from "@/components/Base/PageHeader/BasePageHeaderLoading.vue";
import ActivityStatusToggle from "@/components/Common/ActivityStatusToggle/ActivityStatusToggle.vue";
import { useApi } from "@/composables/useApi";
import { mockUser } from "@/mock-data/users";
import UserStatusBadge from "@/modules/user/components/Badge/UserStatusBadge.vue";
import UserDeleteModal from "@/modules/user/components/Modal/UserDeleteModal.vue";
import { User } from "@/modules/user/types";
import { getUserFullName } from "@/modules/user/utils";
import { EImageSize } from "@/types/common";
import type { TabItem } from "@/types/components";
import { formatMoneyDecimal } from "@/utils";
import { formatPhoneNumber, getFullName } from "@/utils/functions/common";

const mounted = useMounted();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const user = ref<User>(mockUser);
const loading = ref(false);

const breadcrumbRoutes = computed(() => {
  return [
    {
      name: t("all_users"),
      route: { name: "Users" },
    },
    {
      name: user.value?.first_name
        ? getUserFullName(user.value)
        : t("undefined"),
      loading: loading.value,
    },
  ];
});

const activeTab = ref(route.name?.toString() || "UsersSingleAbout");

function changeTab(tab: string) {
  activeTab.value = tab;
  router.push({ name: tab || "Dashboard" });
}

const anotherList: TabItem[] = [
  {
    value: "UsersSingleAbout",
    label: t("about_user"),
  },
];

const userInfo = computed(() => {
  return [
    {
      title: formatPhoneNumber(user.value?.phone),
      description: "phone_number",
    },
    {
      title: dayjs(user.value?.date_joined).format("DD.MM.YYYY"),
      description: "registered_date",
    },
    {
      title: formatMoneyDecimal(user.value?.deals_count || 0),
      description: "count_of_transactions",
    },
    {
      title: user.value?.citizenship
        ? t(
            user.value?.citizenship === "1"
              ? "uzbekistan_citizenship"
              : "foreign_citizenship"
          )
        : "-",
      description: "citizenship",
    },
  ];
});

const deleteModal = ref(false);
</script>
