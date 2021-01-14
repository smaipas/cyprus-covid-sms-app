<template>
  <v-bottom-navigation :value="activeView" color="primary">
    <v-btn
      v-for="item in menuItems"
      :key="item.value"
      color="transparent"
      :value="item.value"
      :data-test="item.label"
      @click="$router.push({ name: item.value })"
    >
      <span>{{ item.label }}</span>
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
