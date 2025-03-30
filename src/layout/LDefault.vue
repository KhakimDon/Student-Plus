<template>
  <div class="w-full flex">
    <span id="top-element" />
    <div
      class="card-wrapper w-full min-h-screen grid grid-rows-[min-content_1fr]"
    >
      <div class="h-screen flex-center flex-col w-full overflow-y-auto">
        <div class="flex items-center text-white gap-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            />
          </svg>

          <span class="font-[700] text-2xl">Student Plus</span>
        </div>
        <div class="p-6 card w-[90%]">
          <slot />
        </div>
        <div class="mt-5">
          <a
            href="tel:+998915491754"
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
            Biz bilan aloqa: +998 91 549 17 54
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
</style>
