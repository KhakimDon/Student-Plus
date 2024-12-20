<template>
  <section>
    <teleport v-if="mounted" to="#header-breadcrumbs">
      <span class="font-medium text-sm leading-130 text-gray-1">
        {{ $t("common.transactions.top-up") }}
      </span>
    </teleport>
    <div class="bg-white px-6 rounded-xl">
      <BaseTable
        :data="users.results"
        :head="tableHead()"
        :total="130"
        :title="$t('all_users')"
        :subtitle="$t('usersPO_count', { count: 130 })"
        v-bind="tableSettings()"
        :filter
        @click-to-row="openUserSingle($event.id)"
      >
        <template #first_name="{ data }">
          <BaseTableUser
            :name="getFullName(data)"
            :phone="data?.phone"
            :image="data?.avatar?.[EImageSize.SMALL]"
            :is-verified="data?.is_verified"
          />
        </template>

        <template #last_login="{ data }">
          <BaseTableDate :date="data?.last_login" />
        </template>

        <template #devices="{ data }">
          <UserSource
            :source="data?.device?.source"
            :src="data?.device?.logo"
            :type="data?.device?.device_type"
          />
        </template>

        <template #date_joined="{ data }">
          <BaseTableDate :date="data?.date_joined" />
        </template>

        <template #action="{ data }">
          <CTableActions
            :actions="tableActions()"
            @delete="deleteUser(data)"
            @open-user="openUserSingle(data.id)"
          />
        </template>

        <template #status="{ data }">
          <WithdrawalStatusBtn
            v-if="data?.status == 'pending'"
            @canceled="console.log('cancelled')"
            @confirm="console.log('confirmed')"
          />
          <BaseBadge
            v-else
            :color="data?.status == 'success' ? 'success' : 'canceled'"
            :status="$t(`statuses.${data?.status}`)"
          />
        </template>

        <template #filter>
          <div class="flex gap-5">
            <FormFilterLabel :label="$t('verification_status')">
              <FormSelect
                v-model="filter.is_verified"
                :options="filterVerificationStatus()"
                selected-option-styles="border-none rounded-lg bg-white"
                value-key="key"
                class="min-w-64"
              />
            </FormFilterLabel>
            <FormFilterLabel :label="$t('interval_of_time')">
              <FilterDateRange
                class="!p-0"
                start-date-key="order_draw_date__gte"
                end-date-key="order_draw_date__lte"
              />
            </FormFilterLabel>
          </div>
        </template>
      </BaseTable>
    </div>
  </section>
  <UserDeleteModal v-model="deleteModal" :user="activeUser" />
</template>

<script lang="ts" setup>
import { useMounted } from "@vueuse/core";
import { useRouteQuery } from "@vueuse/router";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

import { BaseBadge, BaseTable, FormSelect } from "@/components/Base";
import FilterDateRange from "@/components/Base/Form/DatePicker/FilterDateRange.vue";
import FormFilterLabel from "@/components/Base/Form/Label/FormFilterLabel.vue";
import CTableActions from "@/components/Base/Table/Details/BaseTableActions.vue";
import BaseTableDate from "@/components/Base/Table/Details/BaseTableDate.vue";
import BaseTableUser from "@/components/Base/Table/Details/BaseTableUser.vue";
import { users } from "@/mock-data/users";
import WithdrawalStatusBtn from "@/modules/transactions/components/WithdrawalStatusBtn.vue";
import UserDeleteModal from "@/modules/user/components/Modal/UserDeleteModal.vue";
import UserSource from "@/modules/user/components/UserSource.vue";
import {
  filterVerificationStatus,
  tableActions,
  tableHead,
  tableSettings,
} from "@/modules/user/data/PUsers";
import { User } from "@/modules/user/types";
import { EImageSize } from "@/types/common";
import { getFullName } from "@/utils/functions/common";

const router = useRouter();

const mounted = useMounted();

const filter = reactive({
  is_verified: useRouteQuery("is_verified", "all"),
  is_active: useRouteQuery("is_active", "all"),
  citizenship: useRouteQuery("citizenship", "all"),
});

const activeUser = ref();
const deleteModal = ref(false);
function deleteUser(user: User) {
  deleteModal.value = true;
  activeUser.value = user;
}

function openUserSingle(id: string) {
  router.push({ name: "UsersSingle", params: { id } });
}
</script>
