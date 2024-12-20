<template>
  <div class="space-y-2">
    <FormGroup v-if="services?.length" :label="$t('add_company.category')">
      <CategoryItem
        v-for="(item, i) of services"
        :key="i"
        value-key="title"
        :category="item?.category"
        :sub-category="item?.subCategory"
        @remove-service="removeService(i)"
      />
    </FormGroup>
    <BaseButton
      v-if="services?.length < 3"
      size="sm"
      class="w-full"
      :text="$t('add_company.category')"
      icon="icon-plus text-xl !leading-20"
      icon-position="left"
      main-class="!leading-20"
      @click="showModal = true"
    />
    <BaseModal
      :title="$t('add_service_package')"
      :show="showModal"
      body-class="min-h-[421px] overflow-visible"
      wrapper-class="h-full min-h-[356px] flex flex-col"
      @close="closeModal"
    >
      <p class="text-gray-700 text-sm font-normal leading-130">
        {{ $t("add_company.company_position_text") }}
      </p>
      <Search
        class="mt-6"
        :loading="loading"
        :search-text="form.values.category"
        :search-content="categories"
        :input-label="$t('add_company.service_category')"
        :input-placeholder="$t('add_company.choose_category')"
        :see-all="false"
        :show-selection-suffix="false"
        :with-selected="false"
        :has-selected-value="selectedCategory"
        :is-focused="isFocused"
        type="focus"
        @focus="handleFocusSearch"
        @remove-focus="removeFocus"
        @update:search-value="handleUpdateCategory"
        @clear="clearCategory"
      >
        <template #value>
          <SearchValue
            v-for="(value, index) of categories"
            :key="index"
            :search="form.values.category"
            :title="value?.title"
            :sub-title="value?.category"
            only-title
            @click="handleSelectCategory(value)"
          />
          <div ref="target" />
        </template>
        <template #empty>
          <SearchEmpty
            class="!pt-[52px] !pb-[61px]"
            :title="$t('add_company.empty_category')"
            icon="/sharh/svg/empty-plan.svg"
          />
        </template>
      </Search>
      <CollapseTransition mode="out-in">
        <Search
          v-if="selectedCategory"
          class="mt-6"
          :loading="childLoading"
          :search-text="form.values.subCategory"
          :search-content="childCheckedValues"
          :input-label="$t('add_company.sub_category_title')"
          :input-placeholder="$t('add_company.sub_category_text')"
          :see-all="false"
          :show-selection-suffix="false"
          :with-selected="false"
          :has-selected-value="selectedSubCategory"
          :is-focused="isChildFocused"
          type="focus"
          @clear="clearSubCategory"
          @focus="isChildFocused = true"
          @remove-focus="removeChildFocus"
          @update:search-value="handleUpdateSubCategory"
        >
          <template #value>
            <SearchValue
              v-for="(value, index) of childCheckedValues"
              :key="index"
              :search="form.values.subCategory"
              :title="value?.title"
              :sub-title="value?.category"
              :only-title="true"
              @click="handleSelectSubCategory(value)"
            />
            <div ref="childTarget" />
          </template>
          <template #empty>
            <SearchEmpty
              :title="$t('add_company.empty_subcategory')"
              class="!pt-[52px] !pb-[61px]"
              icon="/sharh/svg/empty-plan.svg"
            />
          </template>
        </Search>
      </CollapseTransition>
      <BaseButton
        :disabled="
          !(
            !form.$v.value.category?.$invalid &&
            !form.$v.value.subCategory?.$invalid
          )
        "
        :text="$t('add1')"
        class="w-full mt-auto"
        @click="addService"
      />
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import { required } from "@vuelidate/validators";
import { useIntersectionObserver } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";

import BaseButton from "@/components/Base/Button/BaseButton.vue";
import CategoryItem from "@/components/Base/Form/Select/Category/Details/CategoryItem.vue";
import SearchEmpty from "@/components/Base/Form/Select/Search/Empty.vue";
import Search from "@/components/Base/Form/Select/Search/Search.vue";
import SearchValue from "@/components/Base/Form/Select/Search/Value.vue";
import BaseModal from "@/components/Base/Modal/BaseModal.vue";
import FormGroup from "@/components/Form/Group/Group.vue";
import { useForm } from "@/composables/useForm";
import { useCategoriesWithSubStore } from "@/store/categoriesWithSub";

