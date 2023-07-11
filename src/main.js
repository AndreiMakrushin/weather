import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueGeolocation } from 'vue-browser-geolocation'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(VueGeolocation)
app.mount('#app')
