<template>
  <Controls />
  <TresCanvas v-bind="gl">
    <ScenesCustomPositional />
    <TresMesh ref="cubeRef" :position="[3, 0, 0]">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardMaterial color="blue" />
    </TresMesh>
  </TresCanvas>
  <CenterCross />
  <HelpersSliders />
</template>

<script setup>
import { animate } from '~/assets/anime/anime.esm.min.js';

const gl = {
  clearColor: "white",
  shadows: true,
  alpha: true,
  windowSize: true,
};

const cubeRef = shallowRef(null);
watchEffect(() => {
  if (cubeRef.value) {
    let pos = cubeRef.value.position;
    animate(pos, {
      x: 10,
      y: 10,
      z: 10,
    })
  }
})
</script>