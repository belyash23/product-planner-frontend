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

input {
  outline: none;
  border: 1px solid #cccccc;
  height: 30px;
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
