<template>
  <div
    class="relative inline-flex items-center"
    @mouseleave="toggleTooltip(false)"
  >
    <Transition name="fade" mode="out-in">
      <div
        v-if="showTooltip"
        class="absolute z-10 h-full w-full"
        :class="[tooltipStyles.wrapper, containerStyles]"
      >
        <div
          class="absolute bg-gray-0 rounded-lg px-2 py-1 text-xs leading-normal font-medium text-white"
          :class="tooltipStyles.innerWrapper"
        >
          <svg
            class="absolute z-0"
            :class="[tooltipStyles.arrow]"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
          >
            <path
              d="M10.7713 10.2C9.86185 11.7752 9.40713 12.5628 8.81347 12.8271C8.29566 13.0576 7.70434 13.0576 7.18653 12.8271C6.59287 12.5628 6.13815 11.7752 5.22872 10.2L2.11103 4.8C1.20159 3.22481 0.746877 2.43722 0.814803 1.79094C0.874053 1.22723 1.16971 0.715131 1.62828 0.381964C2.15401 -1.3853e-06 3.06344 -1.3058e-06 4.88231 -1.14679e-06L11.1177 -6.01671e-07C12.9366 -4.4266e-07 13.846 -3.63155e-07 14.3717 0.381965C14.8303 0.715132 15.1259 1.22723 15.1852 1.79094C15.2531 2.43722 14.7984 3.22482 13.889 4.8L10.7713 10.2Z"
              fill="#2C2D33"
            />
          </svg>

          <span class="relative z-10">
            <slot name="text">
              {{ text }}
            </slot>
          </span>
        </div>
      </div>
    </Transition>

    <div
      :class="tooltipClass"
      class="flex-center"
      @mouseenter="toggleTooltip(true)"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { TClassName } from "@/types/common";

type TPosition = "top" | "bottom" | "bottom-right";

interface Props {
  show?: boolean;
  isTop?: boolean;
  withTrigger?: boolean;
  text: string;
  containerStyles?: TClassName;
  position?: TPosition;
  tooltipClass?: TClassName;
}
const props = withDefaults(defineProps<Props>(), {
  position: "bottom",
});

const showTooltip = ref(false);

watch(
  () => props.show,
  (newValue) => {
    if (props.withTrigger) {
      showTooltip.value = newValue;
    }
  },
  {
    immediate: true,
  }
);

const toggleTooltip = (newValue: boolean) => {
  if (!props.withTrigger) {
    showTooltip.value = newValue;
  }
};

const wrapperStyles: Record<TPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2",
  bottom: "top-full left-1/2 -translate-x-1/2",
  "bottom-right": "top-full right-0",
};

const innerWrapperStyles: Record<TPosition, string> = {
  top: "bottom-1.5 left-1/2 -translate-x-1/2",
  bottom: "top-1.5 left-1/2 -translate-x-1/2",
  "bottom-right": "top-1.5 right-0",
};

const arrowStyles: Record<TPosition, string> = {
  top: "top-[calc(100%-9px)] left-1/2 -translate-x-1/2",
  bottom: "bottom-[calc(100%-9px)] left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-[calc(100%-9px)] right-4",
};

const tooltipStyles = computed(() => ({
  wrapper: wrapperStyles[props.position],
  innerWrapper: innerWrapperStyles[props.position],
  arrow: arrowStyles[props.position],
}));
</script>
