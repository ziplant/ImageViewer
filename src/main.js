import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import "materialize-css/dist/css/materialize.css";

createApp(App).use(store).mount("#app");
