<template>
  <BaseDropdown
    ref="rateSelect"
    :show="showDropdown"
    class="w-[180px]"
    body-class="p-3 flex flex-col gap-1.5"
    head-class="!py-2.5 !px-3 grid grid-cols-max-1-max items-center gap-1 border rounded-md border-gray-300 cursor-pointer text-sm group"
    @toggle="handleToggle"
  >
    <template #head>
      <span class="text-dark-500 pr-2">
        {{ $t("rating") }}
      </span>
      <span
        class="text-right"
        :class="modelv?.length ? 'text-dark' : 'text-gray'"
      >
        {{ modelv?.length ? modelv.join(", ") : $t("all") }}
      </span>
      <div class="h-full">
        <span
          v-if="!modelv?.length"
          :class="{ 'rotate-180': showDropdown }"
          class="icon-arrow-sm text-gray transition-300 text-base group-hover:text-blue inline-block"
        ></span>
        <span
          v-else
          class="icon-xmark text-gray text-sm ml-1"
          @click.stop="clear"
        ></span>
      </div>
    </template>
    <template #body>
      <div
        v-for="i in 5"
        :key="i"
        class="flex items-center gap-1.5 cursor-pointer"
        @click.stop="select(i)"
      >
        <div class="!pointer-events-none">
          <Checkbox :value="i" :checked="modelv.includes(i)" />
        </div>
        <span
          :class="itemsClass[i - 1]"
          class="py-1.5 rounded w-full flex items-center justify-center gap-1"
        >
          <i
            class="icon-filled-star text-base"
            :class="itemsIconClass[i - 1]"
          />
          <span class="text-dark font-semibold">{{ i }}+</span>
        </span>
      </div>
    </template>
  </BaseDropdown>
</template>
<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { ref, watch } from "vue";

import BaseDropdown from "@/components/Base/Dropdown/BaseDropdown.vue";
import Checkbox from "@/components/Base/Form/Checkbox/Checkbox.vue";
import BaseRatingStar from "@/components/Base/Rating/BaseRatingStar.vue";
// import Dropdown from "@/components/Common/Dropdown/Dropdown.vue";

interface Props {
  modelValue: number[];
}

const props = defineProps<Props>();

interface Emits {
  (e: "update:modelValue", val: number[]): void;
}

const emit = defineEmits<Emits>();

const showDropdown = ref(false);

const itemsClass = [
  "bg-red-200/12",
  "bg-red-100/12",
  "bg-yellow/8",
  "bg-green-600/8",
  "bg-green/8",
];

const itemsIconClass = [
  "text-red-200",
  "text-red-100",
  "text-yellow",
  "text-green-200",
  "text-green",
];

// eslint-disable-next-line no-unsafe-optional-chaining
const modelv = ref<number[]>([...props?.modelValue]);

watch(
  () => props.modelValue,
  () => {
    modelv.value = props.modelValue;
  }
);

function handleToggle(val: boolean) {
  showDropdown.value = val;
}

function select(rate: number) {
  if (modelv.value.includes(rate)) {
    modelv.value.splice(modelv.value.indexOf(rate), 1);
  } else {
    modelv.value.push(rate);
  }
  emit("update:modelValue", modelv.value);
}

function clear() {
  showDropdown.value = false;
  modelv.value = [];
  emit("update:modelValue", modelv.value);
}

const rateSelect = ref<HTMLElement | null>(null);
onClickOutside(rateSelect, () => {
  showDropdown.value = false;
});
</script>
