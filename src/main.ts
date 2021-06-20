import { createApp } from "vue";
import App from "./App.vue";
import CommsPlugin from "@/services/Comms/Comms";
import UtilsPlugin from "@/services/Utils/Utils";

const app = createApp(App);

app.use(CommsPlugin);
app.use(UtilsPlugin);

app.mount("#app");
