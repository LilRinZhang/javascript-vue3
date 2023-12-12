import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueSmoothScroll from 'vue3-smooth-scroll'



createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueSmoothScroll)
  .mount('#app')
