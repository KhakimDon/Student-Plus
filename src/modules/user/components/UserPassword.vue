<template>
  <div class="py-1.5 px-2 bg-gray-3 rounded-lg flex-y-center gap-1.5">
    <div v-if="!showPassword" class="flex-y-center gap-1">
      <span
        v-for="i in password.length"
        :key="i"
        class="w-2 h-2 rounded-full bg-dark"
      />
    </div>
    <p v-else class="text-sm text-dark leading-normal font-bold">
      {{ password }}
    </p>
    <button
      class="text-xl leading-5 text-gray-11"
      :class="showPassword ? 'icon-eye-slash' : 'icon-eye'"
      @click="showPassword = !showPassword"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  password: string;
}
defineProps<Props>();

const showPassword = ref(false);
</script>
