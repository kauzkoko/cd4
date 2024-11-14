<template>
  <TresMesh>
    <TresBoxGeometry :args="[.5, 1, 1]" />
    <TresMeshBasicMaterial :map="texture" />
  </TresMesh>
</template>

<script setup>
const texture = ref()
texture.value = await useVideoTexture('/grain.webm')
</script>
