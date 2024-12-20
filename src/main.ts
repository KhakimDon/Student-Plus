import "@/assets/css/index.css";

import { createApp, h } from "vue";

import definePlugins from "@/plugins";
import i18n, { setMessages } from "@/plugins/i18n";

import App from "./App.vue";
import router from "./router";

export const app = createApp({
  render: () => h(App),
});

if (import.meta.env.VITE_APP_MODE === "production") {
  (async () => {
    const sentry = await import("@sentry/vue");
    sentry.init({
      app,
      dsn: "https://edbd35f8bf8d06945d911576455dfd4b@o4506761651617792.ingest.sentry.io/4506772000866304",
    });
  })();
}

// (async () => {
//   await setMessages();
//
app.use(router);
app.use(i18n);

definePlugins(app);

app.mount("#app");
// })();
