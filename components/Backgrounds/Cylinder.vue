<template>
  <TresMesh :position="[0, 0, 0]" v-if="backdrop">
    <TresCylinderGeometry :args="[20, 20, 0.2, 64]" />
    <MeshGlassMaterial color="white" />
  </TresMesh>
  <TresMesh :position="[0, -.2, 0]">
    <TresCylinderGeometry :args="[20, 20, 0.2, 64]" />
    <TresMeshToonMaterial :map="texture" />
  </TresMesh>
  <Ocean>
    <TresCircleGeometry :args="[20, 64]" />
  </Ocean>
  <TresGridHelper :args="[100, 100]" v-if="grid" color="black" />
</template>

<script setup>
const { backdrop, grid } = useStoreRefs()
const texture = ref()
texture.value = await useVideoTexture('/grain180.webm')
</script>