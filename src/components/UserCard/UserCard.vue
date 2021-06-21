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
  border: 1px solid var(--theme-color-2);
  border-radius: 1em;
  box-shadow: 0 5px 10px gray;
  width: 50%;
  max-width: 200px;
  max-height: 80vh;
  background-color: var(--theme-color-1);
  color: var(--theme-color-2);
}
</style>