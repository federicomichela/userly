<template>
  <Carousel v-if="users" :items="users" />
</template>

<script lang="ts">
import { inject, onMounted, ref } from "vue";
import Carousel from "@/components/Carousel/Carousel.vue";
import { CommsService, User } from "@/services/Comms/types";

export default {
  name: "App",
  components: {
    Carousel,
  },
  setup() {
    const $comms: CommsService | undefined = inject("$comms");

    const users = ref<User[]>();

    onMounted(async () => {
      users.value = await $comms?.getUsers(10);

      console.log(users);
    });

    return { users };
  },
};
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

  .collapsable {
    width: 100%;
    position: relative;

    & > span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 85%;
    }

    &:hover::after {
      content: attr(data-hover);
      position: absolute;
      font-size: 0.7em;
      padding: 0.3em 0.5em;
      bottom: 2.5em;
      color: lightgray;
      background: gray;
      border-radius: 10px;
    }
  }
}
</style>
