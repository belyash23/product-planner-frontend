<template>
  <main>
    <ForecastWells :forecast-id="forecastId"></ForecastWells>
  </main>
</template>

<script>
import ForecastWells from "@/components/ForecastWells.vue";

export default {
  name: "ForecastWellsView",
  props: {
    forecastId: Number,
  },
  components: {ForecastWells}
}
</script>

<style scoped>

</style>
