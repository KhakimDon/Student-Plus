<template>
  <BaseModal
    :model-value="modalValue"
    :title="t('transaction_modal_info.title')"
    @close="$emit('close')"
  >
    <!--    <pre class="text-[6px]">{{ data }}</pre>-->
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <span class="text-xs text-gray-1"> {{ $t("user") }}</span>
        <BaseTableUser
          :image="data?.account?.user?.avatar?.s100x100"
          :name="data?.account?.user?.full_name"
          :phone="data?.account?.user?.phone"
          class="!gap-2"
        />
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs text-gray-1">
          {{ $t("finance_tool") }}
        </span>
        <FinanceSource
          :abr-title="data?.stock?.abbreviated_title"
          :src="data?.stock?.logo?.s100x100"
          :stk="data?.stock?.stk_or_sms"
          :title="data?.stock?.short_title"
        />
      </div>

      <div class="flex flex-col">
        <span class="text-xs text-gray-1"> {{ $t("requestForBuy") }} </span>
        <div>
          <span class="text-sm font-medium text-dark-black">
            {{ dayjs(data?.order_draw_date).format("DD.MM.YYYY") }} </span
          >,
          <span class="text-sm font-medium text-gray-1">
            {{ data?.order_draw_time.split(":").slice(0, 2).join(":") }}
          </span>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs text-gray-1">{{ $t("quantity") }}</span>
        <span class="leading-130 font-medium"
          >{{ getStockPrefix(data?.type) }}{{ data?.quantity
          }}{{ $t("count") }}.</span
        >
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs text-gray-1">{{ $t("price_share") }}</span>
        <span class="leading-130 font-medium">
          {{ formatMoneyDecimal(data?.price) }} UZS
        </span>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs text-gray-1">{{ $t("sum_of_order") }}</span>
        <span class="leading-130 font-medium">
          {{ formatMoneyDecimal(data?.total_amount) }} UZS
        </span>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs text-gray-1">{{ $t("commission") }}</span>
        <span class="leading-130 font-medium">
          {{ formatMoneyDecimal(data?.total_amount) }} UZS
        </span>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs text-gray-1">{{ $t("sum") }}</span>
        <span class="leading-130 font-medium">
          {{ formatMoneyDecimal(data?.total_amount) }} UZS
        </span>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs text-gray-1">{{ $t("trade") }} </span>

        <BaseBadge
          :color="data?.type"
          :status="$t(`market.types.${data?.type}`)"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";

import { BaseBadge } from "@/components/Base";
import BaseModal from "@/components/Base/Modal/BaseModal.vue";
import User from "@/components/Base/Table/Details/BaseTableUser.vue";
import BaseTableUser from "@/components/Base/Table/Details/BaseTableUser.vue";
import FinanceSource from "@/components/Common/Finance/FinanceSource.vue";

import { formatMoneyDecimal, getStockPrefix } from "../../../utils";

const { t } = useI18n();

interface Props {
  modalValue: boolean;
  data: object;
}

defineProps<Props>();
</script>
