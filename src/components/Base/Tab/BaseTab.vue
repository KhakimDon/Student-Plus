<template>
  <div
    :class="[tabVariants[variant]?.wrapperClass, $attrs.class]"
    class="relative w-max flex transition-300"
  >
    <div
      :class="tabVariants[variant]?.activeClass"
      :style="{ width: `${active?.width}`, left: `${active?.left}px` }"
      class="absolute rounded-[3px] bg-blue-primary transition-300"
    />

    <button
      v-for="(tab, idx) in list"
      :id="`item-${variant}-${tab.value}`"
      :key="idx"
      :class="[
        tabVariants[variant]?.itemClass,
        modelValue === tab.value ? tabVariants[variant]?.itemActiveClass : '',
        modelValue === tab.value ? 'text-black' : 'text-dark-black',
      ]"
      class="transition-300 w-full text-base flex-center font-medium tabs whitespace-nowrap gap-1 relative z-1"
      @click="pick(tab.value, $event)"
    >
      {{ tab.label }}

      <span
        v-if="tab.suffixText"
        :class="tabVariants[variant]?.suffixClass"
        class="px-1 py-px rounded-md text-xs"
      >
        {{ tab.suffixText }}
      </span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

import { tabVariants } from "@/data/variants";
import { TabProps } from "@/types/components";

const modelValue = defineModel<string | number>("modelValue", {
  required: true,
});

const props = withDefaults(defineProps<TabProps>(), {
  variant: "default",
});

const active = ref({ left: 0, width: "0px" });

const pick = (tab: string | number, e?: { target: HTMLButtonElement }) => {
  const target = e?.target as HTMLButtonElement;
  if (target) {
    active.value = {
      left: target.offsetLeft,
      width: target.offsetWidth + "px",
    };
  }
  modelValue.value = tab; // Update the modelValue directly
};

function checkValue() {
  const item = document.getElementById(
    `item-${props.variant}-${modelValue.value}`
  ) as HTMLButtonElement;

  pick(modelValue.value, { target: item });
}

watch(modelValue, checkValue, { immediate: true });

onMounted(checkValue);

defineExpose({ pick });
</script>
