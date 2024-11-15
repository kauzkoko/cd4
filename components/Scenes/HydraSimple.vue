<template>
  <ViewsBasic />
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="white" />
  </TresMesh>
  <LightsBasic />
</template>

<script setup>
import Hydra from 'hydra-synth'
console.log(useTresContext().renderer.value.domElement);
const tresCanvas = useTresContext().renderer.value.domElement
const h = new Hydra({ global: false, detectAudio: false, canvas: document.getElementById('hydra-canvas') }).synth
h.s0.init({src: tresCanvas})
h.src(s0).out()
</script>
