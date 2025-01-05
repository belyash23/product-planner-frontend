<template>
  <form class="copy-form">
    <div
      class="dropzone-container"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
      :style="isDragging && 'border-color: green;'"
    >
      <input
        type="file"
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="file"
        accept=".xls,.xlsx"
        required
      />

      <label for="fileInput" class="file-label">
        <div v-if="isDragging">Отпустите здесь чтобы загрузить файл.</div>
        <div v-else>Перетяните файлы или <u>нажмите сюда</u> для загрузки.</div>
      </label>
      <div class="preview-container mt-4" v-if="files.length">
        <div v-for="file in files" :key="file.name" class="preview-card">
          <div>
            <p>
              {{ file.name }}
            </p>
          </div>
          <div>
            <button
              class="ml-2"
              type="button"
              @click="remove(files.indexOf(file))"
              title="Remove file"
            >
              <b>×</b>
            </button>
          </div>
        </div>
      </div>
    </div>
    <input type="submit" value="Отправить" @click.stop.prevent="upload">
    <div class="message" v-if="showMessage">{{messageText}}</div>
  </form>
</template>

<script>
import {useForecastsStore} from "@/stores/forecasts";

export default {
  name: "ImportWells",
  props: {
    forecastId: String,
  },
  data() {
    return {
      forecastsStore: useForecastsStore(),
      showMessage: false,
      messageText: '',
      isDragging: false,
      files: [],
    }
  },
  methods: {
    upload() {
      if (this.files[0]) {
        this.forecastsStore.importWells(this.forecastId, this.files[0]).then(function (response) {
          if (response.status === 'OK') {
            this.messageText = 'Скважины успешно импортированы';
          } else {
            this.messageText = 'Ошибка, выберите другой файл';
          }
          this.showMessage = true;
        }.bind(this));
      }
    },
    onChange() {
      this.files[0] = this.$refs.file.files[0];
      window.file = this.files[0];
      console.log(this.files[0]);
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    remove(i) {
      this.files.splice(i, 1);
    },
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
  width: 500px;
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
  font-size: 14px;
  color: var(--color-text);;
}

.main {
  display: flex;
  flex-grow: 1;
  align-items: center;
  height: 100vh;
  justify-content: center;
  text-align: center;
}

.dropzone-container {
  padding: 4rem;
  background: #f7fafc;
  border: 2px dashed;
  border-color: #9e9e9e;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}

.preview-container {
  display: flex;
  margin-top: 2rem;
}

.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
}

.preview-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}

</style>
