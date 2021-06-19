<template>
  <section>
    <a :href="`mailto:${email}}`" class="email" target="_blank">{{ email }}</a>
    <a :href="`tel:${phone}}`" class="phone" target="_blank">{{ phone }}</a>
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
