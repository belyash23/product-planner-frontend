<template>
  <form class="copy-form">
    <label for="forecast-name">Название:</label>
    <input type="text" id="forecast-name" v-model="forecastName">
    <label for="forecast-comment">Комментарий:</label>
    <input type="text" id="forecast-comment" v-model="forecastComment">
    <input type="submit" value="Отправить" @click.stop.prevent="copy">
    <div class="message" v-if="showMessage">Прогноз успешно скопирован</div>
  </form>
</template>

<script>
import {useForecastsStore} from "@/stores/forecasts";

export default {
  name: "CopyForecast",
  props: {
    forecastId: Number,
  },
  data() {
    return {
      forecastsStore: useForecastsStore(),
      forecastName: '',
      forecastComment: '',
      showMessage: false,
    }
  },
  methods: {
    copy() {
      this.forecastsStore.copy(this.forecastId, this.forecastName, this.forecastComment).then(function () {
        this.showMessage = true;
      }.bind(this));
    }
  }
}
</script>

<style scoped>

input {
  outline: none;
  border: 1px solid #cccccc;
  height: 30px;
}

.copy-form {
  width: 200px;
  margin: 0 auto;
}

input[type="submit"] {
  margin-top: 20px;
  width: 100px;
  height: 40px;
  border: 1px solid #cccccc;
  cursor: pointer;
  background: #ffffff;
  transition: .2s;
}

input[type="submit"]:hover {
  background: #efefef;
}

.message {
  margin-top: 5px;
  color: green;
  font-size: 14px;
}

</style>
