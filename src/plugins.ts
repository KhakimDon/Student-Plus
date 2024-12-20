import "vue-toastification/dist/index.css";
import "vue-select/dist/vue-select.css";

import Maska from "maska";
import { createPinia } from "pinia";
import { App } from "vue";
import VSelect from "vue-select";
import Toast from "vue-toastification";

import { VLazyLoad } from "@/directives/lazy-load";
import { VTooltip } from "@/directives/tooltip";
import ToastOptions from "@/plugins/options/Toast";

const pinia = createPinia();

export default function definePlugins(app: App) {
  app.use(Toast, ToastOptions);
  app.use(pinia);

  app.directive("lazy", VLazyLoad);
  app.directive("tooltip", VTooltip);

  app.component("VSelect", VSelect);
  app.use(Maska);
}
