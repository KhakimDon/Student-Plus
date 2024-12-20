<template>
  <div class="grid grid-cols-2 gap-6 items-start">
    <div class="flex flex-col gap-4">
      <template v-if="loading">
        <UserInfoCardLoading v-for="i in 5" :key="i" />
      </template>
      <template v-else>
        <UserInfoCard :title="$t('passport_or_id_card')">
          <template #subtitle>
            <CommonFile v-if="user.passport_file" :file="user.passport_file" />
            <span v-else>-</span>
          </template>
        </UserInfoCard>
        <UserInfoCard
          v-for="(item, index) in useInfoList"
          v-bind="item"
          :key="index"
        />
      </template>
    </div>
    <UserInfoCardLoading v-if="loading" />
    <UserInfoCard
      v-else
      :title="$t('who_gave')"
      :subtitle="user.passport_issued_by_organization"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import CommonFile from "@/components/Common/CommonFile.vue";
import UserInfoCard from "@/modules/user/components/Card/UserInfoCard.vue";
import UserInfoCardLoading from "@/modules/user/components/Card/UserInfoCardLoading.vue";
import { User } from "@/modules/user/types";

interface Props {
  user: User;
  loading: boolean;
}
const props = defineProps<Props>();

const { t } = useI18n();

const useInfoList = computed(() => {
  return [
    {
      title: t("series_and_number_of_document"),
      subtitle: props.user.passport_number || "-",
    },
    {
      title: t("passport_given_date"),
      subtitle: props.user.passport_given_date
        ? dayjs(props.user.passport_given_date).format("DD.MM.YYYY")
        : "-",
    },
    {
      title: t("expire_date"),
      subtitle: props.user.passport_expiry_date
        ? dayjs(props.user.passport_expiry_date).format("DD.MM.YYYY")
        : "-",
    },
    {
      title: t("birth_date"),
      subtitle: props.user.birth_date
        ? dayjs(props.user.birth_date).format("DD.MM.YYYY")
        : "-",
    },
    {
      title: t("inn", { separator: "|" }),
      subtitle: props.user.pinfl || "-",
    },
  ];
});
</script>
