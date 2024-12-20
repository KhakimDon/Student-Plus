<template>
  <label
    :class="{ '!cursor-not-allowed': disabled }"
    class="cursor-pointer flex items-center space-x-4 w-max"
  >
    <div
      :class="[
        modelValue ? 'bg-yellow-dark ' + activeClass : 'bg-[#E3E3E3]',
        { '!cursor-not-allowed': disabled },
      ]"
      class="flex relative w-9 h-5 rounded-[48px] cursor-pointer transition-all duration-200"
    >
      <input
        :checked="modelValue"
        class="absolute w-px h-px opacity-0 peer"
        type="checkbox"
        v-bind="{ disabled }"
        @input="handleInput"
      />
      <span
        :class="
          modelValue ? 'translate-x-4 bg-white' : 'translate-x-0 bg-gray-0'
        "
        class="absolute w-4 h-4 rounded-full top-0.5 left-0.5 transition-all duration-200 peer-disabled:bg-white-100 peer-disabled:translate-x-0"
      />
    </div>
    <span
      v-if="label"
      :class="[{ 'text-gray': disabled }, labelClass]"
      class="text-dark text-sm font-normal leading-130 select-none"
    >
      {{ label }}
    </span>
  </label>
</template>
<script lang="ts" setup>
import { defineComponent, ref, watch } from "vue";

import { TClassName } from "@/types/common";

interface Props {
  modelValue: boolean;
  disabled?: boolean;
  label?: string;
  labelClass?: TClassName;
  activeClass?: string;
}

defineComponent({
  name: "FormToggle",
});

const props = withDefaults(defineProps<Props>(), {
  label: "",
  labelClass: "",
});
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const value = ref(false);

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue;
  },
  { immediate: true }
);

const handleInput = (e: Event) => {
  const target = e?.target;

  if (target === null) {
    return;
  }
  value.value = target.checked;
  emit("update:modelValue", value.value);
};
</script>
