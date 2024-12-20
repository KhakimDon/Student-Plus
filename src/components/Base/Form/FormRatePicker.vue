<template>
  <div class="flex gap-1.5 star-container" @mouseleave="hoveredItem = 0">
    <span
      v-for="i in 5"
      :key="i"
      class="icon-star text-[32px] leading-8 cursor-pointer transition-300 w-[54px] h-[54px] flex-center rounded border border-transparent bg-[#F2F4F9]"
      :class="[
        starColor(i),
        { '!border-red-300 !bg-red-50': error },
        iconClass,
      ]"
      :data-star-index="i"
      @mouseenter="hoveredItem = i"
      @click="pick(i)"
    >
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref, unref } from "vue";

interface Props {
  modelValue: number;
  error?: boolean;
  iconClass?: string;
}
const props = defineProps<Props>();

interface Emits {
  (e: "update:modelValue", val: number): void;
}
const emit = defineEmits<Emits>();

const rate = ref(0);
rate.value = unref(props.modelValue);
// watch(
//   () => props.modelValue,
//   (newValue) => {
//     if (newValue !== rate.value) rate.value = newValue
//   },
//   { immediate: true }
// )

const hoveredItem = ref(0);

const pick = (val: number) => {
  if (val === 1 && rate.value === 1) {
    val = 0;
  }
  rate.value = val;
  emit("update:modelValue", val);
};

const starColor = (index: number) => {
  return !!hoveredItem.value && hoveredItem.value >= index
    ? "text-blue-main"
    : !hoveredItem.value && rate.value >= index
    ? "text-blue-main"
    : "text-[#848D9F]";
};
</script>
