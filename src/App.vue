<template>
  <RouterView v-slot="{ Component }">
    <component :is="detectLayout">
      <Component :is="Component"/>
    </component>
  </RouterView>

  <!--  <Transition name="fade">-->
  <!--    <div-->
  <!--        v-if="mainStore.indicator"-->
  <!--        class="loading-indicator fixed top-0 left-0 h-[3px] bg-blue-dark rounded-lg z-100"-->
  <!--    ></div>-->
  <!--  </Transition>-->
</template>
<script lang="ts" setup>
import {computed} from "vue";
import {useRoute} from "vue-router";

import LAuth from "@/layout/LAuth.vue";
import LDefault from "@/layout/LDefault.vue";
import LEmpty from "@/layout/LEmpty.vue";
import LError from "@/layout/LError.vue";
import LMobile from "@/layout/LMobile.vue";


const route = useRoute();

const layouts: Record<string, unknown> = {
  default: LDefault,
  error: LError,
  mobile: LMobile,
  empty: LEmpty,
  auth: LAuth,
};
const detectLayout = computed(() => {
  return layouts[route.meta.layout as string];
});

//
// watch(
//     () => mainStore.indicator,
//     (newValue) => {
//       if (newValue) {
//         const indicator = document.querySelector(
//             ".loading-indicator"
//         ) as HTMLElement;
//
//         if (!indicator) {
//           return;
//         }
//
//         setTimeout(() => {
//           indicator.style.animationPlayState = "pause";
//         }, 450);
//       }
//     }
// );
</script>

<style>
.loading-indicator {
  animation: indicator 1s ease-in-out;
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
</style>
