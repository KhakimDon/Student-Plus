<template>
  <div class="grid grid-cols-2 gap-6 items-start">
    <div class="flex flex-col gap-4">
      <template v-if="loading">
        <UserInfoCardLoading v-for="i in 5" :key="i" />
      </template>
      <template v-else>
        <UserInfoCard
          v-for="(item, index) in userInfoList"
          :key="index"
          v-bind="item"
        />
      </template>
    </div>
    <UserInfoCardLoading v-if="loading" />
    <UserInfoCard v-else :title="$t('source_of_user')">
      <template #subtitle>
        <UserSource
          :source="user.device?.source"
          :src="user.device?.icon"
          :type="user.device?.device_type"
        />
      </template>
    </UserInfoCard>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import UserInfoCard from "@/modules/user/components/Card/UserInfoCard.vue";
import UserInfoCardLoading from "@/modules/user/components/Card/UserInfoCardLoading.vue";
import UserSource from "@/modules/user/components/UserSource.vue";
import { User } from "@/modules/user/types";

interface Props {
  user: User;
  loading: boolean;
}

const props = defineProps<Props>();

const { t } = useI18n();

const userInfoList = computed(() => {
  return [
    {
      title: t("email"),
      subtitle: props?.user?.email || "-",
    },
    {
      title: t("birth_date"),
      subtitle: props.user?.birth_date
        ? dayjs(props?.user?.birth_date).format("DD MMMM YYYY")
        : "-",
    },
    {
      title: t("nationality"),
      subtitle: props.user?.nationality === "001" ? t("uzbek") : "-",
    },
    {
      title: t("gender"),
      subtitle: t(props?.user?.gender),
    },
    {
      title: t("place_of_birth"),
      subtitle: props?.user?.place_of_birth || "-",
    },
    {
      title: t("residential_address"),
      subtitle: props?.user?.place_of_living || "-",
    },
  ];
});
</script>
