<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <Sidebar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>