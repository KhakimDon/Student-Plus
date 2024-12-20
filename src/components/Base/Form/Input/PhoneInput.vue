<template>
  <div ref="inputWrapper" class="phone-input relative">
    <i
      class="icon-global transition-200 text-2xl h-6 text-gray-100 absolute top-2.5 left-2 flex-center"
      :class="valid ? 'opacity-0' : 'opacity-100'"
    />
    <VueTelInput
      ref="phoneInput"
      v-model="phone"
      v-bind="inputOptions"
      :class="{
        invalid: !valid,
        '!border-red !bg-[#FEF7F7]': invalidError || error,
      }"
      @validate="handleValidatedPhone"
    />

    <Transition name="fade">
      <BaseSpinner
        v-if="loading"
        class="right-0 absolute w-min inline-block scale-[0.4] ml-[calc(100%-20px)] top-2"
      />
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import "@/assets/css/vue-tel-input.css";

import { computed, onMounted, ref, watch } from "vue";
import { VueTelInput } from "vue-tel-input";

import BaseSpinner from "@/components/Base/Loader/BaseSpinner.vue";

interface Props {
  error?: boolean;
  modelValue?: string;
  placeholder?: string;
  loading?: boolean;
  readonly?: boolean;
}

const props = defineProps<Props>();

interface Emits {
  (event: "update:modelValue", value: string): void;

  (event: "trigger", value: boolean): void;

  (event: "blur", value: string): void;

  (event: "reset-validation"): void;
}

const emit = defineEmits<Emits>();

const valid = ref(false);
const invalidError = ref(false);
const phone = ref("");

const phoneInput = ref<HTMLElement>();
const inputWrapper = ref<HTMLElement>();

const inputOptions = computed(() => {
  return {
    defaultCountry: "uz",
    mode: "international",
    dropdownOptions: {
      disabledDialCode: true,
      showDialCodeInList: true,
      showFlags: true,
      showSearchBox: true,
    },
    validCharactersOnly: true,
    inputOptions: {
      readonly: props.readonly,
      showDialCode: true,
      placeholder: "__ ___ __ __",
    },
  };
});
watch(
  () => phone.value,
  (value) => {
    emit("update:modelValue", value);
  }
);

watch(
  () => props.modelValue,
  () => {
    phone.value = props.modelValue ?? "";
  },
  { immediate: true }
);

const onFocus = () => {
  if (phone.value.length === 0) {
    emit("update:modelValue", "+");
  }
};

const onBlur = () => {
  if (phone.value.length === 1) {
    phone.value = "";
    setTimeout(() => {
      emit("reset-validation");
    }, 10);
  }

  emit("blur", phone.value);
};

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault();

  const pastedText = e.clipboardData?.getData("text/plain") ?? "";

  const hasDefaultPlus = phone.value.startsWith("+");
  const hasPastedPlus = pastedText?.startsWith("+");

  if (hasDefaultPlus && hasPastedPlus) {
    phone.value = pastedText;
  } else if (hasDefaultPlus && !hasPastedPlus) {
    phone.value = `+${pastedText}`;
  } else if (!hasDefaultPlus && hasPastedPlus) {
    phone.value = pastedText;
  } else if (!hasDefaultPlus && !hasPastedPlus) {
    phone.value = `+${pastedText}`;
  }
};

onMounted(() => {
  const phoneInput = inputWrapper.value?.querySelector(
    ".phone-input input"
  ) as HTMLInputElement;
  phoneInput.setAttribute("placeholder", props.placeholder ?? "");

  phoneInput.onblur = onBlur;
  phoneInput.onfocus = onFocus;
  phoneInput.onpaste = onPaste;
});

interface IValidateOptions {
  country: {
    dialCode: string;
    iso2: string;
    name: string;
  };
  countryCode: string | undefined;
  formatted: string | "";
  valid: boolean | undefined;
  countryCallingCode?: string;
  nationalNumber?: string;
  number?: string;
}

function handleValidatedPhone(options: IValidateOptions) {
  valid.value = !!options?.countryCode ?? false;
  invalidError.value = !options.valid && !!options?.countryCode;
  emit("trigger", invalidError.value);
}

onMounted(() => {
  if (props.modelValue) {
    phone.value = props.modelValue;
  }
});
</script>
