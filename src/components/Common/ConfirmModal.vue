<template>
  <BaseModal v-model="value" no-header>
    <div class="flex flex-col gap-7">
      <div class="flex flex-col items-center gap-5">
        <div
          :class="iconClass"
          class="flex-center w-[72px] h-[72px] rounded-full bg-red/10 text-[40px] leading-10 text-red icon-warning"
        ></div>
        <div class="w-full text-center">
          <p class="text-xl font-semibold leading-130 text-dark mb-1">
            {{ title }}
          </p>
          <p class="text-sm leading-130 text-[#606468] font-normal">
            <slot name="description">
              {{ description }}
            </slot>
          </p>
        </div>
        <slot name="content"></slot>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <BaseButton
          :text="$t('cancel')"
          size="sm"
          variant="gray"
          @click="value = false"
        />
        <BaseButton
          :loading="confirmButtonLoading"
          :text="$t(confirmButtonText)"
          :variant="confirmButtonVariant"
          size="sm"
          @click="$emit('confirm')"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import { BaseButton } from "@/components/Base";
import { TButtonVariants } from "@/components/Base/Button/BaseButton";
import BaseModal from "@/components/Base/Modal/BaseModal.vue";
import { TClassName } from "@/types/common";

interface Props {
  title: string;
  description?: string;
  iconClass?: TClassName;
  confirmButtonVariant?: TButtonVariants;
  confirmButtonText?: string;
  confirmButtonLoading?: boolean;
}

withDefaults(defineProps<Props>(), {
  confirmButtonVariant: "red",
  confirmButtonText: "confirm",
});

const value = defineModel<boolean>();

defineEmits<{
  (e: "confirm"): void;
}>();
</script>
