<template>
  <div class="card">
    <section v-for="(value, key) in userConfig" :key="key">
      <component :is="camelize(`User ${key}`)" v-bind="value" />
    </section>
  </div>
</template>

<script lang="ts">
import { User } from "@/services/Comms/types";
import UserName from "@/components/UserName/UserName.vue";
import UserPicture from "@/components/UserPicture/UserPicture.vue";
import UserLocation from "@/components/UserLocation/UserLocation.vue";
import UserContacts from "@/components/UserContacts/UserContacts.vue";

export default {
  name: "UserCard",
  components: { UserName, UserLocation, UserPicture, UserContacts },
  props: {
    userConfig: {
      type: Object as () => User,
      default: () => {
        return {
          picture: {},
          name: {},
          location: {},
          contacts: {}
        };
      },
    },
  },
  setup(props: any) {
    function camelize(str: string) {
      return str.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase());
    }

    return { camelize };
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid black;
  width: 50%;
  max-height: 60vh;
}
</style>