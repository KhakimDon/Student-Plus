<template>
  <div
    class="bg-white rounded-lg p-6 max-w-[910px] mx-auto space-y-5 shadow-auth"
  >
    <div class="space-y-3">
      <div class="flex items-center space-x-6">
        <button
          class="icon-arrow-lg rotate-180 text-2xl text-blue-800 transition-all duration-300 hover:text-blue"
          @click="$emit('close')"
        />
        <h4 class="text-2xl text-dark font-semibold leading-130">
          {{ $t("review_business_search_results") }}
        </h4>
      </div>
      <div class="flex items-center">
        <FormInput
          id="search"
          :model-value="search"
          :placeholder="$t('review_business_search')"
          input-class="leading-130 text-sm font-medium pr-3 placeholder:font-normal"
          prefix-class="leading-130"
          suffix-class="relative inline-block pr-3"
          @update:model-value="handleUpdateSearch"
        >
          <template #prefix>
            <span
              class="icon-magnifer text-base text-blue-200 dark:text-blue-100"
            />
          </template>
          <template #suffix>
            <button
              v-if="search?.length"
              :class="{ '!opacity-100 !visible': search?.length }"
              class="icon-xmark text-lg transition-100 leading-22 opacity-0 invisible"
              @click="clear"
            />
          </template>
        </FormInput>
      </div>
      <Select
        v-model="regionValue"
        :options="regions"
        :placeholder="$t('review_business_select_region')"
        class="max-w-[302px]"
        label-key="name"
        selected-option-styles="!bg-transparent !border-gray-300 !rounded-lg  !text-dark !font-medium !text-[13px]"
        value-key="id"
      >
        <template #prefix>
          <div class="inline-flex items-center">
            <span class="text-gray-700 text-[13px] font-medium leading-130">
              {{ $t("review_business_region") }}
            </span>
            <hr class="h-4 bg-gray-100 w-px mx-2" />
          </div>
        </template>
        <template #chevron>
          <span class="icon-chevron-up-down text-lg text-gray-700 leading-18" />
        </template>
      </Select>
    </div>
    <Transition mode="out-in" name="dropdown">
      <div v-if="companies?.length" :key="loading" class="space-y-3">
        <Transition mode="out-in" name="dropdown">
          <div :key="loading" class="space-y-3">
            <h4 class="text-base text-dark font-medium leading-130">
              {{ $t("review_business_find_business") }}
            </h4>
            <div class="space-y-4">
              <template v-if="loading">
                <Company v-for="company of 3" :key="company" loading />
              </template>
              <template v-else>
                <Company
                  v-for="(company, i) of companies"
                  :key="i"
                  :company="company"
                  :loading="loading"
                  @get-access="handleGetAccess"
                />
                <template v-if="loadingMore && companies?.length">
                  <Company
                    v-for="company of 3"
                    :key="company"
                    :loading="loadingMore"
                    @get-access="handleGetAccess"
                  />
                </template>
              </template>
            </div>
          </div>
        </Transition>
        <SButton
          v-if="next"
          :text="$t('show_more')"
          class="flex mx-auto !rounded-lg !mt-5"
          variant="secondary"
          :loading="loading || loadingMore"
          @click="loadMore"
        />
      </div>
      <div v-else>
        <SearchEmpty
          :sub-title="$t('review_business_auth.you_can_add_your_company')"
          :title="$t('review_business_auth.empty_business')"
          icon="/sharh/svg/empty.svg"
          icons-size="w-[164px] h-[164px]"
          sub-title-class="!text-base !mb-8"
          title-class="!text-xl"
        >
          <template #action>
            <RouterLink :to="redirectRouteUrl">
              <SButton
                :text="$t('review_business_auth.add_business')"
                class="!rounded-[6px] !py-3 !px-7"
              />
            </RouterLink>
          </template>
        </SearchEmpty>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import SearchEmpty from "@/components/Auth/Search/Empty.vue";
import Company from "@/components/Card/Company/Company.vue";
import SButton from "@/components/Common/Button/SButton.vue";
import FormInput from "@/components/Form/Input/Input.vue";
import Select from "@/components/Form/Select/Select.vue";
import { useRouteQuery } from "@/composables/useQueryChange";
import { useCommonStore } from "@/store/common";
import { useCompaniesStore } from "@/store/companies";
import { ICompany } from "@/types/company";
import { debounce } from "@/utils/functions/common";

const { t } = useI18n();

interface Props {
  companies: ICompany[];
  loading?: boolean;
  loadingMore?: boolean;
  region?: string;
}

const props = defineProps<Props>();

interface Emits {
  (e: "close"): void;
  (e: "loadMoreCompanies"): void;
  (e: "searchCompanies", value: string): void;
  (e: "searchByRegion", value: string): void;
  (e: "getAccess", value: ICompany): void;
}
const emit = defineEmits<Emits>();

const commonStore = useCommonStore();
commonStore.fetchRegions({ limit: 20 });
const companiesStore = useCompaniesStore();
companiesStore.fetchMyCompanies();

const { updateQuery } = useRouteQuery();
const route = useRoute();

const search = ref(String(route?.query?.search));

const next = computed(() => companiesStore.$state.next);
const regions = computed(() => [
  { name: t("all_regions"), id: "" },
  ...commonStore.regions,
]);
const regionValue = computed({
  get() {
    return props?.region;
  },
  set(value) {
    emit("searchByRegion", value?.id ?? String(value));
  },
});
const redirectRouteUrl = computed(() => {
  return `/add-company?search=${search.value}`;
});

const handleUpdateSearch = async (value: string) => {
  debounce("search", async () => {
    search.value = value;
    emit("searchCompanies", search.value);
  });
};

const handleGetAccess = (value: ICompany) => {
  emit("getAccess", value);
};
const loadMore = () => {
  emit("loadMoreCompanies");
};
const clear = async () => {
  search.value = "";
  await updateQuery("search", "");
  emit("searchCompanies", "");
};

defineComponent({
  name: "SearchResults",
});
</script>
