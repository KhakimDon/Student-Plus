<template>
  <div
    class="flex-y-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
    :class="
      status === 'unverified'
        ? 'bg-red/10 text-red'
        : 'bg-yellow-dark/10 text-yellow-dark'
    "
  >
    <i
      class="text-xl leading-5"
      :class="
        status === 'unverified'
          ? 'icon-unverified drop-shadow-[0_2px_10px_#DFBD4033]'
          : 'icon-clock'
      "
    >
      <span class="path1"></span>
      <span class="path2"></span>
      <span class="path3"></span>
    </i>
    {{ $t(`user_status.${status}`) }}
  </div>
</template>
<script setup lang="ts">
interface Props {
  status: "unverified" | "process";
}
defineProps<Props>();
</script>
