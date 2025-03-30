<template>
  <div class="w-full flex">
    <span id="top-element" />
    <div
      class="card-wrapper w-full min-h-screen grid grid-rows-[min-content_1fr]"
    >
      <div class="h-screen flex-center w-full overflow-y-auto">
        <div class="p-6 card w-[90%]">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style scoped>
.card {
  border-radius: 24px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  background: #fff;
  box-shadow: 0px 12px 40px 0px rgba(3, 8, 28, 0.08);
}
.card-wrapper {
  background-size: cover;
  background-image: url("https://i.ibb.co/Q3Dq1VPd/photo-1619013334699-c8310b1c137e.jpg");
}
* {
  transition-duration: 0.5s;
}
</style>
