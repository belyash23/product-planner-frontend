import { createRouter, createWebHistory } from 'vue-router'
import ForecastsView from '../views/ForecastsView.vue'
import WellsView from "@/views/WellsView.vue";
import ForecastWellsView from "@/views/ForecastWellsView.vue";
import WellView from "@/views/WellView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'forecasts',
      component: ForecastsView
    },
    {
      path: '/forecast/:forecastId/wells',
      name: 'forecast-wells',
      component: ForecastWellsView,
      props: true,
    },
    {
      path: '/wells',
      name: 'wells',
      component: WellsView,
    },
    {
      path: '/forecast/:forecastId/wells/:wellId',
      name: 'well',
      component: WellView,
      props: true,
    }
  ]
})

export default router
