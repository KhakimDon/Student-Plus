<template>
  <div v-if="!isBlocked">
    <p class="text-3xl leading-130 font-semibold text-dark text-center">
      {{ $t("enter_system") }}
    </p>

    <div class="mt-8">
      <FormGroup :label="$t('login')" class="mb-4">
        <FormInput
          v-model="form.values.username"
          :error="form.$v.value.username.$error || isError"
          :placeholder="$t('enter_login')"
        >
        </FormInput>
      </FormGroup>
      <FormGroup :label="$t('password')" class="mb-2">
        <FormPasswordInput
          v-model="form.values.password"
          :error="form.$v.value.password.$error || isError"
          :placeholder="$t('enter_password')"
        >
        </FormPasswordInput>
      </FormGroup>
      <button
        class="text-xs text-yellow-dark font-medium leading-normal hover:underline"
        @click="showForgot = true"
      >
        {{ $t("forgot_password") }}
      </button>
      <vue-recaptcha
        ref="recaptcha"
        :language="locale"
        :sitekey="siteKey"
        class="my-8 mx-auto"
        style="transform: scale(1.1); transform-origin: 0 0"
        @expired="expiredMethod"
        @verify="verifyMethod"
      />
      <BaseButton
        :disabled="!captchaToken || loading"
        :text="$t('sign_in')"
        class="w-full"
        v-bind="{ loading }"
        @click="submit"
      />
    </div>
  </div>
  <BlockedScreen v-else />
  <BaseModal v-model="showForgot" no-header>
    <div class="flex items-center flex-col">
      <div
        class="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-yellow/20 icon-support text-[40px] leading-10 text-yellow-dark mb-5"
      ></div>
      <h3 class="text-xl text-dark-black font-semibold text-center">
        {{ $t("forgot_password") }}
      </h3>
      <p class="text-gray-0 text-sm mt-2 text-center leading-130 mb-5">
        {{ $t("connect_with_admin") }}
      </p>
      <a
        :href="`tel:${CONFIG.CALL_CENTER}`"
        class="bg-yellow/30 text-yellow-dark text-sm font-medium leading-130 bg-gray py-2 px-4 rounded-full flex-y-center gap-2 hover:bg-yellow-dark/30 transition-300"
      >
        <i class="icon-call text-xl leading-5 text-yellow-dark"></i>
        {{ formatPhoneNumber(CONFIG.CALL_CENTER) }}
      </a>
      <p class="text-gray-0 text-xs mt-2.5">
        {{ $t("support_phone") }}
      </p>
    </div>
    <button
      class="icon-x-mark absolute top-5 right-5 text-xl leading-5 text-gray-0 hover:text-red transition-300"
      @click="showForgot = false"
    ></button>
  </BaseModal>
</template>

<script lang="ts" setup>
import { required } from "@vuelidate/validators";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { VueRecaptcha } from "vue-recaptcha";
import { useRouter } from "vue-router";

import { BaseButton, FormGroup, FormInput } from "@/components/Base";
import FormPasswordInput from "@/components/Base/Form/FormPasswordInput.vue";
import BaseModal from "@/components/Base/Modal/BaseModal.vue";
import { useCustomToast } from "@/composables/useCustomToast";
import { useErrorHandling } from "@/composables/useErrorHandling";
import { useForm } from "@/composables/useForm";
import { CONFIG } from "@/config";
import BlockedScreen from "@/modules/auth/components/BlockedScreen.vue";
import { useAuthStore } from "@/modules/auth/store";
import { formatPhoneNumber } from "@/utils/functions/common";

const form = useForm(
  {
    username: "",
    password: "",
  },
  {
    username: {
      required,
    },
    password: {
      required,
    },
  }
);

const showForgot = ref(false);

const store = useAuthStore();
const isError = ref(false);
const isBlocked = ref(false);

const siteKey = import.meta.env.VITE_APP_SITE_KEY;
const { t, locale } = useI18n();
const { showToast } = useCustomToast();

const captchaToken = ref(null);
const loading = ref(false);

function verifyMethod(response: any) {
  captchaToken.value = response;
}

function expiredMethod() {
  captchaToken.value = null;
}

const router = useRouter();
const { handleError } = useErrorHandling();

async function submit() {
  form.$v.value.$touch();
  if (captchaToken?.value) {
    if (!form.$v.value.$invalid) {
      isError.value = false;
      loading.value = true;
      await store
        .login(form.values)
        .then(() => {
          router.push({ name: "Dashboard" });
        })
        .catch((err) => {
          // emit("submit");
          if (err?.response?.status === 429) {
            isBlocked.value = true;
          }
          isError.value = true;
          handleError(err);
        })
        .finally(() => {
          loading.value = false;
        });
    }
  } else {
    showToast(t("check_captcha"), "error");
  }
}
</script>
