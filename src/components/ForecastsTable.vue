<template>
<table>
  <thead>
    <tr>
      <th style="width:5%"><input type="checkbox" @click="checkAllForecasts()" :checked="chosenForecasts.length === preparedForecasts.length"></th>
      <th style="width:10%" @click="contextMenuOpened=!contextMenuOpened" :class="{'context-menu-button': true, 'active': contextMenuOpened}">
        <p class="context-menu-title">Выбрано: {{chosenForecasts.length}}</p>
        <div class="context-menu" v-if="contextMenuOpened">
          <div class="context-menu__item" v-if="chosenForecasts.length === 1" @click="copy()">Скопировать</div>
          <div class="context-menu__item" v-if="chosenForecasts.length === 1" @click="deleteForecast(chosenForecasts[0].id)">Удалить</div>
        </div>
      </th>
      <th>Название</th>
      <th>Комментарий</th>
      <th>Дата создания</th>
      <th>Дата изменения</th>
    </tr>
  </thead>
  <tbody>
      <template v-for="forecast in preparedForecasts">
        <RouterLink class="forecast" :to="{
           name: `forecast-wells`,
           params: {forecastId: forecast.id},
         }">
        <td><input type="checkbox" v-model="forecast.checked" @change="updateChosenForecasts()" @click.stop></td>
        <td></td>
        <td>{{forecast.name}}</td>
        <td>{{forecast.comment}}</td>
        <td>{{forecast.createdAt}}</td>
        <td>{{forecast.updatedAt}}</td>
        </RouterLink>
      </template>
  </tbody>
</table>
  <transition name="copy-modal">
  <ModalWindow v-if="showCopyModal" @close="showCopyModal = false" :width="'400px'">
    <template v-slot:header>
      <h3>Копирование прогноза {{ chosenForecasts[0]?.name }}</h3>
    </template>
    <template v-slot:body>
      <CopyForecast :forecast-id="chosenForecasts[0]?.id"></CopyForecast>
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
      chosenForecasts: [],
      contextMenuOpened: false,
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
    updateChosenForecasts() {
      console.log(this.preparedForecasts);
      this.chosenForecasts = this.preparedForecasts.filter(forecast => forecast.checked);
    },
    checkAllForecasts() {
      let checkedValue = true;
      if (this.chosenForecasts.length === this.preparedForecasts.length) {
        checkedValue = false;
      }
      this.preparedForecasts.map(forecast => {
        forecast.checked = checkedValue;
      })

      this.updateChosenForecasts()
    }
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
          checked: false,
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
  width: 100%;
  left: 0;
  margin-top: 10px;
  z-index: 9999;
  cursor: default;
  padding-bottom: 10px;
}

.context-menu__item {
  color: var(--color-text);
  cursor: pointer;
  margin-top: 10px;
  position: relative;
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

</style>
