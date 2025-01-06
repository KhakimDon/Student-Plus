import "vue-toastification/dist/index.css";

// import Maska from "maska";
import {createPinia} from "pinia";
import type {App} from "vue";
import Toast from "vue-toastification";
import router from "@/router";
import i18n from "@/plugins/i18n";
import {TOAST_CONFIG} from "@/config";

const pinia = createPinia();

export default function definePlugins(app: App) {
    app.use(pinia);
    app.use(router)
    app.use(i18n)
    app.use(Toast, TOAST_CONFIG)

    // app.use(Maska);
}
