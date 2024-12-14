<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
  <Sidebar></Sidebar>
  <RouterView></RouterView>
</template>

<style>
@import '@/assets/base.css';

a {
  text-decoration: none;
  color: var(--color-text);
}
main {
  margin-left: 120px;
}
</style>
