import { createApp } from "vue";
import App from "./App.vue";
import CommsPlugin from "@/services/Comms/Comms";

const app = createApp(App);

app.use(CommsPlugin);

app.mount("#app");
