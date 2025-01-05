<template>
  <div class="sidebar">
    <RouterLink to="/" v-slot="{ isActive }">
      <div :class="['sidebar__item', isActive && 'sidebar__item_active']">
        <div class="sidebar__item-icon forecasts-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-align-left">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l10 0" />
            <path d="M4 18l14 0" />
          </svg>
        </div>
        <div class="sidebar__item-text">Прогнозы</div>
      </div>
    </RouterLink>
    <RouterLink to="/wells" v-slot="{ isActive }">
      <div :class="['sidebar__item', isActive && 'sidebar__item_active']">
        <div class="sidebar__item-icon wells-icon">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 81.96 122.88" style="enable-background:new 0 0 81.96 122.88" xml:space="preserve"><g><path class="st0" d="M40.95,0c2.64,11.28,5.67,20.29,9.04,26.98c3.37,6.69,8.53,13.94,15.45,21.76l2.98,3.32 c9.04,10.06,13.55,20.15,13.55,30.21c0,11.14-4.02,20.69-12.07,28.65c-8.08,7.96-17.71,11.96-28.93,11.96 c-11.19,0-20.8-4-28.88-11.96C4.03,102.96,0,93.41,0,82.27c0-10.06,4.51-20.15,13.55-30.21l2.98-3.32 c6.91-7.82,12.07-15.07,15.45-21.76C35.34,20.29,38.35,11.28,40.95,0L40.95,0z M13.81,76.29c-0.21-2.28,1.48-4.3,3.76-4.51 c2.29-0.21,4.31,1.48,4.51,3.76c0.52,5.52,1.73,10.61,4.04,15c2.23,4.24,5.55,7.89,10.35,10.7c1.98,1.16,2.64,3.71,1.48,5.68 c-1.16,1.98-3.71,2.64-5.68,1.48c-6.25-3.66-10.58-8.42-13.51-13.99C15.91,88.99,14.43,82.86,13.81,76.29L13.81,76.29L13.81,76.29z"/></g></svg>
        </div>
        <div class="sidebar__item-text">Скважины</div>
      </div>
    </RouterLink>
    <RouterLink to="#" v-slot="{ isActive }" v-if="$route.name === 'forecast-wells'" @click="showImportModal = true">
      <div :class="['sidebar__item']">
        <div class="sidebar__item-icon upload-icon">
          <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><path d="M256 0c70.426 0 134.432 28.793 180.819 75.181C483.207 121.568 512 185.574 512 256c0 70.419-28.793 134.432-75.181 180.819C390.432 483.207 326.426 512 256 512c-70.419 0-134.432-28.793-180.819-75.181C28.793 390.432 0 326.419 0 256c0-70.419 28.793-134.432 75.181-180.819C121.568 28.793 185.581 0 256 0zm-49.948 211.203c-3.827-.162-6.548-1.438-8.119-3.824-4.264-6.39 1.557-12.704 5.588-17.148 11.459-12.566 39.518-42.773 45.172-49.427 4.281-4.731 10.383-4.731 14.661 0 5.841 6.823 35.318 38.408 46.205 50.629 3.776 4.253 8.45 10.057 4.514 15.946-1.607 2.386-4.294 3.662-8.125 3.824h-23.25v57.461c0 6.135-5.032 11.175-11.171 11.175H240.48c-6.139 0-11.171-5.029-11.171-11.175v-57.461h-23.257zm-70.267 58.286c-1.279-5.282.877-9.431 4.319-11.892a12.073 12.073 0 014.139-1.878 12.086 12.086 0 014.524-.23c4.193.602 8.014 3.306 9.304 8.606a330.17 330.17 0 012.223 9.852l1.756 8.656c2.295 11.581 3.997 18.847 8.275 22.465 4.521 3.828 13.087 5.151 29.5 5.151h115.284c15.148 0 23.057-1.452 27.212-5.209 4.007-3.621 5.578-10.707 7.612-21.581l.111-.561c1.066-5.74 2.237-11.943 3.889-18.773 1.289-5.296 5.107-8.004 9.303-8.606a12.099 12.099 0 014.525.23c1.472.355 2.897.995 4.138 1.878 3.442 2.45 5.598 6.6 4.319 11.889-1.506 6.227-2.663 12.403-3.723 18.075l-.061.329c-2.971 15.888-5.438 26.816-13.614 34.498-8.096 7.608-20.78 10.83-43.711 10.83H199.825c-23.98 0-37.162-2.887-45.639-10.396-8.691-7.7-11.324-18.871-14.678-35.816l-1.78-8.839a299.05 299.05 0 00-1.943-8.678zM256 24.604c127.271 0 231.396 104.125 231.396 231.396 0 127.271-104.125 231.396-231.396 231.396-127.267 0-231.396-104.125-231.396-231.396C24.604 128.729 128.733 24.604 256 24.604z"/></svg>
        </div>
        <div class="sidebar__item-text">Импорт скважин</div>
      </div>
    </RouterLink>
  </div>

  <transition name="import-modal">
    <ModalWindow v-if="showImportModal" @close="showImportModal = false" :width="'600px'">
      <template v-slot:header>
        <h3>Импорт скважин</h3>
      </template>
      <template v-slot:body>
        <ImportWells :forecast-id="$route.params.forecastId"></ImportWells>
      </template>
    </ModalWindow>
  </transition>
</template>

<script>
import ModalWindow from "@/components/ModalWindow.vue";
import ImportWells from "@/components/ImportWells.vue";

export default {
  name: "Sidebar",
  components: {ImportWells, ModalWindow},
  data() {
    return {
      showImportModal: false,
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.sidebar {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 120px;
  border-right: 1px solid #cccccc;
  height: 100vh;
}

.sidebar__item {
  padding: 20px;
  text-align: center;
  transition: .2s;
}

.sidebar__item:hover {
  background: #cccccc;
}

.sidebar__item_active {
  background: #cccccc;
  color: #004596;
  fill: #004596;
}

.sidebar__item-text {
  font-weight: 600;
}

.sidebar__item-icon svg {
  color: #666666;
  fill: #666666;
  height: 24px;
}

.forecasts-item svg {
  rotate: -90deg;
}

.sidebar__item_active svg {
  color: #004596;
  fill: #004596;
}
</style>
