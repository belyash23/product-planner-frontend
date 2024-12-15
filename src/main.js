import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {CategoryScale, Chart, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";

Chart.register(LinearScale, Title, Tooltip, CategoryScale, PointElement, LineElement)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
