<template>
  <LinearChart v-for="(chartData, title) in this.chartsData"
               :title="title"
               :years="chartData.years"
               :years-data="chartData.yearsData"
               :months-data="chartData.monthsData">
  </LinearChart>
</template>

<script>

import LinearChart from "@/components/LinearChart.vue";
import {useWellsStore} from "@/stores/wells";
export default {
  name: "WellCharts",
  components: {LinearChart},
  props: {
    forecastId: Number,
    wellId: String,
    indicators: Array,
  },
  data() {
    return {
      chartsData: {},
    }
  },
  methods: {
    updateChartsData() {
      const chartsData = {};
      this.indicators?.forEach(indicator => {
        chartsData[indicator.name] = {}

        chartsData[indicator.name].years = [];
        for (let i = 0; i < indicator.yearValues.length; i++) {
          chartsData[indicator.name].years.push(indicator.startYear + i);
        }

        chartsData[indicator.name].yearsData = indicator.yearValues.map(value => +value.toFixed(3));
        chartsData[indicator.name].monthsData = indicator.values2d.map(monthValues => monthValues.map(value => +value.toFixed(3)));
      });

      this.chartsData = chartsData;
    }
  },
  watch: {
    indicators: {
      handler() {
        this.updateChartsData();
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>

</style>
