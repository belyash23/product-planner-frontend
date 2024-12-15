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
  </div>
</template>

<script>
export default {
  name: "Sidebar"
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
