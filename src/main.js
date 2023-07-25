import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueGeolocation } from 'vue-browser-geolocation'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VueGeolocation)
app.use(router)
app.mount('#app')
