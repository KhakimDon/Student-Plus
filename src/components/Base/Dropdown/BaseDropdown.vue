<template>
  <div
    class="relative"
    data-dropdown="0"
    tabindex="0"
    @focusout="handleFocusOut"
  >
    <div :class="headClass" @click.stop="toggleShow">
      <slot name="head"></slot>
    </div>
    <transition mode="out-in" name="dropdown">
      <div
        v-if="showBody"
        :class="[bodyClass]"
        class="absolute right-0 w-max min-w-full translate-y-full bg-white rounded-lg overflow-hidden -bottom-1 z-10 border border-gray-3 shadow-[0_8px_24px_0_rgba(25,30,54,0.04)]"
        data-dropdown-body
        @click.stop="toggleShow"
      >
        <slot name="body" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import { TClassName } from "@/types/common";

interface Props {
  headClass?: TClassName;
  bodyClass?: TClassName;
  show?: boolean | undefined;
  tabindex?: number;
  position?: "left" | "right";
}

const props = withDefaults(defineProps<Props>(), {
  show: undefined,
  headClass: "",
  bodyClass: "",
});

interface Emits {
  (e: "toggle", v: boolean, event?: Event): void;
}

const emit = defineEmits<Emits>();

const showBody = ref(props.show ?? false);

function toggleShow(e: FocusEvent) {
  if (props.show === undefined) {
    showBody.value = !showBody.value;
  } else {
    emit("toggle", !props.show, e);
  }
}

function handleFocusOut(e: FocusEvent) {
  if (e?.target?.dataset?.dropdown) {
    if (props.show === undefined) {
      showBody.value = false;
    } else {
      emit("toggle", false, e);
    }
  }
}

watch(
  () => props.show,
  (v) => {
    showBody.value = v;
  }
);
</script>

<style scoped>
@keyframes dropdown {
  0% {
    opacity: 0;
    bottom: -12px;
  }
  100% {
    opacity: 1;
    bottom: -4px;
  }
}

.dropdown-enter-active {
  animation: dropdown 0.1s ease-in-out;
}

.dropdown-leave-active {
  animation: dropdown 0.1s ease-in-out reverse;
}
</style>
