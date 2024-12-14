<template>
<table>
  <thead>
    <tr>
      <th>Название</th>
      <th>Комментарий</th>
      <th>Дата создания</th>
      <th>Дата изменения</th>
      <th>Действия</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="forecast in preparedForecasts">
      <td>{{forecast.name}}</td>
      <td>{{forecast.comment}}</td>
      <td>{{forecast.createdAt}}</td>
      <td>{{forecast.updatedAt}}</td>
      <td class="action-buttons">
        <div class="view-button action-button" @click="viewForecast(forecast.id)">
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 68.18"><path class="cls-1" d="M61.44,13.81a20.31,20.31,0,1,1-14.34,6,20.24,20.24,0,0,1,14.34-6ZM1.05,31.31A106.72,106.72,0,0,1,11.37,20.43C25.74,7.35,42.08.36,59,0s34.09,5.92,50.35,19.32a121.91,121.91,0,0,1,12.54,12,4,4,0,0,1,.25,5,79.88,79.88,0,0,1-15.38,16.41A69.53,69.53,0,0,1,63.43,68.18,76,76,0,0,1,19.17,53.82,89.35,89.35,0,0,1,.86,36.44a3.94,3.94,0,0,1,.19-5.13Zm15.63-5A99.4,99.4,0,0,0,9.09,34,80.86,80.86,0,0,0,23.71,47.37,68.26,68.26,0,0,0,63.4,60.3a61.69,61.69,0,0,0,38.41-13.72,70.84,70.84,0,0,0,12-12.3,110.45,110.45,0,0,0-9.5-8.86C89.56,13.26,74.08,7.58,59.11,7.89S29.63,14.48,16.68,26.27Zm39.69-7.79a7.87,7.87,0,1,1-7.87,7.87,7.86,7.86,0,0,1,7.87-7.87Z"/></svg>
        </div>
        <div class="copy-button action-button" @click="copy(forecast.id)">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 105.02 122.88" style="enable-background:new 0 0 105.02 122.88" xml:space="preserve"><g><path d="M5.32,14.64h20.51V5.32v0h0.01c0-1.47,0.6-2.8,1.56-3.76c0.95-0.95,2.28-1.55,3.75-1.55V0h0h39.61h1.22l0.88,0.88 l31.29,31.41l0.87,2.09v69.2v0h-0.01c0,1.47-0.59,2.8-1.55,3.76h-0.01c-0.95,0.96-2.28,1.55-3.75,1.55v0.01h0H79.19v8.65v0h-0.01 c0,1.47-0.59,2.8-1.55,3.76h-0.01c-0.96,0.95-2.28,1.55-3.75,1.55v0.01h0H5.32h0v-0.01c-1.47,0-2.8-0.6-3.76-1.56 c-0.95-0.96-1.55-2.28-1.55-3.75H0v0V19.97v0h0.01c0-1.47,0.6-2.8,1.56-3.76c0.95-0.95,2.28-1.55,3.75-1.55L5.32,14.64L5.32,14.64 L5.32,14.64z M31.76,14.64h13.17h1.22l0.88,0.88l31.29,31.41l0.87,2.09v53.95h19.89V36.24H74.73h0v0c-1.78,0-3.39-0.74-4.56-1.94 c-1.17-1.19-1.9-2.84-1.9-4.65h0v0V5.94H31.76V14.64L31.76,14.64z M68.39,2.97h2.37l31.29,31.41v1.74H74.73 c-3.49,0-6.35-2.92-6.35-6.48V2.97L68.39,2.97z M73.26,50.88H48.91h0v0c-1.78,0-3.39-0.74-4.56-1.94c-1.17-1.19-1.9-2.84-1.9-4.65 h0v0V20.58H25.83H5.94v96.36h67.32v-8.04v-2.97V50.88L73.26,50.88z"/></g></svg>
        </div>
        <div class="delete-button action-button" @click="deleteForecast(forecast.id)">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="108.294px" height="122.88px" viewBox="0 0 108.294 122.88" enable-background="new 0 0 108.294 122.88" xml:space="preserve"><g><path d="M4.873,9.058h33.35V6.2V6.187c0-0.095,0.002-0.186,0.014-0.279c0.075-1.592,0.762-3.037,1.816-4.086l-0.007-0.007 c1.104-1.104,2.637-1.79,4.325-1.806l0.023,0.002V0h0.031h19.884h0.016c0.106,0,0.207,0.009,0.309,0.022 c1.583,0.084,3.019,0.76,4.064,1.81c1.102,1.104,1.786,2.635,1.803,4.315l-0.003,0.021h0.014V6.2v2.857h32.909h0.017 c0.138,0,0.268,0.014,0.401,0.034c1.182,0.106,2.254,0.625,3.034,1.41l0.004,0.007l0.005-0.007 c0.851,0.857,1.386,2.048,1.401,3.368l-0.002,0.032h0.014v0.032v10.829c0,1.472-1.195,2.665-2.667,2.665h-0.07H2.667 C1.195,27.426,0,26.233,0,24.762v-0.063V13.933v-0.014c0-0.106,0.004-0.211,0.018-0.315v-0.021 c0.089-1.207,0.624-2.304,1.422-3.098l-0.007-0.002C2.295,9.622,3.49,9.087,4.81,9.069l0.032,0.002V9.058H4.873L4.873,9.058z M77.79,49.097h-5.945v56.093h5.945V49.097L77.79,49.097z M58.46,49.097h-5.948v56.093h5.948V49.097L58.46,49.097z M39.13,49.097 h-5.946v56.093h5.946V49.097L39.13,49.097z M10.837,31.569h87.385l0.279,0.018l0.127,0.007l0.134,0.011h0.009l0.163,0.023 c1.363,0.163,2.638,0.789,3.572,1.708c1.04,1.025,1.705,2.415,1.705,3.964c0,0.098-0.009,0.193-0.019,0.286l-0.002,0.068 l-0.014,0.154l-7.393,79.335l-0.007,0.043h0.007l-0.016,0.139l-0.051,0.283l-0.002,0.005l-0.002,0.018 c-0.055,0.331-0.12,0.646-0.209,0.928l-0.007,0.022l-0.002,0.005l-0.009,0.018l-0.023,0.062l-0.004,0.021 c-0.118,0.354-0.264,0.698-0.432,1.009c-1.009,1.88-2.879,3.187-5.204,3.187H18.13l-0.247-0.014v0.003l-0.011-0.003l-0.032-0.004 c-0.46-0.023-0.889-0.091-1.288-0.202c-0.415-0.116-0.818-0.286-1.197-0.495l-0.009-0.002l-0.002,0.002 c-1.785-0.977-2.975-2.882-3.17-5.022L4.88,37.79l-0.011-0.125l-0.011-0.247l-0.004-0.116H4.849c0-1.553,0.664-2.946,1.707-3.971 c0.976-0.955,2.32-1.599,3.756-1.726l0.122-0.004v-0.007l0.3-0.013l0.104,0.002V31.569L10.837,31.569z M98.223,36.903H10.837 v-0.007l-0.116,0.004c-0.163,0.022-0.322,0.106-0.438,0.222c-0.063,0.063-0.104,0.132-0.104,0.179h-0.007l0.007,0.118l7.282,79.244 h-0.002l0.002,0.012c0.032,0.376,0.202,0.691,0.447,0.825l-0.002,0.004l0.084,0.032l0.063,0.012h0.077h72.695 c0.207,0,0.399-0.157,0.518-0.377l0.084-0.197l0.054-0.216l0.014-0.138h0.005l7.384-79.21L98.881,37.3 c0-0.045-0.041-0.111-0.103-0.172c-0.12-0.118-0.286-0.202-0.451-0.227L98.223,36.903L98.223,36.903z M98.334,36.901h-0.016H98.334 L98.334,36.901z M98.883,37.413v-0.004V37.413L98.883,37.413z M104.18,37.79l-0.002,0.018L104.18,37.79L104.18,37.79z M40.887,14.389H5.332v7.706h97.63v-7.706H67.907h-0.063c-1.472,0-2.664-1.192-2.664-2.664V6.2V6.168h0.007 c-0.007-0.22-0.106-0.433-0.259-0.585c-0.137-0.141-0.324-0.229-0.521-0.252h-0.082h-0.016H44.425h-0.031V5.325 c-0.213,0.007-0.422,0.104-0.576,0.259l-0.004-0.004l-0.007,0.004c-0.131,0.134-0.231,0.313-0.259,0.501l0.007,0.102V6.2v5.524 C43.554,13.196,42.359,14.389,40.887,14.389L40.887,14.389z"/></g></svg>
        </div>
