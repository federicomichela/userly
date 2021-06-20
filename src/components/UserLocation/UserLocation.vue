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
import { computed, watch } from "vue";

export default {
  name: "UserLocation",
  props: {
    street: { type: Object as () => Street, required: false },
    city: { type: String, required: false },
    postcode: { type: [String, Number], required: false },
    state: { type: String, required: false },
    coordinates: { type: Object as () => Coordinates, required: false },
  },
  setup(props: any) {
    const fullAddress = computed<string>(() => {
      if (Object.values(props).every((e: string | number) => !e)) {
        return "42 Street, Some City, Postal Code, Some State";
      }

      const addressOrderedProps = [
        "street.number",
        "street.name",
        "city",
        "postcode",
        "state",
      ];
      const address = [];
      for (const prop of addressOrderedProps) {
        let parts = prop.split(".");
        let value = props[parts.splice(0, 1)];

        if (!value) continue;

        for (const subProp of parts) {
          value = value[subProp];
        }

        if (value) {
          if (parts.length && address.length) {
            address[address.length - 1] += ` ${value}`;
          } else {
            address.push(value);
          }
        }
      }

      return address.join(", ");
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
