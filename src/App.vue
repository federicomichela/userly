<template>
  <UserCard :user-config="user" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import UserCard from "@/components/UserCard/UserCard.vue";

export default defineComponent({
  name: "App",
  components: {
    UserCard,
  },
  setup() {
    const user = ref<any>();

    return { user };
  }
});
</script>

<style lang="scss">
$material-icons-font-path: "~material-icons/iconfont/";
@import "~material-icons/iconfont/material-icons.scss";

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
