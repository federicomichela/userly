<template>
  <a
    :href="`https://www.google.com/maps/search/?api=1&query=${coordinates?.latitude || 0},${coordinates?.longitude || 0}`"
    :data-hover="fullAddress"
    class="address"
    target="_blank">
    <span>{{ fullAddress }}</span>
  </a>
</template>

<script lang="ts">
import { Coordinates, Street } from "@/services/Comms/types";
import { computed } from "vue";

export default {
  name: "UserLocation",
  props: {
    street: { type: Object as () => Street, required: false },
    city: { type: String, default: "Some City" },
    postcode: { type: [String, Number], default: "Postal Code" },
    state: { type: String, default: "Some State" },
    coordinates: { type: Object as () => Coordinates, required: false }
  },
  setup(props: any) {
    const fullAddress = computed<string>(() => {
      return `${props.street?.number || 42} ${props.street?.name || "Street"}, ${props.city}, ${props.postcode}, ${props.state}`;
    });

    return { fullAddress };
  },
};
</script>

<style lang="scss">
.address {
  width: 100%;
  position: relative;

  &::before {
    @include icon("place");
  }

  &:hover::after {
    content: attr(data-hover);
    position: absolute;
    font-size: .7em;
    padding: .3em .5em;
    bottom: 2.5em;
    color: lightgray;
    background: gray;
    border-radius: 10px;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 85%;
  }
}
</style>
