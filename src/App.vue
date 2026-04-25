<template>
  <NavBar />
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import AppLayout from './components/AppLayout.vue';
</script>

<style></style>
