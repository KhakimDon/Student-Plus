<template>
  <div>
    {{ search }}
    <header :class="headerClass" class="flex justify-between py-6 gap-3">
      <div>
        <h2
          :class="titleClass"
          class="whitespace-nowrap text-xl leading-[23px] font-medium text-dark"
        >
          {{ title }}
        </h2>
        <p
          :class="subtitleClass"
          class="text-xs font-normal text-gray-1 mt-1.5 whitespace-nowrap"
        >
          {{ subtitle }}
        </p>
      </div>
      <div
        class="flex gap-2 2xl:gap-5 flex-wrap w-full justify-end"
        :class="actionsClass"
      >
        <div class="shrink-0" :class="beforeSearchClass" @click="toggle">
          <slot name="filterTrigger" />
        </div>

        <div class="flex gap-2 justify-end 2xl:gap-5">
          <FormInput
            v-if="!noSearch"
            v-model="search"
            :placeholder="$t('search')"
            input-class="placeholder:font-medium"
            class="!min-w-[215px] max-w-sm"
            suffix-class="pr-2"
            prefix-class="pl-2.5 text-xl text-gray !py-0"
            :maxlength="150"
          >
            <template #prefix>
              <span class="icon-search text-gray-1 text-2xl"></span>
            </template>
            <template #suffix>
              <button
                :class="{ '!opacity-100 !visible': search?.length }"
                class="icon-xmark text-dark text-xs transition-200 hover:text-red opacity-0 invisible"
                @click="clearSearch"
              />
            </template>
          </FormInput>
          <slot name="afterSearch" />
        </div>
      </div>
    </header>

    <slot name="filter">
      <Transition name="dropdown">
        <div v-if="isOpen" class="flex font-[400] text-[12px] gap-[16px] bg-[#F2F2F2] p-[16px] rounded-[8px] mb-[24px]">
          <div class="flex flex-col items-start gap-[8px]">
            <span>Типы транзакции</span>
            <Select class="max-w-[440px] w-[100%]">

            </Select>
          </div>
          <div class="flex flex-col items-start gap-[8px]">
            <span>Время транзакции</span>
            <DateRangePicker class="max-w-[440px] w-[100%]" model-value=""/>
          </div>
          <div class="flex flex-col items-start gap-[8px]">
            <span>Время транзакции</span>
            <Select class="max-w-[440px] w-[100%]">

            </Select>
          </div>
        </div>
      </Transition>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { FormInput } from "@/components/Base";
import { TForm } from "@/composables/useForm";
import useToggle from "@/composables/useToggle";
import { TransactionForm } from "@/modules/transactions/types";
import SelectCategory from "@/components/Base/Form/Select/Category/SelectCategory.vue";
import Select from "../../Base/Form/Select/FormSelect.vue";
import DateRangePicker from "@/components/Base/Form/DatePicker/DateRangePicker.vue";

type Props = {
  title: string;
  subtitle?: string;
  titleClass?: string;
  subtitleClass?: string;
  noSearch?: boolean;
  headerClass?: string;
  actionsClass?: string;
  beforeSearchClass?: string;
};

defineProps<Props>();
const search = defineModel<string>("search", {
  required: true,
});
const filter = defineModel<TForm<TransactionForm>>("filter", {
  required: true,
});

const { isOpen, open, toggle } = useToggle();

function clearSearch() {
  search.value = "";
}
</script>
