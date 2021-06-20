<template>
  <span>{{ fullName }}</span>
</template>

<script lang="ts">
import { computed, inject } from "vue";
import { Name } from "@/services/Comms/types";
import { GenericObject, UtilsService } from "@/services/Utils/types";

export default {
  name: "UserName",
  props: {
    title: { typed: String, required: false },
    first: { typed: String, required: false },
    last: { typed: String, required: false },
  },
  setup(props: GenericObject): GenericObject {
    const utils: UtilsService | undefined = inject("$utils");
    const fullName = computed<string>(() => {
      const placeholder = "User Name";

      return utils?.toSortedString(
          props,
          ["title", "first", "last"],
          placeholder,
          " "
        ) || placeholder;
    });

    return { fullName };
  },
};
</script>

<style lang="scss">
.card {
  &__text {
    color: rgba(0, 0, 0, 0.7);
  }
}
</style>
