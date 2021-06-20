<template>
  <div class="carousel" ref="carousel">
    <loader-ripple
      class="carousel__content"
      v-if="!items || !items.length"
      style="margin: auto"
    />

    <div class="carousel__content" v-else>
      <section class="carousel__page__navigation">
        <button @click="prev" :disabled="pending">
          <span class="material-icons-outlined">arrow_back_ios</span>
        </button>
        <button @click="next" :disabled="pending">
          <span class="material-icons-outlined">arrow_forward_ios</span>
        </button>
      </section>

      <section class="carousel__container">
        <UserCard v-for="(item, key) in items" :key="key" :user-config="item" />
      </section>

    </div>
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

import { onMounted, onUnmounted, PropType, ref, watch } from "vue";
import { GenericObject } from "@/services/Utils/types";
import UserCard from "@/components/UserCard/UserCard.vue";
import LoaderRipple from "@/components/Loaders/LoaderRipple.vue";

export enum Events {
  PageUpdate = "page-update",
}

export default {
  name: "Carousel",
  components: { UserCard, LoaderRipple },
  props: {
    items: { type: Array as PropType<GenericObject>, default: (): GenericObject[] => [] },
  },
  emits: Object.values(Events),
  setup(props: GenericObject, { emit }: GenericObject): GenericObject {
    const itemMaxSize = 210; // TODO: find better way to grab this value... it's UserCard.maxWidth + somePadding
    const maxPages = 20; // TODO: find out from randomuser.me how I can grab this value
    let updateRequestId: number;

    const carousel = ref<HTMLElement>();

    const currentPage = ref<number>(0);
    const itemsPerPage = ref<number>(1);
    const pending = ref<boolean>(false);

    watch(() => currentPage.value, requestUpdate);
    watch(() => props.items, () => pending.value = false);

    onMounted(() => {
      window.addEventListener("resize", onResize);

      updateItemsPerPage();
      next();
    });

    onUnmounted(() => window.removeEventListener("resize", onResize));

    function onResize() {
      updateItemsPerPage();

      // trick to trigger request update only once a sequence of resizing requests have completed. eg when resizing a window
      clearTimeout(updateRequestId);
      updateRequestId = setTimeout(requestUpdate, 500);
    }

    function updateItemsPerPage() {
      itemsPerPage.value = Math.floor((carousel.value?.offsetWidth || 1) / itemMaxSize);
    }

    function prev() {
      if (currentPage.value === 1) {
        currentPage.value = maxPages;
      } else {
        currentPage.value -= 1;
      }
    }

    function next() {
      if (currentPage.value === maxPages) {
        currentPage.value = 1;
      } else {
        currentPage.value += 1;
      }
    }

    function requestUpdate() {
      pending.value = true;
      emit(Events.PageUpdate, currentPage.value, itemsPerPage.value);
    }

    return {
      carousel,
      pending,
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