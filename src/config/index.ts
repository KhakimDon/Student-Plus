import type {PluginOptions} from "vue-toastification";

export const CONFIG = {
    COMMON_URL: `${import.meta.env.VITE_APP_BASE_URL}/common/api/v1`,
    WEBSITE_URL: import.meta.env.VITE_APP_WEBSITE_URL,
    CALL_CENTER: "+998946187997",
};

export const TOAST_CONFIG = {
    position: "top-right" as PluginOptions['position'],
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
    maxToasts: 5,
} as PluginOptions
