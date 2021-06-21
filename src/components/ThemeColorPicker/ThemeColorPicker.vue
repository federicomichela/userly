<template>
  <div class="theme-color-picker">
    <label for="head">Card background color: </label>
    <input ref="colorPicker" type="color" id="head" name="head" v-bind:value="currentColor" @input="reflectChange" @change="reflectChange"/>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch } from "vue";
import { GenericObject } from "@/services/Utils/types";

enum Events {
  ColorUpdate = "theme-color-update",
}

export default {
  name: "ThemeColorPicker",
  emits: Object.values(Events),
  setup(props: GenericObject, { emit }: GenericObject): GenericObject {
    const defaultThemeColor = "#EEEEFF";
    const localStorage = window.localStorage;

    const colorPicker = ref<HTMLInputElement>();
    const currentColor = ref<string>("");

    watch(() => currentColor.value, () => {
      localStorage.setItem("themeColor", currentColor.value);
      emit(Events.ColorUpdate, currentColor.value);
    });

    onMounted(async (): Promise<void> => {
      // grab from cache or init
      currentColor.value = localStorage.getItem("themeColor") || defaultThemeColor;
    });

    function reflectChange() {
      colorPicker.value?.value && (currentColor.value = colorPicker.value?.value);
    }

    return { colorPicker, currentColor, reflectChange };
  },
};
</script>

<style lang="scss" scoped>

</style>