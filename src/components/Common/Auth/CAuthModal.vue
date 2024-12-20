<template>
  <Teleport to="body">
    <div
      :class="[{ '!opacity-100 !visible': modelValue }, wrapperClass]"
      class="fixed w-full h-full bg-black/50 flex flex-col justify-center z-[100] top-0 left-0 invisible opacity-0 transition-all duration-300 items-center p-3"
      data-modal="wrapper"
      @click="handleOuterClick"
    >
      <div class="-translate-y-32">
        <img class="w-[365px] h-[77px]" src="/svg/logo-light.svg" />
      </div>

      <Transition :name="'modal'" mode="out-in">
        <div
          v-if="modelValue"
          ref="target"
          :class="[{ animated: animationIn }, bodyClass]"
          class="bg-[#13274D] w-full lg:max-w-xl shadow-xl relative max-h-screen rounded-3xl"
        >
          <button
            class="text-[32px] w-10 h-10 absolute text-white -top-16 right-0 lg:-right-12 rounded-lg shrink-0 flex-center transition-300 hover:text-red bg-[#11162B] hover:bg-opacity-70 transition-all duration-300 active:scale-95"
            @click="$emit('close')"
          >
            <span class="icon-x-mark" />
          </button>

          <div class="relative overflow-hidden rounded-3xl">
            <div class="p-6 border-b border-white/10 relative z-10">
              <h2 class="text-2xl font-semibold leading-130 text-white">
                {{ $t("auth.login") }}
              </h2>
            </div>
            <div class="p-6 relative z-10">
              <img
                alt="Dashboard Screenshot"
                class="w-full mb-6"
                src="/images/screenshot.webp"
              />
              <div class="flex-y-center gap-3 mb-9">
                <FormCheckbox
                  :checked="checkbox"
                  class="shrink-0"
                  @click="checkbox = !checkbox"
                />
                <i18n-t
                  class="text-white/50 text-sm leading-[140%] font-normal cursor-pointer"
                  keypath="by_clicking_the_register_button_i_accept_the_terms_and_conditions_of_use"
                  tag="p"
                  @click="checkbox = !checkbox"
                >
                  <template #terms_of_use>
                    <RouterLink
                      class="text-white transition-300 hover:text-white/80"
                      to="/privacy-policy"
                      @click="store.loginModal = false"
                    >
                      {{ $t("terms_of_use") }}
                    </RouterLink>
                  </template>
                </i18n-t>
              </div>

              <a
                v-if="!isLoading && oneIdUrl && !user"
                :href="oneIdUrl"
                rel="noopener noreferrer"
              >
                <BaseButton class="!w-full">
                  <img alt="" class="mx-auto" src="/svg/oneid.svg" />
                </BaseButton>
              </a>
              <p class="text-center text-sm mt-3 text-white leading-130">
                {{ $t("enter_from") }}
              </p>
            </div>

            <div
              class="w-[616px] h-[616px] opacity-50 z-0 bg-[#328BF1] rounded-full blur-[175px] absolute -top-[460px] -right-[302px]"
            ></div>
            <div
              class="w-[616px] h-[616px] opacity-50 z-0 bg-[#328BF1] rounded-full blur-[175px] absolute -left-[378px] -bottom-[384px]"
            ></div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";

import BaseButton from "@/components/Base/Button/BaseButton.vue";
import FormCheckbox from "@/components/Base/Form/Checkbox/Checkbox.vue";
import { useAuthStore } from "@/modules/auth/store";

interface Props {
  modelValue: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Modal title",
  titleStyle: "",
  headerStyle: "",
  wrapperClass: "",
  bodyClass: "",
  modalClass: "",
});

interface Emits {
  (e: "close"): void;

  (e: "outer-click"): void;
}

const emit = defineEmits<Emits>();

const authStore = useAuthStore();

const oneIdUrl = ref("");
const animationIn = ref(false);
const isLoading = ref(true);

const target = ref();

function handleOuterClick(e: Event) {
  const target = e.target as HTMLElement;
  if (target.dataset?.modal == "wrapper") {
    emit("outer-click");
    if (!props.disableOuterClose) {
      emit("close");
    } else {
      animationIn.value = true;
      setTimeout(() => {
        animationIn.value = false;
      }, 300);
    }
  }
}

onClickOutside(target, () => {
  emit("outer-click");
  if (!props.disableOuterClose) {
    emit("close");
  } else {
    if (!props.notAnimate) {
      animationIn.value = true;
    }
    setTimeout(() => {
      animationIn.value = false;
    }, 500);
  }
});

watch(
  () => props.modelValue,
  (val: boolean) => {
    if (val) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
);

onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !props.disableOuterClose) {
      emit("close");
    }
  });
});
</script>

<style scoped>
@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-enter-active {
  animation: modal 0.3s ease-in-out;
}

.modal-leave-active {
  animation: modal 0.3s ease-in-out reverse;
}
</style>
