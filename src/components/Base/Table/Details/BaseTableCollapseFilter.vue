<script setup lang="ts">
import { computed, defineEmits, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { nonClearableKeys } from "@/data/table";
import { getObjectKeys } from "@/utils";

const buttonOpen = ref(null);

const emit = defineEmits(["clearFilter", "onClick"]);

const props = defineProps<{
  filter: Record<string, any>;
}>();

const filterKeys = computed(() => getObjectKeys(props.filter));

const activeCount = computed(() => {
  const baseCount =
    filterKeys.value?.map((el) => !!route.query[el]).filter((el) => el)
      .length || 0;

  // Dynamically check for keys with `__gte` or `__lte` in the query parameters
  const rangeCount = Object.keys(route.query).some(
    (key) => key.includes("__gte") || key.includes("__lte")
  )
    ? 1
    : 0;

  return baseCount + rangeCount;
});

const modelValue = defineModel<boolean>();

const router = useRouter();
const route = useRoute();

const updateModelValue = (value: boolean) => {
  modelValue.value = value;
};

const handleClearFilter = async () => {
  const query = { ...route.query };
  for (const key in query) {
    if (nonClearableKeys.includes(key)) {
      continue;
    }
    delete query[key];
  }
  await router.push({ query });
  emit("clearFilter");
};

const handleClick = () => {
  const newValue = !modelValue.value;
  updateModelValue(newValue);
  updateQuery(newValue);
};

const updateQuery = (value: boolean) => {
  const query = { ...route.query };
  if (value) {
    query.showFilter = "true";
  } else {
    delete query.showFilter;
  }
  router.push({ query });
};

const buttonClasses = computed(() => ({
  "bg-gray": !modelValue.value,
  "bg-primary/20 text-primary": modelValue.value,
}));

watch(
  () => route.query.showFilter,
  (newFilter) => {
    updateModelValue(newFilter === "true");
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex flex-row gap-5">
    <transition name="slide-left">
      <button
        v-if="modelValue"
        class="rounded-md text-yellow-dark text-sm px-6 py-2.5 h-10 gap-2 font-medium bg-yellow-dark/10 hover:bg-yellow-dark/20 flex items-center justify-center transition-300"
        @click="handleClearFilter"
      >
        <i class="icon-filter-clear text-xl leading-5 text-yellow-dark" />
        {{ $t("clear_filter") }}
      </button>
    </transition>

    <button
      id="filterButton"
      ref="buttonOpen"
      class="w-10 h-10 bg-dark-2/5 text-gray-1 relative transition-all duration-300 rounded-md flex items-center justify-center"
      :class="[
        buttonClasses,
        { '!text-yellow-dark !bg-yellow-dark/10': !modelValue && activeCount },
      ]"
      @click="handleClick"
    >
      <transition name="fade">
        <span
          v-if="!modelValue && activeCount"
          class="absolute top-[-5px] right-[-5px] rounded-full bg-red text-white size-4 flex items-center justify-center text-[11px] font-medium"
        >
          {{ activeCount }}
        </span>
      </transition>
      <i v-if="!modelValue" class="icon-filter text-xl leading-5" />
      <i v-else class="icon-x-mark text-xl leading-5 text-dark-black" />
    </button>
  </div>
</template>
