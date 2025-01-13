<template>
<table>
  <thead>
    <tr>
      <th>Название</th>
      <th>Комментарий</th>
      <th>Дата создания</th>
      <th>Дата изменения</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
      <template v-for="forecast in preparedForecasts">
        <RouterLink class="forecast" :to="{
           name: `forecast-wells`,
           params: {forecastId: forecast.id},
         }">
          <td>{{forecast.name}}</td>
          <td>{{forecast.comment}}</td>
          <td>{{forecast.createdAt}}</td>
          <td>{{forecast.updatedAt}}</td>
          <td class="actions" @click.stop.prevent="showContext(forecast.id, $event)"><p>...</p></td>
        </RouterLink>
      </template>
  </tbody>
</table>
  <div class="context-menu" v-show="contextMenuOpened" ref="context-menu" :style="{top: contextMenuOffsetY + 'px', left: contextMenuOffsetX + 'px'}">
    <div class="context-menu__item" @click="copy()">Скопировать</div>
    <div class="context-menu__item" @click="deleteForecast(chosenForecast.id)">Удалить</div>
  </div>
  <transition name="copy-modal">
  <ModalWindow v-if="showCopyModal" @close="showCopyModal = false" :width="'400px'">
    <template v-slot:header>
      <h3>Копирование прогноза {{ chosenForecast.name }}</h3>
    </template>
    <template v-slot:body>
      <CopyForecast :forecast-id="chosenForecast.id"></CopyForecast>
    </template>
  </ModalWindow>
  </transition>
</template>

<script>

import {useForecastsStore} from "@/stores/forecasts";
import ModalWindow from "@/components/ModalWindow.vue";
import ForecastWells from "@/components/ForecastWells.vue";
import {getFormattedDate} from "@/helpers/dateHelper";
import CopyForecast from "@/components/CopyForecast.vue";


export default {
  name: "ForecastsTable",
  components: {CopyForecast, ModalWindow, ForecastWells},
  data() {
    return {
      forecastsStore: useForecastsStore(),
      forecasts: [],
      showCopyModal: false,
      chosenForecast: {},
      contextMenuOpened: false,
      contextMenuOpenedRecently: false,
      contextMenuOffsetX: 0,
      contextMenuOffsetY: 0,
    }
  },
  methods: {
    copy() {
      this.showCopyModal = true;
    },
    deleteForecast(id) {
      if (confirm('Вы уверены, что хотите удалить прогноз?')) {
        this.forecastsStore.delete(id);
      }
    },
    showContext(forecastId, e)
    {
      this.chosenForecast = this.preparedForecasts.filter(forecast => forecast.id === forecastId)[0];
      this.contextMenuOffsetX = e.clientX - 120 - 110;
      this.contextMenuOffsetY = e.clientY;
      this.contextMenuOpened = !this.contextMenuOpened;
    },
    closeContext()
    {
      this.contextMenuOpened = false;
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
          createdAt: getFormattedDate(forecast.createdAt),
          updatedAt: getFormattedDate(forecast.lastModificationTime),
        });
      });

      return preparedForecasts;
    }
  },
  created() {
    this.forecastsStore.fetch().then(() => {
      this.forecasts = this.forecastsStore.forecasts;
    });

    window.addEventListener('click', (e) => {
      if (!this.$refs["context-menu"]?.contains(e.target)){
        this.closeContext();
      }
    })
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
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
  transition: .2s;
}

.action-button :hover {
  fill: #004596;
}

input {
  cursor: pointer
}

.context-menu-button {
  cursor: pointer;
  transition: .5s;
}
.context-menu-button:hover, .context-menu-button.active {
  background: #2371d1;
}

.context-menu {
  position: absolute;
  background: #dddddd;
  left: 0;
  z-index: 9990;
  cursor: default;
  width: 100px;
  padding-left: 5px;
}

.context-menu__item {
  color: var(--color-text);
  cursor: pointer;
  position: relative;
  margin-bottom: 5px;
}

.context-menu__item::before {
  content: "";
  position: absolute;
  display: block;
  width: 90%;
  height: 1px;
  bottom: 0;
  left: 5%;
  background-color: #000;
  transform: scaleX(0);
  transition: transform 0.3s ease;
  margin-top: 1px;
}

.context-menu__item:hover::before {
  transform: scaleX(1);
}

.forecast {
  display: table-row;
  transition: .2s;
  cursor: pointer;
  border-bottom: solid 1px #cccccc;
}

.forecast:last-child{
  border-bottom: none;
}

.forecast:hover {
  background: #cccccc;
}

.actions p{
  transform: rotate(90deg);
  font-size: 20px;
  letter-spacing: 3px;
}

.context-menu {
  outline: none;
}

</style>
