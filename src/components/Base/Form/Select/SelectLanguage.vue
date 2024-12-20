<template>
  <BaseDropdown
    ref="languageSelect"
    :show="showDropdown"
    class="w-[180px]"
    body-class="p-3 flex flex-col gap-1.5"
    head-class="!py-2 !px-3 grid grid-cols-max-1-max items-center gap-1 border rounded-md border-gray-300 cursor-pointer text-sm group"
    @toggle="handleToggle"
  >
    <template #head>
      <span class="text-dark-500 pr-2">
        {{ $t("languages") }}
      </span>
      <span
        class="text-right"
        :class="modelv?.length ? 'text-dark' : 'text-gray'"
      >
      </span>
      <div class="h-full">
        <span
          v-if="modelv?.length && showX"
          class="icon-xmark text-gray text-sm ml-1"
          @click.stop="clear"
        ></span>
        <span
          v-else
          :class="{ 'rotate-180': showDropdown }"
          class="icon-arrow-sm absolute right-2 top-2 text-gray transition-300 text-xl group-hover:text-blue inline-block"
        ></span>
      </div>
    </template>
    <template #body>
      <div
        v-for="(language, idx) in languageTabs"
        :key="idx"
        class="flex items-center gap-1.5 cursor-pointer"
        @click.stop="select(language.value)"
      >
        <div class="!pointer-events-none flex items-center py-1">
          <Checkbox
            :value="language.value"
            :checked="modelv.includes(language.value)"
          />
        </div>
        <p class="text-sm leading-140 text-dark-500">{{ language.label }}</p>
      </div>
    </template>
  </BaseDropdown>
</template>
<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { reactive, ref, watch } from "vue";

import BaseDropdown from "@/components/Base/Dropdown/BaseDropdown.vue";
import Checkbox from "@/components/Base/Form/Checkbox/Checkbox.vue";
import { languageTabs } from "@/modules/common/blogs/data";

interface Props {
  modelValue: string[];
}

const props = defineProps<Props>();

interface Emits {
  (e: "update:modelValue", val: string[]): void;
}
const emit = defineEmits<Emits>();

const showDropdown = ref(false);

let modelv = reactive<string[]>([...props?.modelValue]);

watch(
  () => props.modelValue,
  () => {
    modelv = props.modelValue;
  }
);

function handleToggle(val: boolean) {
  showDropdown.value = val;
}
const showX = ref(false);
function select(language: string) {
  if (modelv.includes(language)) {
    modelv.splice(modelv.indexOf(language), 1);
    showX.value = false;
  } else {
    modelv.push(language);
  }
  emit("update:modelValue", modelv);
  showX.value = true;
}

function clear() {
  showDropdown.value = false;
  modelv = [];
  emit("update:modelValue", modelv);
  showX.value = false;
}

const languageSelect = ref<HTMLElement | null>(null);
onClickOutside(languageSelect, () => {
  showDropdown.value = false;
});
</script>
