<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from './views/Navigation.vue';
</script>

<template>
  <header>
      <Navigation />
  </header>

  <RouterView />
</template>

<style scoped>
</style>
