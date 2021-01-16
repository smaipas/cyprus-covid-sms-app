import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    themes: {
      light: {
        primary: '#00838f',
        secondary: '#37474f',
        accent: '#c6ff00',
        error: '#b70b0b',
      },
    },
  },
});
