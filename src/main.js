import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "aos/dist/aos.css";
import store from "./store";
createApp(App).use(router).use(store).mount("#app");
