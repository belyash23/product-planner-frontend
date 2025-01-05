<template>
  <main>
    <div class="tabs">
      <RouterLink class="back" :to="{
           name: `forecast-wells`,
           params: {forecastId: forecastId},
         }">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 108.06"><title>back-arrow</title><path d="M63.94,24.28a14.28,14.28,0,0,0-20.36-20L4.1,44.42a14.27,14.27,0,0,0,0,20l38.69,39.35a14.27,14.27,0,0,0,20.35-20L48.06,68.41l60.66-.29a14.27,14.27,0,1,0-.23-28.54l-59.85.28,15.3-15.58Z"/></svg>
      </RouterLink>
      <div :class="{tab: true, active: activeTab === 'indicators'}" @click="activeTab='indicators'">Индикаторы</div>
      <div :class="{tab: true, active: activeTab === 'charts'}" @click="activeTab='charts'">Графики</div>
    </div>
    <WellCharts v-if="activeTab === 'charts'" :forecast-id="forecastId" :well-id="wellId" :indicators="data.indicators"></WellCharts>
    <WellIndicators v-if="activeTab === 'indicators'" :data="data" :forecast-id="forecastId" :well-id="wellId"></WellIndicators>
  </main>
</template>

<script>
import WellCharts from "@/components/WellCharts.vue";
import {useWellsStore} from "@/stores/wells";
import WellIndicators from "@/components/WellIndicators.vue";

export default {
  name: "ForecastWellsView",
  props: ['forecastId', 'wellId'],
  data() {
    return {
      activeTab: 'indicators',
      wellsStore: useWellsStore(),
      data: [],
    }
  },
  components: {WellIndicators, WellCharts},
  created() {
    this.wellsStore.wells[this.forecastId].forEach(well => {
      if (well.DocumentId === this.wellId) {
        this.data = well.data;
      }
    });

    this.wellsStore.getWellData(this.forecastId, this.wellId).then(() => {
      this.wellsStore.wells[this.forecastId].forEach(well => {
        if (well.DocumentId === this.wellId) {
          this.data = well.data;
        }
      });
    });
  }
}
</script>

<style scoped>

.tabs {
  background: #eeeeee;
  padding: 5px;
  display: flex;
  justify-content: space-around;
  width: 220px;
}

.tab {
  color: var(--color-text);
  cursor: pointer;
  position: relative;
}

.tab::before {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: #000;
  transform: scaleX(0);
  transition: transform 0.3s ease;
  margin-top: 1px;
}
.tab.active::before {
  transform: scaleX(1);
}
.tab:hover::before {
  transform: scaleX(1);
}

.back svg {
  height: 15px;
  margin-top: 5px;
  fill: var(--color-text);
  cursor: pointer;
  margin-right: 10px;
}

</style>
