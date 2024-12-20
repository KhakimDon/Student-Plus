<template>
  <RouterView v-slot="{ Component }">
    <component :is="detectLayout">
      <Component :is="Component" />
    </component>
  </RouterView>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

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
  auth: LAuth,
  empty: LEmpty,
};
const detectLayout = computed(() => {
  return layouts[route.meta.layout as string];
});

// const { logout } = useAuthStore();

// socket.onclose = function () {
//   logout();
// };

// const onTimeout = () => {
//   logout();
// };
// const idletimer = new IdleTimer(onTimeout, 300000);
//
// idletimer.activate();
</script>
