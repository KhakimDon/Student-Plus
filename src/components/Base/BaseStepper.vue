<template>
  <div class="relative w-full bg-white gap-2 flex items-start">
    <template v-for="(item, index) in steps" :key="index">
      <div
        :class="checkStatus(index + 1)"
        class="max-w-[86px] text-center select-none transition-300 w-full group"
      >
        <div class="flex items-center gap-y-3 flex-col">
          <div
            :class="{ 'done-styles': checkStatus(index + 1) == 'done' }"
            class="flex-center flex-shrink-0 h-[30px] w-[30px] text-white border-gray-100 bg-gray-100 flex-center transition-300 rounded-[8px] text-[14px] font-semibold leading-5 border-[2px] group-[.active]:bg-transparent group-[.active]:text-primary group-[.active]:border-primary group-[.done]:text-yellow-dark group-[.done]:bg-yellow-dark/10"
          >
            {{ index + 1 }}
          </div>
          <div class="flex flex-col gap-0.5">
            <p
              :class="{
                '!text-gray-400': checkStatus(index + 1) !== 'active',
                '!text-black': checkStatus(index + 1) == 'done',
              }"
              class="text-xs text-dark font-medium transition-300"
            >
              {{ $t(item?.title) }}
            </p>
          </div>
        </div>
      </div>
      <div
        v-if="index !== 4"
        :class="{ '!bg-primary': checkStatus(index + 1) }"
        class="min-w-2 min-h-0.5 bg-gray-100 !mt-4"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentStep: number;
  steps: {
    title: string;
  }[];
}
const props = defineProps<Props>();

function checkStatus(target: number) {
  if (target === props.currentStep) {
    return "active";
  } else if (props.currentStep > target) {
    return "done";
  } else {
    return "";
  }
}
</script>
<style scoped>
.done-styles {
  color: white !important;
  border-color: #6ea8f7;
  background: linear-gradient(to top, #4489f7, #6ea8f7);
  box-shadow:
    0px 41px 80px 0px rgba(68, 137, 247, 0.07),
    0px 20.066px 42.849px 0px rgba(68, 137, 247, 0.06),
    0px 12.585px 30.532px 0px rgba(68, 137, 247, 0.06),
    0px 8.492px 23.32px 0px rgba(68, 137, 247, 0.05),
    0px 5.725px 17.54px 0px rgba(68, 137, 247, 0.04),
    0px 3.571px 12px 0px rgba(68, 137, 247, 0.03),
    0px 1.715px 6.222px 0px rgba(68, 137, 247, 0.02);
}
</style>
