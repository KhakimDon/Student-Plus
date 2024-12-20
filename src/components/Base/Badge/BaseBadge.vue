<template>
  <span
    :class="[badgeStyle]"
    class="px-4 py-2 w-max !rounded-md min-w-[97px] leading-normal text-xs font-medium text-center flex-center gap-1"
  >
    <i v-if="hasIcon" :class="`${iconName} text-base leading-4`" />
    {{ status }}
  </span>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  status: string;
  color:
    | "success"
    | "accepted"
    | "pending"
    | "canceled"
    | "failed"
    | "gray"
    | "sell"
    | "buy";
  size: "sm" | "md";
  hasIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: "green",
  status: "Badge",
  size: "md",
  iconName: "",
});

const badgeColor = computed(() => {
  switch (props.color) {
    case "success":
    case "accepted":
      return "bg-green/10 text-green-500";
    case "pending":
      return "bg-yellow/10 text-yellow-dark";
    case "canceled":
      return "bg-blue-50 text-blue bg-gray-8";
    case "failed":
      return "text-red bg-red-2 text-medium";
    case "gray":
      return "bg-blue-50 text-blue bg-gray-3";
    case "sell":
      return "text-red bg-red-2 !px-2 !py-1.5 min-w-max text-medium";
    case "buy":
      return "bg-green-1 !px-2 !py-1.5 min-w-max text-green-500";
    default:
      return "default";
  }
});

const iconName = computed(() => {
  switch (props.color) {
    case "success":
    case "accepted":
      return "icon-check";
    case "canceled":
    case "failed":
      return "icon-x-circle";
    default:
      return "";
  }
});

const badgeStyle = computed(() => {
  return `${props.size === "md" ? "p-2" : "p-1"} ${badgeColor.value}`;
});
</script>
