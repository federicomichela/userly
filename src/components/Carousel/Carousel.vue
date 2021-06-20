<template>
  <div class="carousel" ref="carousel">
    <section class="carousel__navigation">
      <button @click="prev">
        <span class="material-icons-outlined">arrow_back_ios</span>
      </button>
      <span>{{ navigationText }}</span>
      <button @click="next">
        <span class="material-icons-outlined">arrow_forward_ios</span>
      </button>
    </section>

    <section v-if="currentPageItems" class="carousel__container">
      <UserCard v-for="(item, key) in currentPageItems" :key="key" :user-config="item" />
    </section>
  </div>
</template>

<script lang="ts">
/**
 * TODO:
 * - add page selector
 * - look into ts generics instead of using GenericObject (hack)
 * - abstraction: this component could potentially be refactored to use any component not just UsersCards, but to do so we need to
 *   dynamically import components...
 */

import { computed, onMounted, PropType, ref, watch } from "vue";
import { GenericObject } from "@/services/Utils/types";
import UserCard from "../UserCard/UserCard.vue";

export default {
  name: "Carousel",
  components: { UserCard },
  props: {
    items: { type: Array as PropType<GenericObject>, required: true },
  },
  setup(props: GenericObject): GenericObject {
    const carousel = ref<HTMLElement>();

    const currentPage = ref<number>(0);
    const pages = ref<GenericObject[][]>([]);

    const currentPageItems = computed<GenericObject[]>(() => pages.value[currentPage.value]);
    const navigationText = computed<string>(() => `${currentPage.value} / ${pages.value.length}`);

    const itemMaxSize = 210; // TODO: find better way to grab thi value... it'd be UserCard.maxWidth + somePadding

    watch(() => props.users, updatedPages);

    onMounted(() => {
      window.addEventListener("resize", updatedPages);

      updatedPages();
    });

    function updatedPages() {
      const itemsPerPage = Math.floor((carousel.value?.offsetWidth || 0) / itemMaxSize);
      const itemsCopy: GenericObject[] = [...props.items];

      let page: GenericObject[];

      pages.value = [];
      while (itemsCopy.length) {
        page = itemsCopy.splice(0, itemsPerPage);
        pages.value.push(page);
      }
    }

    function prev() {
      if (!currentPage.value) {
        currentPage.value = pages.value.length - 1;
      } else {
        currentPage.value -= 1;
      }
    }

    function next() {
      if (currentPage.value === pages.value.length - 1) {
        currentPage.value = 0;
      } else {
        currentPage.value += 1;
      }
    }

    return {
      carousel,
      currentPageItems,
      navigationText,
      prev,
      next,
    };
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  display: flex;
  flex-direction: column-reverse;

  &__navigation {}

  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-evenly;
  }
}
</style>