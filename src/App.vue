<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script lang="ts">
import { inject, onMounted, ref } from "vue";
import UserCard from "@/components/UserCard/UserCard.vue";
import { CommsService, User } from "@/services/Comms/types";

export default {
  name: "App",
  components: { UserCard },
  setup() {
    const $comms: CommsService | undefined = inject("$comms");
    const user = ref<User>();

    onMounted(async () => {
      user.value = await $comms?.getUser();
    });

    return { user };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
