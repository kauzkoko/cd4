<template>
  <TresMesh :position="[0, -.2, 0]">
    <TresCylinderGeometry :args="[13, 13, 0.2, 64]" />
    <TresMeshToonMaterial :map="texture" />
  </TresMesh>
  <Ocean>
    <TresCircleGeometry :args="[13, 64]" />
  </Ocean>
  <TresGridHelper :args="[10, 10]" v-if="grid" color="black" />
</template>

<script setup>
const { backdrop, grid } = useStoreRefs()
const texture = ref()
texture.value = await useVideoTexture('/grain180.webm')
</script>