<!--        <RouterLink :to="`/link-contact/${deal.id}`" :class="{'disabled-link': deal.has_contact}">-->
<!--          <img src="../../images/link.png" alt="" :class="{'link-contact': true, 'link-contact_disabled': deal.has_contact}">-->
<!--        </RouterLink>-->
      </td>
    </tr>
  </tbody>
</table>
</template>

<script>

import {useForecastsStore} from "@/stores/forecasts";

export default {
  name: "ForecastsTable",
  data() {
    return {
      forecastsStore: useForecastsStore(),
      forecasts: [],
    }
  },
  methods: {
    getFormattedDate(dateString) {
      const date = new Date(Date.parse(dateString));

      return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    },
    copy(id) {
      this.forecastsStore.copy(id);
    },
    deleteForecast(id) {
      if (confirm('Вы уверены, что хотите удалить прогноз?')) {
        this.forecastsStore.delete(id);
      }
    },
    viewForecast(id) {

    },
  },
  computed: {
    preparedForecasts() {
      const preparedForecasts = [];
      this.forecasts.forEach(forecast => {
        preparedForecasts.push({
          id: forecast.forecastId,
          name: forecast.label,
          comment: forecast.comment,
          createdAt: this.getFormattedDate(forecast.createdAt),
          updatedAt: this.getFormattedDate(forecast.lastModificationTime),
        });
      });

      return preparedForecasts;
    }
  },
  created() {
    this.forecastsStore.fetch().then(() => {
      this.forecasts = this.forecastsStore.forecasts;
    });
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-spacing: 0;
}

thead {
  background: #1A82E3;
  color: #ffffff;
}

th {
  padding: 10px;
}

td {
  padding: 5px;
  text-align: center;
}

.action-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.action-button {
  width: 24px;
  display: flex;
  cursor: pointer;
}

.action-button svg {
  height: 24px;
}

.action-button svg {
  fill: #666666;
  transition: .5s;
}

.action-button :hover {
  fill: #004596;
}

.link-contact {
  margin: 0 auto;
}

.disabled-link {
  opacity: 0.5;
  pointer-events: none;
  cursor: auto;
}
</style>
