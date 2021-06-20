<template>
  <picture>
    <source :srcset="large" media="(min-width: 600px)" />
    <img :src="medium" alt="avatar" class="avatar" />
  </picture>
</template>

<script lang="ts">
import { h, VNode } from "vue";
import { Picture } from "@/services/Comms/types";

export default {
  name: "CardPicture",
  props: {
    large: { type: String, required: false },
    medium: { type: String, required: false },
    thumbnail: { type: String, required: false },
  },
  render(): VNode {
    const picture: Picture = { ...(this as any).picture };
    const innerHTML = `
        <source srcset="${picture.large}" media="(min-width: 600px)">
        <img src="${picture.medium}" alt="avatar">
      `;

    return h("picture", { innerHTML });
  },
};
</script>

<style lang="scss" scoped>
$size: 6em;

img {
  border-radius: 50%;
  position: relative;
  padding: $size/2;
  width: $size;
  height: $size;
  min-height: $size;

  &::before {
    @include icon("person_outline");
    background: gray;
    color: lightgray;
    font-family: "Material Icons", serif;
    content: "person_outline";
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: $size;
    padding: 0.25em;
  }
}
</style>