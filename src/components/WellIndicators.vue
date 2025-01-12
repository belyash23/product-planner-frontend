<template>
  <div class="indicators">
    <div class="indicators__title">Атрибуты скважины</div>
    <template  v-for="attribute in data?.attributes">
      <div class="indicator" v-if="indicatorsToShowInBaseForm.includes(attribute.name)">
        <div class="indicator__name">{{decamelize(attribute.name)}}</div>
        <input :type="this.inputTypesMap[attribute.type]" v-model="attribute.value" class="indicator__input" required>
      </div>
    </template>

    <div class="indicators__title">Функция падения для нефти</div>
    <div class="indicator">
      <div class="indicator__name">Тип функции</div>
      <select class="indicator__input" v-model="oilFunction.value">
        <option v-for="(functionText, functionType) in functionTypesMap" :value="functionType" :selected="functionType===oilFunction.value">{{functionText}}</option>
      </select>
    </div>
    <div class="indicator">
      <div class="indicator__name">Номинальный темп падения</div>
      <input type="text" v-model="oilDeclineRate.value" class="indicator__input" required>
    </div>
    <div class="indicator">
      <div class="indicator__name">Постоянная Арпса</div>
      <input type="text" v-model="oilArpse.value" class="indicator__input" required>
    </div>
    <div class="indicators__title">Функция падения для жидкости</div>
    <div class="indicator">
      <div class="indicator__name">Тип функции</div>
      <select class="indicator__input" v-model="liquidFunction.value">
        <option v-for="(functionText, functionType) in functionTypesMap" :value="functionType" :selected="functionType===liquidFunction.value">{{functionText}}</option>
      </select>
    </div>
    <div class="indicator">
      <div class="indicator__name">Номинальный темп падения</div>
      <input type="number" v-model="liquidDeclineRate.value" class="indicator__input" required>
    </div>
    <div class="indicator">
      <div class="indicator__name">Постоянная Арпса</div>
      <input type="number" v-model="liquidArpse.value" class="indicator__input" required>
    </div>

    <input type="submit" value="Сохранить" class="save-button" @click="save()">
    <div class="message">{{messageText}}</div>
  </div>
</template>

<script>

import {decamelize} from "@/helpers/decamelize";
import {useWellsStore} from "@/stores/wells";

export default {
  name: "WellIndicators",
  props: {
    data: Object,
    forecastId: Number,
    wellId: Number,
  },
  data() {
    return {
      inputTypesMap: {
        'Number': 'number',
        'String': 'text',
        'DateTime': 'datetime-local',
      },
      functionTypesMap: {
        'Harmonic': 'Гармоническая',
        'Exp': 'Экспоненциальная',
        'Hyperbolic': 'Гиперболическая',
      },
      indicatorsToShowInBaseForm: ['ДатаВвода', 'СтартовыйДебитНефти', 'Месторождение', 'СтартовыйДебитЖидкости', 'НомерСкважины'],
      messageText: '',
      wellsStore: useWellsStore(),
    }
  },
  computed: {
    oilFunction() {
      let oilFunction = this.data?.attributes?.filter(attribute => attribute['name'] === 'ТипФункцияПаденияПоНефти')?.[0];
      if (!oilFunction) {
        oilFunction = {
          value: '',
        }
      }
      return oilFunction;
    },
    oilDeclineRate() {
      let oilFunction = this.data?.attributes?.filter(attribute => attribute['name'] === 'НоминальныйТемпПаденияДляНефти')?.[0];
      if (!oilFunction) {
        oilFunction = {
          value: '',
        }
      }
      return oilFunction;
    },
    oilArpse() {
      let oilFunction = this.data?.attributes?.filter(attribute => attribute['name'] === 'ПостояннаяАрпсаДляНефти' +
        '')?.[0];
      if (!oilFunction) {
        oilFunction = {
          value: '',
        }
      }
      return oilFunction;
    },
    liquidFunction() {
      let oilFunction = this.data?.attributes?.filter(attribute => attribute['name'] === 'ТипФункцияПаденияПоЖидкости')?.[0];
      if (!oilFunction) {
        oilFunction = {
          value: '',
        }
      }
      return oilFunction;
    },
    liquidDeclineRate() {
      let oilFunction = this.data?.attributes?.filter(attribute => attribute['name'] === 'НоминальныйТемпПаденияДляЖидкости')?.[0];
      if (!oilFunction) {
        oilFunction = {
          value: '',
        }
      }
      return oilFunction;
    },
    liquidArpse() {
      let oilFunction = this.data?.attributes?.filter(attribute => attribute['name'] === 'ПостояннаяАрпсаДляЖидкости' +
        '')?.[0];
      if (!oilFunction) {
        oilFunction = {
          value: '',
        }
      }
      return oilFunction;
    },
  },
  methods: {
    decamelize,
    async save() {
      this.messageText = '';
      const responseData = await this.wellsStore.saveAttributes(this.forecastId, this.wellId, this.data.attributes);

      if (responseData.status === 'OK') {
        await this.wellsStore.calc(this.forecastId, [this.wellId]);
        this.messageText = 'Индикаторы успешно сохранены';
      } else {
        this.messageText = responseData.title;
      }
    }
  },
}
</script>

<style scoped>
  .indicators {
    padding: 0 20px;
    width: 600px;
  }

  .indicators__title {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 600;
  }

  .indicator {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .indicator__input {
    width: 200px;
    height: 30px;
  }

  .save-button {
    margin: 30px auto;
    display: block;
  }

  .message {
    width: 100%;
    text-align: center;
  }
</style>
