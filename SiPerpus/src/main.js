// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { setupGuards } from './router/guards'
import router from './router'
// Import globals.css (Tailwind + CSS variables shadcn)
import './assets/globals.css'

const app = createApp(App)
app.use(createPinia())
setupGuards(router)
app.use(router)
app.mount('#app')
