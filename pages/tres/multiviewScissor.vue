<script setup>
const gl = {
  clearColor: "white",
  shadows: true,
  alpha: true,
  windowSize: true,
  dpr: 1,
  scissor: true,
  scissorTest: true
};
</script>

<template>
  <TresCanvas v-bind="gl">
    <ScenesMultiViewScene />
  </TresCanvas>
</template>