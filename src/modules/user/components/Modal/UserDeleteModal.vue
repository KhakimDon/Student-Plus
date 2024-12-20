<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import ConfirmModal from "@/components/Common/ConfirmModal.vue";
import { useApi } from "@/composables/useApi";
import { useErrorHandling } from "@/composables/useErrorHandling";
import { User } from "@/modules/user/types";
import { getFullName } from "@/utils/functions/common";

interface Props {
  user: User;
}
const { user } = defineProps<Props>();

const modal = defineModel<boolean>();

const emit = defineEmits(["deleted"]);

const router = useRouter();

const { handleError } = useErrorHandling();

const loading = ref(false);

function deleteUser() {
  loading.value = true;
  useApi()
    .$delete(`users/UserDelete/${user.id}/`)
    .then(() => {
      modal.value = false;
      emit("deleted");
    })
    .catch(handleError)
    .finally(() => {
      loading.value = false;
    });
}
</script>

<template>
  <ConfirmModal
    v-model="modal"
    :title="$t('are_you_sure_to_delete')"
    confirm-button-variant="red"
    :confirm-button-loading="loading"
    :confirm-button-text="$t('delete')"
    @confirm="deleteUser"
  >
    <template #description>
      <i18n-t keypath="are_you_sure_to_delete_user">
        <template #user_name>
          <span class="text-dark font-semibold">{{ getFullName(user) }}</span>
        </template>
      </i18n-t>
    </template>
  </ConfirmModal>
</template>
