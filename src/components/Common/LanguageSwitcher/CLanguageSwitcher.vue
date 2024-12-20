<template>
  <BaseDropdown
    ref="switcherRef"
    :head-class="[
      'flex items-center gap-1 text-gray-700 hover:opacity-80 transition-300 cursor-pointer py-2 transition-colors duration-300',
    ]"
    :show="showDropdown"
    body-class="!w-[180px] min-w-fit border border-[#E5EAEE] bg-white rounded-xl shadow-none"
    @toggle="handleDropdownToggle"
  >
    <template #head>
      <img
        :alt="currentLanguage?.name"
        :src="currentLanguage?.flag"
        class="w-4 h-4"
      />
      <span class="text-13 text-gray-0 font-medium transition-300">
        {{ currentLanguage?.name }}
      </span>
      <span
        :class="[{ '!rotate-90': showDropdown }]"
        class="icon-chevron text-xs leading-3 font-bold text-gray-0 transition-transforms transition-300 -rotate-90"
      ></span>
    </template>
    <template #body>
      <div v-for="(lang, index) in languages" :key="index" class="w-full">
        <div
          class="flex items-center justify-between gap-4 py-2 pl-4 pr-2 cursor-pointer transition-300 hover:bg-gray-500/30 border-b border-[#E5EAEE]"
          @click="changeLocale(lang?.code)"
        >
          <div class="flex space-x-1">
            <img :alt="lang.code" :src="lang.flag" class="w-5 h-5" />
            <span
              :class="{ 'font-semibold': lang?.code === currentLanguage?.code }"
              class="text-sm font-normal text-dark"
            >
              {{ lang.name }}
            </span>
          </div>
          <span
            v-if="lang?.code === currentLanguage?.code"
            class="icon-tick text-sm leading-5 text-blue"
          />
        </div>
      </div>
    </template>
  </BaseDropdown>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { computed, ref } from "vue";

import BaseDropdown from "@/components/Base/Dropdown/BaseDropdown.vue";

interface Props {
  variant: "default" | "transparent";
}

defineProps<Props>();

const languages = [
  {
    name: "O'zbekcha",
    code: "uz",
    flag: "/images/svg/flags/Flags-1.svg",
  },
  // {
  //   name: "Qaraqalpaqsha",
  //   code: "kaa",
  //   flag: "/svg/flags/rounded/kaa.svg",
  // },
  // {
  //   name: "English",
  //   code: "en",
  //   flag: "/svg/flags/rounded/uk.svg",
  // },
  // {
  //   name: "Ўзбекча",
  //   code: "sr",
  //   flag: "/images/svg/flags/Flags-1.svg",
  // },
  {
    name: "Русский",
    code: "ru",
    flag: "/images/svg/flags/Flags.svg",
  },
];

const locale = localStorage.getItem("locale");

const showDropdown = ref(false);
const currentLanguage = computed(() =>
  languages.find((lang) => lang.code === locale)
);

function handleDropdownToggle(val: boolean) {
  showDropdown.value = val;
}

function changeLocale(_locale: string) {
  localStorage.setItem("locale", _locale);
  window.location.reload();
}

const switcherRef = ref<HTMLElement | null>(null);
onClickOutside(switcherRef, () => {
  showDropdown.value = false;
});
</script>
