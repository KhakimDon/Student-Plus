<template>
  <div class="c-date-picker relative w-full h-[42px]">
    <VueDatePicker
      ref="datePicker"
      v-model="value"
      :disabled="disabled"
      :hide-navigation="[
        'month',
        'year',
        'calendar',
        'time',
        'minutes',
        'hours',
        'seconds',
      ]"
      :max-date="maxDate || ''"
      :min-date="minDate"
      :month-change-on-scroll="false"
      :text-input-options="{
        enterSubmit: true,
        openMenu: false,
        format: 'dd.MM.yyyy',
      }"
      auto-apply
      class="h-full"
      format="dd.MM.yyyy"
      @update:model-value="onChangeValue"
    >
      <template #dp-input="{ value }">
        <div class="relative">
          <FormInput
            v-maska="'##.##.####'"
            :disabled="disabled"
            :model-value="value"
            :placeholder="placeholder"
            class="absolute w-full h-full !rounded-[10px] top-0 left-0 pr-[14px] !text-dark-400"
            input-class="!text-dark-400 !rounded-[10px]"
            v-bind="{ error }"
            @blur="emit('blur')"
            icon="icon-calendar"
            @update:model-value="value.start = $event as string"
          />

          <div
            v-if="!value"
            class="bg-gray-12 flex items-center rounded-r-lg justify-center absolute h-9 top-1/2 w-10 -translate-y-1/2 right-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16 3V7M8 3V7M4 11H20M11 15H12V18M4 7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7Z"
                stroke="#0D0A01"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M16 3V7M8 3V7M4 11H20M11 15H12V18M4 7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7Z"
              stroke="#0D0A01"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </template>
    </VueDatePicker>
  </div>
</template>

<script lang="ts" setup>
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, watch } from "vue";

import VueDatePicker from "@vuepic/vue-datepicker";

import FormInput from "@/components/Base/Form/Input/FormInput.vue";

interface Props {
  modelValue: string;
  error?: boolean;
  maxDate?: string;
  minDate?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = defineProps<Props>();

interface Emits {
  (event: "blur"): void;

  (event: "update:modelValue", value?: string): void;
}

const emit = defineEmits<Emits>();

const value = ref();

const datePicker = ref();

const showMenu = ref(false);

const onChangeValue = (value: string) => {
  emit("update:modelValue", value);

  showMenu.value = false;
};

watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  },
  {
    immediate: true,
  },
);
</script>

<style>
.c-date-picker .dp__overlay_container {
  height: 288px !important;
}

.c-date-picker .dp__input {
  padding: 8px 12px !important;
}

.c-date-picker .dp__input_wrap svg {
  display: none !important;
}
.dp__range_end,
.dp__range_start,
.dp__active_date {
  background: #2e77e5 !important;
}
</style>
