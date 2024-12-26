<template>
  <div class="flex-center-between w-full gap-5 !justify-end">
    <BasePaginationSize v-if="total > limit" v-model="limit" />

    <ul v-if="items.length > 1" class="pagination flex-y-center gap-2">
      <li
        class="group cursor-pointer"
        :class="[buttonClass, hasFirst ? disableClass : '']"
        @click="prev"
      >
        <button :disabled="hasFirst">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4721 4.47157C10.7324 4.21122 10.7324 3.78911 10.4721 3.52876C10.2117 3.26841 9.7896 3.26841 9.52925 3.52876L5.52925 7.52876C5.27686 7.78114 5.26803 8.18753 5.50922 8.45065L9.17588 12.4506C9.42468 12.7221 9.84639 12.7404 10.1178 12.4916C10.3892 12.2428 10.4076 11.8211 10.1588 11.5497L6.92341 8.02021L10.4721 4.47157Z"
              fill="#8E9BA8"
              class="group-hover:!fill-white transition-300"
            />
          </svg>
        </button>
      </li>

      <li
        v-for="item in items"
        :key="item.label"
        :class="[
          buttonClass,
          item.active ? buttonActiveClass : '',
          item.disable ? disableClass : '',
        ]"
      >
        <span v-if="item.disable" class="w-full h-full flex-center"> ... </span>
        <button v-else class="w-full h-full" @click="goto(item.label)">
          {{ item.label }}
        </button>
      </li>

      <li
        class="group cursor-pointer"
        :class="[buttonClass, hasLast ? disableClass : '']"
        @click="next"
      >
        <button :disabled="hasLast">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.52794 4.47157C5.26759 4.21122 5.26759 3.78911 5.52794 3.52876C5.78829 3.26841 6.2104 3.26841 6.47075 3.52876L10.4708 7.52876C10.7231 7.78114 10.732 8.18754 10.4908 8.45065L6.82412 12.4506C6.57532 12.7221 6.15361 12.7404 5.8822 12.4916C5.61079 12.2428 5.59245 11.8211 5.84124 11.5497L9.07659 8.02021L5.52794 4.47157Z"
              fill="#8E9BA8"
              class="group-hover:!fill-white transition-300"
            />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { computed, onMounted } from "vue";

import BasePaginationSize from "@/components/Base/Pagination/BasePaginationSize.vue";

interface Props {
  total: number;
  disableClass?: string;
}

const props = defineProps<Props>();

const page = useRouteQuery<number>("page", 1, { transform: Number });
const limit = useRouteQuery<number>("limit", 10, { transform: Number });

const pageCount = computed(() => Math.ceil(props.total / limit.value));

const items = computed(() => {
  const valPrev = page.value > 1 ? page.value - 1 : 1; // for easier navigation - gives one previous page
  const valNext =
    page.value < pageCount.value ? page.value + 1 : pageCount.value; // one next page
  const extraPrev = valPrev === 3 ? 2 : null;
  const extraNext =
    valNext === pageCount.value - 2 ? pageCount.value - 1 : null;
  const dotsBefore = valPrev > 3 ? 2 : null;
  const dotsAfter = valNext < pageCount.value - 2 ? pageCount.value - 1 : null;
  const output = [];
  for (let i = 1; i <= pageCount.value; i += 1) {
    if (
      [
        1,
        pageCount.value,
        page.value,
        valPrev,
        valNext,
        extraPrev,
        extraNext,
        dotsBefore,
        dotsAfter,
      ].includes(i)
    ) {
      output.push({
        label: i,
        active: page.value === i,
        disable: [dotsBefore, dotsAfter].includes(i),
      });
    }
  }
  return output;
});

const hasFirst = computed(() => page.value === 1);
const hasLast = computed(() => page.value === pageCount.value);

function prev() {
  if (!hasFirst.value) {
    page.value = page.value - 1;
  }
}

function goto(newPage: number) {
  page.value = newPage;
}

function next() {
  if (!hasLast.value) {
    page.value++;
  }
}

onMounted(() => {
  if (page.value > pageCount.value) {
    page.value = 1;
  }
});

defineExpose({
  page,
  limit,
});

const buttonClass =
  "rounded-md min-w-7 px-1 min-h-7 flex-center transition-300 hover:!bg-primary text-sm leading-4 text-gray-1 hover:!text-white";
const buttonActiveClass = "!bg-primary !text-white";
</script>
