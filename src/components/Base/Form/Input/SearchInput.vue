<template>
  <FormInput
    v-bind="{ modelValue }"
    :placeholder="$t('search')"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <template #prefix>
      <i class="icon-search text-xl leading-5 text-gray-300"></i>
    </template>
    <template #suffix>
      <button
        class="icon-x-mark text-xl leading-5 text-gray-300 transition-300"
        :class="{ 'rotate-[360deg] scale-0': !modelValue }"
        @click="$emit('update:modelValue', '')"
      ></button>
    </template>
  </FormInput>
</template>

<script setup lang="ts">
import FormInput from "@/components/Base/Form/Input/FormInput.vue";

interface Props {
  modelValue: number | string;
}
defineProps<Props>();

interface Emits {
  (event: "update:modelValue", value: Props["modelValue"]): void;
}
const emit = defineEmits<Emits>();
</script>
