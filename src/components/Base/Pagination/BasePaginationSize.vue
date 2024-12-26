<template>
  <div class="flex items-center gap-2">
    <p class="text-xs leading-5 font-medium text-dark">
      {{ $t("form.pagination.show") }}
    </p>

    <FormSelect
      v-model="value"
      :disabled="disabled"
      show-options
      direction="bottom"
      value-key="value"
      label-key="value"
      selected-option-styles="!px-3 !py-1 bg-white-1 border-none"
      v-bind="{ options }"
    />
  </div>
</template>

<script lang="ts" setup>
import { FormSelect } from "@/components/Base";

interface Props {
  disabled?: boolean;
}

defineProps<Props>();

const value = defineModel<number>({
  default: 10,
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
