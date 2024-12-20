<template>
  <label
    :class="labelClass"
    :for="forText"
    class="text-sm font-medium leading-normal text-gray-0"
  >
    {{ label }} <span v-if="required">*</span>
  </label>
</template>
<script lang="ts" setup>
import { TClassName } from "@/types/common";

interface Props {
  label?: string;
  labelClass?: TClassName;
  forText?: string;
  required?: boolean;
}

defineProps<Props>();
</script>
