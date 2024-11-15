<template>
  <ViewsBasic />
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="white" />
  </TresMesh>
  <LightsBasic />
</template>

<script setup>
const tresCanvas = useTresContext().renderer.value.domElement
const h = useHydra(tresCanvas)
// h.src(s0).modulate(shape(32), .3).out()
</script>
