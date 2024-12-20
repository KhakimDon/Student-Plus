import "vue-i18n";

declare module "vue-i18n" {
  interface I18nGlobal {
    $t: (key: string, ...args: unknown[]) => string;
  }
}
