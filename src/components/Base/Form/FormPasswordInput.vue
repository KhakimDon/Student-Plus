<template>
  <FormInput
    v-model="value"
    v-bind="{ placeholder, error }"
    :type="toggleType ? 'password' : 'text'"
  >
    <template #suffix>
      <button
        class="text-xl leading-5 text-gray-0"
        :class="toggleType ? 'icon-eye' : 'icon-eye-slash'"
        @click="toggleType = !toggleType"
      />
    </template>
  </FormInput>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { FormInput } from "@/components/Base";

const toggleType = ref(true);

const value = defineModel<string>();

interface Props {
  placeholder?: string;
  error?: boolean;
}
defineProps<Props>();
</script>
