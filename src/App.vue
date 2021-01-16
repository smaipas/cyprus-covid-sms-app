<template>
  <v-app>
    <v-main class="light-blue lighten-5">
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

<style lang="scss" scoped>
.app-bg {
  background: rgb(208, 255, 249);
  background: -moz-linear-gradient(
    0deg,
    rgba(208, 255, 249, 1) 0%,
    rgba(157, 218, 255, 1) 35%,
    rgba(184, 255, 244, 1) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(208, 255, 249, 1) 0%,
    rgba(157, 218, 255, 1) 35%,
    rgba(184, 255, 244, 1) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(208, 255, 249, 1) 0%,
    rgba(157, 218, 255, 1) 35%,
    rgba(184, 255, 244, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#d0fff9",endColorstr="#b8fff4",GradientType=1);
}
</style>
