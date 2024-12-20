<template>
  <label
    :class="{ '!border-red': error }"
    class="grid grid-rows-1-max rounded-lg overflow-hidden border border-transparent transition-300 focus-within:border-blue-500 focus-within:bg-transparent"
  >
    <textarea
      v-model="modelv"
      class="w-full h-full border-none outline-none resize-none p-3 font-normal text-sm leading-4 text-blue placeholder:text-gray-300 caret-blue-primary bg-transparent transition-300"
      v-bind="{ placeholder, max, min }"
      @blur="$emit('blur')"
      @input="handleInput"
    ></textarea>
    <span
      v-if="showMax && max"
      class="text-right block pr-2 pb-1 text-sm font-normal text-gray pointer-events-none"
    >
      {{ modelv?.length }}/{{ max }}
    </span>
  </label>
</template>

<script lang="ts" setup>
import { defineComponent, ref, watch } from "vue";

defineComponent({
  name: "FormTextarea",
});

interface Props {
  placeholder?: string;
  max?: number;
  min?: number;
  modelValue?: string;
  showMax?: boolean;
  error?: boolean;
}

const props = defineProps<Props>();

interface Emits {
  (e: "update:modelValue", v: string): void;

  (e: "blur", v: Event): void;
}

const emit = defineEmits<Emits>();

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const modelv = ref("");

watch(
  () => props.modelValue,
  (v: unknown) => {
    modelv.value = String(v);
  },
  {
    immediate: true,
  }
);

watch(
  () => modelv.value,
  () => {
    if (props?.max && modelv.value?.length > props?.max) {
      modelv.value = modelv.value?.slice(0, props?.max);
      return;
    }
  }
);
</script>
