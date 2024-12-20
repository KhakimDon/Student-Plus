<template>
  <label
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
    :style="{ minHeight: computedSize, '--btn-size': computedBtnSize }"
    class="transition group inline-flex items-center relative select-none min-h-[16px]"
  >
    <input
      :checked="modelValue === value"
      class="absolute opacity-0 invisible h-0 w-0 peer"
      type="radio"
      v-bind="{ name, value, disabled }"
      @change="handleChange"
    />
    <span
      :class="[computedBtnStyles]"
      :style="{ width: computedSize, height: computedSize }"
      class="before:w-1 before:h-1 shrink-0 duration-200 ease-in-out bg-white before:opacity-0 relative border-4 peer-checked:border-4 peer-checked:border-yellow-dark rounded-full box-border before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-200 before:border peer-disabled:before:bg-white"
    />
    <slot name="label">
      <span
        :class="[
          modelValue === value ? activeStyles : labelStyles || 'text-gray-700',
        ]"
        class="font-normal text-sm leading-130 transition-300"
      >
        {{ label }}
      </span>
    </slot>
  </label>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  modelValue: string | number | object;
  value?: string | number | object;
  label?: string | number | object;
  name?: string | number;
  disabled?: boolean;
  size?: string | number;
  btnStyles?: string;
  labelStyles?: string;
  activeClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 16,
  activeClass: "text-blue",
  labelStyles: "",
  btnStyles: "group-hover:border-blue peer-checked:border-blue-primary",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | object | boolean): void;
}>();

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", props.value ? target.value : target.checked);
};

const computedSize = computed(() => props.size + "px");

const computedBtnSize = computed(() => +props.size * 0.5 + "px");

const computedBtnStyles = computed(() =>
  !props.disabled ? props.btnStyles : "peer-checked:before:!bg-gray-100"
);

const activeStyles = computed(() => props.activeClass || "text-blue");
</script>
