<script setup lang="ts">
import type { Component } from "vue";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import { BaseTab } from "@/components/Base";
import GeneralInfos from "@/modules/user/components/Single/About/GeneralInfos.vue";
import PassportInfos from "@/modules/user/components/Single/About/PassportInfos.vue";
import { User } from "@/modules/user/types";
import { TabItem } from "@/types/components";

interface Props {
  user: User;
  loading: boolean;
}
defineProps<Props>();

const { t } = useI18n();
const mounted = ref(false);
onMounted(() => {
  setTimeout(() => {
    mounted.value = true;
  }, 100);
});

const tab = ref("general");
const list: TabItem[] = [
  {
    label: t("general_information"),
    value: "general",
  },
  {
    label: t("passport_information"),
    value: "passport",
  },
];

const tabContents: Record<string, Component> = {
  general: GeneralInfos,
  passport: PassportInfos,
};
</script>

<template>
  <div class="bg-white rounded-xl p-6">
    <BaseTab v-if="mounted" v-bind="{ list }" v-model="tab" class="mb-6" />
    <Transition name="fade" mode="out-in">
      <component :is="tabContents[tab]" :user :loading />
    </Transition>
  </div>
</template>
