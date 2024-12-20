<template>
  <div ref="select" class="relative">
    <!--  SELECTED OPTION  -->
    <div
      :class="[
        selectedOptionStyles,
        error ? '!border-red' : 'focus-within:border-blue',
        { 'focus-within:border-gray-100 !cursor-not-allowed': disabled },
      ]"
      class="transition-200 px-3 py-2 text-sm transition-all duration-300 border border-gray-300 cursor-pointer flex items-center justify-between gap-0 rounded-lg"
      tabindex="1"
      @click="toggleSelect(!showOptions)"
    >
      <div class="flex items-center">
        <slot name="prefix" />
        <template v-if="!hasPrefix">
          <p
            v-if="!value"
            :class="{ '!text-gray': disabled }"
            class="text-gray select-none"
            tabindex="1"
          >
            {{ placeholder }}
          </p>
          <slot v-else :value="value" name="selectedOption">
            <p
              :class="{ '!text-gray': disabled }"
              class="select-none text-dark"
              tabindex="1"
            >
              {{ value[labelKey] || value }}
            </p>
          </slot>
        </template>
      </div>
      <div class="flex-y-center">
        <div v-if="hasPrefix">
          <p
            v-if="!value"
            :class="{ '!text-gray': disabled }"
            class="text-gray select-none"
            tabindex="1"
          >
            {{ placeholder }}
          </p>
          <p
            v-else
            :class="{ '!text-gray': disabled }"
            class="select-none text-dark"
            tabindex="1"
          >
            {{ value[labelKey] || value }}
          </p>
        </div>
        <slot :show="showOptions" name="chevron">
          <span
            :class="[{ 'rotate-180': showOptions }]"
            class="text-gray-700 icon-chevron-down text-base transition-all duration-200 inline-block shrink-0 ml-1"
          >
          </span>
        </slot>
      </div>
    </div>
    <!--  OPTIONS  -->
    <Transition name="select">
      <div
        v-if="showOptions && !disabled"
        :key="showOptions"
        :class="[direction === 'bottom' ? 'bottom-16' : 'top-full']"
        class="absolute w-full bg-white border border-blue-50 z-10 translate-y-3 overflow-hidden max-h-[300px] overflow-y-scroll text-white rounded shadow-custom"
      >
        <slot name="options">
          <div
            v-for="(option, idx) in options"
            :key="idx"
            :class="[
              { 'bg-gray-3': isActive(option) || (idx == 0 && initialActive) },
              optionStyles,
            ]"
            class="custom-b transition-all duration-200 cursor-pointer hover:bg-gray-6 text-sm font-medium text-dark px-3"
            @click="onSelect(option)"
          >
            <div
              :class="{
                'border-b border-white-100': optionBorder,
              }"
              class="py-3 pr-3"
            >
              <slot :index="idx" :option="option" name="option">
                <div class="">{{ option[labelKey] }}</div>
              </slot>
            </div>
          </div>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { ref, watch } from "vue";

import { TSelectOption } from "@/components/Base/Form/Select/Select";

interface Props {
  modelValue?: TSelectOption;
  options: TSelectOption[];
  labelKey?: string;
  valueKey: string;
  placeholder?: string;
  direction?: "top" | "bottom";
  selectedOptionStyles?: string;
  optionStyles?: string;
  optionBorder?: boolean;
  dark?: boolean;
  error?: boolean;
  disabled?: boolean;
  hasPrefix?: boolean;
  initialActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: "name",
  valueKey: "id",
  placeholder: "Роль",
  optionBorder: true,
  options: () => [
    {
      name: "Наблюдатель",
      id: 1,
    },
    {
      name: "Модератор ",
      id: 2,
    },
  ],
});

interface Emits {
  (e: "on-toggle", value: boolean): void;

  (e: "update:modelValue", value: boolean): void;

  (e: "load"): void;

  (e: "on-select", value: TSelectOption): void;
}

const emit = defineEmits<Emits>();

const showOptions = ref(false);

function toggleSelect(newValue = showOptions.value) {
  showOptions.value = newValue;
  emit("on-toggle", showOptions.value);
}

function findOption(option: TSelectOption) {
  return props.options.find((o) => o == option || o[props.valueKey] == option);
}

const value = ref(findOption(props.modelValue));

function onSelect(option: TSelectOption) {
  value.value = option;
  toggleSelect(false);
  emit("update:modelValue", option[props.valueKey] ?? option);
  emit("on-select", option);
}

const select = ref();
onClickOutside(select, () => toggleSelect(false));

function isActive(option: TSelectOption) {
  return (
    option == value.value ||
    option[props.valueKey as keyof typeof option] == value.value ||
    (typeof value.value == "object" &&
      option[props.valueKey as keyof typeof option] ==
        value.value[props.valueKey])
  );
}

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = findOption(newValue);
  },
  { immediate: true }
);
</script>

<style scoped>
.select-enter-active,
.select-leave-active {
  transition: all 0.2s ease-in-out;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.custom-b:last-child div:first-child {
  border-bottom: 0 !important;
}
</style>
