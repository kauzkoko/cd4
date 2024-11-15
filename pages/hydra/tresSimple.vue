<script setup>
const gl = {
  clearColor: "white",
  shadows: true,
  alpha: true,
  windowSize: true,
};
</script>

<template>
  <TresCanvas v-bind="gl">
    <ScenesHydraSimple />
  </TresCanvas>
  <canvas id="hydra-canvas" class="fixed top-0 left-0 fullScreen pointer-events-none" />
</template>