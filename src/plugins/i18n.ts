import { createI18n } from "vue-i18n";

import { customRule, customRuRule } from "@/languages/customRules";
import ru from "@/languages/ru.json";
import sr from "@/languages/sr.json";
import uz from "@/languages/uz.json";

let locale = localStorage.getItem("locale") as string;
if (!locale) {
  locale = "ru";
  localStorage.setItem("locale", "ru");
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    ru,
    uz,
    sr,
  },
  locale,
  pluralRules: {
    uz: customRule,
    sr: customRule,
    ru: customRuRule,
  },
  runtimeOnly: false,
});

// export const setMessages = async () => {
//   const messages = await messagesFetcher(locale);
//   i18n.global.setLocaleMessage("ru", ru);
// };

export default i18n;
