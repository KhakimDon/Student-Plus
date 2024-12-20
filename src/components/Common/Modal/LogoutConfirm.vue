<template>
  <ConfirmModal
    v-model="isOpen"
    :confirm-button-loading="loading"
    :confirm-button-text="$t('button.logout')"
    :title="$t('auth.logout.title')"
    confirm-button-variant="red"
    @confirm="$emit('submit')"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

import ConfirmModal from "@/components/Common/ConfirmModal.vue";

interface Emits {
  (e: "submit"): void;
}

defineEmits<Emits>();

const isOpen = defineModel<boolean>();

const loading = ref(false);
</script>
