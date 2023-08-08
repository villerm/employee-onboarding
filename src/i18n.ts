import { nextTick } from "vue";
import { createI18n } from "vue-i18n";
import type { I18n } from "vue-i18n";

const localesLoaded: string[] = [];
export type LocaleWithLong = {
  short: string;
  long: string;
};
export const SUPPORTED_LOCALES: LocaleWithLong[] = [
  { short: "en", long: "ENG" },
  { short: "et", long: "EST" },
];

export async function loadLocaleMessages(
  lI18n: I18n,
  locale: string,
): Promise<void> {
  // load locale messages with dynamic import
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `@/locales/${locale}.json`
  );
  // set locale and locale message0 0
  lI18n.global.setLocaleMessage(locale, messages.default);

  return nextTick();
}

export async function setI18nLanguage(
  lI18n: I18n,
  locale: string,
): Promise<void> {
  if (lI18n.mode === "legacy") {
    // eslint-disable-next-line no-param-reassign
    lI18n.global.locale = locale;
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    lI18n.global.locale.value = locale;
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  const html = document.querySelector("html");
  if (html) html.setAttribute("lang", locale);
  // load locale messages
  if (
    !lI18n.global.availableLocales.includes(locale) ||
    localesLoaded.findIndex(
      (loadedLocale: string) => loadedLocale === locale,
    ) === -1
  ) {
    await loadLocaleMessages(lI18n, locale);
    localesLoaded.push(locale);
  }
}

// Actually setting up the translations logic
const i18n: I18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_DEFAULT_LOCALE, // set locale
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE, // set fallback locale
});

(async () =>
  setI18nLanguage(i18n, import.meta.env.VITE_DEFAULT_LOCALE as string))();

export default i18n;
