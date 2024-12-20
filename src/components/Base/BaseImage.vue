<template>
  <div
    v-lazy="src"
    :error-state="defaultSrc"
    class="image-loading overflow-hidden"
  >
    <img :alt="alt" class="object-cover w-full h-full" :class="imageClass" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string | undefined;
  alt?: string;
  defaultSrc?: string;
  imageClass?: string;
}
withDefaults(defineProps<Props>(), {
  imageClass: "",
  defaultSrc: "",
  alt: "image",
});
</script>
