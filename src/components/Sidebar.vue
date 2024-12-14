<template>
  <div class="sidebar">
    <RouterLink to="/" v-slot="{ isActive }">
      <div :class="['sidebar__item', isActive && 'sidebar__item_active']">
        <div class="sidebar__item-icon">
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
  rotate: -90deg;
}

.sidebar__item_active svg {
  color: #004596;
}
</style>
