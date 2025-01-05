<template>
  <table>
    <thead>
    <tr>
      <th style="width:5%"><input type="checkbox" @click="checkAllWells()" :checked="chosenWells.length === formattedWells.length"></th>
      <th style="width:8%" @click="contextMenuOpened=!contextMenuOpened" :class="{'context-menu-button': true, 'active': contextMenuOpened}">
        <p class="context-menu-title">Выбрано: {{chosenWells.length}}</p>
        <svg v-if="load" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a6" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#FFFFFF"></stop><stop offset=".3" stop-color="#FFFFFF" stop-opacity=".9"></stop><stop offset=".6" stop-color="#FFFFFF" stop-opacity=".6"></stop><stop offset=".8" stop-color="#FFFFFF" stop-opacity=".3"></stop><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a6)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#FFFFFF" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
        <div class="context-menu" v-show="contextMenuOpened">
          <div class="context-menu__item" @click="calc()">Рассчитать</div>
          <div class="context-menu__item"  @click="download()">Выгрузить</div>
        </div>
      </th>

      <th>Дата ввода</th>
      <th>Стартовый дебит нефти</th>
      <th>Месторождение</th>
      <th>Стартовый дебит жидкости</th>
      <th>Номер скважины</th>
    </tr>
    </thead>
    <tbody>
    <RouterLink class="well" v-for="well in formattedWells" :to="{
           name: `well`,
           params: {forecastId: forecastId, wellId: well.id},
         }">
      <td><input type="checkbox" v-model="well.checked" @change="updateChosenWells()" @click.stop></td>
      <td></td>
      <td>{{well.startDate}}</td>
      <td>{{well.startOil}}</td>
      <td>{{well.field}}</td>
      <td>{{well.startFluid}}</td>
      <td>{{well.number}}</td>
    </RouterLink>
    </tbody>
  </table>
  <a :href="blobUrl" ref="download-button" download="Выгрузка скважин.xlsx"></a>
</template>

<script>
import {useWellsStore} from "@/stores/wells";
import {getFormattedDate} from "@/helpers/dateHelper";
import ModalWindow from "@/components/ModalWindow.vue";
import WellCharts from "@/components/WellCharts.vue";

export default {
  name: "ForecastWells",
  components: {WellCharts, ModalWindow},
  props: {
    forecastId: Number,
  },
  data() {
    return {
      wellsStore: useWellsStore(),
      wells: [],
      showChartsModal: false,
      chosenWell: {},
      chosenWells: [],
      load: false,
      contextMenuOpened: false,
      blobUrl: '#',
    }
  },
  computed: {
    formattedWells() {
      const formattedWells = [];
      this.wells?.forEach(well => {
        formattedWells.push({
          id: well['DocumentId'],
          startDate: getFormattedDate(well['ДатаВвода']),
          startOil: +well['СтартовыйДебитНефти'].toFixed(3),
          field: well['Месторождение'],
          startFluid: +well['СтартовыйДебитЖидкости'].toFixed(3),
          number: well['НомерСкважины'],
          checked: false,
        })
      });

      return formattedWells;
    }
  },
  methods: {
    showCharts(well) {
      this.chosenWell = well;
      this.showChartsModal = true;
    },
    checkAllWells() {
      let checkedValue = true;
      if (this.chosenWells.length === this.formattedWells.length) {
        checkedValue = false;
      }
      this.formattedWells.map(well => {
        well.checked = checkedValue;
      })

      this.updateChosenWells()
    },
    updateChosenWells() {
      this.chosenWells = this.formattedWells.filter(well => well.checked);
    },
    calc() {
      this.load = true;
      const chosenWellsIds = this.chosenWells.map(item => item.id);
      const calcPromise = this.wellsStore.calc(this.forecastId, chosenWellsIds);
      const timeoutPromise = new Promise(resolve => setTimeout(resolve, 500));

      Promise.all([calcPromise, timeoutPromise]).then(function () {
        this.load = false;
      }.bind(this));

    },
    download() {
      const chosenWellsIds = this.chosenWells.map(item => item.id);
      this.wellsStore.getSchedule(this.forecastId, chosenWellsIds).then(blob => {
        this.blobUrl = URL.createObjectURL(blob);
        setTimeout(function () {
          this.$refs["download-button"].click();
        }.bind(this));
      });
    }
  },
  mounted() {
    if (this.forecastId) {
      this.wells = this.wellsStore.wells[this.forecastId];
      this.wellsStore.fetch(this.forecastId).then(() => {
        this.wells = this.wellsStore.wells[this.forecastId];
      });
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
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

.well {
  display: table-row;
  border-bottom: solid 1px #cccccc;
  cursor: pointer;
}

.well:hover {
  background: #cccccc;
  transition: .5s;
}

thead tr:hover {
  background: #1A82E3;
}

.well:last-child{
  border-bottom: none;
}

input {
  cursor: pointer;
  height: 100%;
}

.context-menu-button {
  cursor: pointer;
  transition: .5s;
}
.context-menu-button:hover, .context-menu-button.active {
  background: #2371d1;
}

.context-menu-title {
  display: inline;
}

.context-menu {
  position: absolute;
  background: #dddddd;
  left: 0;
  z-index: 9990;
  cursor: default;
  width: 100%;
  padding-left: 5px;
  margin-top: 10px;
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

.context-menu-button svg {
  width: 20px;
  margin-bottom: -5px;
  margin-left: 5px;
}
</style>
