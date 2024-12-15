import { createRouter, createWebHistory } from 'vue-router'
import ForecastsView from '../views/ForecastsView.vue'
import WellsView from "@/views/WellsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'forecasts',
      component: ForecastsView
    },
    {
      path: '/wells',
      name: 'wells',
      component: WellsView,
    }
  ]
})

export default router
