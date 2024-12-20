<template>
  <Select
    :options="platformList"
    selected-option-styles="bg-gray-300"
    option-styles="bg-white"
    :placeholder="t('select_platform')"
    value-key="value"
    label-key="label"
    v-bind="{ modelValue, disabled }"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #selectedOption="{ value }">
      <img :src="value?.icon" :alt="value?.value" />
    </template>
    <template #option="{ option }">
      <img :src="option?.icon" :alt="value?.value" />
    </template>
  </Select>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { platformList } from "@/components/Base/Form/Select/Platform/SelectPlatform.data";
import Select from "../FormSelect.vue";

interface Props {
  modelValue: string;
  disabled?: boolean;
}
defineProps<Props>();

defineEmits<{
  (e: "update:modelValue", val: string): void;
}>();

const { t } = useI18n();
</script>
