<template>
  <div>
    <p>Geolocation</p>
    <p>Coords: {{ coords }}</p>
    <button @click="resume">Resume</button>
  </div>
</template>

<script setup>
const { coords, locatedAt, error, resume, pause } = useGeolocation({immediate: true})
</script>