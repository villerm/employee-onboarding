import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import i18n from "@/i18n";
import { setRouter } from "@/composables/useRouter/useRouter";
import worker from "@/mocks/browser";

import App from "./App.vue";
import router from "./router";

// import Prime Vue theme style
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

// import project styles
import "./assets/scss/main.scss";

const app = createApp(App);

app.directive("tooltip", Tooltip);
app.use(i18n);
app.use(createPinia());
app.use(router);
setRouter(router);

// PrimeVue UI component kit
app.use(PrimeVue);

if (import.meta.env.VITE_ENV === "dev") {
  worker.start();
}
app.mount("#app");
