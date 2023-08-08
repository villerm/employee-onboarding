import { createApp } from "vue";
import { createPinia } from "pinia";
import i18n from "@/i18n";
import { setRouter } from "@/composables/useRouter/useRouter";

import App from "./App.vue";
import router from "./router";

import "./assets/scss/main.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
setRouter(router);
app.use(i18n);

app.mount("#app");
