<template>
  <div class="">
    <RouterLink
      :to="{ name: 'Notifications' }"
      class="inline-flex items-center justify-center active:bg-slate-200 hover:bg-slate-100 p-3 rounded-full transition-colors"
    >
      <i class="icon-bell text-lg text-gray-300"></i>
    </RouterLink>
  </div>
</template>

<script setup lang="ts"></script>