defineComponent({
  name: "SelectCategory",
});
interface Props {
  services?: {
    category: {
      title: string;
      id: number;
    };
    subCategory: {
      title: string;
      id: number;
    };
  }[];
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "setServices", value: object): void;
  (e: "removeService", value: number): void;
}>();

const commonStore = useCategoriesWithSubStore();
commonStore.fetchCategories({ limit: 5 });

const showModal = ref(false);

const loading = ref(false);
const childLoading = ref(false);

const selectedCategory = ref(false);
const selectedSubCategory = ref(false);

const isFocused = ref(false);
const isChildFocused = ref(false);

const form = useForm<{
  category?: string;
  selectedCategory?: object;
  subCategory?: string;
  selectedSubCategory?: object;
  provideServices?: object;
}>(
  {
    category: undefined,
    subCategory: undefined,
    provideServices: [],
  },
  {
    category: { required },
    subCategory: { required },
  },
  { $stopPropagation: true }
);

const categories = computed(() => commonStore.categories);
const childCategories = computed(() => commonStore.childCategories);
const childCheckedValues = computed(() => {
  if (props?.services?.length) {
    return childCategories.value.filter(
      (child, i) => props?.services[i]?.subCategory?.id !== child?.id
    );
  } else {
    return childCategories.value;
  }
});
const next = computed(() => commonStore.categoriesNext);

const target = ref(null);
const targetIsVisible = ref(false);
const childTarget = ref(null);
const childTargetIsVisible = ref(false);
const limit = ref(5);

const handleFocusSearch = () => {
  isFocused.value = true;
};

const removeFocus = () => {
  setTimeout(() => {
    isFocused.value = false;
  }, 100);
};
const removeChildFocus = () => {
  setTimeout(() => {
    isChildFocused.value = false;
  }, 100);
};
const clearCategory = () => {
  form.values.category = undefined;
  form.values.subCategory = undefined;
  selectedCategory.value = false;
};
const clearSubCategory = () => {
  form.values.subCategory = undefined;
};

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting;
  if (targetIsVisible.value && next?.value !== null) {
    limit.value += 4;
    commonStore.fetchCategories({ limit: limit.value, force: true });
  }
});
useIntersectionObserver(childTarget, ([{ isIntersecting }]) => {
  childTargetIsVisible.value = isIntersecting;
  if (childTargetIsVisible.value && next?.value !== null) {
    limit.value += 4;
    commonStore.fetchSubCategories({
      limit: limit.value,
      force: true,
      is_null: false,
      parent: form.values.selectedCategory?.id,
    });
  }
});

const handleUpdateCategory = async (value: string) => {
  form.values.category = value;
  selectedCategory.value = false;
  loading.value = true;
  await commonStore
    .fetchCategories({ search: value, force: true })
    .finally(() => {
      setTimeout(() => {
        loading.value = false;
      }, 300);
    });
};
const handleUpdateSubCategory = async (value: string) => {
  selectedSubCategory.value = false;
  form.values.subCategory = value;
  childLoading.value = true;
  await commonStore
    .fetchSubCategories({
      search: value,
      force: true,
      is_null: false,
      parent: form.values.selectedCategory.value?.id,
    })
    .finally(() => {
      setTimeout(() => {
        childLoading.value = false;
      }, 300);
    });
};
const handleSelectCategory = async (value: string) => {
  form.values.selectedCategory = value;
  form.values.category = value?.title;
  form.values.subCategory = undefined;
  selectedCategory.value = true;
  await commonStore
    .fetchSubCategories({
      parent: value?.id,
      force: true,
      is_null: false,
    })
    .finally(() => {
      removeFocus();
    });
};
const handleSelectSubCategory = async (value: string) => {
  form.values.selectedSubCategory = value;
  form.values.subCategory = value?.title;
  selectedSubCategory.value = true;
};

const addService = () => {
  const localeValue = {
    category: form.values.selectedCategory,
    subCategory: form.values.selectedSubCategory,
  };
  emit("setServices", localeValue);
  form.values.category = undefined;
  form.values.subCategory = undefined;
  form.values.selectedCategory = undefined;
  form.values.selectedSubCategory = undefined;
  selectedCategory.value = false;
  showModal.value = false;
};
const removeService = (value: number) => {
  emit("removeService", value);
};
const closeModal = () => {
  selectedCategory.value = false;
  selectedSubCategory.value = false;
  form.values.category = undefined;
  form.values.subCategory = undefined;
  showModal.value = false;
};
</script>
