<template>
  <section>
    <a :href="`mailto:${email}}`" class="email collapsable" :data-hover="email" target="_blank"><span>{{ email }}</span></a>
    <a :href="`tel:${phone}}`" class="phone collapsable" :data-hover="phone" target="_blank"><span>{{ phone }}</span></a>
  </section>
</template>

<script lang="ts">
export default {
  name: "UserContacts",
  props: {
    email: { type: String, default: "user@email.com" },
    phone: { type: String, default: "+333 111 2222" },
  },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
}

.email {
  &::before {
    @include icon("mail");
  }
}

.phone {
  &::before {
    @include icon("phone");
  }
}
</style>
