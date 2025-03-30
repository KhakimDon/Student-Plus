<template>
  <div class="w-full flex">
    <span id="top-element" />
    <div
      class="card-wrapper w-full min-h-screen grid grid-rows-[min-content_1fr]"
    >
      <div class="h-screen flex-center flex-col w-full overflow-y-auto">
        <div class="font-[500] text-lg text-white w-[90%]">
          <div class="bg-grad mx-auto w-max px-3 py-1 rounded-t-[10px]">
            So'rovnoma
          </div>
        </div>
        <div class="p-6 card w-[90%]">
          <slot />
        </div>
        <div class="mt-5">
          <a
            href="tel:+79607177757"
            class="font-[500] flex items-center gap-2 text-white text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            Biz bilan aloqa: +7 960 717 7757
          </a>
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
  background-position: center;
  background-image: url("https://i.ibb.co/MqMBw3S/Fon.png");
}
* {
  transition-duration: 0.5s;
}
.bg-grad {
  background: linear-gradient(to bottom, #45b288, rgba(65, 66, 78, 0.41));
}
</style>
