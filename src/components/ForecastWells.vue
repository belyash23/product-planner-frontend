<template>
  <table>
    <thead>
    <tr>
      <th>Дата ввода</th>
      <th>Стартовый дебит нефти</th>
      <th>Месторождение</th>
      <th>Стартовый дебит жидкости</th>
      <th>Номер скважины</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="well in formattedWells" @click="showCharts(well)">
      <td>{{well.startDate}}</td>
      <td>{{well.startOil}}</td>
      <td>{{well.field}}</td>
      <td>{{well.startFluid}}</td>
      <td>{{well.number}}</td>
    </tr>
    </tbody>
  </table>

  <transition name="modal-charts">
    <ModalWindow v-if="showChartsModal" @close="showChartsModal = false">
      <template v-slot:header>
        <h3>Данные скважины {{chosenWell.number}}</h3>
      </template>
      <template v-slot:body>
        <WellCharts :forecast-id="forecastId" :well-id="chosenWell.id"></WellCharts>
      </template>
    </ModalWindow>
  </transition>
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
          number: well['НомерСкважины']
        })
      });

      return formattedWells;
    }
  },
  methods: {
    showCharts(well) {
      this.chosenWell = well;
      this.showChartsModal = true;
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

tr {
  border-bottom: solid 1px #cccccc;
  cursor: pointer;
}

tr:hover {
  background: #cccccc;
  transition: .5s;
}

thead tr:hover {
  background: #1A82E3;
}

tr:last-child{
  border-bottom: none;
}
</style>
