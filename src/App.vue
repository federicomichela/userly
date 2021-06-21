<template>
  <div :style="globalVars">
    <h1>Userly</h1>
    <ThemeColorPicker @theme-color-update="updateTheme" />
    <Carousel :items="users" @page-update="requestResultsPage" />
  </div>
</template>

<script lang="ts">
import chroma from "chroma-js";
import { computed, inject, ref } from "vue";
import Carousel from "@/components/Carousel/Carousel.vue";
import { CommsService, User } from "@/services/Comms/types";
import ThemeColorPicker from "@/components/ThemeColorPicker/ThemeColorPicker.vue";
import { GenericObject } from "@/services/Utils/types";

export default {
  name: "App",
  components: {
    ThemeColorPicker,
    Carousel,
  },
  setup(): GenericObject {
    const $comms: CommsService | undefined = inject("$comms");

    const users = ref<User[]>();
    const primaryThemeColor = ref<string>("#fff");

    const globalVars = computed<GenericObject>(() => {
      const scale = chroma.scale(["white", primaryThemeColor.value]);
      const bg = scale(1).hex();
      const text = scale(0.5).hex();
      return { "--theme-color-1": bg, "--theme-color-2": text };
    });

    async function requestResultsPage(page: number, results: number): Promise<void> {
      users.value = await $comms?.getUsers(page, results);
    }

    function updateTheme(color: string) {
      primaryThemeColor.value = color;
    }

    return { users, globalVars, requestResultsPage, updateTheme };
  },
};
</script>

<style lang="scss">
$material-icons-font-path: "~material-icons/iconfont/";
@import "~material-icons/iconfont/material-icons.scss";

body {
  margin: 0;
}

@function complementaryColor($color) {
  @return complement($color);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: center;

  & *:first-child {
    /* magic vars injection from js happens in here */

    /* general styling */
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
}
</style>
