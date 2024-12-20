import { useToast } from "vue-toastification";

import Toast from "@/components/Base/Toast/Toast.vue";

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = (
    title: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    toast({
      component: Toast,
      props: {
        title,
        type,
      },
    });
  };

  return { showToast };
};
