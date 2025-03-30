<template>
  <button
    :class="[buttonStyles, $attrs.class]"
    class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-white transition-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-dark focus-visible:ring-offset-1 disabled:pointer-events-none [&_.icon]:pointer-events-none [&_.icon]:size-5 [&_.icon]:shrink-0 dark:focus-visible:ring-blue-dark active:scale-[.98] disabled:cursor-not-allowed select-none relative disabled:opacity-60 disabled:!bg-gray-3"
    v-bind="{ disabled, type, id }"
    @click="handleClick"
  >
    <slot>
      <span
        :class="[buttonTextStyles, mainClass]"
        class="opacity-100 text-center pointer-events-none"
      >
        <template v-if="String(text)?.length">
          {{ t(text) }}
        </template>

        <i v-if="!!icon" :class="icon" />
      </span>
    </slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type {
  TButtonSizes,
  TButtonVariants,
} from "@/components/Base/Button/BaseButton";
import type { TClassName } from "@/types/common";
import type { ButtonEmits, ButtonProps } from "@/types/components";

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "md",
  text: "Button",
  iconPosition: "right",
  icon: "",
  mainClass: "",
  type: "button",
  id: "button",
});

const emit = defineEmits<ButtonEmits>();
const { t } = useI18n();

const variants: Record<TButtonVariants, TClassName> = {
  primary: "bg-blue-dark text-white hover:bg-blue ",
  danger: "bg-red/10 text-red hover:bg-red/20 disabled:text-gray-1",
  outline: "border border-gray-3 text-dark hover:bg-white-1",
  neutral: "bg-white-1 hover:bg-gray-4 text-dark disabled:text-gray-1",
  info: "bg-blue/10 text-blue hover:bg-blue/20 disabled:text-gray-1",
};

const sizes: Record<TButtonSizes, TClassName> = {
  sm: "py-2 !px-4 text-xs font-medium rounded-md h-10",
  md: "py-2.5 px-6 font-medium text-base rounded-lg",
  lg: "p-1.5 font-medium text-base rounded-lg bg-white-1 border-none",
};

// const loaderPathClass = computed(() => {
//   if (["outline-primary"].includes(props.variant)) {
//     return "fill-blue";
//   } else if (["gray"].includes(props.variant)) {
//     return "fill-gray-100";
//   } else if (["secondary"].includes(props.variant)) {
//     return "fill-blue-800";
//   } else if (["outline-dark"].includes(props.variant)) {
//     return "fill-dark";
//   }
//   return "fill-white";
// });

const buttonTextStyles = computed(() => ({
  "!opacity-0 !invisible": props.loading,
  "flex-center justify-center gap-1": props.text,
  "flex-row-reverse": props.iconPosition === "left",
}));

const buttonStyles = computed(() => [
  variants[props.variant],
  sizes[props.size],
  { "!pointer-events-none": props.loading },
]);

function handleClick(e: MouseEvent) {
  if (props.loading || props.disabled) {
    e.stopPropagation();
    return;
  }
  emit("click", e);
}
</script>
<style>
.spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #474bff 94%, #0000) top/9px 9px no-repeat,
    conic-gradient(#0000 30%, #474bff);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0);
  animation: spinner-c7wet2 1s infinite linear;
}

@keyframes spinner-c7wet2 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
