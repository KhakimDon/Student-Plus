import { useI18n } from "vue-i18n";

import { useCustomToast } from "@/composables/useCustomToast";

export function useErrorHandling() {
  const { showToast } = useCustomToast();
  const { t } = useI18n();

  // const router = useRouter();

  function handleError(res: any) {
    // if (res?.status === 404) {
    //   router.push("/404");
    // }

    if (res?.status === 403) {
      showToast(res?.data?.detail, "error");
    } else if (res?.status === 500) {
      showToast(t("toast.server_error"), "error");
    } else {
      showToast(
        t(res?.data?.errors?.[0]?.message || t("toast.something_went_wrong")),
        "error"
      );
    }

    return { error: res?.data?.errors?.[0]?.message };
  }

  return { handleError };
}
