<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-footer app padless>
      <BottomNav />
    </v-footer>
  </v-app>
</template>

<script>
import BottomNav from '@/components/common/BottomNav.vue';
export default {
  name: 'App',
  components: { BottomNav },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped></style>
