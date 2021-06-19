<template>
<span>{{ fullName }}</span>
</template>

<script lang="ts">
import { computed } from "vue";
import { Name } from "@/services/Comms/types";

export default {
  name: "UserName",
  props: {
    title: { typed: String, default: "" },
    first: { typed: String, default: "User" },
    last: { typed: String, default: "Name" },
  },
  setup(props: any) {
    const fullName = computed<string>(() => `${props.title} ${props.first} ${props.last}`.trim() );

    return { fullName };
  }
};
</script>

<style lang="scss">
.card {
  &__text {
    color: rgba(0, 0, 0, 0.7);
  }
}
</style>
