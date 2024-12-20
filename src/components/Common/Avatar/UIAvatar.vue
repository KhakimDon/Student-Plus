<template>
  <div
    :class="[
      { '!w-[148px] !h-[148px]': size === 'lg' },
      { '!w-[72px] !h-[72px]': size === 'md' },
      { '!w-[52px] !h-[52px]': size === 'sm' },
      { '!w-10 !h-10': size === 'xsl' },
      { '!w-8 !h-8': size === 'xs' },
      avatarClass,
      {
        'before:rounded-lg before:absolute hover:bg-gray-2 before:inset-0 before:border-dashed before:border-2 before:border-[rgba(105, 117, 131, 0.16)]':
          !noBorder,
      },
    ]"
    class="relative rounded-lg !overflow-hidden shrink-0 bg-gray"
  >
    <UIShimmer height="100%" v-bind="{ loading }" width="100%">
      <img
        v-if="!isError && !!image"
        :class="imageClass"
        :src="image"
        alt="avatar-image"
        class="w-full h-full object-cover rounded-lg"
        loading="lazy"
        @error="isError = true"
      />
      <div class="flex h-full flex-col gap-2 items-center justify-center">
        <i class="icon-gallery-add text-yellow-dark text-2xl"></i>
        <span class="text-sm font-medium text-gray-11">{{
          $t("add_photo")
        }}</span>
      </div>
    </UIShimmer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface Props {
  image?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xsl";
  avatarClass?: string;
  imageClass?: string;
  loading?: boolean;
  defaultImage?: string;
  noBorder?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: "md",
  avatarClass: "",
  imageClass: "",
  defaultImage: "/images/profile/DefaultImage.svg",
});

const isError = ref(false);
</script>
