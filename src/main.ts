import { createApp } from "vue";
import App from "./App.vue";
import UtilsPlugin from "@/services/Utils/Utils";

const app = createApp(App);

app.use(UtilsPlugin);

app.mount("#app");
