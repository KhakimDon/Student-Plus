<template>
  <teleport to="body">
    <div
      :class="{ '!opacity-100 !visible': value }"
      class="fixed top-0 left-0 w-full h-full bg-[#181C32]/30 z-50 flex items-center justify-center invisible opacity-0 transition-300 p-5 !m-0"
    >
      <slot v-if="$slots?.logo" name="logo" />
      <Transition name="modal">
        <div
          v-if="value"
          id="ModalBg"
          ref="wrapper"
          class="fixed top-0 left-0 w-full h-full z-[51] flex items-center justify-center transition-300 p-5"
          @click="handleOuterClick"
        >
          <div
            id="Modal"
            :class="[bodyClass, { animated: animationIn }]"
            class="relative bg-white rounded-xl w-[480px] overflow-hidden"
          >
            <slot v-if="!noHeader" name="header">
              <div
                :class="headerClass"
                class="px-5 py-2 md:py-[18px] flex justify-between items-center border-b border-[#F6F8FA]"
              >
                <h3
                  class="text-gray text-lg font-semibold leading-normal flex-y-center gap-1"
                >
                  <button
                    v-if="backButton"
                    class="icon-chevron text-2xl leading-6 hover:-translate-x-1 transition-300"
                    @click="$emit('back')"
                  />
                  {{ title }}
                </h3>

                <button
                  :class="buttonClass"
                  class="text-2xl leading-6 text-gray-11 transition-300 hover:text-red icon-x-mark"
                  @click="close"
                >
                </button>

              </div>
            </slot>
            <div :class="wrapperClass" class="p-5">
              <slot></slot>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </teleport>
</template>
<script lang="ts" setup>
import { useEventListener } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";

import { TClassName } from "@/types/common";

interface Props {
  title?: string;
  disableOuterClose?: boolean;
  bodyClass?: TClassName;
  headerClass?: TClassName;
  buttonClass?: TClassName;
  wrapperClass?: TClassName;
  noHeader?: boolean;
  backButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Modal",
  disableOuterClose: false,
});

const emit = defineEmits<{
  (e: "back"): void;
  (e: "close"): void;
}>();

const value = defineModel<boolean>();

const animationIn = ref(false);
const wrapper = ref();

function handleOuterClick(e: Event) {
  const target = e.target as HTMLElement;
  if (target === wrapper.value) {
    if (!props.disableOuterClose) {
      close();
    } else {
      animationIn.value = true;
      setTimeout(() => {
        animationIn.value = false;
      }, 500);
    }
  }
}

// watch(
//   () => value.value,
//   (val) => {
//     if (val) {
//       document.body.style.overflow = "hidden";
//       document.body.style.paddingRight = "3px";
//     } else {
//       document.body.style.overflow = "auto";
//       document.body.style.paddingRight = "0";
//     }
//   }
// );

onMounted(() => {
  useEventListener(document, "keydown", (e) => {
    if (e.key === "Escape" && !props.disableOuterClose) {
      close();
    }
  });
});

function close() {
  value.value = false;
  emit("close");
}
</script>
