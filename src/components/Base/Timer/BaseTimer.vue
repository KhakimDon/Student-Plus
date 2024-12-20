<template>
  <div class="flex items-center justify-center space-x-2">
    <span class="text-gray-700 text-sm font-normal leading-130">
      {{ $t("can_resend_time") }}
    </span>
    <span
      v-if="defaultSeconds > 0"
      class="text-blue text-sm font-medium leading-130"
      :class="{ '!text-red': colorTrigger }"
    >
      {{ time }}
    </span>
    <button
      v-else
      class="icon-rotate text-xl leading-5 text-blue-primary hover:rotate-[360deg] transition-all duration-200"
      @click="$emit('resend')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  seconds: number;
  messageType?: "sms" | "call";
}
const props = defineProps<Props>();

interface Emits {
  (e: "resend"): void;
}
const $emit = defineEmits<Emits>();
const defaultSeconds = ref(0);
const time = ref("");

const colorTrigger = ref(false);

const countDown = () => {
  defaultSeconds.value--;

  const mm = Math.floor(defaultSeconds.value / 60);
  const ss = Math.floor(defaultSeconds.value % 60);

  time.value = `${mm > 9 ? mm : "0" + mm}:${ss > 9 ? ss : "0" + ss}`;
};

watch(
  () => props.seconds,
  () => {
    defaultSeconds.value = props.seconds;
    countDown();
  },
  { immediate: true }
);

const interval = setInterval(function () {
  countDown();
  if (defaultSeconds.value < 10) {
    colorTrigger.value = true;
  }
  if (defaultSeconds.value < 0) {
    clearInterval(interval);
    time.value = "00:00";
    colorTrigger.value = false;
  }
}, 1000);
</script>
