<template>
  <RouterView v-slot="{ Component }">
    <component :is="detectLayout">
      <Component :is="Component" />
    </component>
  </RouterView>
  <Toaster v-bind="TOAST_CONFIG" />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import LDefault from "@/layout/LDefault.vue";
import { Toaster } from "vue-sonner";
import { TOAST_CONFIG } from "@/config";

if (window?.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.expand();
}

if (window?.visualViewport) {
  window.visualViewport.addEventListener("resize", () => {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.visualViewport.height * 0.01}px`,
    );
  });
}

import { onMounted, onBeforeUnmount } from "vue";

const handleFocus = () => {
  document.querySelector(".card-wrapper-item").classList.add("fff");
  document.querySelector(".card-wrapper-item").style.teransform =
    "translateY(-100px)";
};
const handleFocusOut = () => {
  document.querySelector(".card-wrapper-item").classList.remove("fff");
  document.querySelector(".card-wrapper-item").style.teransform =
    "translateY(-100px)";
};

onMounted(() => {
  document.addEventListener("focusin", handleFocus);
  document.addEventListener("focusout", handleFocusOut);
});

onBeforeUnmount(() => {
  document.removeEventListener("focusin", handleFocus);
});

const route = useRoute();

const layouts: Record<string, unknown> = {
  default: LDefault,
};
const detectLayout = computed(() => {
  return layouts[route.meta.layout as string];
});
</script>

<style>
.loading-indicator {
  animation: indicator 1s ease-in-out;
}

@supports (-webkit-touch-callout: none) {
  .fixed-element:focus {
    position: absolute !important;
  }
}

@keyframes indicator {
  0% {
    width: 0;
  }
  50% {
    width: 85vw;
  }
  100% {
    width: 100vw;
  }
}
.fff {
  transform: translateY(-150px);
}
</style>
