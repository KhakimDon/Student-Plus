<template>
  <div class="flex items-center gap-2">
    <p class="text-xs leading-5 font-[500] font-roboto text-dark">
      {{ $t("review_business_show") }}
    </p>
    <Select
      v-model="itemsCountInTable"
      :disabled="disabled"
      :show-options="true"
      direction="bottom"
      label-key="value"
      selected-option-styles="!px-3 !py-1 bg-gray-3 border-none"
      v-bind="{ options }"
      value-key="value"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, WritableComputedRef } from "vue";

import Select from "../../Base/Form/Select/FormSelect.vue";

interface Props {
  itemsPerPage?: number;
  itemsPerPageDropdownEnabled?: {
    type: boolean;
    required: false;
    default: true;
  };
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
});
const emit = defineEmits(["update:itemsPerPage"]);

const inputItemsPerPage = ref<number>(10);

onMounted(() => {
  inputItemsPerPage.value = props.itemsPerPage;
});

const itemsCountInTable: WritableComputedRef<number> = computed({
  get(): number {
    return props.itemsPerPage;
  },
  set(value: number): void {
    emit("update:itemsPerPage", value);
  },
});

const options = [
  {
    value: 5,
  },
  {
    value: 10,
  },
  {
    value: 15,
  },
  {
    value: 20,
  },

  {
    value: 50,
  },
  {
    value: 100,
  },
  {
    value: 500,
  },
];
</script>
