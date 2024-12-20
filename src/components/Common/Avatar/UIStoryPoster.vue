<template>
  <div
    :class="[
      { '!h-[180px]': size === 'lg' },
      { '!h-[72px]': size === 'md' },
      { '!h-[52px]': size === 'sm' },
      { '!h-10': size === 'xsl' },
      { '!h-8': size === 'xs' },
      avatarClass,
      {
        'before:rounded-lg before:absolute hover:bg-gray-2 before:inset-0 before:border-dashed before:border-2 before:border-[rgba(105, 117, 131, 0.16)]':
          !noBorder,
      },
    ]"
    class="relative rounded-lg !overflow-hidden shrink-0 bg-gray"
  >
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
      <i class="icon-gallery-add text-gray-11 text-yellow-dark text-3xl"></i>
      <div class="text-center flex flex-col gap-1">
        <span class="text-base font-bold text-dark-black">
          {{ $t("add_photo") }}
        </span>
        <p class="text-gray-11 text-xs leading-130">
          {{ $t("max_cover_image") }}
        </p>
      </div>
    </div>
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
