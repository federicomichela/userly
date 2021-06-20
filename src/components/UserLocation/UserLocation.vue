<template>
  <a
    :href="`https://www.google.com/maps/search/?api=1&query=${coordinates?.latitude || 0},${coordinates?.longitude || 0}`"
    :data-hover="fullAddress"
    class="address collapsable"
    target="_blank">
    <span>{{ fullAddress }}</span>
  </a>
</template>

<script lang="ts">
import { Coordinates, Street } from "@/services/Comms/types";
import { computed, inject } from "vue";
import { GenericObject, UtilsService } from "@/services/Utils/types";

export default {
  name: "UserLocation",
  props: {
    street: { type: Object as () => Street, required: false },
    city: { type: String, required: false },
    postcode: { type: [String, Number], required: false },
    state: { type: String, required: false },
    coordinates: { type: Object as () => Coordinates, required: false },
  },
  setup(props: GenericObject): GenericObject {
    const utils: UtilsService | undefined = inject("$utils");

    const fullAddress = computed<string>(() => {
      const placeholder = "42 Street, Some City, Postal Code, Some State";
      return utils?.toSortedString(
        props,
        ["street.number", "street.name", "city", "postcode", "state"],
        placeholder
      ) || "42 Street, Some City, Postal Code, Some State";
    });

    return { fullAddress };
  },
};
</script>

<style lang="scss">
.address {
  &::before {
    @include icon("place");
  }
}
</style>
