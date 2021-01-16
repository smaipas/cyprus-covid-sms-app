<template>
  <v-bottom-navigation
    :value="activeView"
    color="lime lighten-3"
    dark
    shift
    background-color="secondary"
  >
    <v-btn
      v-for="item in menuItems"
      :key="item.value"
      text
      :value="item.value"
      :data-test="item.label"
      class="mt-2"
      @click="$router.push({ name: item.value })"
    >
      <span class="mt-2">{{ item.label }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mdiHome, mdiAccount } from '@mdi/js';

export default {
  name: 'BottomNav',
  data: () => ({
    menuItems: [
      { label: 'Home', value: 'Home', icon: mdiHome },
      { label: 'Profile', value: 'Profile', icon: mdiAccount },
    ],
  }),
  computed: {
    activeView() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="scss" scoped></style>
