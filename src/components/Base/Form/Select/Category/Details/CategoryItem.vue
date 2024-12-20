<template>
  <div
    class="w-full flex items-center justify-between py-2 px-3 bg-white-100 rounded"
  >
    <div class="flex items-center">
      <span class="text-xs text-blue-800 font-medium leading-130">
        {{ category[valueKey] }}
      </span>
      <i class="w-1 h-1 rounded-full mx-2 bg-gray-100" />
      <span class="text-xs text-blue-800 font-medium leading-130">
        {{ subCategory[valueKey] }}
      </span>
    </div>
    <button
      class="icon-xmark w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 bg-blue/20 text-blue text-[8px] hover:bg-red hover:text-white"
      @click="removeService"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

defineComponent({
  name: "ServiceItem",
});

interface Props {
  category?: object;
  subCategory?: object;
  valueKey?: string;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "removeService"): void;
}>();

const removeService = () => {
  emit("removeService");
};
</script>
