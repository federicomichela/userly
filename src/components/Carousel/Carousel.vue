<template>
  <div class="carousel">
    <section>
      <button @click="prev">
        <span class="material-icons-outlined">arrow_back_ios</span>
      </button>
      <span>{{ navigationText }}</span>
      <button @click="next">
        <span class="material-icons-outlined">arrow_forward_ios</span>
      </button>
    </section>

    <section v-if="currentPageItems">
      <UserCard v-for="(item, key) in currentPageItems" :key="key" :user-config="item" />
    </section>
  </div>
</template>

<script lang="ts">
/**
 * TODOs:
 * - add page selector
 * - abstraction: this component could potentially be refactored to use any component not just UsersCards, but to do so we need to
 *   dynamically import components...
 */

import { computed, inject, onMounted, PropType, ref, watch } from "vue";
import { GenericObject, UtilsService } from "@/services/Utils/types";
import { User } from "@/services/Comms/types";
import UserCard from "../UserCard/UserCard.vue";

export default {
  name: "Carousel",
  components: { UserCard },
  props: {
    items: { type: Array as PropType<User>, required: true },
  },
  setup(props: GenericObject): GenericObject {
    const utils: UtilsService | undefined = inject("$utils");

    const currentPage = ref<number>(0);
    const pages = ref<[][]>([]);

    const currentPageItems = computed<[]>(() => pages.value[currentPage.value]);
    const navigationText = computed<string>(() => `${currentPage.value} / ${pages.value.length}`);

    watch(() => props.users, updatedPages);

    onMounted(() => {
      window.addEventListener("resize", updatedPages);

      updatedPages();
    });

    function updatedPages() {
      const itemsPerPage = utils?.isDesktop() ? (utils?.isPortrait() ? 3 : 5) : (utils?.isPortrait() ? 1 : 3);
      const itemsCopy = [...props.items];
      let page: [];

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
      currentPageItems,
      navigationText,
      prev,
      next,
    };
  },
};
</script>

<style scoped>

</style>